"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { VIBE_CHIPS } from "@/data/mockData";

interface HeroProps {
  selectedVibe: string | null;
  onSelectVibe: (vibeId: string) => void;
  onExploreClick: () => void;
  onGalleryClick: () => void;
}

export default function Hero({
  selectedVibe,
  onSelectVibe,
  onExploreClick,
  onGalleryClick,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative rounded-3xl overflow-hidden min-h-[580px] sm:min-h-[620px] lg:h-[680px] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 text-white shadow-soft"
      data-purpose="hero-banner"
    >
      {/* Background Image with Multi-layer Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_desktop.jpg"
          alt="Aerial view of Bali tropical turquoise coast, lush greenery and majestic cliffs"
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Layer 1: Left-to-right gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        {/* Layer 2: Bottom-to-top gradient for chip contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Top Eyebrow Tag */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          <span>Bali trip: no cap, just vibes.</span>
        </div>
      </div>

      {/* Center & Bottom Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-12 sm:mt-16">
        {/* Left Headline & CTAs */}
        <div className="lg:col-span-8 max-w-2xl space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.15] text-white">
            Bali&apos;s Calling: <br className="hidden sm:inline" />
            <span className="text-white/95">Let&apos;s Vibe And Explore Together</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed max-w-xl">
            Bingung mau healing ke mana? Scroll ajaa website mimin, tempat puas, dijamin tau deh mau kemana abis ini.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {/* Primary Dark Pill Button with Teal Arrow Circle */}
            <button
              type="button"
              onClick={onExploreClick}
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-brand-pillDark text-white text-xs sm:text-sm font-semibold hover:bg-black transition-all duration-300 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            >
              <span>Jelajahi Sekarang</span>
              <span className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-brand-dark group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </button>

            {/* Secondary Ghost Button */}
            <button
              type="button"
              onClick={onGalleryClick}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            >
              Galeri
            </button>
          </div>
        </div>

        {/* Right 2x2 Semi-Transparent Vibe Chips */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70 lg:text-right hidden lg:block">
            Pilih Vibe Favoritmu:
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {VIBE_CHIPS.map((chip) => {
              const isActive = selectedVibe === chip.id;
              return (
                <button
                  type="button"
                  key={chip.id}
                  onClick={() => onSelectVibe(chip.id)}
                  className={`flex items-center gap-2 p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-300 backdrop-blur-md border focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                    isActive
                      ? "bg-brand-teal text-brand-dark border-brand-teal font-bold shadow-lg scale-102"
                      : "bg-white/15 hover:bg-white/25 text-white border-white/15 font-medium"
                  }`}
                >
                  <span className="text-base sm:text-lg">{chip.emoji}</span>
                  <span className="text-xs sm:text-sm tracking-tight">{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
