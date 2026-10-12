"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_AVATAR,
  GUILD_NAME,
  GUILD_ROLES,
  MEMBER_STATUSES,
  LEADER,
} from "../lib/guildMembers";
import useGuildMembers from "../lib/useGuildMembers";

const DELETE_PASSWORD = "BT@0987";

const SORT_OPTIONS = [
  { value: "role", label: "Role Order (Default)" },
  { value: "recent", label: "Recently Added" },
  { value: "oldest", label: "Oldest Members" },
  { value: "level-desc", label: "Highest Level" },
  { value: "level-asc", label: "Lowest Level" },
  { value: "name-asc", label: "Game Name A–Z" },
];

const ROLE_PRIORITY = {
  "Guild Leader": 0,
  "Acting Leader": 1,
  Officer: 2,
  "Elite Member": 3,
  Member: 4,
};

const STATUS_PRIORITY = {
  Active: 0,
  Inactive: 1,
  "On Leave": 1,
};

const ROLE_STYLES = {
  "Guild Leader": {
    border: "border-amber-400/70",
    glow: "shadow-[0_20px_60px_-25px_rgba(251,191,36,0.6)]",
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    ring: "ring-amber-400/80",
    gradient: "from-amber-400 via-yellow-300 to-amber-500",
  },
  "Acting Leader": {
    border: "border-purple-400/70",
    glow: "shadow-[0_20px_60px_-25px_rgba(168,85,247,0.6)]",
    badge: "bg-purple-100 text-purple-800 border-purple-300",
    ring: "ring-purple-400/80",
    gradient: "from-purple-400 via-fuchsia-300 to-purple-500",
  },
  Officer: {
    border: "border-blue-400/70",
    glow: "shadow-[0_20px_60px_-25px_rgba(59,130,246,0.6)]",
    badge: "bg-blue-100 text-blue-800 border-blue-300",
    ring: "ring-blue-400/80",
    gradient: "from-blue-400 via-sky-300 to-blue-500",
  },
  "Elite Member": {
    border: "border-cyan-400/70",
    glow: "shadow-[0_20px_60px_-25px_rgba(6,182,212,0.6)]",
    badge: "bg-cyan-100 text-cyan-800 border-cyan-300",
    ring: "ring-cyan-400/80",
    gradient: "from-cyan-400 via-teal-300 to-cyan-500",
  },
  Member: {
    border: "border-sky-300/60",
    glow: "shadow-[0_20px_60px_-30px_rgba(14,165,233,0.5)]",
    badge: "bg-slate-100 text-slate-700 border-slate-300",
    ring: "ring-sky-400/70",
    gradient: "from-sky-400 via-cyan-300 to-sky-500",
  },
};

const LEADER_LOGO_URL =
  "https://api.dicebear.com/7.x/bottts/svg?seed=BeastLeader&backgroundColor=ffd700";

function CrownIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 7l4 4 5-6 5 6 4-4-2 12H5L3 7zm4 14h10v2H7v-2z" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
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

function statusDot(status) {
  if (status === "Active") return "bg-emerald-500";
  if (status === "Inactive") return "bg-slate-400";
  return "bg-rose-500";
}

function statusBadge(status) {
  if (status === "Active")
    return "bg-emerald-100 text-emerald-800 border-emerald-300";
  if (status === "Inactive")
    return "bg-slate-100 text-slate-700 border-slate-300";
  return "bg-rose-100 text-rose-800 border-rose-300";
}

function GuildStats({ members }) {
  const total = members.length;
  const active = members.filter((m) => m.status === "Active").length;
  const officers = members.filter(
    (m) => m.guildRole === "Officer" || m.guildRole === "Acting Leader"
  ).length;

 

  return (
    <div className="">
    
    </div>
  );
}

function GuildHero({ members }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.6)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-sky-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-cyan-300/40 blur-3xl" />
      </div>

   
    </section>
  );
}

const selectBase =
  "w-full rounded-xl border border-sky-300/70 bg-white/80 backdrop-blur-sm px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-sky-400/60 focus:border-sky-500 hover:border-sky-400 transition-all";


function MemberCard({ member, onView, onDelete }) {
  const style = ROLE_STYLES[member.guildRole] || ROLE_STYLES.Member;
  const avatar = member.avatar || DEFAULT_AVATAR;
  const isLeader = member.guildRole === "Guild Leader";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border ${style.border} bg-white/80 backdrop-blur-xl ${style.glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-25px_rgba(14,165,233,0.6)]`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.gradient}`} />

      <button
        type="button"
        onClick={() => onDelete(member)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-white/90 border border-rose-300 text-rose-600 hover:bg-rose-500 hover:text-white hover:border-rose-500 flex items-center justify-center transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        aria-label={`Delete ${member.gameName}`}
        title="Delete Member"
      >
        <TrashIcon className="w-4 h-4" />
      </button>

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div
              className={`absolute inset-0 rounded-full blur-md ${
                isLeader ? "bg-amber-400/50" : "bg-sky-400/30"
              }`}
            />
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-3 ${style.ring} bg-white shadow-lg`}
            >
              <img
                src={avatar}
                alt={member.gameName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            {isLeader && (
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                <CrownIcon className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 pr-8">
                <h3 className="text-base sm:text-lg font-black text-slate-900 truncate">
                  {member.gameName}
                </h3>
                <p className="text-[11px] font-mono font-semibold text-sky-700 truncate">
                  UID: {member.uid}
                </p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${style.badge}`}
              >
                {member.guildRole}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${statusBadge(
                  member.status
                )}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusDot(member.status)}`} />
                {member.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-sky-50 border border-sky-200/70 py-2">
            <p className="text-[9px] font-bold tracking-widest text-sky-700 uppercase">
              Level
            </p>
            <p className="text-sm font-black text-slate-900">
              {member.level || "—"}
            </p>
          </div>
          <div className="rounded-lg bg-sky-50 border border-sky-200/70 py-2">
            <p className="text-[9px] font-bold tracking-widest text-sky-700 uppercase">
              BR
            </p>
            <p className="text-[11px] font-bold text-slate-900 truncate">
              {member.brRank || "—"}
            </p>
          </div>
          <div className="rounded-lg bg-sky-50 border border-sky-200/70 py-2">
            <p className="text-[9px] font-bold tracking-widest text-sky-700 uppercase">
              CS
            </p>
            <p className="text-[11px] font-bold text-slate-900 truncate">
              {member.csRank || "—"}
            </p>
          </div>
        </div>

        {member.bio ? (
          <p className="mt-3 text-xs text-slate-600 line-clamp-2">{member.bio}</p>
        ) : null}

        <button
          type="button"
          onClick={() => onView(member)}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-md shadow-sky-500/30 hover:from-sky-400 hover:to-sky-500 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          View Profile
        </button>
      </div>
    </article>
  );
}

function GuildEmptyState({ variant = "empty", onReset }) {
  if (variant === "no-results") {
    return (
      <div className="rounded-2xl border border-sky-300/50 bg-white/70 backdrop-blur-xl p-10 text-center">
        <p className="text-base font-bold text-slate-800">
          No guild members found. Try changing your search or filters.
        </p>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-sky-800 bg-white border border-sky-400/60 hover:bg-sky-50 transition-all"
          >
            Reset Filters
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 p-10 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-sky-300/40 blur-3xl"
      />
      <div className="relative">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-white border border-sky-300/60 flex items-center justify-center shadow-md">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-sky-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        
      
      </div>
    </div>
  );
}

function MemberProfileModal({ member, onClose }) {
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!member) return;
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [member, onClose]);

  if (!member) return null;

  const avatar = member.avatar || DEFAULT_AVATAR;
  const isLeader = member.guildRole === "Guild Leader";
  const style = ROLE_STYLES[member.guildRole] || ROLE_STYLES.Member;

  const copyUid = async () => {
    try {
      await navigator.clipboard.writeText(String(member.uid));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const rows = [
    { label: "Free Fire UID", value: member.uid },
    { label: "Player Level", value: member.level || "Not Provided" },
    { label: "Guild Role", value: member.guildRole || "Not Provided" },
    { label: "BR Rank", value: member.brRank || "Not Provided" },
    { label: "CS Rank", value: member.csRank || "Not Provided" },
    { label: "Status", value: member.status || "Not Provided" },
    { label: "Joining Date", value: member.joiningDate || "Not Provided" },
  ];

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${member.gameName} profile`}
    >
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-300/60 bg-white/95 backdrop-blur-xl shadow-[0_40px_100px_-30px_rgba(14,165,233,0.6)]">
        <div className={`relative h-28 bg-gradient-to-r ${style.gradient}`}>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close profile"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 sm:px-8 pb-8 -mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white bg-white shadow-xl">
                <img
                  src={avatar}
                  alt={member.gameName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                />
              </div>
              {isLeader && (
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                  <CrownIcon className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 truncate">
                {member.gameName}
              </h3>
              <p className="text-sm font-mono font-semibold text-sky-700 truncate">
                UID: {member.uid}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${style.badge}`}
                >
                  {member.guildRole || "Member"}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${statusBadge(
                    member.status
                  )}`}
                >
                  {member.status || "Active"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rows.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-sky-200/70 bg-sky-50/60 p-3"
              >
                <p className="text-[10px] font-bold tracking-widest uppercase text-sky-700">
                  {r.label}
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900 break-words">
                  {r.value}
                </p>
              </div>
            ))}
          </div>

          {member.bio ? (
            <div className="mt-4 rounded-xl border border-sky-200/70 bg-white p-4">
              <p className="text-[10px] font-bold tracking-widest uppercase text-sky-700">
                Player Bio
              </p>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                {member.bio}
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-sky-200/70 pt-5">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-sky-700">
              {GUILD_NAME}
            </span>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={copyUid}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-sky-800 bg-white border border-sky-400/60 hover:bg-sky-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {copied ? "✓ UID Copied" : "Copy UID"}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-md shadow-sky-500/40 hover:from-sky-400 hover:to-sky-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ member, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!member) return;
    inputRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [member, onClose]);

  if (!member) return null;

  const handleConfirm = async () => {
    setError("");
    if (!password.trim()) {
      setError("Password required");
      return;
    }
    if (password !== DELETE_PASSWORD) {
      setError("Wrong password. Try again.");
      setPassword("");
      return;
    }
    setLoading(true);
    await onConfirm(member);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Delete confirmation"
    >
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-3xl border border-rose-300/60 bg-white/95 backdrop-blur-xl shadow-[0_40px_100px_-30px_rgba(244,63,94,0.6)] overflow-hidden">
        <div className="relative p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center">
              <TrashIcon className="w-6 h-6 text-rose-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-slate-900">
                Delete Member?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                You are about to delete{" "}
                <span className="font-bold text-slate-900">
                  {member.gameName}
                </span>{" "}
                (UID: {member.uid}). This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-[10px] font-black tracking-widest uppercase text-slate-700 mb-2">
              Enter Admin Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <LockIcon className="w-4 h-4" />
              </span>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleConfirm();
                }}
                placeholder="Enter password..."
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-rose-400/60 focus:border-rose-500 transition-all"
              />
            </div>
            {error ? (
              <p className="mt-2 text-xs font-bold text-rose-600">{error}</p>
            ) : (
              <p className="mt-2 text-[10px] text-slate-500">
                Only guild admins can delete members.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-md shadow-rose-500/40 hover:from-rose-400 hover:to-rose-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete Member"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuildMembersPage() {
  const { members, loaded, deleteMember } = useGuildMembers();

  const [query, setQuery] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("role");
  const [activeMember, setActiveMember] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const onReset = () => {
    setQuery("");
    setRole("all");
    setStatus("all");
    setSort("role");
  };

  const allMembers = useMemo(() => {
    const leaderExists = members.some(
      (m) =>
        String(m.uid) === String(LEADER.uid) ||
        (m.gameName?.trim().toLowerCase() === LEADER.gameName.toLowerCase() &&
          m.guildRole === "Guild Leader")
    );

    if (leaderExists) {
      return members.map((m) => {
        const isLeader =
          String(m.uid) === String(LEADER.uid) ||
          (m.gameName?.trim().toLowerCase() === LEADER.gameName.toLowerCase() &&
            m.guildRole === "Guild Leader");
        if (isLeader && !m.avatar) {
          return { ...m, avatar: LEADER_LOGO_URL };
        }
        return m;
      });
    }

    const leaderEntry = {
      id: `leader-${LEADER.uid}`,
      gameName: LEADER.gameName,
      uid: LEADER.uid,
      level: LEADER.level,
      guildRole: LEADER.guildRole || "Guild Leader",
      brRank: LEADER.brRank,
      csRank: LEADER.csRank,
      status: LEADER.status || "Active",
      joiningDate: LEADER.joiningDate,
      bio: LEADER.bio,
      avatar: LEADER.avatar || LEADER_LOGO_URL,
      createdAt: LEADER.createdAt || 0,
    };

    return [leaderEntry, ...members];
  }, [members]);

  const filtered = useMemo(() => {
    let list = [...allMembers];

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) =>
          m.gameName?.toLowerCase().includes(q) ||
          String(m.uid).toLowerCase().includes(q)
      );
    }

    if (role !== "all") list = list.filter((m) => m.guildRole === role);
    if (status !== "all") list = list.filter((m) => m.status === status);

    switch (sort) {
      case "role":
        list.sort((a, b) => {
          const aRole = ROLE_PRIORITY[a.guildRole] ?? 99;
          const bRole = ROLE_PRIORITY[b.guildRole] ?? 99;
          if (aRole !== bRole) return aRole - bRole;

          const aStatus = STATUS_PRIORITY[a.status] ?? 0;
          const bStatus = STATUS_PRIORITY[b.status] ?? 0;
          if (aStatus !== bStatus) return aStatus - bStatus;

          return (a.gameName || "").localeCompare(b.gameName || "");
        });
        break;
      case "oldest":
        list.sort(
          (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        );
        break;
      case "level-desc":
        list.sort((a, b) => (Number(b.level) || 0) - (Number(a.level) || 0));
        break;
      case "level-asc":
        list.sort((a, b) => (Number(a.level) || 0) - (Number(b.level) || 0));
        break;
      case "name-asc":
        list.sort((a, b) =>
          (a.gameName || "").localeCompare(b.gameName || "")
        );
        break;
      case "recent":
      default:
        list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
    }

    return list;
  }, [allMembers, query, role, status, sort]);


const handleDeleteConfirm = async (member) => {
  if (!member) return;

  // Official fallback leader ko delete nahi karna
  if (String(member.id) === `leader-${LEADER.uid}`) {
    alert("Official leader profile cannot be deleted.");
    return;
  }

  try {
    if (typeof deleteMember !== "function") {
      throw new Error(
        "deleteMember function is missing from useGuildMembers."
      );
    }

    await deleteMember(member.id);

    setDeleteTarget(null);
    setActiveMember(null);
  } catch (error) {
    console.error("Member deletion failed:", error);
    alert(error.message || "Unable to delete member. Please try again.");
  }
};


  return (
    <main className="relative min-h-screen pt-24 sm:pt-28 pb-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-cyan-300/25 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <li>
              <Link
                href="/"
                className="text-sky-700 hover:text-sky-900 transition-colors"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="text-slate-600">Guild</li>
            <li aria-hidden="true" className="text-slate-400">
              /
            </li>
            <li className="text-slate-900" aria-current="page">
              Members
            </li>
          </ol>
        </nav>

        <GuildHero members={allMembers} />

        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
           
            <Link
              href="/add-members"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-md shadow-sky-500/40 hover:from-sky-400 hover:to-sky-500 transition-all"
            >
              + Add Member
            </Link>
          </div>


          {!loaded ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-white/60 border border-sky-200/70 animate-pulse"
                />
              ))}
            </div>
          ) : allMembers.length === 0 ? (
            <GuildEmptyState variant="empty" />
          ) : filtered.length === 0 ? (
            <GuildEmptyState variant="no-results" onReset={onReset} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((m) => (
                <MemberCard
                  key={m.id}
                  member={m}
                  onView={setActiveMember}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="pt-6 text-center">
          <p className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-sky-800">
            BT SARKAR — MORE THAN A GUILD, WE ARE A FAMILY.
          </p>
        </footer>
      </div>

      <MemberProfileModal
        member={activeMember}
        onClose={() => setActiveMember(null)}
      />

      <DeleteConfirmModal
        member={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}