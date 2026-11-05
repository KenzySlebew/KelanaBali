"use client";

import React from "react";
import Image from "next/image";
import { Bookmark, MapPin, Eye, Clock, DollarSign, Sparkles } from "lucide-react";
import { Spot } from "@/data/mockData";

interface SpotGridCardProps {
  spot: Spot;
  index: number;
  isSelected: boolean;
  isSaved: boolean;
  onSelect: (spot: Spot) => void;
  onToggleSave: (spot: Spot) => void;
  onQuickView: (spot: Spot) => void;
}

export default function SpotGridCard({
  spot,
  index,
  isSelected,
  isSaved,
  onSelect,
  onToggleSave,
  onQuickView,
}: SpotGridCardProps) {
  // Crowd dot color
  const getCrowdDot = (crowd: string) => {
    switch (crowd) {
      case "Sepi Chill":
      case "Sepi Pagi":
        return "bg-emerald-400";
      case "Sedang":
        return "bg-brand-teal";
      case "Ramai Hits":
        return "bg-amber-400";
      default:
        return "bg-emerald-400";
    }
  };

  return (
    <div
      onClick={() => onSelect(spot)}
      className={`group relative rounded-2xl overflow-hidden aspect-[3/4.2] flex flex-col justify-between p-4 text-white shadow-soft hover:shadow-float transition-all duration-300 cursor-pointer border ${
        isSelected
          ? "border-brand-teal ring-2 ring-brand-teal/40 scale-[1.01]"
          : "border-transparent hover:border-gray-200"
      }`}
    >
      {/* Background Photography with Scrim */}
      <div className="absolute inset-0 z-0 bg-gray-100">
        <Image
          src={spot.image}
          alt={spot.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Multi-layer scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 group-hover:from-black/90 transition-colors" />
      </div>

      {/* Top Meta Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Index Badge */}
          <span className="px-2.5 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/10">
            #{String(index + 1).padStart(2, "0")}
          </span>

          {/* Region Tag */}
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white border border-white/20">
            {spot.region}
          </span>
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(spot);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition ${
            isSaved
              ? "bg-brand-teal text-brand-dark shadow-md scale-105"
              : "bg-black/35 hover:bg-black/55 text-white"
          }`}
          title={isSaved ? "Hapus dari Wishlist" : "Simpan ke Wishlist"}
          aria-label="Simpan spot"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-brand-dark" : ""}`} />
        </button>
      </div>

      {/* Bottom Content & Details */}
      <div className="relative z-10 space-y-2.5">
        {/* Crowd Indicator & Tag */}
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${getCrowdDot(spot.crowdLevel)}`} />
            <span>{spot.crowdLevel}</span>
          </span>

          <span className="text-white/70">•</span>
          <span className="text-brand-teal">{spot.tag}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug group-hover:text-brand-teal transition">
          {spot.title}
        </h3>

        {/* Info Strip (Ticket + Distance) */}
        <div className="flex items-center justify-between pt-1 text-xs text-white/80 border-t border-white/15">
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-brand-teal" />
            <span className="font-semibold text-white">{spot.entryFee}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-white/70">
            <MapPin className="w-3 h-3 text-brand-teal" />
            <span>{spot.location.split(",")[0]}</span>
          </div>
        </div>

        {/* Quick View Button on Hover */}
        <div className="pt-1 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(spot);
            }}
            className="w-full py-2 px-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-white/20"
          >
            <Eye className="w-3.5 h-3.5 text-brand-teal" />
            <span>Detail & Tips Mimin</span>
          </button>
        </div>
      </div>
    </div>
  );
}

