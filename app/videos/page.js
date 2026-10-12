"use client";

import Link from "next/link";

const VIDEO_ID = "UVe4qgsr7xQ";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@Beastfire28";
const YOUTUBE_CHANNEL_HANDLE = "@Beastfire28";

const highlights = [
  {
    title: "Clutch Moments",
    desc: "1v4 clutches that turned the match around.",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Squad Wipes",
    desc: "Full squad eliminations with perfect coordination.",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    title: "Ranked Grind",
    desc: "Road to Heroic — every rank push, every win.",
    accent: "from-amber-500 to-yellow-400",
  },
];

export default function VideosPage() {
  return (
    <main className="relative min-h-screen pt-24 sm:pt-28 pb-24 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-cyan-300/25 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
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
            <li className="text-slate-900" aria-current="page">
              Videos
            </li>
          </ol>
        </nav>

        <section className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 shadow-[0_30px_80px_-40px_rgba(14,165,233,0.6)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-sky-300/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-cyan-300/40 blur-3xl" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-white/80 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-sky-800">
                Official YouTube Channel
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05]">
              BEAST <span className="text-sky-600">VIDEOS</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 italic">
              Epic clutches, squad wipes, rank pushes and everything BEAST.
              Subscribe and never miss a moment.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/40 hover:from-red-400 hover:to-red-500 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>

              <a
                href={YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-sky-800 bg-white border border-sky-400/60 hover:bg-sky-50 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {YOUTUBE_CHANNEL_HANDLE}
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Featured Video
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Latest upload from the BEAST channel.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-white/80 backdrop-blur-xl shadow-[0_25px_70px_-30px_rgba(14,165,233,0.6)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500" />
            <div className="relative aspect-video w-full bg-slate-900">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="BEAST Featured Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  New
                </span>
                <span className="inline-flex items-center rounded-full bg-sky-100 text-sky-800 border border-sky-300 px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                  Gameplay
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">
                  Free Fire
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                BEAST Squad Highlights
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Watch the latest BEAST squad action — raw gameplay, intense
                fights, and the kind of clutch moments that define our guild.
                Like, comment, and subscribe to support the grind.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md shadow-red-500/40 hover:from-red-400 hover:to-red-500 transition-all"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch on YouTube
                </a>

                <a
                  href={YOUTUBE_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-sky-800 bg-white border border-sky-400/60 hover:bg-sky-50 transition-all"
                >
                  Visit Channel
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              What You&apos;ll Find
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Content types you can expect on the BEAST channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="relative overflow-hidden rounded-2xl border border-sky-300/50 bg-white/70 backdrop-blur-xl p-5 shadow-[0_15px_50px_-25px_rgba(14,165,233,0.5)]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${h.accent}`}
                />
                <p className="text-sm font-black tracking-[0.25em] text-sky-700 uppercase">
                  {h.title}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-sky-300/50 bg-gradient-to-br from-white via-sky-50 to-sky-100 p-6 sm:p-8 shadow-[0_25px_70px_-35px_rgba(14,165,233,0.6)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-sky-300/30 blur-3xl"
          />
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