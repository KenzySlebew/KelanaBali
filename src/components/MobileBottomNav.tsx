"use client";

import React, { useState, useEffect } from "react";
import { Home, Compass, MessageCircle, Bookmark } from "lucide-react";

interface MobileBottomNavProps {
  onOpenMimin: () => void;
  onOpenWishlist: () => void;
  savedCount: number;
}

export default function MobileBottomNav({
  onOpenMimin,
  onOpenWishlist,
  savedCount,
}: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "mimin" | "wishlist">("home");

  // Scroll detection to highlight active tab
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const exploreEl = document.getElementById("explore");
      const caraSeruEl = document.getElementById("cara-seru");

      if (caraSeruEl && scrollY >= caraSeruEl.offsetTop - 300) {
        setActiveTab("explore");
      } else if (exploreEl && scrollY >= exploreEl.offsetTop - 300) {
        setActiveTab("explore");
      } else {
        setActiveTab("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft synthesized plip sound matching LiquidNavbar
  const playPlip = () => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      const ctx = new AC();
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(450, t);
      o.frequency.exponentialRampToValueAtTime(1400, t + 0.06);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.14);
    } catch {}
  };

  const handleTabClick = (
    tab: "home" | "explore" | "mimin" | "wishlist",
    action?: () => void
  ) => {
    setActiveTab(tab);
    playPlip();
    if (action) action();
  };

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-sm mx-auto z-40 pointer-events-auto">
      {/* Floating Liquid Glass Dock Pill */}
      <nav
        aria-label="Mobile Bottom App Bar"
        className="w-full flex items-center justify-between p-1.5 bg-white/85 backdrop-blur-2xl rounded-full border border-white/80 shadow-float"
      >
        {/* Home */}
        <button
          type="button"
          onClick={() =>
            handleTabClick("home", () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            })
          }
          className={`flex-1 py-2 px-1 flex flex-col items-center gap-0.5 rounded-full transition-all duration-300 relative ${
            activeTab === "home"
              ? "bg-brand-surface text-brand-dark font-bold shadow-sm scale-102"
              : "text-brand-secondary hover:text-brand-dark"
          }`}
        >
          <Home
            className={`w-4 h-4 transition-transform duration-300 ${
              activeTab === "home"
                ? "text-brand-teal scale-110 stroke-[2.4]"
                : "stroke-[1.8]"
            }`}
          />
          <span className="text-[10px] tracking-tight">Home</span>
          {activeTab === "home" && (
            <span className="w-1 h-1 rounded-full bg-brand-teal mt-0.5" />
          )}
        </button>

        {/* Explore */}
        <button
          type="button"
          onClick={() =>
            handleTabClick("explore", () => {
              const el = document.getElementById("explore");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            })
          }
          className={`flex-1 py-2 px-1 flex flex-col items-center gap-0.5 rounded-full transition-all duration-300 relative ${
            activeTab === "explore"
              ? "bg-brand-surface text-brand-dark font-bold shadow-sm scale-102"
              : "text-brand-secondary hover:text-brand-dark"
          }`}
        >
          <Compass
            className={`w-4 h-4 transition-transform duration-300 ${
              activeTab === "explore"
                ? "text-brand-teal scale-110 stroke-[2.4]"
                : "stroke-[1.8]"
            }`}
          />
          <span className="text-[10px] tracking-tight">Explore</span>
          {activeTab === "explore" && (
            <span className="w-1 h-1 rounded-full bg-brand-teal mt-0.5" />
          )}
        </button>

        {/* Tanya Mimin */}
        <button
          type="button"
          onClick={() => handleTabClick("mimin", onOpenMimin)}
          className={`flex-1 py-2 px-1 flex flex-col items-center gap-0.5 rounded-full transition-all duration-300 relative ${
            activeTab === "mimin"
              ? "bg-brand-surface text-brand-dark font-bold shadow-sm scale-102"
              : "text-brand-secondary hover:text-brand-dark"
          }`}
        >
          <div className="relative">
            <MessageCircle
              className={`w-4 h-4 transition-transform duration-300 ${
                activeTab === "mimin"
                  ? "text-brand-teal scale-110 stroke-[2.4]"
                  : "stroke-[1.8]"
              }`}
            />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-teal animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-teal" />
          </div>
          <span className="text-[10px] tracking-tight">Mimin</span>
          {activeTab === "mimin" && (
            <span className="w-1 h-1 rounded-full bg-brand-teal mt-0.5" />
          )}
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => handleTabClick("wishlist", onOpenWishlist)}
          className={`flex-1 py-2 px-1 flex flex-col items-center gap-0.5 rounded-full transition-all duration-300 relative ${
            activeTab === "wishlist"
              ? "bg-brand-surface text-brand-dark font-bold shadow-sm scale-102"
              : "text-brand-secondary hover:text-brand-dark"
          }`}
        >
          <div className="relative">
            <Bookmark
              className={`w-4 h-4 transition-transform duration-300 ${
                activeTab === "wishlist"
                  ? "text-brand-teal scale-110 fill-brand-teal"
                  : savedCount > 0
                  ? "text-brand-teal fill-brand-teal/20"
                  : "stroke-[1.8]"
              }`}
            />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-brand-teal text-white rounded-full text-[9px] font-extrabold shadow-sm">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Wishlist</span>
          {activeTab === "wishlist" && (
            <span className="w-1 h-1 rounded-full bg-brand-teal mt-0.5" />
          )}
        </button>
      </nav>
    </div>
  );
}
