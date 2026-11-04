"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ExploreCarousel from "@/components/ExploreCarousel";
import HowItWorks from "@/components/HowItWorks";
import FomoBanner from "@/components/FomoBanner";
import ArticlesSection from "@/components/ArticlesSection";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import SpotModal from "@/components/SpotModal";
import MiminModal from "@/components/MiminModal";
import WishlistDrawer from "@/components/WishlistDrawer";
import { Spot } from "@/data/mockData";

export default function HomePage() {
  const [selectedVibe, setSelectedVibe] = useState<string | null>("aesthetic");
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [isMiminOpen, setIsMiminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [miminSpotContext, setMiminSpotContext] = useState("");
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>([
    "monkey-forest",
    "tegalalang",
  ]);

  const handleSelectVibe = (vibeId: string) => {
    setSelectedVibe(vibeId);
    const exploreSection = document.getElementById("explore");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleSaveSpot = (spot: Spot) => {
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

  const handleExploreScroll = () => {
    const el = document.getElementById("explore");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleGalleryScroll = () => {
    const el = document.getElementById("cara-seru");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Main Page Container (Desktop Optimized for 1440px max) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-16">
        {/* Sticky Top Navigation Bar */}
        <Navbar onOpenMimin={() => setIsMiminOpen(true)} />

        {/* Hero Section */}
        <Hero
          selectedVibe={selectedVibe}
          onSelectVibe={handleSelectVibe}
          onExploreClick={handleExploreScroll}
          onGalleryClick={handleGalleryScroll}
        />

        {/* Quick Stats Row */}
        <Stats />

        {/* Vibe Selection & Carousel Section */}
        <ExploreCarousel
          onSelectSpot={(spot) => setSelectedSpot(spot)}
          onSaveSpot={handleToggleSaveSpot}
          savedSpotIds={savedSpotIds}
        />

        {/* 'Cara Seru Explore Bali Bareng Mimin' (Two Column Section) */}
        <HowItWorks onOpenMimin={() => setIsMiminOpen(true)} />

        {/* FOMO Wave Banner */}
        <FomoBanner onGasExplore={handleExploreScroll} />

        {/* Artikel Baru / Magazine Section */}
        <ArticlesSection />

        {/* Closing CTA Section */}
        <ClosingCTA onOpenMimin={() => setIsMiminOpen(true)} />

        {/* Minimalist Footer */}
        <Footer />
      </div>

      {/* Floating Liquid Glass Mobile Bottom Dock */}
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
        onRemoveSpot={(id) =>
          setSavedSpotIds((prev) => prev.filter((sId) => sId !== id))
        }
        onSelectSpot={(spot) => setSelectedSpot(spot)}
        onSendWishlistToMimin={handleSendWishlistToMimin}
      />

      {/* Spot Detail Modal */}
      <SpotModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        onSaveSpot={handleToggleSaveSpot}
        isSaved={selectedSpot ? savedSpotIds.includes(selectedSpot.id) : false}
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
