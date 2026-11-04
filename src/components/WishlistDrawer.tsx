"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, MessageCircle, MapPin, DollarSign, Clock, ArrowRight, Bookmark } from "lucide-react";
import { Spot, SPOTS_DATA, BEACH_SPOTS, CULTURE_SPOTS } from "@/data/mockData";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedSpotIds: string[];
  onRemoveSpot: (spotId: string) => void;
  onSelectSpot: (spot: Spot) => void;
  onSendWishlistToMimin: (spotNames: string[]) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  savedSpotIds,
  onRemoveSpot,
  onSelectSpot,
  onSendWishlistToMimin,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  // Aggregate all spots
  const allSpots = [...SPOTS_DATA, ...BEACH_SPOTS, ...CULTURE_SPOTS];
  const uniqueSavedSpots = Array.from(
    new Map(
      allSpots
        .filter((s) => savedSpotIds.includes(s.id))
        .map((s) => [s.id, s])
    ).values()
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-float relative border border-gray-100 animate-in slide-in-from-bottom duration-300">
        {/* Drawer Header */}
        <div className="p-5 pb-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-brand-deepTeal">
              <Bookmark className="w-4 h-4 fill-brand-teal text-brand-teal" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-brand-dark">
                Wishlist Liburan Kamu
              </h3>
              <p className="text-[11px] text-brand-secondary">
                {uniqueSavedSpots.length} spot pilihan tersimpan
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
            aria-label="Tutup Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Spot List Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-3">
          {uniqueSavedSpots.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <Bookmark className="w-6 h-6 stroke-[1.5]" />
              </div>
              <p className="text-sm font-semibold text-brand-dark">
                Belum ada spot yang disimpan
              </p>
              <p className="text-xs text-brand-secondary max-w-xs mx-auto">
                Jelajahi bagian Explore dan klik ikon bookmark pada spot favoritmu untuk mulai menyusun trip!
              </p>
              <button
                onClick={() => {
                  onClose();
                  const el = document.getElementById("explore");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 px-5 py-2 rounded-full bg-brand-teal text-brand-dark text-xs font-bold"
              >
                Mulai Explore Spot
              </button>
            </div>
          ) : (
            uniqueSavedSpots.map((spot) => (
              <div
                key={spot.id}
                onClick={() => {
                  onClose();
                  onSelectSpot(spot);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-brand-surface/70 hover:bg-brand-surface border border-brand-mutedBorder/50 transition cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
                  <Image
                    src={spot.image}
                    alt={spot.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-brand-deepTeal border border-brand-teal/20">
                      {spot.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-brand-dark">
                      {spot.entryFee}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-brand-dark truncate group-hover:text-brand-deepTeal transition">
                    {spot.title}
                  </h4>

                  <div className="flex items-center gap-2 text-[10px] text-brand-secondary">
                    <span className="flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-brand-teal" />
                      {spot.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3 text-brand-teal" />
                      {spot.bestTime.split("-")[0]}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSpot(spot.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white transition"
                  title="Hapus dari wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer CTA */}
        {uniqueSavedSpots.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white rounded-b-3xl space-y-2">
            <button
              onClick={() => {
                onClose();
                onSendWishlistToMimin(uniqueSavedSpots.map((s) => s.title));
              }}
              className="w-full py-3.5 px-4 rounded-full bg-brand-pillDark hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4 text-brand-teal" />
              <span>Validasi {uniqueSavedSpots.length} Spot ke WhatsApp Mimin</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

