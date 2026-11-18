"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Navigation, Info } from "lucide-react";
import { ItinerarySlot } from "@/data/tripStore";

interface ItineraryRouteMapProps {
  slots: ItinerarySlot[];
  dayTitle?: string;
  activeSlotId?: string;
  onSelectSlot?: (slotId: string) => void;
}

export default function ItineraryRouteMap({
  slots,
  dayTitle,
  activeSlotId,
  onSelectSlot,
}: ItineraryRouteMapProps) {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  // Geographic pin percentage coordinates
  const pinCoordinates = [
    { x: 34, y: 76, name: "Titik 1" },
    { x: 26, y: 52, name: "Titik 2" },
    { x: 50, y: 44, name: "Titik 3" },
    { x: 68, y: 30, name: "Titik 4" },
    { x: 74, y: 60, name: "Titik 5" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-soft">
      {/* Map Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-brand-surface/60">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-brand-teal" />
          <h4 className="text-xs sm:text-sm font-bold text-brand-dark font-sans">
            Peta Rute Harian: {dayTitle || "Uluwatu Coastline"}
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-xl bg-teal-50 text-brand-deepTeal font-bold border border-brand-teal/20">
          {slots.length} Titik Singgah
        </span>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden select-none">
        {/* Background Coastline Image */}
        <Image
          src="/images/image_50.jpg"
          alt="Peta garis pantai Uluwatu Bukit Bali"
          fill
          className="object-cover opacity-85 brightness-[0.88]"
        />

        {/* SVG Route Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Dashed line connecting Pin 1 -> Pin 2 -> Pin 3 -> Pin 4 */}
          <path
            d="M 34 76 Q 30 64 26 52 T 18 64 Q 38 46 58 28"
            fill="none"
            stroke="#19C3C3"
            strokeWidth="1.8"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Interactive Numbered Pins */}
        {slots.map((slot, idx) => {
          const coord = pinCoordinates[idx] || { x: 40 + idx * 10, y: 40 + idx * 10, name: slot.title };
          const isSelected = activeSlotId === slot.id || hoveredPin === idx;

          return (
            <button
              key={slot.id}
              type="button"
              style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded-full"
              onClick={() => onSelectSlot && onSelectSlot(slot.id)}
              onMouseEnter={() => setHoveredPin(idx)}
              onMouseLeave={() => setHoveredPin(null)}
              aria-label={`Fokus ke titik ${idx + 1}: ${slot.title}`}
            >
              {/* Pulsing Aura on selected */}
              {isSelected && (
                <span className="absolute -inset-1.5 rounded-full bg-brand-teal/40 animate-ping" />
              )}

              {/* Pin Pill Marker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-xs font-extrabold shadow-md transition-all duration-200 border ${
                  isSelected
                    ? "bg-brand-teal text-brand-dark border-white scale-110 shadow-lg"
                    : "bg-brand-pillDark text-white border-white/40 hover:scale-105"
                }`}
              >
                {idx + 1}
              </div>

              {/* Tooltip Label */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-xl bg-black/90 text-white text-[10px] font-semibold whitespace-nowrap shadow-float transition-all pointer-events-none ${
                  isSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
              >
                {slot.title}
              </div>
            </button>
          );
        })}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-teal" />
            <span>Urutan rute: 1 → 2 → 3 → 4</span>
          </span>
          <span className="font-mono text-brand-teal font-bold">Total 28.4 km</span>
        </div>
      </div>
    </div>
  );
}

