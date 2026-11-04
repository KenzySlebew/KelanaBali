"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, Volume2, VolumeX } from "lucide-react";
import { LiquidNavbar, LiquidNavItem, NimbusIcons } from "@/components/ui/liquid-glass-navbar";

interface NavbarProps {
  onOpenMimin: () => void;
}

export default function Navbar({ onOpenMimin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems: LiquidNavItem[] = [
    {
      label: "Home",
      href: "#",
      icon: NimbusIcons.home,
      fx: "glow",
    },
    {
      label: "Explore",
      href: "#explore",
      icon: NimbusIcons.globe,
      fx: "spin",
    },
    {
      label: "Cara Seru",
      href: "#cara-seru",
      icon: NimbusIcons.plane,
      fx: "plane",
    },
    {
      label: "Artikel",
      href: "#artikel",
      icon: NimbusIcons.drop,
      fx: "drop",
    },
    {
      label: "Galeri",
      href: "#cara-seru",
      icon: NimbusIcons.user,
      fx: "wave",
    },
  ];

  // Scroll detection to enhance sticky navbar elevation & blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Automatic section spy to keep Liquid Navbar droplet in sync with scroll position
      const sections = [
        { id: "hero", index: 0 },
        { id: "explore", index: 1 },
        { id: "cara-seru", index: 2 },
        { id: "artikel", index: 3 },
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.id === "hero") {
          if (window.scrollY < 300) {
            setActiveIndex(0);
            break;
          }
        } else {
          const el = document.getElementById(sec.id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveIndex(sec.index);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavChange = (index: number, item: LiquidNavItem) => {
    setActiveIndex(index);
    if (item.href) {
      if (item.href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetId = item.href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`sticky top-2 sm:top-4 z-40 mb-3 pt-1 transition-all duration-300 ${
        isScrolled ? "scale-[0.99] sm:scale-100" : ""
      }`}
      data-purpose="main-header"
    >
      <nav
        aria-label="Navigasi Utama"
        className={`w-full flex items-center justify-between py-2 sm:py-2.5 px-4 sm:px-6 md:px-7 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-2xl border-gray-200/90 shadow-float"
            : "bg-white/75 backdrop-blur-xl border-gray-100/80 shadow-soft"
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

        {/* Center: Liquid Glass Navbar (Desktop & Tablet) */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
          <LiquidNavbar
            items={navItems}
            active={activeIndex}
            onChange={handleNavChange}
            tone="light"
            sound={soundEnabled}
            className="shadow-sm"
          />
        </div>

        {/* Right CTA Button & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Sound FX Toggle (Synthesized water plip) */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-full border transition ${
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
          <button
            onClick={onOpenMimin}
            className="hidden sm:inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-full bg-brand-pillDark text-white text-xs font-semibold tracking-wide hover:bg-black transition-all duration-200 shadow-sm hover:shadow hover:scale-102"
          >
            Contact Us
          </button>

          {/* Mobile Chat Pill */}
          <button
            onClick={onOpenMimin}
            className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-teal/15 text-brand-deepTeal text-xs font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Mimin</span>
          </button>

          {/* Hamburger Menu Toggle (Mobile & Tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-brand-dark hover:bg-gray-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown with Compact Liquid Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-float animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
          <div className="flex justify-center pb-2 border-b border-gray-100">
            <LiquidNavbar
              items={navItems}
              active={activeIndex}
              onChange={(i, item) => {
                handleNavChange(i, item);
                setMobileMenuOpen(false);
              }}
              tone="light"
              sound={soundEnabled}
              compact={false}
            />
          </div>

          <div className="flex flex-col gap-2 text-sm font-medium text-brand-dark">
            <Link
              href="#explore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition flex items-center justify-between"
            >
              <span>Explore Spots</span>
              <span className="text-xs text-brand-teal">50+ Spot</span>
            </Link>
            <Link
              href="#cara-seru"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition"
            >
              Cara Seru Explore Bali
            </Link>
            <Link
              href="#artikel"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition"
            >
              Artikel & Rekomendasi
            </Link>
            <Link
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-brand-surface transition"
            >
              Hubungi Kami
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
