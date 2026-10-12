"use client";

import { GUILD_NAME, DEFAULT_AVATAR } from "../lib/guildMembers";

function Badge({ children, tone = "sky" }) {
  const tones = {
    sky: "bg-sky-100 text-sky-800 border-sky-300/60",
    gold: "bg-amber-100 text-amber-800 border-amber-300/60",
    green: "bg-emerald-100 text-emerald-800 border-emerald-300/60",
    rose: "bg-rose-100 text-rose-800 border-rose-300/60",
    slate: "bg-slate-100 text-slate-700 border-slate-300/60",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function roleTone(role) {
  if (role === "Guild Leader") return "gold";
  if (role === "Acting Leader") return "rose";
  if (role === "Officer") return "sky";
  if (role === "Elite Member") return "green";
  return "slate";
}

function statusTone(status) {
  if (status === "Active") return "green";
  if (status === "Inactive") return "slate";
  return "rose";
}

export default function MemberPreview({ data }) {
  const avatar = data.avatar || DEFAULT_AVATAR;

  return (
    <div className="sticky top-24">
      <div className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-[0_20px_60px_-25px_rgba(14,165,233,0.55)]">
        {/* top glow strip */}
        <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500" />

        <div className="p-6">
          <p className="text-[10px] font-bold tracking-[0.3em] text-sky-700 uppercase">
            Live Preview
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-900">
            Player Profile Card
          </h3>

          {/* Avatar + Name */}
          <div className="mt-5 flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-sky-400/70 bg-white shadow-lg shadow-sky-500/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt="Player avatar preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-black text-slate-900 truncate">
                {data.gameName?.trim() || "BEAST"}
              </p>
              <p className="text-xs font-semibold text-sky-700 font-mono truncate">
                UID: {data.uid?.trim() || "519366839"}
              </p>
              <div className="mt-2">
                <Badge tone={roleTone(data.guildRole)}>
                  {data.guildRole || "Member"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/80 border border-sky-200/70 p-3">
              <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">
                Level
              </p>
              <p className="mt-1 text-base font-black text-slate-900">
                {data.level || "—"}
              </p>
            </div>
            <div className="rounded-xl bg-white/80 border border-sky-200/70 p-3">
              <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">
                Status
              </p>
              <p className="mt-1">
                <Badge tone={statusTone(data.status)}>
                  {data.status || "Active"}
                </Badge>
              </p>
            </div>
            <div className="rounded-xl bg-white/80 border border-sky-200/70 p-3">
              <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">
                BR Rank
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                {data.brRank || "—"}
              </p>
            </div>
            <div className="rounded-xl bg-white/80 border border-sky-200/70 p-3">
              <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">
                CS Rank
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                {data.csRank || "—"}
              </p>
            </div>
          </div>

          {data.bio?.trim() ? (
            <div className="mt-4 rounded-xl bg-white/70 border border-sky-200/70 p-3">
              <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">
                Bio
              </p>
              <p className="mt-1 text-xs text-slate-700 leading-relaxed break-words">
                {data.bio}
              </p>
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-between border-t border-sky-200/70 pt-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-sky-700 uppercase">
              {GUILD_NAME}
            </span>
            <span className="text-[10px] font-semibold text-slate-500">
              {data.joiningDate || new Date().toISOString().slice(0, 10)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-[10px] text-slate-500 text-center leading-relaxed">
        Ye preview browser me hi rehta hai. Server par upload nahi hota.
      </p>
    </div>
  );
}