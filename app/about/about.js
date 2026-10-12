"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";

const BRAND = "BEAST";
const GUILD_NAME = "BT SARKAR";
const GUILD_LEADER = "BEAST";
const MILESTONE = "BEAST 10K";
const GAMING_UID = "519366839";

const whatsappUrl = "https://whatsapp.com/channel/0029VbCe1ihElagq0H0kOW45";
const youtubeUrl = "https://www.youtube.com/@Beastfire28";
const facebookUrl = "https://www.facebook.com/share/1FZ7PaSwin/?mibextid=wwXIfr";

const socials = [
  {
    name: "YouTube",
    description: "Watch the latest content",
    href: youtubeUrl,
    image: "/youtube.png",
    enabled: true,
  },
  {
    name: "WhatsApp",
    description: "Join the community channel",
    href: whatsappUrl,
    image: "/whatsapp.png",
    enabled: true,
  },
  {
    name: "Facebook",
    description: "Follow BEAST",
    href: facebookUrl,
    image: "/facebook.png",
    enabled: true,
  },
  {
    name: "Instagram",
    description: "Coming soon",
    href: "",
    image: "/instagram.png",
    enabled: false,
  },
];

function SafeImage({ src, alt, width, height, className, priority = false }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-blue-950/60 text-blue-300/70 text-[10px] font-semibold uppercase tracking-wider text-center px-1`}
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

function NeonButton({ href, children, variant = "primary", external = false }) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:-translate-y-0.5 hover:from-blue-400 hover:to-blue-500",
    secondary:
      "bg-white/5 text-blue-100 border border-blue-400/30 backdrop-blur-md hover:bg-blue-500/10 hover:border-blue-400/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20",
  };
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

function SectionEyebrow({ children }) {
  return (
    <span className="block text-xs md:text-sm font-semibold tracking-[0.3em] text-blue-400/90 uppercase mb-3">
      {children}
    </span>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse-slow" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-56 h-56 rounded-full bg-white/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`relative mx-auto mb-8 transition-all duration-1000 ease-out ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border border-blue-400/30 animate-ring-pulse" />
            <div className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-blue-400/20 animate-ring-pulse-delayed" />
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
            <div className="absolute inset-0 rounded-full bg-blue-500/40 blur-3xl animate-pulse-slow" />
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-blue-400/50 shadow-[0_0_60px_rgba(59,130,246,0.5)] bg-blue-950/50">
              <SafeImage
                src="/logo.png"
                alt={`${BRAND} logo`}
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          style={{ transitionDelay: "200ms" }}
        >
          <SectionEyebrow>About {BRAND}</SectionEyebrow>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "300ms" }}
        >
          Built by passion.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300">
            Driven by the game.
          </span>
        </h1>

        <p
          className={`mt-6 text-base md:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "450ms" }}
        >
          {BRAND} is a Free Fire gaming creator and community-focused brand
          built around gameplay, entertainment and attitude. This is where the
          game meets the community.
        </p>

        <div
          className={`mt-8 inline-flex items-center gap-3 px-5 md:px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500/15 via-blue-400/10 to-blue-500/15 border border-blue-400/40 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "550ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm md:text-base font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300">
            {MILESTONE}
          </span>
        </div>

        <div
          className={`mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          style={{ transitionDelay: "700ms" }}
        >
          <NeonButton href={whatsappUrl} external variant="primary">
            Join Community
          </NeonButton>
          <NeonButton href={youtubeUrl} external variant="secondary">
            Watch Videos
          </NeonButton>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-500/20 bg-gradient-to-b from-blue-900/40 to-blue-950/60 backdrop-blur-md p-8 md:p-10">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-blue-400/20 bg-blue-950/50">
                  <SafeImage
                    src="/logo.png"
                    alt="BEAST Official Logo"
                    width={400}
                    height={400}
                    className="block w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400/40 rounded-tl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400/40 rounded-br-lg" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-blue-950/90 border border-blue-400/40 backdrop-blur-md shadow-lg shadow-blue-500/20">
                <span className="text-xs font-black tracking-[0.2em] text-blue-300 uppercase">
                  {MILESTONE}
                </span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionEyebrow>The Journey</SectionEyebrow>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              The {BRAND} Story
            </h2>
            <div className="mt-6 h-px w-20 bg-gradient-to-r from-blue-400 to-transparent" />

            <div className="mt-6 space-y-4 text-blue-100/70 text-base md:text-lg leading-relaxed">
              <p>
                {BRAND} started with a simple passion — the love for gaming.
                Free Fire became the arena where that passion turned into
                content, and content turned into a community.
              </p>
              <p>
                Every video is created to entertain, to bring energy, and to
                keep the game alive beyond the match. From fast-paced gameplay
                moments to shorts that hit differently — it&apos;s all about the
                vibe.
              </p>
              <p>
                But {BRAND} is bigger than the videos. It&apos;s about the
                people watching, playing, and growing together. The community is
                what keeps the journey moving forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MindsetSection() {
  const pillars = [
    {
      key: "gaming",
      title: "Gaming",
      description: "Passion for gaming and competitive energy.",
    },
    {
      key: "attitude",
      title: "Attitude",
      description:
        "Confidence, personality and a unique creator identity.",
    },
    {
      key: "community",
      title: "Community",
      description:
        "The audience and community are an important part of BEAST.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <SectionEyebrow>What Drives Us</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The {BRAND} Mindset
          </h2>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.key}
              className="group relative rounded-2xl p-7 md:p-8 bg-gradient-to-b from-blue-900/40 to-blue-950/60 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.35)] transition-all duration-400"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/10 group-hover:to-transparent transition-all duration-400 pointer-events-none" />
              <div className="relative">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400/80 to-blue-400/10 leading-none">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-2xl font-extrabold text-white tracking-tight">
                  {pillar.title}
                </h3>
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-blue-400 to-transparent group-hover:w-20 transition-all duration-400" />
                <p className="mt-4 text-sm md:text-base text-blue-100/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreatesSection() {
  const categories = [
    {
      title: "Free Fire Shorts",
      description: "Fast-paced short-form content built for the scroll.",
    },
    {
      title: "Gaming Content",
      description:
        "Gameplay moments, highlights and in-game energy.",
    },
    {
      title: "Entertainment",
      description:
        "Content designed to entertain, not just to play.",
    },
    {
      title: "Community Content",
      description: "Moments created with and for the community.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <SectionEyebrow>Content</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What {BRAND} Creates
          </h2>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group relative rounded-2xl p-6 bg-blue-900/30 border border-blue-500/20 backdrop-blur-sm hover:border-blue-400/50 hover:bg-blue-900/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center mb-4 group-hover:border-blue-400/70 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-300">
                <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-blue-400 to-cyan-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-white mb-2">
                {cat.title}
              </h3>
              <p className="text-sm text-blue-100/60 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <SectionEyebrow>Community</SectionEyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            More than content. It&apos;s a community.
          </h2>
          <p className="mt-5 text-blue-100/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {BRAND} is building a place where gaming, entertainment and
            community come together. Follow along and be part of the journey.
          </p>
          <div className="mt-8">
            <NeonButton href={whatsappUrl} external variant="primary">
              Join Community
            </NeonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-4">
          {socials.map((card) => {
            const Wrapper = card.enabled ? "a" : "div";
            const props = card.enabled
              ? {
                href: card.href,
                target: "_blank",
                rel: "noopener noreferrer",
              }
              : {};
            return (
              <Wrapper
                key={card.name}
                {...props}
                className={`group relative block rounded-2xl p-6 md:p-7 transition-all duration-400 ${card.enabled
                    ? "bg-gradient-to-b from-blue-900/40 to-blue-950/60 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/60 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.35)] cursor-pointer"
                    : "bg-blue-950/40 backdrop-blur-sm border border-white/5 opacity-60 cursor-default"
                  }`}
                aria-label={
                  card.enabled
                    ? `Open ${card.name}`
                    : `${card.name} coming soon`
                }
              >
                <div className="relative flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-400 ${card.enabled
                        ? "bg-blue-500/10 ring-1 ring-blue-400/30 group-hover:ring-blue-400/60 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                        : "bg-blue-900/40 ring-1 ring-white/5"
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
                    <h3 className="text-lg font-bold text-white mb-1">
                      {card.name}
                    </h3>
                    <p className="text-sm text-blue-100/60 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="relative mt-5">
                  <span
                    className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${card.enabled
                        ? "text-blue-400 group-hover:text-blue-300"
                        : "text-blue-300/30"
                      }`}
                  >
                    {card.enabled ? "[ Open ]" : "[ Coming Soon ]"}
                  </span>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GamingIdentitySection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GAMING_UID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = GAMING_UID;
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-blue-500/25 bg-gradient-to-b from-blue-900/40 to-blue-950/60 backdrop-blur-md p-5 md:p-6">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-blue-400/90 uppercase mb-1">
                Guild of {GUILD_NAME}
              </p>
              <p className="text-lg md:text-xl font-black tracking-tight text-white">
                LEADER — <span className="text-blue-300">{GUILD_LEADER}</span>
              </p>
              <p className="mt-1 text-xs md:text-sm font-mono font-semibold text-blue-300/80">
                UID {GAMING_UID}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${copied
                  ? "bg-green-500/20 text-green-300 border border-green-400/50"
                  : "bg-white/5 text-blue-100 border border-blue-400/30 backdrop-blur-md hover:bg-blue-500/15 hover:border-blue-400/60 hover:-translate-y-0.5"
                }`}
              aria-label="Copy gaming UID"
            >
              {copied ? (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    />
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

function MilestoneBanner() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-blue-400/30 bg-gradient-to-b from-blue-900/60 via-blue-950/80 to-blue-950/60 backdrop-blur-xl px-6 py-14 md:px-16 md:py-20 text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse-slow" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
          <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-blue-400/40 rounded-tl-xl" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-blue-400/40 rounded-br-xl" />

          <div className="relative z-10">
            <p className="text-xs md:text-sm font-semibold tracking-[0.35em] text-blue-400/90 uppercase mb-4">
              The Movement
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300">
              {MILESTONE}
            </h2>
            <p className="mt-6 text-base md:text-lg text-blue-100/70 max-w-xl mx-auto leading-relaxed">
              A community-driven milestone identity for {BRAND}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-blue-400/30 bg-gradient-to-b from-blue-900/50 via-blue-950/70 to-blue-950/50 backdrop-blur-xl px-6 py-16 md:px-14 md:py-20 text-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full bg-blue-500/25 blur-[110px] animate-pulse-slow" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Ready to join the {BRAND} side?
            </h2>
            <p className="mt-5 text-base md:text-lg text-blue-100/70 max-w-2xl mx-auto leading-relaxed">
              Follow the journey. Watch the content. Be part of the community.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <NeonButton href={whatsappUrl} external variant="primary">
                Join Community
              </NeonButton>
              <NeonButton href={youtubeUrl} external variant="secondary">
                Watch Videos
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const nav = [
    { label: "Home", href: "/" },
    { label: "Videos", href: "/videos" },
    { label: "Community", href: "/community" },
    { label: "Guild", href: "/guild" },
    { label: "Guild Members", href: "/guild/members" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const footerSocials = [
    { name: "YouTube", href: youtubeUrl, image: "/youtube.png", enabled: true },
    { name: "WhatsApp", href: whatsappUrl, image: "/whatsapp.png", enabled: true },
    { name: "Facebook", href: facebookUrl, image: "/facebook.png", enabled: true },
    { name: "Instagram", href: "", image: "/instagram.png", enabled: false },
  ];

  return (
    <footer className="relative border-t border-blue-500/20 bg-blue-950/60 backdrop-blur-md">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 group w-fit"
              aria-label={`${BRAND} — Home`}
            >

              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-sky-400/60 bg-white transition-all duration-300 group-hover:ring-sky-500 group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(14,165,233,0.5)] flex-shrink-0">
                <SafeImage
                  src="/logo.png"
                  alt="BEAST Official Logo"
                  width={160}
                  height={160}
                  className="block w-full h-full object-cover"
                  priority
                />
              </div>

              <span className="text-lg font-black tracking-tight text-white">
                {BRAND}
              </span>
            </Link>
            <p className="text-sm text-blue-100/50 leading-relaxed max-w-xs">
              Gaming. Attitude. Community.
            </p>
            <p className="mt-3 text-[11px] font-bold tracking-[0.25em] text-blue-400/70 uppercase">
              Guild of {GUILD_NAME}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.25em] text-blue-400/90 uppercase mb-4">
              Navigation
            </h4>
            <nav
              className="grid grid-cols-2 gap-2"
              aria-label="Footer navigation"
            >
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-blue-100/60 hover:text-blue-300 transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.25em] text-blue-400/90 uppercase mb-4">
              Social
            </h4>
            <div className="flex flex-wrap gap-3">
              {footerSocials.map((social) => {
                const Wrapper = social.enabled ? "a" : "div";
                const props = social.enabled
                  ? {
                    href: social.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                  : {};
                return (
                  <Wrapper
                    key={social.name}
                    {...props}
                    aria-label={
                      social.enabled
                        ? social.name
                        : `${social.name} coming soon`
                    }
                    className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 ${social.enabled
                        ? "bg-blue-900/40 ring-1 ring-blue-500/20 hover:ring-blue-400/60 hover:bg-blue-500/10 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] cursor-pointer"
                        : "bg-blue-950/40 ring-1 ring-white/5 opacity-40 cursor-default"
                      }`}
                  >
                    <SafeImage
                      src={social.image}
                      alt={social.name}
                      width={40}
                      height={40}
                      className="object-contain w-5 h-5"
                    />
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-100/40">
            © 2026 {BRAND}. All rights reserved.
          </p>
          <p className="text-xs font-bold tracking-[0.25em] text-blue-400/60 uppercase">
            {MILESTONE}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#030814] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030814] via-[#061024] to-[#030814]" />
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[140px] animate-drift-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/10 blur-[140px] animate-drift-slow-reverse" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50%] h-[40%] rounded-full bg-white/[0.03] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="absolute inset-0">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/30 animate-float"
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

      <Navbar />

      <div className="relative z-10">
        <main>
          <Hero />
          <StorySection />
          <MindsetSection />
          <CreatesSection />
          <CommunitySection />
          <GamingIdentitySection />
          <MilestoneBanner />
          <FinalCTA />
        </main>
        <Footer />
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
          background-color: #030814;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #030814;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        @keyframes ring-pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.2;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.6;
          }
        }
        .animate-ring-pulse {
          animation: ring-pulse 4s ease-in-out infinite;
        }
        .animate-ring-pulse-delayed {
          animation: ring-pulse 4s ease-in-out infinite 1s;
        }

        @keyframes drift-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }
        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }
        .animate-drift-slow-reverse {
          animation: drift-slow 25s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
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