"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BRAND = "BEAST";

const navLinks = [
  { label: "Home", href: "/", id: "home", type: "route" },
  { label: "Videos", href: "/#videos", id: "videos", type: "hash" },
  { label: "Community", href: "/#community", id: "community", type: "hash" },
  { label: "About", href: "/about", id: "about", type: "route" },
  { label: "Contact", href: "/#contact", id: "contact", type: "hash" },
];

const whatsappUrl = "https://whatsapp.com/channel/0029VbCe1ihElagq0H0kOW45";

function SafeImage({ src, alt, width, height, className, priority = false }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-sky-200/60 text-sky-800/70 text-[9px] font-bold uppercase tracking-widest`}
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;
    const sectionIds = ["home", "videos", "community", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (isAboutPage) setActiveSection("about");
  }, [isAboutPage, pathname]);

  const handleHashClick = (e, href) => {
    setDrawerOpen(false);

    if (!isHomePage) return;

    e.preventDefault();
    const id = href.split("#")[1];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const isLinkActive = (link) => {
    if (link.type === "route") {
      if (link.href === "/" && isHomePage && activeSection === "home") return true;
      if (link.href === "/about" && isAboutPage) return true;
      return false;
    }
    return isHomePage && activeSection === link.id;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-sky-300/40 shadow-[0_4px_30px_-10px_rgba(14,165,233,0.35)]"
            : "bg-white/40 backdrop-blur-md border-b border-sky-200/30"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/60 border border-sky-300/50 hover:bg-white/90 hover:border-sky-500/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 flex-shrink-0"
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <div className="flex flex-col items-center justify-center gap-[4px]">
                  <span className="block w-[18px] h-[2px] bg-slate-800 rounded-full" />
                  <span className="block w-[18px] h-[2px] bg-slate-800 rounded-full" />
                  <span className="block w-[18px] h-[2px] bg-slate-800 rounded-full" />
                </div>
              </button>

              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className="group flex items-center gap-2 md:gap-3 rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-w-0"
                aria-label={`${BRAND} — Home`}
              >
                <div className="relative w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden ring-2 ring-sky-400/60 bg-white transition-all duration-300 group-hover:ring-sky-500 group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(14,165,233,0.5)] flex-shrink-0">
                  <SafeImage
                    src="/logo.png"
                    alt={`${BRAND} logo`}
                    width={44}
                    height={44}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <span className="text-base sm:text-lg md:text-xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-sky-700 truncate">
                  {BRAND}
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const active = isLinkActive(link);

                if (link.type === "route") {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3 lg:px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        active ? "text-sky-700" : "text-slate-600 hover:text-slate-900"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                      <span
                        className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 ${
                          active ? "w-6 opacity-100 shadow-[0_0_10px_rgba(14,165,233,0.7)]" : "w-0 opacity-0"
                        }`}
                      />
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleHashClick(e, link.href)}
                    className={`relative px-3 lg:px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                      active ? "text-sky-700" : "text-slate-600 hover:text-slate-900"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-300 ${
                        active ? "w-6 opacity-100 shadow-[0_0_10px_rgba(14,165,233,0.7)]" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex-shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg shadow-sky-500/40 hover:shadow-sky-400/60 hover:from-sky-400 hover:to-sky-500 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <span className="relative w-4 h-4 flex-shrink-0">
                  <SafeImage
                    src="/whatsapp.png"
                    alt=""
                    width={16}
                    height={16}
                    className="object-contain w-full h-full"
                  />
                </span>
                <span className="hidden sm:inline">Join Community</span>
                <span className="sm:hidden">Join</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />

        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute top-0 left-0 h-full w-[82%] max-w-[340px] bg-gradient-to-b from-white via-sky-50 to-sky-100 border-r border-sky-300/50 shadow-[10px_0_60px_-15px_rgba(14,165,233,0.5)] transition-transform duration-400 ease-out flex flex-col ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative px-5 pt-5 pb-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/70 bg-white flex-shrink-0">
                  <SafeImage
                    src="/logo.png"
                    alt={`${BRAND} logo`}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xl font-black tracking-tight">{BRAND}</span>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close navigation menu"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <p className="text-xs font-semibold tracking-[0.25em] text-white/80 uppercase">
              Gaming. Attitude. Community.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.25em] text-sky-700 uppercase">
              Navigation
            </p>

            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const active = isLinkActive(link);

                if (link.type === "route") {
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                          active
                            ? "text-sky-800 bg-white border border-sky-400/60 shadow-md shadow-sky-500/10"
                            : "text-slate-700 hover:text-sky-800 hover:bg-white/70 border border-transparent"
                        }`}
                        style={{ transitionDelay: drawerOpen ? `${i * 30}ms` : "0ms" }}
                        aria-current={active ? "page" : undefined}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${
                              active ? "bg-sky-500 w-4" : "bg-slate-400/60"
                            }`}
                          />
                          <span>{link.label}</span>
                        </div>
                        <span
                          className={`text-sky-500 transition-transform duration-300 ${
                            active
                              ? "translate-x-0 opacity-100"
                              : "translate-x-2 opacity-40 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleHashClick(e, link.href)}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        active
                          ? "text-sky-800 bg-white border border-sky-400/60 shadow-md shadow-sky-500/10"
                          : "text-slate-700 hover:text-sky-800 hover:bg-white/70 border border-transparent"
                      }`}
                      style={{ transitionDelay: drawerOpen ? `${i * 30}ms` : "0ms" }}
                      aria-current={active ? "page" : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${
                            active ? "bg-sky-500 w-4" : "bg-slate-400/60"
                          }`}
                        />
                        <span>{link.label}</span>
                      </div>
                      <span
                        className={`text-sky-500 transition-transform duration-300 ${
                          active
                            ? "translate-x-0 opacity-100"
                            : "translate-x-2 opacity-40 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="my-5 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

            <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.25em] text-sky-700 uppercase">
              Highlights
            </p>
            <div className="grid grid-cols-2 gap-2 px-1">
              <div className="rounded-xl bg-white/70 border border-sky-300/50 p-3 text-center">
                <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">Milestone</p>
                <p className="mt-1 text-sm font-black text-slate-900">BEAST 10K</p>
              </div>
              <div className="rounded-xl bg-white/70 border border-sky-300/50 p-3 text-center">
                <p className="text-[10px] font-bold tracking-widest text-sky-700 uppercase">Free Fire UID</p>
                <p className="mt-1 text-sm font-black text-slate-900 font-mono">519366839</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-sky-300/50 bg-white/60 backdrop-blur-sm">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-base shadow-lg shadow-sky-500/40 active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <span className="relative w-5 h-5 flex-shrink-0">
                <SafeImage
                  src="/whatsapp.png"
                  alt=""
                  width={20}
                  height={20}
                  className="object-contain w-full h-full"
                />
              </span>
              Join Community
            </a>
            <p className="mt-3 text-center text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
              © 2026 {BRAND}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}