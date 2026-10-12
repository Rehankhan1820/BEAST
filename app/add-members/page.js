"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import MemberPreview from "../lib/MemberPreview";
import {
  addMember,
  uidExists,
  GUILD_ROLES,
  BR_RANKS,
  CS_RANKS,
  MEMBER_STATUSES,
  DEFAULT_AVATAR,
} from "../lib/guildMembers";

const ADMIN_PASSWORD = "BT@0987";
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_BIO = 150;

const todayISO = () => new Date().toISOString().slice(0, 10);

const initialForm = {
  gameName: "",
  uid: "",
  level: "",
  guildRole: "Member",
  brRank: "",
  csRank: "",
  status: "Active",
  joiningDate: todayISO(),
  bio: "",
  avatar: "",
};

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-bold tracking-widest uppercase text-sky-800 mb-1.5"
    >
      {children}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return (
    <p className="mt-1 text-[11px] font-semibold text-rose-600">{children}</p>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-sky-400/60 focus:border-sky-500 hover:border-sky-400";

function inputClass(hasError) {
  return `${inputBase} ${
    hasError ? "border-rose-400 focus:ring-rose-300" : "border-sky-300/70"
  }`;
}

function compressImage(file, maxSize = 512, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read-failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode-failed"));
      img.onload = () => {
        try {
          const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
          const w = Math.round(img.width * ratio);
          const h = Math.round(img.height * ratio);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (e) {
          reject(e);
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function LockIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

export default function AddMemberForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);
  const fileInputRef = useRef(null);

  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const passwordRef = useRef(null);

  const bioCount = form.bio.length;

  const previewData = useMemo(
    () => ({
      ...form,
      avatar: form.avatar || "",
    }),
    [form]
  );

  useEffect(() => {
    if (!unlocked) {
      passwordRef.current?.focus();
    }
  }, [unlocked]);

  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 3800);
  };

  const handleUnlock = (e) => {
    e?.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      setPasswordError("Wrong password. Try again.");
      setPassword("");
      setShake(true);
      window.setTimeout(() => setShake(false), 600);
      passwordRef.current?.focus();
      return;
    }
    setPasswordError("");
    setPassword("");
    setUnlocked(true);
    showToast("success", "Access granted. Welcome, Admin 🔓");
  };

  const handleLock = () => {
    setUnlocked(false);
    setPassword("");
    setPasswordError("");
    setForm({ ...initialForm, joiningDate: todayISO() });
    setErrors({});
    setImageInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const e = {};

    if (!form.gameName.trim()) {
      e.gameName = "Game Name is required.";
    } else if (form.gameName.trim().length < 2) {
      e.gameName = "Game Name must be at least 2 characters.";
    }

    if (!form.uid.trim()) {
      e.uid = "Free Fire UID is required.";
    } else if (!/^\d+$/.test(form.uid.trim())) {
      e.uid = "UID must contain digits only.";
    } else if (form.uid.trim().length < 6) {
      e.uid = "UID looks too short.";
    } else if (uidExists(form.uid.trim())) {
      e.uid = "This UID is already registered.";
    }

    const lvl = Number(form.level);
    if (form.level === "" || form.level === null) {
      e.level = "Level is required.";
    } else if (!Number.isInteger(lvl) || lvl <= 0) {
      e.level = "Enter a valid positive level.";
    } else if (lvl > 100) {
      e.level = "Level must be 100 or below.";
    }

    if (!form.guildRole) e.guildRole = "Select a guild role.";

    if (form.bio.length > MAX_BIO) {
      e.bio = `Bio must be ${MAX_BIO} characters or less.`;
    }

    if (!form.joiningDate) {
      e.joiningDate = "Joining date is required.";
    }

    return e;
  };

  const handleFile = async (file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setImageInfo({ type: "error", msg: "Only PNG, JPG, JPEG or WebP allowed." });
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageInfo({ type: "error", msg: "Image must be 2 MB or smaller." });
      return;
    }

    try {
      const dataUrl = await compressImage(file);
      const approxBytes = Math.round((dataUrl.length * 3) / 4);
      if (approxBytes > 400 * 1024) {
        setImageInfo({
          type: "error",
          msg: "Compressed image still too large. Try a smaller one.",
        });
        return;
      }
      update("avatar", dataUrl);
      setImageInfo({
        type: "success",
        msg: "Image ready. Sirf isi browser me save hoga.",
      });
    } catch {
      setImageInfo({ type: "error", msg: "Could not process this image." });
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const removeImage = () => {
    update("avatar", "");
    setImageInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      showToast("error", "Please fix the highlighted fields.");
      const firstKey = Object.keys(validation)[0];
      const el = document.querySelector(`[data-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = addMember(form);

      if (!res.ok) {
        if (res.error === "duplicate-uid") {
          setErrors({ uid: "This UID is already registered." });
          showToast("error", "UID already exists.");
        } else {
          showToast("error", "Could not save member. Storage full ya blocked.");
        }
        return;
      }

      if (res.avatarDropped) {
        showToast(
          "success",
          "Member saved, but image could not be stored. Default avatar use kiya."
        );
      } else {
        showToast("success", "Guild member added successfully! 🔥");
      }

      setForm({ ...initialForm, joiningDate: todayISO() });
      setImageInfo(null);
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    } finally {
      setSubmitting(false);
    }
  };

  const onReset = () => {
    setForm({ ...initialForm, joiningDate: todayISO() });
    setErrors({});
    setImageInfo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast("success", "Form reset.");
  };

  return (
    <div className="space-y-6">
      {!unlocked ? (
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-sky-300/30 blur-3xl"
          />
          <form
            onSubmit={handleUnlock}
            className={`relative mx-auto max-w-md rounded-3xl border border-sky-300/50 bg-white/80 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.6)] transition-transform ${
              shake ? "animate-[shake_0.5s_ease-in-out]" : ""
            }`}
          >
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-sky-500/40">
                <ShieldIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="mt-4 text-2xl font-black text-slate-900">
                Admin Access Required
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter the admin password to add new guild members.
              </p>
            </div>

            <div className="mt-6">
              <label className="block text-[10px] font-black tracking-widest uppercase text-slate-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <LockIcon className="w-4 h-4" />
                </span>
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  placeholder="Enter password..."
                  className={`w-full rounded-xl border bg-white pl-10 pr-10 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    passwordError
                      ? "border-rose-400 focus:ring-2 focus:ring-rose-300"
                      : "border-sky-300/70 focus:ring-2 focus:ring-sky-400/60 focus:border-sky-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError ? (
                <p className="mt-2 text-xs font-bold text-rose-600">
                  {passwordError}
                </p>
              ) : (
                <p className="mt-2 text-[10px] text-slate-500">
                  Only authorized admins can add new members.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg shadow-sky-500/40 hover:from-sky-400 hover:to-sky-500 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <LockIcon className="w-4 h-4" />
              Unlock Access
            </button>
          </form>

          <style jsx>{`
            @keyframes shake {
              0%,
              100% {
                transform: translateX(0);
              }
              20%,
              60% {
                transform: translateX(-8px);
              }
              40%,
              80% {
                transform: translateX(8px);
              }
            }
          `}</style>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-emerald-300/60 bg-emerald-50/80 backdrop-blur-xl p-4 shadow-[0_10px_40px_-20px_rgba(16,185,129,0.5)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
                <ShieldIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-emerald-900">
                  Admin Mode Active
                </p>
                <p className="text-[11px] text-emerald-700">
                  You can now add new guild members.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLock}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-emerald-800 bg-white border border-emerald-400/60 hover:bg-emerald-100 transition-all"
            >
              <LockIcon className="w-3.5 h-3.5" />
              Lock Panel
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative rounded-3xl border border-sky-300/50 bg-white/70 backdrop-blur-xl p-5 sm:p-7 shadow-[0_20px_60px_-30px_rgba(14,165,233,0.5)]"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Player Details
                </h2>
                <span className="text-[10px] font-bold tracking-widest uppercase text-sky-700">
                  BT SARKAR
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div data-field="gameName">
                  <FieldLabel htmlFor="gameName" required>
                    Game Name (IGN)
                  </FieldLabel>
                  <input
                    id="gameName"
                    type="text"
                    value={form.gameName}
                    onChange={(e) => update("gameName", e.target.value)}
                    placeholder="Enter Free Fire Game Name"
                    className={inputClass(errors.gameName)}
                    maxLength={40}
                    autoComplete="off"
                  />
                  <FieldError>{errors.gameName}</FieldError>
                </div>

                <div data-field="uid">
                  <FieldLabel htmlFor="uid" required>
                    Free Fire UID
                  </FieldLabel>
                  <input
                    id="uid"
                    type="text"
                    inputMode="numeric"
                    value={form.uid}
                    onChange={(e) =>
                      update("uid", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter Player UID"
                    className={inputClass(errors.uid)}
                    maxLength={15}
                    autoComplete="off"
                  />
                  <FieldError>{errors.uid}</FieldError>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div data-field="level">
                  <FieldLabel htmlFor="level" required>
                    Player Level
                  </FieldLabel>
                  <input
                    id="level"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={100}
                    value={form.level}
                    onChange={(e) => update("level", e.target.value)}
                    placeholder="Enter Player Level"
                    className={inputClass(errors.level)}
                  />
                  <FieldError>{errors.level}</FieldError>
                </div>

                <div data-field="guildRole">
                  <FieldLabel htmlFor="guildRole" required>
                    Guild Role
                  </FieldLabel>
                  <select
                    id="guildRole"
                    value={form.guildRole}
                    onChange={(e) => update("guildRole", e.target.value)}
                    className={inputClass(errors.guildRole)}
                  >
                    {GUILD_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <FieldError>{errors.guildRole}</FieldError>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div>
                  <FieldLabel htmlFor="brRank">BR Rank</FieldLabel>
                  <select
                    id="brRank"
                    value={form.brRank}
                    onChange={(e) => update("brRank", e.target.value)}
                    className={inputClass(false)}
                  >
                    <option value="">Select BR Rank</option>
                    {BR_RANKS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="csRank">CS Rank</FieldLabel>
                  <select
                    id="csRank"
                    value={form.csRank}
                    onChange={(e) => update("csRank", e.target.value)}
                    className={inputClass(false)}
                  >
                    <option value="">Select CS Rank</option>
                    {CS_RANKS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="status">Member Status</FieldLabel>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => update("status", e.target.value)}
                    className={inputClass(false)}
                  >
                    {MEMBER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4" data-field="joiningDate">
                <FieldLabel htmlFor="joiningDate" required>
                  Joining Date
                </FieldLabel>
                <input
                  id="joiningDate"
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) => update("joiningDate", e.target.value)}
                  className={inputClass(errors.joiningDate)}
                />
                <FieldError>{errors.joiningDate}</FieldError>
              </div>

              <div className="mt-4" data-field="bio">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="bio">Player Bio</FieldLabel>
                  <span
                    className={`text-[10px] font-bold ${
                      bioCount > MAX_BIO ? "text-rose-600" : "text-slate-500"
                    }`}
                  >
                    {bioCount} / {MAX_BIO}
                  </span>
                </div>
                <textarea
                  id="bio"
                  rows={3}
                  value={form.bio}
                  onChange={(e) =>
                    update("bio", e.target.value.slice(0, MAX_BIO + 20))
                  }
                  placeholder="Short description (optional)"
                  className={`${inputClass(errors.bio)} resize-none`}
                  maxLength={MAX_BIO + 20}
                />
                <FieldError>{errors.bio}</FieldError>
              </div>

              <div className="mt-5">
                <FieldLabel htmlFor="avatar">
                  Profile Image (optional)
                </FieldLabel>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-sky-400/60 bg-white flex-shrink-0">
                    <img
                      src={form.avatar || DEFAULT_AVATAR}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <label
                    htmlFor="avatar"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sky-400/60 bg-white/80 hover:bg-white text-sm font-semibold text-sky-800 shadow-sm transition-all"
                  >
                    Choose Image
                    <input
                      id="avatar"
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={onFileChange}
                      className="hidden"
                    />
                  </label>

                  {form.avatar ? (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-3 py-2.5 rounded-xl border border-rose-300/70 bg-rose-50 hover:bg-rose-100 text-sm font-semibold text-rose-700 transition-all"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                {imageInfo ? (
                  <p
                    className={`mt-2 text-[11px] font-semibold ${
                      imageInfo.type === "error"
                        ? "text-rose-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {imageInfo.msg}
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-slate-500">
                    PNG, JPG, JPEG, WebP • max 2 MB • local preview only
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg shadow-sky-500/40 hover:from-sky-400 hover:to-sky-500 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Saving..." : "Add Guild Member"}
                </button>

                <button
                  type="button"
                  onClick={onReset}
                  className="px-6 py-3.5 rounded-xl font-bold text-sky-800 bg-white/80 border border-sky-400/60 hover:bg-white hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  Reset Form
                </button>
              </div>

              <p className="mt-3 text-[10px] text-slate-500 leading-relaxed">
                Data aapke browser ke{" "}
                <span className="font-mono">localStorage</span> me save hoga.
                Sirf isi device par dikhega — public admin security nahi hai.
              </p>
            </form>

            <div>
              <MemberPreview data={previewData} />
            </div>
          </div>
        </>
      )}

      {toast ? (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-[70] max-w-[88vw] sm:max-w-sm rounded-2xl px-4 py-3 shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
            toast.type === "success"
              ? "bg-emerald-50/95 border-emerald-300 text-emerald-900"
              : "bg-rose-50/95 border-rose-300 text-rose-900"
          }`}
        >
          <p className="text-sm font-semibold">{toast.msg}</p>
        </div>
      ) : null}
    </div>
  );
}