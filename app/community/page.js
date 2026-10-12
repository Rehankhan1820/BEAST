"use client";

import Link from "next/link";

const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbCe1ihElagq0H0kOW45";
const FACEBOOK_URL = "https://www.facebook.com/share/1FZ7PaSwin/?mibextid=wwXIfr";
const YOUTUBE_URL = "https://www.youtube.com/@Beastfire28";
const INSTAGRAM_STATUS = "Coming Soon";

const socials = [
  {
    name: "WhatsApp",
    handle: "Official Channel",
    url: WHATSAPP_URL,
    comingSoon: false,
    color: "from-emerald-500 to-green-600",
    shadow: "shadow-emerald-500/40",
    hover: "hover:from-emerald-400 hover:to-green-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "BEAST Official",
    url: FACEBOOK_URL,
    comingSoon: false,
    color: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/40",
    hover: "hover:from-blue-400 hover:to-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@Beastfire28",
    url: YOUTUBE_URL,
    comingSoon: false,
    color: "from-red-500 to-red-600",
    shadow: "shadow-red-500/40",
    hover: "hover:from-red-400 hover:to-red-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: INSTAGRAM_STATUS,
    url: null,
    comingSoon: true,
    color: "from-pink-500 to-purple-600",
    shadow: "shadow-pink-500/40",
    hover: "",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
];

const features = [
  {
    title: "Custom Rooms",
    desc: "Daily custom room matches with guild members.",
    accent: "from-sky-500 to-cyan-400",
    icon: "🎮",
  },
  {
    title: "Giveaways",
    desc: "Free diamonds, skins and rewards for active members.",
    accent: "from-amber-500 to-yellow-400",
    icon: "🎁",
  },
  {
    title: "Pro Tips",
    desc: "Guides, strategies and tips from experienced players.",
    accent: "from-emerald-500 to-teal-400",
    icon: "🎯",
  },
  {
    title: "Squad Up",
    desc: "Find teammates and dominate ranked matches together.",
    accent: "from-purple-500 to-fuchsia-400",
    icon: "🤝",
  },
  {
    title: "Tournaments",
    desc: "Internal and external tournaments with real prizes.",
    accent: "from-rose-500 to-pink-400",
    icon: "🏆",
  },
  {
    title: "24/7 Chat",
    desc: "Active community chat — always someone online.",
    accent: "from-indigo-500 to-blue-400",
    icon: "💬",
  },
];

const rules = [
  "Respect every member — no toxicity, abuse, or hate speech.",
  "No spam, self-promotion, or unauthorized advertising.",
  "Stay active — inactive members may be removed.",
  "Help new players — we grow together.",
  "No hacking, cheating, or unfair play.",
  "Follow admin instructions during events and matches.",
];

const steps = [
  {
    step: "01",
    title: "Join WhatsApp",
    desc: "Click the WhatsApp button and join our official channel.",
  },
  {
    step: "02",
    title: "Introduce Yourself",
    desc: "Send your IGN and UID to get added to the member roster.",
  },
  {
    step: "03",
    title: "Play & Win",
    desc: "Join custom rooms, tournaments and grind with the squad.",
  },
];

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen pt-24 sm:pt-28 pb-24 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-cyan-300/25 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <li>
              <Link href="/" className="text-sky-700 hover:text-sky-900 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li className="text-slate-900" aria-current="page">Community</li>
          </ol>
        </nav>

        <section className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.6)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-sky-300/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-cyan-300/40 blur-3xl" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-white/80 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-sky-800">
                Official BEAST Community
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              JOIN THE <span className="text-sky-600">BEAST FAMILY</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 italic">
              More than a guild — we are a family. Connect with players,
              dominate matches, and grow together.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/40 hover:from-emerald-400 hover:to-green-500 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Join WhatsApp Channel
              </a>

              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-sky-800 bg-white border border-sky-400/60 hover:bg-sky-50 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-600" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Connect With Us
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Follow BEAST on every platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socials.map((s) => {
              if (s.comingSoon) {
                return (
                  <div
                    key={s.name}
                    className="relative overflow-hidden rounded-2xl border border-dashed border-slate-300/70 bg-white/50 backdrop-blur-xl p-5 shadow-[0_10px_40px_-25px_rgba(100,116,139,0.4)]"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color} opacity-40`} />
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} opacity-60 flex items-center justify-center text-white flex-shrink-0`}>
                        {s.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-500">{s.name}</p>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600">
                          {s.handle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-2xl border border-sky-300/50 bg-white/80 backdrop-blur-xl p-5 shadow-[0_15px_50px_-25px_rgba(14,165,233,0.5)] hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(14,165,233,0.6)] transition-all duration-300`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.color}`} />
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} ${s.shadow} ${s.hover} flex items-center justify-center text-white flex-shrink-0 shadow-md transition-all duration-300 group-hover:scale-105`}
                    >
                      {s.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-slate-900">{s.name}</p>
                      <p className="text-[11px] font-semibold text-sky-700 truncate">
                        {s.handle}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-sky-500 text-lg transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              What You Get
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Perks of being part of the BEAST community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-sky-300/50 bg-white/70 backdrop-blur-xl p-5 shadow-[0_15px_50px_-25px_rgba(14,165,233,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.accent}`} />
                <div className="text-3xl mb-3">{f.icon}</div>
                <p className="text-sm font-black tracking-[0.2em] text-sky-700 uppercase">
                  {f.title}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 p-6 sm:p-8 shadow-[0_25px_70px_-35px_rgba(14,165,233,0.6)]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              How To Join
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Three easy steps to become a BEAST.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-2xl border border-sky-300/60 bg-white/80 backdrop-blur-xl p-5 shadow-[0_10px_40px_-25px_rgba(14,165,233,0.5)]"
                >
                  <span className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center text-sm font-black shadow-lg ring-4 ring-white">
                    {s.step}
                  </span>
                  <p className="mt-3 text-sm font-black tracking-widest text-sky-700 uppercase">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Community Rules
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Follow these to keep our community strong and healthy.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rules.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-sky-300/50 bg-white/70 backdrop-blur-xl p-4 shadow-[0_10px_40px_-30px_rgba(14,165,233,0.5)]"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 text-white flex items-center justify-center text-xs font-black">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-800">{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 p-6 sm:p-8 shadow-[0_25px_70px_-35px_rgba(14,165,233,0.6)]">
          <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-sky-700">
                Guild of BT SARKAR
              </p>
              <p className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                LEADER — <span className="text-sky-700">BEAST</span>
              </p>
              <p className="mt-1 text-sm font-mono font-semibold text-sky-700">
                UID: 519366839
              </p>
            </div>

            <Link
              href="/guild/members"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg shadow-sky-500/40 hover:from-sky-400 hover:to-sky-500 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              View Guild Members →
            </Link>
          </div>
        </section>

        <footer className="pt-4 text-center">
          <p className="text-xs sm:text-sm font-black tracking-[0.3em] uppercase text-sky-800">
            BT SARKAR — MORE THAN A GUILD, WE ARE A FAMILY.
          </p>
        </footer>
      </div>
    </main>
  );
}