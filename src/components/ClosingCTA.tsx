"use client";

import React from "react";
import { MessageCircle, Sparkles } from "lucide-react";

interface ClosingCTAProps {
  onOpenMimin: () => void;
}

export default function ClosingCTA({ onOpenMimin }: ClosingCTAProps) {
  return (
    <section
      className="pt-16 pb-16 sm:pt-20 sm:pb-20 text-center border-t border-gray-100"
      data-purpose="closing-cta"
      id="kontak"
    >
      <div className="max-w-xl mx-auto px-4 space-y-4">
        {/* Eyebrow */}
        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand-secondary">
          NIKMATI RASA, BANGUN ASA
        </p>

        {/* Serif Display Headline */}
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-dark tracking-tight leading-snug">
          Ingin Tahu Lebih Banyak?
        </h2>

        {/* Subtext */}
        <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed max-w-md mx-auto">
          Diskusi itinerary gratis bareng local buddy kami. Tanya rekomendasi
          cafe tersembunyi sampai sewa motor aman tanpa drama.
        </p>

        {/* Dark Pill CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenMimin}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-pillDark text-white text-xs font-semibold tracking-wide hover:bg-black transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-brand-teal" />
            <span>Chat WhatsApp Mimin</span>
          </button>
        </div>

        {/* Microcopy */}
        <p className="text-[11px] text-gray-400 pt-3">
          © 2025 KelanaBali. All rights reserved.
        </p>
      </div>
    </section>
  );
}

