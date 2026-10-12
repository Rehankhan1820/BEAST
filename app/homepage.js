"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./Navbar/Navbar";

const creator = {
  name: "BEAST",
  milestone: "BEAST 10K",
  milestoneLabel: "Road to 10K",
  gamingUid: "519366839",
};

const creatorStats = {
  currentSubscribers: 1200,
  nextMilestone: 10000,
  milestoneLabel: "BEAST 10K",
};

const socialLinks = {
  youtube: "https://www.youtube.com/@Beastfire28",
  whatsapp: "https://whatsapp.com/channel/0029VbCe1ihElagq0H0kOW45",
  facebook: "https://www.facebook.com/share/1FZ7PaSwin/?mibextid=wwXIfr",
  instagram: "",
};

const videoUrls = [
  "https://youtube.com/shorts/3Pr0v81HvWo?si=ldVHJ6QJ5erxjUov",
  "https://youtube.com/shorts/y5K_7A0UPhQ?si=6Ir_QxN4teD50vC9",
  "https://youtube.com/shorts/geTtUqnptsg?si=fnv1ekchjRfIVsUK",
];

/* Extract YouTube video ID for embedding */
function getYouTubeId(url) {
  if (!url) return null;
  const shortMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortMatch) return shortMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const beMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch) return beMatch[1];
  return null;
}

const socialCards = [
  {
    key: "youtube",
    name: "YouTube",
    description: "Watch the latest uploads from BEAST",
    cta: "Watch Now",
    href: socialLinks.youtube,
    image: "/youtube.jpg",
    enabled: true,
  },
  {
    key: "whatsapp",
    name: "WhatsApp Community",
    description: "Join the BEAST community channel",
    cta: "Join Channel",
    href: socialLinks.whatsapp,
    image: "/whatsapp.png",
    enabled: true,
  },
  {
    key: "facebook",
    name: "Facebook",
    description: "Follow BEAST on Facebook",
    cta: "Follow",
    href: socialLinks.facebook,
    image: "/facebook.png",
    enabled: true,
  },
  {
    key: "instagram",
    name: "Instagram",
    description: "Coming soon on Instagram",
    cta: "Follow",
    href: socialLinks.instagram,
    image: "/instagram.png",
    enabled: false,
  },
];

/* ============================================================
   SHARED COMPONENTS
   ============================================================ */

function SafeImage({ src, alt, width, height, className, priority = false }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-sky-900/10 text-sky-900/70 text-[10px] font-semibold uppercase tracking-wider text-center px-1`}
        style={{ width, height }}
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {eyebrow && (
        <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-sky-700 uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
    </div>
  );
}

function NeonButton({ href, children, variant = "primary", external = false, disabled = false }) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-100";
  const variants = {
    primary:
      "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/40 hover:shadow-sky-400/60 hover:-translate-y-0.5 hover:from-sky-400 hover:to-sky-500",
    secondary:
      "bg-white/60 text-sky-900 border border-sky-400/40 backdrop-blur-md hover:bg-white/80 hover:border-sky-500/70 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-400/30",
  };
  if (disabled) {
    return (
      <span className={`${base} ${variants[variant]} opacity-40 cursor-not-allowed pointer-events-none`}>
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </a>
  );
}

/* ============================================================
   HERO — logo now perfectly fits inside the circle
   ============================================================ */

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-16 overflow-hidden"
    >
      {/* Cinematic lighting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-sky-400/30 blur-[120px] animate-pulse-slow" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-300/30 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo — PERFECT CIRCLE FIT */}
        <div
          className={`relative mx-auto mb-8 md:mb-10 transition-all duration-1000 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-sky-500/40 animate-ring-pulse" />
            <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-sky-500/30 animate-ring-pulse-delayed" />
            <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-sky-500/20 animate-ring-pulse-slower" />
          </div>

          <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-sky-400/40 blur-3xl animate-pulse-slow" />

            {/* Perfect-fit circle container */}
           
<div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-blue-400/50 shadow-[0_0_60px_rgba(59,130,246,0.5)] bg-blue-950/50">
  <SafeImage
    src="/logo.png"
    alt="BEAST logo"
    width={400}
    height={400}
    className="object-cover w-full h-full"
    priority
  />
</div>

          </div>
        </div>

        {/* Eyebrow */}
        <p
          className={`text-xs md:text-sm font-semibold tracking-[0.3em] text-sky-700 uppercase mb-4 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          Free Fire Creator • Gaming Community
        </p>

        {/* Main heading */}
        <h1
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-none transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          BEAST
        </h1>

        {/* BEAST 10K badge */}
        <div
          className={`mt-6 inline-flex items-center gap-3 px-6 md:px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-400/20 via-white/40 to-sky-400/20 border border-sky-500/50 backdrop-blur-md shadow-[0_0_40px_rgba(14,165,233,0.35)] transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-slate-900 to-sky-600">
            BEAST 10K
          </span>
          <span className="hidden sm:inline text-xs font-semibold tracking-[0.2em] text-sky-700 uppercase">
            Road to 10K
          </span>
        </div>

        {/* Tagline */}
        <p
          className={`mt-6 text-xl md:text-2xl lg:text-3xl font-semibold text-slate-800 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          Gaming. Attitude. Community.
        </p>

        {/* Description */}
        <p
          className={`mt-5 md:mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Welcome to the official gaming space of BEAST — where Free Fire gameplay, attitude, entertainment and community come together.
        </p>

        {/* CTAs */}
        <div
          className={`mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <NeonButton href="#community" variant="primary">
            Join Community
          </NeonButton>
          <NeonButton href="#videos" variant="secondary">
            Watch Latest Videos
          </NeonButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   BEAST 10K MILESTONE SECTION
   ============================================================ */

function MilestoneCard() {
  const current = creatorStats.currentSubscribers;
  const target = creatorStats.nextMilestone;
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));
  const remaining = Math.max(0, target - current);

  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-sky-400/40 bg-white/50 backdrop-blur-xl shadow-xl shadow-sky-900/5 p-8 md:p-12">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[300px] rounded-full bg-sky-400/25 blur-[100px] animate-pulse-slow" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-sky-500/70 to-transparent" />

          <div className="relative z-10 text-center">
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-sky-700 uppercase mb-3">
              Community Milestone
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-slate-900 to-sky-600 leading-none">
              {creatorStats.milestoneLabel}
            </h2>
            <p className="mt-4 text-lg md:text-xl font-semibold text-slate-700">
              {creator.milestoneLabel}
            </p>

            <div className="mt-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2 text-xs md:text-sm font-semibold text-slate-600">
                <span>{current.toLocaleString()} subscribers</span>
                <span>{target.toLocaleString()} goal</span>
              </div>
              <div className="relative h-4 rounded-full bg-white/70 border border-sky-400/40 overflow-hidden shadow-inner">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-300 shadow-[0_0_20px_rgba(14,165,233,0.6)] transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                <span className="font-bold text-sky-700">{remaining.toLocaleString()}</span> more subscribers to reach the milestone
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SOCIAL / COMMUNITY SECTION  (now higher up)
   ============================================================ */

function SocialCard({ card }) {
  const Wrapper = card.enabled ? "a" : "div";
  const wrapperProps = card.enabled
    ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative block rounded-2xl p-6 md:p-7 transition-all duration-400 ${
        card.enabled
          ? "bg-white/50 backdrop-blur-md border border-sky-400/30 shadow-md shadow-sky-900/5 hover:border-sky-500/70 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.3)] cursor-pointer"
          : "bg-white/30 backdrop-blur-sm border border-sky-200/40 opacity-60 cursor-default"
      }`}
      aria-label={card.enabled ? `Open ${card.name}` : `${card.name} coming soon`}
    >
      {card.enabled && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-400/0 to-sky-400/0 group-hover:from-sky-400/10 group-hover:to-transparent transition-all duration-400 pointer-events-none" />
      )}

      <div className="relative flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-400 ${
            card.enabled
              ? "bg-sky-500/10 ring-1 ring-sky-400/40 group-hover:ring-sky-500/70 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
              : "bg-sky-100/60 ring-1 ring-sky-200/40"
          }`}
        >
          <SafeImage
            src={card.image}
            alt={card.name}
            width={56}
            height={56}
            className="object-contain w-9 h-9"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{card.name}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <span
          className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
            card.enabled ? "text-sky-600 group-hover:text-sky-700" : "text-sky-300"
          }`}
        >
          {card.enabled ? `[ ${card.cta} ]` : "[ Coming Soon ]"}
        </span>
        {card.enabled && (
          <span className="text-sky-600 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        )}
      </div>
    </Wrapper>
  );
}

function CommunitySection() {
  return (
    <section id="community" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Stay Connected"
          title="Join the BEAST Community"
          subtitle="Follow BEAST, watch new uploads and stay connected with the community."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {socialCards.map((card) => (
            <SocialCard key={card.key} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GAMING UID SECTION
   ============================================================ */

function GamingUidSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(creator.gamingUid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = creator.gamingUid;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-sky-400/40 bg-white/50 backdrop-blur-md shadow-lg shadow-sky-900/5 p-6 md:p-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-sky-500/70 to-transparent" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold tracking-[0.25em] text-sky-700 uppercase mb-2">
                Free Fire UID
              </p>
              <p className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 font-mono">
                {creator.gamingUid}
              </p>
            </div>

            <button
              onClick={handleCopy}
              className={`group relative inline-flex items-center gap-2 px-5 md:px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                copied
                  ? "bg-emerald-500/20 text-emerald-700 border border-emerald-400/60"
                  : "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg shadow-sky-500/40 hover:shadow-sky-400/60 hover:-translate-y-0.5"
              }`}
              aria-label="Copy Free Fire UID"
            >
              {copied ? (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  UID Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy UID
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */

function AboutSection() {
  const highlights = ["Free Fire Creator", "Gaming Content", "Shorts", "Community"];

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-sky-400/25 blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-sky-400/30 bg-white/50 backdrop-blur-md shadow-xl shadow-sky-900/5 p-8 md:p-10">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-sky-400/30 bg-white">
                  <SafeImage
                    src="/logo.png"
                    alt="BEAST"
                    width={400}
                    height={400}
                    className="object-contain w-full h-full p-6"
                  />
                </div>
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-sky-500/50 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-sky-500/50 rounded-br-lg" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-sky-700 uppercase mb-3">
              About The Creator
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              About BEAST
            </h2>
            <div className="mt-6 space-y-4 text-slate-600 text-base md:text-lg leading-relaxed">
              <p>
                BEAST is a Free Fire gaming creator focused on gameplay, entertainment, attitude-based content and building a strong gaming community.
              </p>
              <p>
                Every upload is built to keep the squad locked in — from intense gameplay to shorts and community-driven moments.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/50 border border-sky-300/40 backdrop-blur-sm hover:border-sky-500/60 hover:bg-white/70 transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMMUNITY CTA
   ============================================================ */

function CTASection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-sky-400/40 bg-gradient-to-b from-sky-500/15 via-white/40 to-sky-500/10 backdrop-blur-xl shadow-2xl shadow-sky-900/10 px-6 py-16 md:px-16 md:py-24 text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full bg-sky-400/30 blur-[120px] animate-pulse-slow" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-sky-500/70 to-transparent" />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-slate-900 to-sky-600 leading-none">
              BEAST 10K
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              The journey to 10K starts with the community.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <NeonButton href={socialLinks.whatsapp} external variant="primary">
                Join the Community
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LATEST VIDEOS SECTION  (moved to bottom)
   ============================================================ */

function VideoCard({ url, index }) {
  const videoId = getYouTubeId(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group relative rounded-2xl overflow-hidden bg-white/50 border border-sky-400/30 backdrop-blur-md shadow-md shadow-sky-900/5 hover:border-sky-500/70 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(14,165,233,0.35)] transition-all duration-400">
      <div className="relative aspect-video bg-sky-950/90 overflow-hidden">
        {embedUrl && playing ? (
          <iframe
            src={`${embedUrl}?autoplay=1&rel=0`}
            title={`BEAST Short ${index + 1}`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : embedUrl ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-900/80 to-sky-950/95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Play video"
          >
            <div className="w-20 h-20 rounded-full bg-sky-400/20 border-2 border-sky-300/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-400/40 group-hover:border-sky-200 transition-all duration-400 shadow-[0_0_30px_rgba(14,165,233,0.5)]">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-sky-100 ml-1" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="mt-4 text-xs font-semibold tracking-[0.2em] text-sky-200/90 uppercase">
              Tap to Play
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-900/70 to-sky-950/90">
            <span className="text-xs font-semibold tracking-wider text-sky-200/70 uppercase">
              Video Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
          <span className="text-xs font-bold tracking-[0.2em] text-sky-700 uppercase">
            YouTube Short
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 leading-snug">
          BEAST Short #{index + 1}
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold tracking-wide uppercase text-sky-600 hover:text-sky-700 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
        >
          Watch on YouTube
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </a>
      </div>
    </article>
  );
}

function VideosSection() {
  return (
    <section id="videos" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Featured Content"
          title="Latest Videos"
          subtitle="Watch the latest content from BEAST"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoUrls.map((url, i) => (
            <VideoCard key={url} url={url} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */

function ContactSection() {
  const contactCards = [
    {
      name: "YouTube",
      description: "Watch & subscribe",
      href: socialLinks.youtube,
      image: "/youtube.jpg",
      enabled: true,
    },
    {
      name: "WhatsApp",
      description: "Join the channel",
      href: socialLinks.whatsapp,
      image: "/whatsapp.png",
      enabled: true,
    },
    {
      name: "Facebook",
      description: "Follow the page",
      href: socialLinks.facebook,
      image: "/facebook.png",
      enabled: true,
    },
    {
      name: "Instagram",
      description: "Coming soon",
      href: socialLinks.instagram,
      image: "/instagram.png",
      enabled: false,
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Connect With BEAST"
          subtitle="For business inquiries, connect through the available social channels."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-4xl mx-auto">
          {contactCards.map((card) => {
            const Wrapper = card.enabled ? "a" : "div";
            const props = card.enabled
              ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={card.name}
                {...props}
                className={`group flex flex-col items-center text-center p-5 md:p-6 rounded-2xl transition-all duration-400 ${
                  card.enabled
                    ? "bg-white/50 border border-sky-400/30 backdrop-blur-sm hover:border-sky-500/60 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(14,165,233,0.35)] cursor-pointer"
                    : "bg-white/30 border border-sky-200/40 opacity-50 cursor-default"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden mb-3 transition-all duration-400 ${
                    card.enabled
                      ? "bg-sky-500/10 ring-1 ring-sky-400/40 group-hover:ring-sky-500/70 group-hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                      : "bg-sky-100/60 ring-1 ring-sky-200/40"
                  }`}
                >
                  <SafeImage
                    src={card.image}
                    alt={card.name}
                    width={48}
                    height={48}
                    className="object-contain w-7 h-7"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{card.name}</h3>
                <p className="text-xs text-slate-500">{card.description}</p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  const socials = [
    { name: "YouTube", href: socialLinks.youtube, image: "/youtube.jpg", enabled: true },
    { name: "WhatsApp", href: socialLinks.whatsapp, image: "/whatsapp.png", enabled: true },
    { name: "Facebook", href: socialLinks.facebook, image: "/facebook.png", enabled: true },
    { name: "Instagram", href: socialLinks.instagram, image: "/instagram.png", enabled: false },
  ];

  return (
    <footer className="relative border-t border-sky-300/40 bg-white/40 backdrop-blur-md">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-sky-400/50 bg-white">
                <SafeImage
                  src="/logo.png"
                  alt="BEAST Logo"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">BEAST</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gaming. Attitude. Community.
            </p>
            <p className="mt-3 text-xs font-bold tracking-[0.25em] text-sky-700 uppercase">
              BEAST 10K
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {socials.map((social) => {
              const Wrapper = social.enabled ? "a" : "div";
              const props = social.enabled
                ? { href: social.href, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={social.name}
                  {...props}
                  aria-label={social.enabled ? social.name : `${social.name} coming soon`}
                  className={`w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 ${
                    social.enabled
                      ? "bg-white/50 ring-1 ring-sky-400/30 hover:ring-sky-500/70 hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] cursor-pointer"
                      : "bg-white/30 ring-1 ring-sky-200/30 opacity-40 cursor-default"
                  }`}
                >
                  <SafeImage
                    src={social.image}
                    alt={social.name}
                    width={44}
                    height={44}
                    className="object-contain w-5 h-5"
                  />
                </Wrapper>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-sky-200/40 text-center">
          <p className="text-xs text-slate-500">
            © 2026 BEAST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   HOMEPAGE
   ============================================================ */

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-sky-100 text-slate-900 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-white" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-sky-300/40 blur-[140px] animate-drift-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-300/30 blur-[140px] animate-drift-slow-reverse" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50%] h-[40%] rounded-full bg-white/50 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-sky-500/40 animate-float"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                animationDelay: `${(i * 0.4) % 6}s`,
                animationDuration: `${6 + (i % 5)}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* NAVBAR — imported separately, sits on top */}
      <Navbar />

      {/* Content */}
      {/* Section order:
          1. Hero
          2. Milestone (BEAST 10K)
          3. Community (Join the BEAST Community) — moved UP
          4. Gaming UID
          5. About
          6. CTA (BEAST 10K)
          7. Latest Videos — moved DOWN
          8. Contact
      */}
      <div className="relative z-10">
        <main>
          <Hero />
          <MilestoneCard />
          <CommunitySection />
          <GamingUidSection />
          <AboutSection />
          <CTASection />
          <VideosSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <style jsx global>{`
        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
          background-color: #e0f2fe;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ::selection { background: rgba(14, 165, 233, 0.3); color: #0c4a6e; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #e0f2fe; }
        ::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.4); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(14, 165, 233, 0.6); }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }

        @keyframes ring-pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.2; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        .animate-ring-pulse { animation: ring-pulse 4s ease-in-out infinite; }
        .animate-ring-pulse-delayed { animation: ring-pulse 4s ease-in-out infinite 1s; }
        .animate-ring-pulse-slower { animation: ring-pulse 4s ease-in-out infinite 2s; }

        @keyframes drift-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        .animate-drift-slow { animation: drift-slow 20s ease-in-out infinite; }
        .animate-drift-slow-reverse { animation: drift-slow 25s ease-in-out infinite reverse; }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}