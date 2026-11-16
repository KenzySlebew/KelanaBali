"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { LiquidNavbar, LiquidNavItem, NimbusIcons } from "@/components/ui/liquid-glass-navbar";

interface NavbarProps {
  onOpenMimin: () => void;
}

export default function Navbar({ onOpenMimin }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Set default active based on current route
  useEffect(() => {
    if (pathname === "/explore") {
      setActiveIndex(1);
    } else if (pathname === "/planner") {
      setActiveIndex(2);
    } else if (pathname === "/itinerary") {
      setActiveIndex(3);
    } else if (pathname === "/tanya-mimin") {
      setActiveIndex(4);
    } else if (pathname === "/") {
      setActiveIndex(0);
    }
  }, [pathname]);

  const navItems: LiquidNavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: NimbusIcons.home,
      fx: "glow",
    },
    {
      label: "Explore",
      href: "/explore",
      icon: NimbusIcons.globe,
      fx: "spin",
    },
    {
      label: "Planner",
      href: "/planner",
      icon: NimbusIcons.plane,
      fx: "plane",
    },
    {
      label: "Itinerary",
      href: "/itinerary",
      icon: NimbusIcons.map,
      fx: "drop",
    },
    {
      label: "Tanya Mimin",
      href: "/tanya-mimin",
      icon: NimbusIcons.chat,
      fx: "wave",
    },
  ];

  // Scroll detection to enhance sticky navbar elevation & sync active bubble section on homepage
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      if (pathname !== "/") return;

      const exploreEl = document.getElementById("explore");
      const caraSeruEl = document.getElementById("cara-seru");
      const kontakEl = document.getElementById("kontak");
      const offset = y + 260;

      if (kontakEl && offset >= kontakEl.offsetTop) {
        setActiveIndex(4);
      } else if (caraSeruEl && offset >= caraSeruEl.offsetTop) {
        setActiveIndex(2);
      } else if (exploreEl && offset >= exploreEl.offsetTop) {
        setActiveIndex(1);
      } else {
        setActiveIndex(0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavChange = (index: number, item: LiquidNavItem) => {
    setActiveIndex(index);
    if (!item.href) return;

    if (item.href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else if (item.href === "/explore") {
      router.push("/explore");
    } else if (item.href === "/planner") {
      router.push("/planner");
    } else if (item.href === "/itinerary") {
      router.push("/itinerary");
    } else if (item.href === "/tanya-mimin") {
      router.push("/tanya-mimin");
    } else if (item.href.startsWith("/#")) {
      const targetId = item.href.replace("/#", "");
      if (pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(item.href);
      }
    } else {
      router.push(item.href);
    }
  };

  return (
    <header
      className={`sticky top-2 sm:top-4 z-40 mb-4 pt-1 transition-all duration-300 ${
        isScrolled ? "scale-[0.99] sm:scale-100" : ""
      }`}
      data-purpose="main-header"
    >
      <nav
        aria-label="Navigasi Utama"
        className={`w-full flex items-center justify-between py-2 sm:py-2.5 px-4 sm:px-6 md:px-7 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-2xl border-gray-200/90 shadow-float"
            : "bg-white/80 backdrop-blur-xl border-gray-100/90 shadow-soft"
        }`}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/"
            className="flex items-baseline text-2xl font-bold tracking-tight text-brand-dark hover:opacity-90 transition group"
          >
            <span className="font-script text-3xl sm:text-4xl font-semibold text-brand-teal mr-1 group-hover:scale-105 transition-transform inline-block">
              La
            </span>
            <span className="font-sans font-extrabold tracking-tight">
              KelanaBali
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal ml-1 group-hover:animate-ping"></span>
          </Link>
        </div>

        {/* Center: Liquid Glass Navbar (Tablet & Desktop, always visible without hamburger click) */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-2 lg:mx-4">
          <LiquidNavbar
            items={navItems}
            active={activeIndex}
            onChange={handleNavChange}
            tone="light"
            sound={soundEnabled}
            className="shadow-sm nimbus-tablet-compact"
          />
        </div>

        {/* Right CTA Button & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Sound FX Toggle (Synthesized water plip) */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`hidden md:flex items-center justify-center w-8 h-8 rounded-full border transition ${
              soundEnabled
                ? "bg-teal-50 border-brand-teal/40 text-brand-deepTeal"
                : "bg-gray-50 border-gray-200 text-gray-400 hover:text-brand-dark"
            }`}
            title={soundEnabled ? "Matikan efek suara air" : "Aktifkan efek suara air (plip sound)"}
            aria-label="Toggle liquid sound effect"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Contact Us / Tanya Mimin Button */}
          <Link
            href="/tanya-mimin"
            className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full bg-brand-pillDark text-white text-xs font-semibold tracking-wide hover:bg-black transition-all duration-200 shadow-sm hover:shadow hover:scale-102 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          >
            Tanya Mimin
          </Link>

          {/* Mobile Chat Pill */}
          <Link
            href="/tanya-mimin"
            className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-teal/15 text-brand-deepTeal text-xs font-semibold focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Mimin</span>
          </Link>

          {/* Hamburger Menu Toggle (Mobile only — tablet & desktop already show LiquidNavbar) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            className="md:hidden p-2 rounded-full text-brand-dark hover:bg-gray-100 transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Extra Links Dropdown (Mobile bottom LiquidNavbar handles main bubble nav) */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden mt-2 p-5 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-float animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
          <div className="flex flex-col gap-2 text-sm font-medium text-brand-dark">
            <Link
              href="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition flex items-center justify-between"
            >
              <span>Explore Spots</span>
              <span className="text-xs text-brand-teal font-semibold">50+ Spot Terkurasi</span>
            </Link>
            <Link
              href="/planner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition flex items-center justify-between"
            >
              <span>Trip Planner 3 Langkah</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-50 text-brand-deepTeal border border-brand-teal/20">
                Anti Wacana
              </span>
            </Link>
            <Link
              href="/itinerary"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition flex items-center justify-between"
            >
              <span>Itinerary Builder</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/50">
                Interaktif
              </span>
            </Link>
            <Link
              href="/tanya-mimin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition flex items-center justify-between"
            >
              <span>Tanya Mimin Hub</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-teal-50 text-brand-deepTeal border border-brand-teal/20">
                Local Buddy
              </span>
            </Link>
            <Link
              href="/artikel"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition"
            >
              Artikel &amp; Rekomendasi
            </Link>
            <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMimin();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-brand-pillDark text-white text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-brand-teal" />
                <span>Chat WhatsApp Mimin</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-3 rounded-full border ${
                  soundEnabled
                    ? "bg-teal-50 border-brand-teal text-brand-deepTeal"
                    : "bg-gray-50 border-gray-200 text-gray-500"
                }`}
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
