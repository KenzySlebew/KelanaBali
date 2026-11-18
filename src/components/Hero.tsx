"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onGalleryClick: () => void;
}

export default function Hero({
  onExploreClick,
  onGalleryClick,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative rounded-3xl overflow-hidden min-h-[540px] sm:min-h-[580px] lg:h-[640px] flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 text-white shadow-soft"
      data-purpose="hero-banner"
    >
      {/* Background Video with Fallback Image and Multi-layer Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-black">
        {/* Poster Fallback Image */}
        <Image
          src="/images/hero_desktop.jpg"
          alt="Aerial view of Bali tropical turquoise coast, lush greenery and majestic cliffs"
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover object-center scale-105"
        />

        {/* Full-Bleed Native Video (Muted, AutoPlay, Loop, PlaysInline - No Pause Button / OSD Overlay) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/videos/hero_bg_web.mp4" type="video/mp4" />
        </video>

        {/* Layer 1: Left-to-right gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        {/* Layer 2: Bottom-to-top gradient for action buttons & contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
      </div>

      {/* Top Eyebrow Tag */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
          <span>Bali trip: no cap, just vibes.</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-3xl space-y-6 sm:space-y-8 mt-12 sm:mt-16 pb-4 sm:pb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.12] text-white">
          Bali&apos;s Calling: <br className="hidden sm:inline" />
          <span className="text-white/95">Let&apos;s Vibe And Explore Together</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed max-w-2xl">
          Bingung mau healing ke mana? Scroll aja website mimin, rekomendasi spot hidden gem &amp; rute curated, dijamin langsung nemu destinasi idamanmu.
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
    </section>
  );
}
