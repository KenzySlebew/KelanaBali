"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Bookmark, MapPin, ArrowRight } from "lucide-react";
import { Spot, SPOTS_DATA, BEACH_SPOTS, CULTURE_SPOTS } from "@/data/mockData";

interface ExploreCarouselProps {
  onSelectSpot: (spot: Spot) => void;
  onSaveSpot: (spot: Spot) => void;
  savedSpotIds: string[];
}

type TabType = "Nature Escape" | "Beach Vibes" | "Culture & Heritage";

export default function ExploreCarousel({
  onSelectSpot,
  onSaveSpot,
  savedSpotIds,
}: ExploreCarouselProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Nature Escape");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getSpots = (): Spot[] => {
    switch (activeTab) {
      case "Beach Vibes":
        return BEACH_SPOTS;
      case "Culture & Heritage":
        return CULTURE_SPOTS;
      default:
        return SPOTS_DATA;
    }
  };

  const currentSpots = getSpots();

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      scrollContainerRef.current?.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentIndex < currentSpots.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      scrollContainerRef.current?.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      className="py-14 sm:py-16 lg:py-20"
      data-purpose="curated-explore-carousel"
      id="explore"
    >
      {/* Editorial Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10 sm:mb-12">
        <div className="lg:col-span-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block mb-2">
            PILIH PETUALANGANMU SENDIRI
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-dark">
            Eksplorasi Sesuai Vibe Kamu
          </h3>
        </div>
        <div className="lg:col-span-8">
          <p className="text-xl sm:text-2xl lg:text-[30px] leading-snug font-semibold text-gray-700">
            Mau Chill By The Beach, Vibe Sama Nature, Atau Explore Local Culture Bali?{" "}
            <span className="text-brand-secondary">
              Don&rsquo;t Worry, Mimin Got You Covered.
            </span>
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-100 pb-3 mb-8 sm:mb-10 overflow-x-auto no-scrollbar">
        {(["Nature Escape", "Beach Vibes", "Culture & Heritage"] as TabType[]).map(
          (tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                type="button"
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentIndex(0);
                }}
                className={`text-sm sm:text-base font-semibold pb-3 relative whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded-lg ${
                  isActive
                    ? "text-brand-dark after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-teal"
                    : "text-brand-secondary hover:text-brand-dark"
                }`}
              >
                {tab}
              </button>
            );
          }
        )}
      </div>

      {/* Section Sub-header & Carousel Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
              Yuk, Explore Sekarang!
            </h2>
            <Link
              href="/explore"
              className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-brand-deepTeal hover:text-brand-teal transition px-3 py-1 rounded-full bg-teal-50 border border-brand-teal/20"
            >
              <span>Semua Spot di Peta</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-brand-secondary mt-1">
            Klik kartu untuk lihat tiket, jam terbaik & tips rahasia mimin
          </p>
        </div>

        {/* Carousel Paging & Buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-semibold text-brand-secondary">
            {currentIndex + 1} / {currentSpots.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                currentIndex === 0
                  ? "opacity-35 cursor-not-allowed"
                  : "hover:bg-gray-100 hover:border-gray-300 text-brand-dark"
              }`}
              aria-label="Spot sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === currentSpots.length - 1}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                currentIndex === currentSpots.length - 1
                  ? "opacity-35 cursor-not-allowed"
                  : "hover:bg-gray-100 hover:border-gray-300 text-brand-dark"
              }`}
              aria-label="Spot selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Row: Staggered Desktop & Touch-Swipeable Mobile */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 scroll-smooth snap-x snap-mandatory"
      >
        {currentSpots.map((spot, idx) => {
          const isSaved = savedSpotIds.includes(spot.id);
          // Desktop staggered offset: even cards sit slightly lower
          const isStaggered = idx % 2 === 1;

          return (
            <div
              key={spot.id}
              tabIndex={0}
              role="button"
              onClick={() => onSelectSpot(spot)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSpot(spot);
                }
              }}
              aria-label={`Lihat detail spot ${spot.title} di ${spot.location}`}
              className={`group relative flex-shrink-0 w-[270px] sm:w-[300px] md:w-[320px] rounded-2xl overflow-hidden aspect-[3/4.2] shadow-sm hover:shadow-float transition-all duration-500 cursor-pointer snap-start bg-gray-100 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                isStaggered ? "lg:translate-y-5" : ""
              }`}
            >
              {/* Card Photo */}
              <Image
                src={spot.image}
                alt={spot.title}
                fill
                sizes="(max-width: 640px) 270px, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-colors" />

              {/* Top Floating Badge & Save Button */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide">
                  {spot.tag}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveSpot(spot);
                  }}
                  className={`p-2 rounded-full backdrop-blur-md transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                    isSaved
                      ? "bg-brand-teal text-white shadow-md scale-105"
                      : "bg-black/30 hover:bg-black/50 text-white"
                  }`}
                  aria-label={isSaved ? `Hapus ${spot.title} dari wishlist` : `Simpan ${spot.title} ke wishlist`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved ? "fill-white" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-end justify-between">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight text-white/90 font-mono mb-1">
                    {spot.index}
                  </div>
                  <h4 className="text-lg font-bold tracking-tight text-white leading-snug group-hover:text-brand-teal transition-colors">
                    {spot.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-white/75 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{spot.location}</span>
                  </div>
                </div>

                {/* Quick View Pill */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-8 h-8 rounded-full bg-white text-brand-dark flex items-center justify-center shadow-md">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
