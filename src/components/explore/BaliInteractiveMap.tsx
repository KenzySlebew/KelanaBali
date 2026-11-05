"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, ExternalLink, MessageCircle, Bookmark } from "lucide-react";
import { Spot } from "@/data/mockData";

interface BaliInteractiveMapProps {
  spots: Spot[];
  selectedSpot: Spot | null;
  onSelectSpot: (spot: Spot) => void;
  onAskMimin: (spotTitle: string) => void;
  onToggleSave: (spot: Spot) => void;
  isSaved: boolean;
}

export default function BaliInteractiveMap({
  spots,
  selectedSpot,
  onSelectSpot,
  onAskMimin,
  onToggleSave,
  isSaved,
}: BaliInteractiveMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const activeSpot = selectedSpot || spots[0];

  return (
    <div className="bg-brand-surface rounded-3xl p-5 border border-brand-mutedBorder/80 shadow-soft sticky top-24 space-y-4">
      {/* Top Bar Tool */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200/70">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
          <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">
            Peta Geografis Bali
          </span>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200 shadow-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
            className="w-6 h-6 rounded-full flex items-center justify-center text-brand-secondary hover:text-brand-dark hover:bg-gray-100 transition"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono font-bold px-1.5 text-brand-dark">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.15))}
            className="w-6 h-6 rounded-full flex items-center justify-center text-brand-secondary hover:text-brand-dark hover:bg-gray-100 transition"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stylized Interactive Bali Map Canvas */}
      <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#E2F2F5] to-[#D0EBF0] overflow-hidden border border-[#BDDFE6] shadow-inner">
        {/* Subtle Wave Texture */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#19C3C3_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Island Contours SVG */}
        <div
          className="absolute inset-0 transition-transform duration-300 origin-center flex items-center justify-center p-3"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 100 80"
            className="w-full h-full drop-shadow-md select-none"
          >
            {/* Bali Main Island Outline */}
            <path
              d="M 12 40 C 15 32, 28 24, 45 22 C 60 20, 78 26, 88 38 C 92 45, 85 52, 75 55 C 68 58, 62 55, 55 60 C 50 65, 45 74, 38 78 C 32 76, 32 68, 38 64 C 40 58, 35 54, 25 52 C 16 50, 10 44, 12 40 Z"
              fill="#FFFFFF"
              stroke="#B2D8DC"
              strokeWidth="0.8"
              className="transition-colors hover:fill-white/95"
            />

            {/* Mount Agung / Mountain Ridges subtle shading */}
            <circle cx="72" cy="36" r="4" fill="#EBF6F7" />
            <circle cx="56" cy="30" r="3" fill="#EBF6F7" />

            {/* Nusa Penida Island */}
            <path
              d="M 76 65 C 84 62, 90 68, 86 74 C 80 77, 74 72, 76 65 Z"
              fill="#FFFFFF"
              stroke="#B2D8DC"
              strokeWidth="0.8"
            />

            {/* Region Labels */}
            <text x="44" y="47" fontSize="2.8" fill="#71878A" fontWeight="600" textAnchor="middle">
              Ubud
            </text>
            <text x="32" y="74" fontSize="2.5" fill="#71878A" fontWeight="600" textAnchor="middle">
              Uluwatu
            </text>
            <text x="28" y="58" fontSize="2.5" fill="#71878A" fontWeight="600" textAnchor="middle">
              Canggu
            </text>
            <text x="82" y="71" fontSize="2.2" fill="#71878A" fontWeight="600" textAnchor="middle">
              Nusa Penida
            </text>
            <text x="76" y="42" fontSize="2.2" fill="#71878A" fontWeight="600" textAnchor="middle">
              Karangasem
            </text>
          </svg>

          {/* Interactive Spot Pins Overlay */}
          {spots.map((spot, idx) => {
            const isCurrent = activeSpot?.id === spot.id;
            const coords = spot.mapCoords || { x: 50, y: 50 };

            return (
              <button
                key={spot.id}
                onClick={() => onSelectSpot(spot)}
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`,
                  transform: "translate(-50%, -100%)",
                }}
                className={`absolute group z-10 transition-all duration-300 focus:outline-none`}
                title={`${spot.title} (${spot.location})`}
              >
                {/* Pin Container */}
                <div
                  className={`flex items-center gap-1 px-2 py-0.8 rounded-full shadow-md text-[10px] font-bold border transition-all duration-200 ${
                    isCurrent
                      ? "bg-brand-dark text-white border-brand-teal scale-115 ring-2 ring-brand-teal/40"
                      : "bg-white text-brand-dark border-gray-200 hover:scale-105"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCurrent ? "bg-brand-teal animate-ping" : "bg-brand-teal"
                    }`}
                  />
                  <span>#{idx + 1}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Area Filter Overlay Pill */}
        <div className="absolute top-2.5 left-2.5 z-20 flex gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-brand-secondary border border-white/80 shadow-xs">
          <Compass className="w-3 h-3 text-brand-teal" />
          <span>Area Terkurasi Mimin</span>
        </div>
      </div>

      {/* Active Selected Spot Preview Panel */}
      {activeSpot && (
        <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-soft space-y-3 animate-in fade-in duration-200">
          <div className="flex gap-3 items-center">
            <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
              <Image
                src={activeSpot.image}
                alt={activeSpot.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] text-brand-deepTeal font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
                <span>{activeSpot.tag}</span>
                <span>•</span>
                <span className="text-brand-secondary">{activeSpot.distanceFromCanggu}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-brand-dark truncate">
                {activeSpot.title}
              </h4>
              <p className="text-[11px] text-brand-secondary">
                Tiket: <span className="font-semibold text-brand-dark">{activeSpot.entryFee}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                activeSpot.title + " " + activeSpot.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-brand-surface hover:bg-gray-100 text-brand-dark text-[11px] font-semibold flex items-center justify-center gap-1.5 transition border border-gray-200/70"
            >
              <ExternalLink className="w-3 h-3 text-brand-teal" />
              <span>Buka di Maps</span>
            </a>

            <button
              onClick={() => onAskMimin(activeSpot.title)}
              className="py-2 px-3 rounded-xl bg-brand-pillDark hover:bg-black text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <MessageCircle className="w-3 h-3 text-brand-teal" />
              <span>Tanya Mimin</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

