"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MiminModal from "@/components/MiminModal";
import WishlistDrawer from "@/components/WishlistDrawer";
import SpotModal from "@/components/SpotModal";
import { useTripStore } from "@/data/tripStore";
import {
  PLANNER_VIBE_CARDS,
  GROUP_TYPES,
  ALL_SPOTS,
  Spot,
} from "@/data/mockData";
import {
  Check,
  CheckCircle2,
  Calendar as CalendarIcon,
  Users,
  DollarSign,
  Sun,
  Umbrella,
  Compass,
  ArrowRight,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function PlannerPage() {
  const router = useRouter();
  const { trip, syncFromPlanner, isLoaded } = useTripStore();

  // Wizard State
  const [activeStep, setActiveStep] = useState<number>(1);

  // Step 1 State: Vibes, Group, Personel, Budget
  const [selectedVibeIds, setSelectedVibeIds] = useState<string[]>([
    "beach-sunset",
    "nature-jungle",
    "cafe-social",
  ]);
  const [groupType, setGroupType] = useState<string>("group");
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [budgetTier, setBudgetTier] = useState<number>(2); // 1: Backpacker, 2: Mid-Range Comfort, 3: Luxury

  // Step 2 State: Dates & Duration
  const [durationDays, setDurationDays] = useState<number>(5);
  const [selectedStartDate, setSelectedStartDate] = useState<number>(14);

  // Restore saved planner preferences if available
  useEffect(() => {
    if (isLoaded && trip.source === "planner") {
      if (trip.durationDays) setDurationDays(trip.durationDays);
      if (trip.partySize) setPeopleCount(trip.partySize);
      if (trip.groupType) setGroupType(trip.groupType);
      if (trip.budgetTier) setBudgetTier(trip.budgetTier);
      if (trip.selectedVibeIds && trip.selectedVibeIds.length > 0) {
        setSelectedVibeIds(trip.selectedVibeIds);
      }
    }
  }, [isLoaded, trip.source]);

  // Modals & Context
  const [isMiminOpen, setIsMiminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [spotDetailModal, setSpotDetailModal] = useState<Spot | null>(null);
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>([
    "nyang-nyang",
    "tegalalang",
    "campuhan",
    "kelingking",
  ]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Toggle vibe selection
  const handleToggleVibe = (id: string) => {
    setSelectedVibeIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((vId) => vId !== id)
          : prev
        : [...prev, id]
    );
  };

  const budgetLabels = [
    { tier: 1, range: "Rp 1.5jt - Rp 2.5jt", desc: "Backpacker Hemat (Hostel & Motoran)" },
    { tier: 2, range: "Rp 2.5jt - Rp 4.5jt", desc: "Mid-Range Comfort (Private Villa, Cafe, Mobil)" },
    { tier: 3, range: "Rp 5jt - Rp 10jt+", desc: "Luxury Indulgence (Resort Bintang 5, Beach Club VIP)" },
  ];

  const currentBudget = budgetLabels.find((b) => b.tier === budgetTier) || budgetLabels[1];

  // Itinerary generation based on duration and selected vibes
  const itineraryDays = [
    {
      day: 1,
      title: "Hari 1: Welcome to Bali & Sunset Uluwatu",
      stay: "Ubud / Canggu",
      slots: [
        { time: "11:00 WITA", spot: "Landing di Bandara Ngurah Rai & Check-in", tag: "Airport Transit" },
        { time: "14:30 WITA", spot: "Nyang Nyang Beach & Limestone Cliff", tag: "Beach Vibes" },
        { time: "17:15 WITA", spot: "Sunset Chill di Suluban Cave", tag: "Sunset Moment" },
      ],
    },
    {
      day: 2,
      title: "Hari 2: Ubud Emerald Nature & Sawah Tingkat",
      stay: "Ubud",
      slots: [
        { time: "06:30 WITA", spot: "Campuhan Ridge Walk (Morning Mist Walk)", tag: "Zen Chill" },
        { time: "09:00 WITA", spot: "Tegalalang Rice Terrace & Giant Swing", tag: "Nature Escape" },
        { time: "14:00 WITA", spot: "Monkey Forest Ubud & Cafe Sanctuary", tag: "Top Nature" },
      ],
    },
    {
      day: 3,
      title: "Hari 3: Island Adventure ke Nusa Penida",
      stay: "Nusa Penida / Sanur",
      slots: [
        { time: "07:30 WITA", spot: "Fastboat Sanur ke Nusa Penida", tag: "Boat Cross" },
        { time: "10:00 WITA", spot: "Kelingking Beach T-Rex Cliff Panorama", tag: "Iconic Panorama" },
        { time: "15:00 WITA", spot: "Crystal Bay Snorkeling & Coconut Chill", tag: "Beach Vibes" },
      ],
    },
    {
      day: 4,
      title: "Hari 4: Heritage & Pura Air Sakral",
      stay: "Canggu",
      slots: [
        { time: "08:00 WITA", spot: "Tirta Gangga Water Palace Koi Pond", tag: "Culture & Heritage" },
        { time: "13:30 WITA", spot: "Cafe Hopping & Iced Americano di Pererenan", tag: "Social & Trendy" },
        { time: "17:30 WITA", spot: "Catching Sunset di Pantai Canggu", tag: "Sunset Vibe" },
      ],
    },
    {
      day: 5,
      title: "Hari 5: Souvenir Hunting & Sayonara Bali",
      stay: "Departure",
      slots: [
        { time: "09:00 WITA", spot: "Belanja Oleh-oleh Pie Susu & Kopi Kintamani", tag: "Souvenir" },
        { time: "12:00 WITA", spot: "Cus ke Airport Ngurah Rai", tag: "Departure" },
      ],
    },
  ].slice(0, durationDays);

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAskMiminWithPlan = () => {
    setIsMiminOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-16">
        {/* Sticky Top Navbar */}
        <Navbar onOpenMimin={() => setIsMiminOpen(true)} />

        {/* Wizard Intro Header */}
        <section className="pt-6 sm:pt-8 pb-8 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-brand-teal/30 text-brand-deepTeal text-[11px] font-bold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-brand-teal" />
            <span>TRIP PLANNER WIZARD · ANTI WACANA CLUB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight">
            Susun Liburan Impian Bali Kamu <br className="hidden sm:inline" />
            dalam 3 Langkah Mudah
          </h1>

          <p className="text-sm sm:text-base text-brand-secondary max-w-xl mx-auto">
            Pilih vibe favorit, tentuin tanggal liburan, dan cus berangkat! Mimin siap bantu
            rapihin rute biar gak boros bensin dan anti boncos waktu di jalan.
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs font-bold">
              {/* Step 1 Pill */}
              <button
                onClick={() => setActiveStep(1)}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-2xl border transition-all ${
                  activeStep === 1
                    ? "bg-brand-pillDark text-white border-brand-dark shadow-md"
                    : activeStep > 1
                    ? "bg-brand-surface text-brand-deepTeal border-brand-teal/40 font-semibold"
                    : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    activeStep > 1 ? "bg-brand-teal text-brand-dark" : "bg-white/20 text-white"
                  }`}
                >
                  {activeStep > 1 ? <Check className="w-3 h-3 stroke-[3]" /> : "1"}
                </span>
                <span className="truncate">01 Pick Vibe</span>
              </button>

              {/* Step 2 Pill */}
              <button
                onClick={() => setActiveStep(2)}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-2xl border transition-all ${
                  activeStep === 2
                    ? "bg-brand-pillDark text-white border-brand-dark shadow-md"
                    : activeStep > 2
                    ? "bg-brand-surface text-brand-deepTeal border-brand-teal/40 font-semibold"
                    : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    activeStep > 2 ? "bg-brand-teal text-brand-dark" : activeStep === 2 ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {activeStep > 2 ? <Check className="w-3 h-3 stroke-[3]" /> : "2"}
                </span>
                <span className="truncate">02 Set Date</span>
              </button>

              {/* Step 3 Pill */}
              <button
                onClick={() => setActiveStep(3)}
                className={`flex items-center justify-center gap-2 py-3 px-2 rounded-2xl border transition-all ${
                  activeStep === 3
                    ? "bg-brand-pillDark text-white border-brand-dark shadow-md"
                    : "bg-white text-gray-400 border-gray-200"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    activeStep === 3 ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  3
                </span>
                <span className="truncate">03 Itinerary</span>
              </button>
            </div>
          </div>
        </section>

        {/* STEP 1: PILIH VIBE & GAYA LIBURAN */}
        {activeStep === 1 && (
          <section className="py-8 space-y-10 animate-in fade-in duration-300">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block">
                LANGKAH PERTAMA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                01 / Pilih Vibe & Gaya Liburanmu
              </h2>
              <p className="text-xs sm:text-sm text-brand-secondary">
                Pilih 1 atau lebih vibe yang paling cocok sama energi kamu kali ini.
              </p>
            </div>

            {/* Vibe Photo Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {PLANNER_VIBE_CARDS.map((card) => {
                const isSelected = selectedVibeIds.includes(card.id);

                return (
                  <div
                    key={card.id}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    aria-label={`Pilih vibe ${card.title}`}
                    onClick={() => handleToggleVibe(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleToggleVibe(card.id);
                      }
                    }}
                    className={`group relative rounded-2xl overflow-hidden aspect-[3/4.2] flex flex-col justify-between p-4 cursor-pointer transition-all duration-300 border focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                      isSelected
                        ? "border-brand-teal ring-2 ring-brand-teal/50 shadow-soft scale-[1.02]"
                        : "border-gray-200 hover:border-gray-300 shadow-xs"
                    }`}
                  >
                    {/* Background Photo */}
                    <div className="absolute inset-0 z-0 bg-gray-100">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                    </div>

                    {/* Top Tag & Checkmark */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold">
                        {card.tag}
                      </span>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                          isSelected
                            ? "bg-brand-teal text-brand-dark shadow-sm"
                            : "bg-black/40 text-transparent border border-white/30"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div className="relative z-10 space-y-1.5 text-white">
                      <h4 className="text-base font-bold leading-snug group-hover:text-brand-teal transition">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Companion Controls Row: Group Type, People Count, Budget */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-surface border border-brand-mutedBorder/80 shadow-soft space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 1. Group Type */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-teal" />
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                      Gaya Perjalanan
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {GROUP_TYPES.map((gt) => (
                      <button
                        key={gt.id}
                        onClick={() => {
                          setGroupType(gt.id);
                          setPeopleCount(gt.defaultCount);
                        }}
                        className={`p-2.5 rounded-xl text-left text-xs font-bold transition flex items-center gap-2 border ${
                          groupType === gt.id
                            ? "bg-white text-brand-dark border-brand-teal shadow-xs"
                            : "bg-white/50 text-brand-secondary border-gray-200 hover:bg-white"
                        }`}
                      >
                        <span>{gt.icon}</span>
                        <span className="truncate">{gt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. People Stepper */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-teal" />
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                      Jumlah Personel ({peopleCount} Orang)
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPeopleCount((p) => Math.max(1, p - 1))}
                      className="w-11 h-11 rounded-2xl bg-white border border-gray-200 text-brand-dark font-bold hover:bg-gray-50 flex items-center justify-center transition shadow-xs text-base"
                    >
                      -
                    </button>
                    <div className="flex-1 py-2.5 px-4 rounded-2xl bg-white border border-gray-200 text-center font-extrabold text-brand-dark text-base shadow-xs">
                      {peopleCount} Orang
                    </div>
                    <button
                      onClick={() => setPeopleCount((p) => Math.min(15, p + 1))}
                      className="w-11 h-11 rounded-2xl bg-white border border-gray-200 text-brand-dark font-bold hover:bg-gray-50 flex items-center justify-center transition shadow-xs text-base"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[11px] text-brand-secondary">
                    {peopleCount === 1
                      ? "Cocok untuk solo healing tenang."
                      : peopleCount <= 4
                      ? "Pas untuk 1 mobil rental / 2 motoran."
                      : "Saran Mimin: gunakan minibus HiAce nyaman."}
                  </p>
                </div>

                {/* 3. Budget Tier */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand-teal" />
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                      Estimasi Budget per Orang
                    </label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-brand-dark">
                      <span>{currentBudget.range}</span>
                      <span className="text-brand-deepTeal">
                        Tier {budgetTier} / 3
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={budgetTier}
                      onChange={(e) => setBudgetTier(parseInt(e.target.value))}
                      className="w-full accent-brand-teal cursor-pointer"
                    />
                    <p className="text-[11px] text-brand-secondary">
                      {currentBudget.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Step Trigger */}
              <div className="pt-4 border-t border-gray-200/60 flex justify-end">
                <button
                  onClick={() => setActiveStep(2)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-pillDark hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md transition"
                >
                  <span>Lanjut: Tentukan Tanggal & Basecamp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* STEP 2: TENTUKAN TANGGAL & WILAYAH BASECAMP */}
        {activeStep === 2 && (
          <section className="py-8 space-y-10 animate-in fade-in duration-300">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block">
                LANGKAH KEDUA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                02 / Tentukan Tanggal & Wilayah Basecamp
              </h2>
              <p className="text-xs sm:text-sm text-brand-secondary">
                No more wacana di grup WA! Kunci tanggal dan durasi liburanmu sekarang.
              </p>
            </div>

            {/* Two-Column Interactive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Calendar & Date Range Picker (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-soft space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-brand-secondary uppercase">
                      Rentang Tanggal Terpilih:
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-brand-dark">
                      {selectedStartDate} Mei - {selectedStartDate + durationDays - 1} Mei 2026 ({durationDays} Hari {durationDays - 1} Malam)
                    </h4>
                  </div>
                </div>

                {/* Quick Duration Pills */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block">
                    Pilih Durasi Liburan:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { days: 3, label: "3 Hari (Weekend)" },
                      { days: 5, label: "5 Hari (Ideal ⭐)" },
                      { days: 7, label: "7 Hari (Slow Trip)" },
                    ].map((d) => (
                      <button
                        key={d.days}
                        onClick={() => setDurationDays(d.days)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold transition border ${
                          durationDays === d.days
                            ? "bg-brand-surface border-brand-teal text-brand-deepTeal shadow-xs"
                            : "bg-white border-gray-200 text-brand-secondary hover:border-gray-300"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Month Grid Representation (Mei 2026) */}
                <div className="p-4 rounded-2xl bg-brand-surface border border-brand-mutedBorder/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-dark">
                    <span>Mei 2026</span>
                    <span className="text-[11px] text-brand-teal">Klik tanggal mulai</span>
                  </div>

                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-400">
                    <span>Min</span>
                    <span>Sen</span>
                    <span>Sel</span>
                    <span>Rab</span>
                    <span>Kam</span>
                    <span>Jum</span>
                    <span>Sab</span>
                  </div>

                  {/* Date Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold">
                    {/* Empty lead days */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={`empty-${i}`} className="py-2 text-gray-300">
                        {26 + i}
                      </div>
                    ))}

                    {/* Dates 1 to 31 */}
                    {Array.from({ length: 31 }).map((_, i) => {
                      const dateNum = i + 1;
                      const isInRange =
                        dateNum >= selectedStartDate &&
                        dateNum < selectedStartDate + durationDays;
                      const isStart = dateNum === selectedStartDate;
                      const isEnd = dateNum === selectedStartDate + durationDays - 1;

                      return (
                        <button
                          key={dateNum}
                          onClick={() => setSelectedStartDate(dateNum)}
                          className={`py-2 rounded-lg transition text-[11px] ${
                            isStart || isEnd
                              ? "bg-brand-pillDark text-white font-extrabold shadow-sm"
                              : isInRange
                              ? "bg-brand-teal/25 text-brand-dark font-bold"
                              : "hover:bg-gray-100 text-brand-dark"
                          }`}
                        >
                          {dateNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/70 border border-brand-teal/30 text-[11px] text-brand-deepTeal flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <span>
                    Tanggal {selectedStartDate} - {selectedStartDate + durationDays - 1} Mei 2026 merupakan waktu terbaik dengan cuaca cerah di Bali.
                  </span>
                </div>
              </div>

              {/* Right Column: Smart Bali Weather & Stay Recommendation (6 cols) */}
              <div className="lg:col-span-6 space-y-5">
                {/* Weather Intelligence Card */}
                <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-soft space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
                      Prediksi Cuaca & Musim
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                      Musim Kemarau (Dry Season)
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100/60 flex items-center justify-center text-amber-500">
                      <Sun className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-dark">
                        Cuaca Cerah & Golden Hour Maksimal
                      </h4>
                      <p className="text-xs text-brand-secondary">
                        Prakiraan hujan &lt; 10%, ombak laut tenang, sangat ideal untuk pantai dan sunrise trekking.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggested Basecamp Cards */}
                <div className="p-6 rounded-3xl bg-brand-surface border border-brand-mutedBorder/80 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
                      Rekomendasi Pembagian Area Basecamp
                    </h4>
                    <p className="text-xs text-brand-secondary">
                      Berdasarkan vibe pilihanmu ({selectedVibeIds.length} Vibe aktif):
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Basecamp 1: Ubud */}
                    <div className="flex gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/80 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                        <Image
                          src="/images/basecamp_ubud.jpg"
                          alt="Ubud Basecamp"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-brand-deepTeal border border-brand-teal/20">
                            2 Malam Pertama
                          </span>
                          <span className="text-[11px] font-bold text-brand-dark">Ubud Central / Sawah</span>
                        </div>
                        <p className="text-[11px] text-brand-secondary">
                          Dekat Campuhan, Tegalalang, dan Monkey Forest. Suasana sejuk & tenang.
                        </p>
                      </div>
                    </div>

                    {/* Basecamp 2: Canggu / Seminyak */}
                    <div className="flex gap-3 p-3.5 rounded-2xl bg-white border border-gray-200/80 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
                        <Image
                          src="/images/basecamp_canggu.jpg"
                          alt="Canggu Basecamp"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-brand-deepTeal border border-brand-teal/20">
                            {durationDays - 2} Malam Berikutnya
                          </span>
                          <span className="text-[11px] font-bold text-brand-dark">Canggu / Pererenan</span>
                        </div>
                        <p className="text-[11px] text-brand-secondary">
                          Dekat beach club, cafe aesthetic, dan akses cepat ke sunset Uluwatu.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back and Next Stepper */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-dark text-xs font-bold transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Kembali ke Vibe</span>
                  </button>

                  <button
                    onClick={() => {
                      syncFromPlanner({
                        durationDays,
                        selectedVibeIds,
                        groupType,
                        peopleCount,
                        budgetTier,
                        selectedStartDate,
                        basecampArea: "Canggu + Ubud",
                      });
                      setActiveStep(3);
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-pillDark hover:bg-black text-white text-xs sm:text-sm font-bold shadow-md transition"
                  >
                    <span>Generate Draf Itinerary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 3: DRAF ITINERARY SIAP BERANGKAT & SUMMARY */}
        {activeStep === 3 && (
          <section className="py-8 space-y-10 animate-in fade-in duration-300">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block">
                LANGKAH KETIGA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                03 / Draf Itinerary Siap Berangkat!
              </h2>
              <p className="text-xs sm:text-sm text-brand-secondary">
                Rute harian sudah dikelompokkan berdasarkan wilayah dan kedekatan lokasi tanpa konflik jarak.
              </p>
            </div>

            {/* Master Summary Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-brand-surface border border-brand-mutedBorder/80 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-brand-teal text-brand-dark text-xs font-extrabold">
                      ANTI WACANA VERIFIED ✓
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tersimpan Otomatis ({durationDays} Hari, {peopleCount} Orang)</span>
                    </span>
                    <span className="text-xs text-brand-secondary">
                      {selectedStartDate} - {selectedStartDate + durationDays - 1} Mei 2026
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
                    {trip.title || `Trip ${durationDays}D${durationDays - 1}N: Eksplorasi Bali`}
                  </h3>
                </div>

                {/* Metric Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-brand-dark shadow-xs">
                    🗓️ {durationDays} Hari
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-brand-dark shadow-xs">
                    👥 {peopleCount} Orang
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-brand-dark shadow-xs">
                    💰 {currentBudget.range}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-brand-teal/40 text-xs font-bold text-brand-deepTeal shadow-xs">
                    <Compass className="w-3.5 h-3.5 text-brand-teal" />
                    <span>0 Konflik Wilayah</span>
                  </span>
                </div>
              </div>

              {/* Day-by-Day Interactive Schedule Breakdown */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-brand-dark">
                  Jadwal Harian Rekomendasi Mimin:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(trip.days && trip.days.length > 0 ? trip.days : itineraryDays.slice(0, durationDays).map((d, i) => ({
                    dayNumber: d.day,
                    dateLabel: `${selectedStartDate + i} Mei`,
                    title: d.title,
                    stayArea: d.stay,
                    slots: d.slots.map((s, sIdx) => ({
                      id: `slot-${i}-${sIdx}`,
                      timeSlot: "Pagi" as const,
                      timeRange: s.time,
                      spotId: s.spot,
                      title: s.spot,
                      category: s.tag,
                      location: d.stay,
                      image: "/images/image_30.jpg",
                      entryFee: "Gratis",
                      costNum: 0,
                      notes: "",
                    })),
                    totalKm: 25,
                    totalDriveTime: "1j 30m",
                  }))).map((d) => (
                    <div
                      key={d.dayNumber}
                      className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <span className="text-xs font-extrabold text-brand-deepTeal">
                            HARI {d.dayNumber} ({d.dateLabel})
                          </span>
                          <span className="text-[10px] text-brand-secondary font-medium">
                            Stay: {d.stayArea}
                          </span>
                        </div>
                        <h5 className="text-xs sm:text-sm font-bold text-brand-dark leading-snug">
                          {d.title}
                        </h5>

                        {/* Slots */}
                        <div className="space-y-2 pt-1">
                          {d.slots.map((slot) => (
                            <div
                              key={slot.id}
                              className="p-2.5 rounded-xl bg-brand-surface/70 border border-brand-mutedBorder/50 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold text-brand-teal">
                                  {slot.timeRange}
                                </span>
                                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-white text-brand-deepTeal border border-brand-teal/20">
                                  {slot.category}
                                </span>
                              </div>
                              <p className="font-semibold text-brand-dark">
                                {slot.title}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Bar */}
              <div className="pt-6 border-t border-gray-200/80 flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Primary: Open in Itinerary Builder */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      syncFromPlanner({
                        durationDays,
                        selectedVibeIds,
                        groupType,
                        peopleCount,
                        budgetTier,
                        selectedStartDate,
                        basecampArea: "Canggu + Ubud",
                      });
                      router.push("/itinerary");
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-teal hover:bg-teal-300 text-brand-dark text-xs sm:text-sm font-extrabold shadow-md transition"
                  >
                    <span>Buka di Itinerary Builder Detail ({durationDays} Hari)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/tanya-mimin"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-teal-50 hover:bg-teal-100 border border-brand-teal text-brand-deepTeal text-xs sm:text-sm font-bold transition"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-teal" />
                    <span>Konsultasi Tanya Mimin Hub</span>
                  </Link>
                </div>

                {/* Share and Reset Controls */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={handleCopyShareLink}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-brand-dark text-xs sm:text-sm font-bold transition shadow-xs"
                  >
                    <Share2 className="w-4 h-4 text-brand-teal" />
                    <span>{copiedLink ? "Link Tersalin! ✓" : "Bagikan Rencana"}</span>
                  </button>

                  <button
                    onClick={() => setActiveStep(1)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-pillDark hover:bg-black text-white text-xs sm:text-sm font-bold transition shadow-md"
                  >
                    <span>Ubah Preferensi</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

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
        onSendWishlistToMimin={() => setIsMiminOpen(true)}
      />

      {/* Spot Detail Modal */}
      <SpotModal
        spot={spotDetailModal}
        onClose={() => setSpotDetailModal(null)}
        onSaveSpot={(spot) =>
          setSavedSpotIds((prev) =>
            prev.includes(spot.id) ? prev.filter((i) => i !== spot.id) : [...prev, spot.id]
          )
        }
        isSaved={spotDetailModal ? savedSpotIds.includes(spotDetailModal.id) : false}
        onAskMimin={() => setIsMiminOpen(true)}
      />

      {/* Mimin Consultation Modal */}
      <MiminModal
        isOpen={isMiminOpen}
        onClose={() => setIsMiminOpen(false)}
        defaultTopic="Validasi Itinerary Liburan"
        defaultSpot={`Itinerary ${durationDays}D${durationDays - 1}N (${peopleCount} Orang - ${selectedVibeIds.join(", ")})`}
      />
    </div>
  );
}

