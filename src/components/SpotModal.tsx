"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, MapPin, Clock, DollarSign, Bookmark, MessageCircle, Star, Compass, AlertCircle } from "lucide-react";
import { Spot } from "@/data/mockData";

interface SpotModalProps {
  spot: Spot | null;
  onClose: () => void;
  onSaveSpot: (spot: Spot) => void;
  isSaved: boolean;
  onAskMimin: (spotName: string) => void;
}

export default function SpotModal({
  spot,
  onClose,
  onSaveSpot,
  isSaved,
  onAskMimin,
}: SpotModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (spot) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spot, onClose]);

  if (!spot) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spot-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto no-scrollbar shadow-float relative border border-gray-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
          aria-label="Tutup detail spot"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Photo */}
        <div className="relative h-64 sm:h-72 w-full bg-gray-100">
          <Image
            src={spot.image}
            alt={spot.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges on Hero */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-teal text-brand-dark text-xs font-bold shadow">
              {spot.tag}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20">
              {spot.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-2xl font-mono font-bold text-brand-teal block">
              Spot {spot.index}
            </span>
            <h3 id="spot-modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {spot.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-teal" />
              <span>{spot.location} • Wilayah {spot.region}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-brand-surface border border-brand-mutedBorder/60 text-center">
            <div className="space-y-0.5">
              <div className="text-[11px] text-brand-secondary font-medium flex items-center justify-center gap-1">
                <DollarSign className="w-3 h-3 text-brand-teal" />
                <span>Tiket Masuk</span>
              </div>
              <div className="text-xs font-bold text-brand-dark">{spot.entryFee}</div>
            </div>

            <div className="space-y-0.5 border-x border-gray-200/60">
              <div className="text-[11px] text-brand-secondary font-medium flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-brand-teal" />
                <span>Jam Terbaik</span>
              </div>
              <div className="text-xs font-bold text-brand-dark">{spot.bestTime}</div>
            </div>

            <div className="space-y-0.5">
              <div className="text-[11px] text-brand-secondary font-medium flex items-center justify-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Rating</span>
              </div>
              <div className="text-xs font-bold text-brand-dark">{spot.rating} ({spot.reviewCount})</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Tentang Spot Ini
            </h4>
            <p className="text-sm text-brand-dark/90 leading-relaxed">
              {spot.description}
            </p>
          </div>

          {/* Vibe Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Vibe Cocok Untuk
            </h4>
            <div className="flex flex-wrap gap-2">
              {spot.vibe.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-surface text-brand-deepTeal text-xs font-semibold border border-brand-teal/20"
                >
                  <Compass className="w-3 h-3 text-brand-teal" />
                  <span>{v}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Local Buddy Secret Tips */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-brand-teal/30 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-deepTeal">
              <AlertCircle className="w-4 h-4 text-brand-teal" />
              <span>Tips Rahasia Mimin Local Buddy:</span>
            </div>
            <p className="text-xs text-brand-dark/85 leading-relaxed pl-5">
              &ldquo;{spot.tips}&rdquo;
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => onSaveSpot(spot)}
              className={`flex-1 py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                isSaved
                  ? "bg-brand-surface text-brand-deepTeal border border-brand-teal/40 hover:bg-gray-100"
                  : "bg-brand-pillDark text-white hover:bg-black"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-brand-deepTeal" : ""}`} />
              <span>{isSaved ? "Tersimpan di Wishlist" : "Simpan ke Wishlist"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onAskMimin(spot.title);
              }}
              className="py-3 px-5 rounded-full bg-brand-teal text-brand-dark hover:bg-brand-teal/90 text-xs font-bold flex items-center justify-center gap-2 transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Mimin Rute Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
