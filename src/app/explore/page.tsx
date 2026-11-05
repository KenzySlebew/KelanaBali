"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import SpotModal from "@/components/SpotModal";
import MiminModal from "@/components/MiminModal";
import WishlistDrawer from "@/components/WishlistDrawer";
import BaliInteractiveMap from "@/components/explore/BaliInteractiveMap";
import SpotGridCard from "@/components/explore/SpotGridCard";
import { ALL_SPOTS, Spot } from "@/data/mockData";
import { Search, SlidersHorizontal, RotateCcw, ArrowRight, Sparkles, Compass } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedRegion, setSelectedRegion] = useState<string>("Semua");
  const [selectedDuration, setSelectedDuration] = useState<string>("Semua");
  const [selectedBudget, setSelectedBudget] = useState<string>("Semua");
  const [selectedCrowd, setSelectedCrowd] = useState<string>("Semua");

  const [selectedSpotForMap, setSelectedSpotForMap] = useState<Spot | null>(null);
  const [spotDetailModal, setSpotDetailModal] = useState<Spot | null>(null);
  const [isMiminOpen, setIsMiminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [miminSpotContext, setMiminSpotContext] = useState("");
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>([
    "nyang-nyang",
    "tegalalang",
  ]);

  // Filtering Logic
  const filteredSpots = useMemo(() => {
    return ALL_SPOTS.filter((spot) => {
      // Search
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchTitle = spot.title.toLowerCase().includes(q);
        const matchLoc = spot.location.toLowerCase().includes(q);
        const matchTag = spot.tag.toLowerCase().includes(q);
        const matchDesc = spot.description.toLowerCase().includes(q);
        if (!matchTitle && !matchLoc && !matchTag && !matchDesc) return false;
      }

      // Category / Vibe
      if (selectedCategory !== "Semua") {
        if (selectedCategory === "Beach Vibes" && spot.category !== "Beach Vibes") return false;
        if (selectedCategory === "Nature Escape" && spot.category !== "Nature Escape") return false;
        if (selectedCategory === "Culture & Heritage" && spot.category !== "Culture & Heritage") return false;
      }

      // Region
      if (selectedRegion !== "Semua" && spot.region !== selectedRegion) {
        return false;
      }

      // Duration
      if (selectedDuration !== "Semua" && spot.duration !== selectedDuration) {
        return false;
      }

      // Budget
      if (selectedBudget !== "Semua" && spot.budgetCategory !== selectedBudget) {
        return false;
      }

      // Crowd
      if (selectedCrowd !== "Semua" && spot.crowdLevel !== selectedCrowd) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedRegion,
    selectedDuration,
    selectedBudget,
    selectedCrowd,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
    setSelectedRegion("Semua");
    setSelectedDuration("Semua");
    setSelectedBudget("Semua");
    setSelectedCrowd("Semua");
  };

  const handleToggleSave = (spot: Spot) => {
    setSavedSpotIds((prev) =>
      prev.includes(spot.id)
        ? prev.filter((id) => id !== spot.id)
        : [...prev, spot.id]
    );
  };

  const handleOpenMiminWithSpot = (spotTitle: string) => {
    setMiminSpotContext(spotTitle);
    setIsMiminOpen(true);
  };

  const handleSendWishlistToMimin = (spotNames: string[]) => {
    setMiminSpotContext(`Wishlist (${spotNames.length} Spot: ${spotNames.join(", ")})`);
    setIsMiminOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-16">
        {/* Sticky Top Navbar */}
        <Navbar onOpenMimin={() => setIsMiminOpen(true)} />

        {/* Top Header & Search Hero */}
        <section className="pt-6 sm:pt-8 pb-8 border-b border-gray-100" data-purpose="explore-header">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block">
              DISCOVER THE ISLAND
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark">
              Explore Bali Spots
            </h1>
            <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
              Temukan spot aesthetic, hidden gem, dan pantai eksotis terkurasi langsung sama Mimin.
              Gak perlu bingung lagi milih tempat healing!
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-brand-secondary absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pantai, cafe, pura, waterfall, atau lokasi..."
                className="w-full pl-11 pr-4 py-3.5 rounded-full border border-gray-200 bg-brand-surface/60 focus:bg-white text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-teal transition shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-brand-dark"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => {}}
              className="px-8 py-3.5 rounded-full bg-brand-pillDark text-white text-xs sm:text-sm font-bold hover:bg-black transition shadow-sm hover:shadow"
            >
              Cari Spot
            </button>
          </div>

          {/* Filter Pills Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {/* Region Select */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3.5 py-2 rounded-full border border-gray-200 bg-white text-brand-dark font-medium focus:border-brand-teal focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="Semua">Semua Wilayah</option>
              <option value="Bukit & Uluwatu">Uluwatu & Bukit</option>
              <option value="Ubud">Ubud</option>
              <option value="Nusa Penida">Nusa Penida</option>
              <option value="Karangasem">Karangasem</option>
              <option value="Bedugul">Bedugul</option>
            </select>

            {/* Duration Select */}
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-3.5 py-2 rounded-full border border-gray-200 bg-white text-brand-dark font-medium focus:border-brand-teal focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="Semua">Semua Durasi</option>
              <option value="< 2 Jam">&lt; 2 Jam (Singkat)</option>
              <option value="Setengah Hari">Setengah Hari</option>
              <option value="Seharian">Seharian Penuh</option>
            </select>

            {/* Budget Select */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="px-3.5 py-2 rounded-full border border-gray-200 bg-white text-brand-dark font-medium focus:border-brand-teal focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="Semua">Semua Budget</option>
              <option value="Free">Gratis (Free Entry)</option>
              <option value="< 50rb">&lt; Rp 50.000</option>
              <option value="50k-150k">Rp 50k - Rp 150k</option>
            </select>

            {/* Crowd Level */}
            <select
              value={selectedCrowd}
              onChange={(e) => setSelectedCrowd(e.target.value)}
              className="px-3.5 py-2 rounded-full border border-gray-200 bg-white text-brand-dark font-medium focus:border-brand-teal focus:outline-none shadow-xs cursor-pointer"
            >
              <option value="Semua">Tingkat Keramaian</option>
              <option value="Sepi Chill">Sepi Chill 🟢</option>
              <option value="Sedang">Sedang 🔵</option>
              <option value="Ramai Hits">Ramai Hits 🟠</option>
            </select>

            {/* Reset Button */}
            {(selectedRegion !== "Semua" ||
              selectedDuration !== "Semua" ||
              selectedBudget !== "Semua" ||
              selectedCrowd !== "Semua" ||
              searchQuery !== "") && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-dark font-semibold text-xs transition"
              >
                <RotateCcw className="w-3 h-3 text-brand-teal" />
                <span>Reset Filter</span>
              </button>
            )}
          </div>
        </section>

        {/* Category Vibe Tabs Bar */}
        <section className="py-6 flex items-center gap-6 sm:gap-8 border-b border-gray-100 overflow-x-auto no-scrollbar">
          {["Semua", "Beach Vibes", "Nature Escape", "Culture & Heritage"].map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-sm sm:text-base font-semibold pb-2.5 relative whitespace-nowrap transition-colors ${
                  isActive
                    ? "text-brand-dark after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-brand-teal"
                    : "text-brand-secondary hover:text-brand-dark"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </section>

        {/* Main Content Layout: 65% Grid / 35% Sticky Map Panel */}
        <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Listing Column (65% width / 8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status & Results Counter */}
            <div className="flex items-center justify-between pb-2">
              <p className="text-xs sm:text-sm font-semibold text-brand-dark">
                Menampilkan{" "}
                <span className="text-brand-deepTeal font-extrabold">
                  {filteredSpots.length} spot
                </span>{" "}
                {selectedCategory !== "Semua" && `di ${selectedCategory}`}
                {selectedRegion !== "Semua" && ` • ${selectedRegion}`}
              </p>

              <span className="text-xs text-brand-secondary hidden sm:inline">
                Klik kartu untuk tandai pin di peta
              </span>
            </div>

            {/* Spots Grid */}
            {filteredSpots.length === 0 ? (
              <div className="py-16 text-center bg-brand-surface rounded-3xl border border-gray-200/60 p-8 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-brand-teal">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">
                  Tidak ada spot yang cocok dengan filter
                </h3>
                <p className="text-xs sm:text-sm text-brand-secondary max-w-sm mx-auto">
                  Coba ubah kata kunci pencarian atau reset filter untuk melihat spot rekomendasi lainnya.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-full bg-brand-teal text-brand-dark text-xs font-bold"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filteredSpots.map((spot, idx) => (
                  <SpotGridCard
                    key={spot.id}
                    spot={spot}
                    index={idx}
                    isSelected={selectedSpotForMap?.id === spot.id}
                    isSaved={savedSpotIds.includes(spot.id)}
                    onSelect={(s) => setSelectedSpotForMap(s)}
                    onToggleSave={handleToggleSave}
                    onQuickView={(s) => setSpotDetailModal(s)}
                  />
                ))}
              </div>
            )}

            {/* Quick Banner Prompt to Planner Wizard */}
            <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-dark to-[#162B2B] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft">
              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-teal block">
                  ANTI WACANA CLUB
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Sudah nemu spot yang kamu suka?
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-md">
                  Gas susun jadi itinerary harian otomatis tanpa bentrok wilayah di Trip Planner 3 Langkah!
                </p>
              </div>

              <Link
                href="/planner"
                className="group flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-teal hover:bg-white text-brand-dark font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                <span>Buka Trip Planner</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Interactive Map Panel (35% width / 4 cols) */}
          <div className="lg:col-span-4 hidden lg:block">
            <BaliInteractiveMap
              spots={filteredSpots}
              selectedSpot={selectedSpotForMap}
              onSelectSpot={(s) => setSelectedSpotForMap(s)}
              onAskMimin={handleOpenMiminWithSpot}
              onToggleSave={handleToggleSave}
              isSaved={selectedSpotForMap ? savedSpotIds.includes(selectedSpotForMap.id) : false}
            />
          </div>
        </section>

        {/* Minimalist Footer */}
        <Footer />
      </div>

      {/* Floating Liquid Mobile Bottom Dock */}
      <MobileBottomNav
        onOpenMimin={() => setIsMiminOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        savedCount={savedSpotIds.length}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedSpotIds={savedSpotIds}
        onRemoveSpot={(id) => setSavedSpotIds((prev) => prev.filter((sId) => sId !== id))}
        onSelectSpot={(spot) => setSpotDetailModal(spot)}
        onSendWishlistToMimin={handleSendWishlistToMimin}
      />

      {/* Spot Detail Modal */}
      <SpotModal
        spot={spotDetailModal}
        onClose={() => setSpotDetailModal(null)}
        onSaveSpot={handleToggleSave}
        isSaved={spotDetailModal ? savedSpotIds.includes(spotDetailModal.id) : false}
        onAskMimin={handleOpenMiminWithSpot}
      />

      {/* Mimin Consultation Modal */}
      <MiminModal
        isOpen={isMiminOpen}
        onClose={() => {
          setIsMiminOpen(false);
          setMiminSpotContext("");
        }}
        defaultSpot={miminSpotContext}
      />
    </div>
  );
}

