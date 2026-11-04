"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

interface FomoBannerProps {
  onGasExplore: () => void;
}

export default function FomoBanner({ onGasExplore }: FomoBannerProps) {
  return (
    <section className="my-14 sm:my-16 lg:my-20" data-purpose="fomo-banner">
      <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] lg:h-[460px] flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 text-white shadow-soft">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner_kelingking.jpg"
            alt="Crashing turquoise waves at Kelingking Beach Nusa Penida"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Editorial gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />
        </div>

        {/* Top & Center Headline Content */}
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide">
            <span>🔥 FOMO ALERT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] leading-tight font-extrabold tracking-tight text-white">
            Bali makin bikin <br />
            <span className="text-brand-teal">FOMO gak sih?</span>
          </h2>

          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-lg">
            Sunset, pantai, dan chill vibes udah nungguin. Jangan scroll doang
            brok, gas explore bareng teman-teman sekarang!
          </p>
        </div>

        {/* Bottom Tag & Quick Action */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-brand-teal" />
            <span>Kelingking Beach, Nusa Penida, Indonesia</span>
          </div>

          <button
            onClick={onGasExplore}
            className="group flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-brand-teal text-brand-dark hover:bg-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-md"
          >
            <span>Gas Explore!</span>
            <span className="w-7 h-7 rounded-full bg-brand-dark text-white flex items-center justify-center group-hover:bg-brand-teal group-hover:text-brand-dark transition-colors">
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

