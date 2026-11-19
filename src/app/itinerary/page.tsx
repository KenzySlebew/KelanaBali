"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import MiminModal from "@/components/MiminModal";
import WishlistDrawer from "@/components/WishlistDrawer";
import ItineraryRouteMap from "@/components/itinerary/ItineraryRouteMap";
import {
  useTripStore,
  ItinerarySlot,
  buildTripShareUrl,
  parseTripFromSearchParams,
} from "@/data/tripStore";
import {
  Share2,
  Download,
  MessageCircle,
  Calendar,
  Users,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle,
  Check,
  CheckCircle2,
  Edit2,
  ChevronRight,
  ArrowRight,
  Bike,
  Car,
  Compass,
  X,
  Plus,
  Printer,
} from "lucide-react";

function ItineraryContent() {
  const {
    trip,
    updateTitle,
    setActiveDay,
    updateSlotNotes,
    resolveTrafficWarning,
    addBestie,
    resetToDefault,
    syncFromPlanner,
  } = useTripStore();

  const searchParams = useSearchParams();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(trip.title);
  const [copiedLink, setCopiedLink] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
  const [slotNoteInput, setSlotNoteInput] = useState("");
  const [activeSlotId, setActiveSlotId] = useState<string | null>("slot-1");
  const [isMiminOpen, setIsMiminOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [showAddBestieModal, setShowAddBestieModal] = useState(false);
  const [newBestieName, setNewBestieName] = useState("");

  // Sync title when store title changes
  useEffect(() => {
    setTitleInput(trip.title);
  }, [trip.title]);

  // Synchronize trip from URL query params (e.g. ?days=7&party=4...)
  useEffect(() => {
    if (searchParams) {
      const parsed = parseTripFromSearchParams(searchParams);
      if (parsed) {
        if (trip.days.length !== parsed.durationDays || trip.source !== "planner") {
          syncFromPlanner(parsed);
        }
      }
    }
  }, [searchParams, syncFromPlanner, trip.days.length, trip.source]);

  const activeDay =
    trip.days[trip.activeDayIndex] ||
    trip.days[0] || {
      dayNumber: 1,
      dateLabel: "14 Mei",
      title: "Uluwatu Coastline",
      region: "Bukit & Uluwatu",
      stayArea: "Bingin / Pecatu",
      totalKm: 28.4,
      totalDriveTime: "1j 45m",
      slots: [],
    };

  // Calculate day total entry/activity costs with budgetTier adjustments
  const dayActivityCost = activeDay.slots.reduce((sum, s) => sum + s.costNum, 0);
  const budgetTier = trip.budgetTier || 2;
  const stayCostPerPerson = budgetTier === 1 ? 150000 : budgetTier === 3 ? 1200000 : 350000;
  const transportCostPerPerson = budgetTier === 1 ? 35000 : budgetTier === 3 ? 200000 : 60000;
  const foodEstimatePerPerson = budgetTier === 1 ? 65000 : budgetTier === 3 ? 300000 : 125000;
  const totalCostPerPerson =
    stayCostPerPerson + transportCostPerPerson + foodEstimatePerPerson + dayActivityCost;
  const totalGroupCost = totalCostPerPerson * trip.partySize;

  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      updateTitle(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCopyShareLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = buildTripShareUrl(trip, window.location.origin);
      navigator.clipboard.writeText(shareUrl);
      window.history.replaceState({}, "", shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleExportPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleStartEditNote = (slot: ItinerarySlot) => {
    setEditingSlotId(slot.id);
    setSlotNoteInput(slot.notes);
  };

  const handleSaveNote = (slotId: string) => {
    updateSlotNotes(trip.activeDayIndex, slotId, slotNoteInput);
    setEditingSlotId(null);
  };

  const handleAddBestieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBestieName.trim()) {
      addBestie(newBestieName.trim());
      setNewBestieName("");
      setShowAddBestieModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F8] text-brand-dark flex flex-col">
      {/* Top Floating Liquid Navbar */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-2 print:hidden">
        <Navbar onOpenMimin={() => setIsMiminOpen(true)} />
      </div>

      {/* Main Layout Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-6">
        {/* Planner Sync Banner */}
        {trip.source === "planner" && (
          <div className="p-4 rounded-2xl bg-teal-50 border border-brand-teal/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs animate-in fade-in duration-200 print:hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-brand-teal flex items-center justify-center text-brand-dark flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-brand-dark" />
              </div>
              <div>
                <span className="font-extrabold text-brand-deepTeal">
                  Tersinkronisasi Otomatis dari Trip Planner
                </span>
                <p className="text-brand-secondary text-[11px]">
                  Rencana {trip.days.length} Hari · {trip.partySize} Orang ({trip.travelerNames.join(", ")}) · Tersimpan aman di browser
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/planner"
                className="flex-1 sm:flex-initial text-center px-3.5 py-1.5 rounded-xl bg-white border border-brand-teal/40 text-brand-deepTeal font-bold hover:bg-teal-100 transition text-[11px]"
              >
                Ubah di Planner
              </Link>
              <button
                type="button"
                onClick={() => resetToDefault()}
                className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-gray-100 text-gray-600 hover:text-brand-dark transition text-[11px] font-medium"
              >
                Reset ke Template Awal
              </button>
            </div>
          </div>
        )}

        {/* PRINT-ONLY COMPREHENSIVE ITINERARY BOOKLET (Renders ALL 7 Days sequentially for PDF export & Window.print) */}
        <div className="hidden print:block text-black bg-white space-y-6 font-sans">
          {/* Print Document Header */}
          <div className="border-b-2 border-black pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-black">
                  KelanaBali · Itinerary Perjalanan Resmi
                </h1>
                <p className="text-xs text-gray-600 font-mono">
                  Kurasi Lokal Bali Anti-Wacana · Tanggal Export: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-mono font-bold px-3 py-1 bg-black text-white rounded">
                  VERIFIED PLAN · {trip.days.length} HARI
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-xl font-black text-black">{trip.title}</h2>
              <div className="flex flex-wrap gap-4 text-xs text-gray-700 mt-1.5 font-medium">
                <span>📅 <strong>Durasi & Tanggal:</strong> {trip.datesLabel} ({trip.days.length} Hari {trip.days.length - 1} Malam)</span>
                <span>👥 <strong>Traveler:</strong> {trip.partySize} Orang ({trip.travelerNames.join(", ")})</span>
                <span>💰 <strong>Budget Tier:</strong> {budgetTier === 1 ? "Backpacker Hemat" : budgetTier === 3 ? "Luxury Indulgence" : "Mid-Range Comfort"}</span>
              </div>
            </div>
          </div>

          {/* Sequential Day-by-Day Print Sections (ALL DAYS) */}
          <div className="space-y-6">
            {trip.days.map((day) => {
              const dayTotalActivity = day.slots.reduce((sum, s) => sum + s.costNum, 0);
              const dayTotalEst = stayCostPerPerson + transportCostPerPerson + foodEstimatePerPerson + dayTotalActivity;

              return (
                <div key={day.dayNumber} className="print-avoid-break border border-gray-300 rounded-xl p-4 space-y-3 bg-white">
                  {/* Day Header */}
                  <div className="flex items-start justify-between border-b border-gray-200 pb-2">
                    <div>
                      <span className="text-[11px] font-mono font-extrabold uppercase text-gray-600 tracking-wider">
                        HARI {day.dayNumber} · {day.dateLabel}
                      </span>
                      <h3 className="text-base font-bold text-black mt-0.5">{day.title}</h3>
                    </div>
                    <div className="text-right text-xs text-gray-700">
                      <div>Wilayah: <strong>{day.region}</strong></div>
                      <div>Basecamp: <strong>{day.stayArea}</strong> · Total Rute: <strong>{day.totalKm} km</strong> ({day.totalDriveTime})</div>
                    </div>
                  </div>

                  {/* Day Timeline Spots */}
                  <div className="space-y-2 pt-1">
                    {day.slots.map((slot, sIdx) => (
                      <div key={slot.id} className="text-xs p-2.5 rounded-lg bg-gray-50 border border-gray-200 space-y-1">
                        <div className="flex items-center justify-between font-bold text-black">
                          <span className="font-mono">
                            #{sIdx + 1} [{slot.timeSlot}] {slot.timeRange} — {slot.title}
                          </span>
                          <span className="text-gray-800 font-mono font-semibold">{slot.entryFee}</span>
                        </div>

                        <div className="text-gray-600 text-[11px] flex items-center gap-2">
                          <span>📍 {slot.location}</span>
                          <span>·</span>
                          <span>Kategori: {slot.category}</span>
                        </div>

                        <div className="text-gray-800 italic text-[11px] bg-white p-2 rounded border border-gray-100">
                          &ldquo;{slot.notes}&rdquo;
                        </div>

                        {slot.transitToNext && (
                          <div className="text-[10px] text-gray-500 font-mono pt-0.5">
                            ➔ Menuju spot berikutnya: Motor {slot.transitToNext.motorMins} mnt / Mobil {slot.transitToNext.carMins} mnt ({slot.transitToNext.distanceKm} km)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Traffic Warning if any */}
                  {day.trafficWarning && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                      ⚠️ <strong>Peringatan Lalu Lintas:</strong> {day.trafficWarning.message}
                    </div>
                  )}

                  {/* Day Cost Summary */}
                  <div className="flex items-center justify-between text-xs font-bold text-gray-800 pt-1.5 border-t border-gray-200">
                    <span>Estimasi Anggaran Hari {day.dayNumber}:</span>
                    <span className="font-mono text-black">
                      Rp {dayTotalEst.toLocaleString("id-ID")} / orang (Tiket Spot: Rp {dayTotalActivity.toLocaleString("id-ID")})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Print Document Footer */}
          <div className="border-t-2 border-black pt-3 flex items-center justify-between text-[11px] text-gray-600 font-mono">
            <span>KelanaBali Travel Companion · https://kelanabali.com</span>
            <span>Hotline Konsultasi Lokal Mimin Putu: +62 812-3456-7890</span>
          </div>
        </div>

        {/* Top Header Card: Trip Title & Meta Actions (Screen Only) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft space-y-5 print:hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Title & Travelers info */}
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-teal uppercase tracking-wider">
                <span>ITINERARY BUILDER</span>
                <span>·</span>
                <span className="text-brand-deepTeal">STATUS: AKTIF</span>
              </div>

              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-brand-dark border-b-2 border-brand-teal focus:outline-none bg-transparent w-full font-sans"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveTitle}
                    className="px-3 py-1.5 rounded-xl bg-brand-teal text-brand-dark text-xs font-bold hover:bg-teal-400 transition"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingTitle(false)}
                    className="p-1.5 rounded-xl text-gray-400 hover:text-brand-dark"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-brand-dark font-sans leading-tight">
                    {trip.title}
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setTitleInput(trip.title);
                      setIsEditingTitle(true);
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-brand-teal opacity-60 group-hover:opacity-100 transition"
                    title="Ubah judul trip"
                    aria-label="Ubah judul trip"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-brand-secondary font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{trip.datesLabel}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-teal" />
                  <span>{trip.partySize} Orang ({trip.travelerNames.join(", ")})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddBestieModal(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-deepTeal hover:text-brand-teal transition px-2 py-0.5 rounded-lg bg-teal-50 border border-brand-teal/20"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Teman</span>
                </button>
              </div>
            </div>

            {/* Right: Actions (Share, PDF, Tanya Mimin) */}
            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleCopyShareLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-brand-dark hover:bg-gray-50 transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Link Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-brand-secondary" />
                    <span>Bagikan Link</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-brand-dark hover:bg-gray-50 transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
              >
                <Download className="w-4 h-4 text-brand-secondary" />
                <span>Ekspor PDF</span>
              </button>

              <Link
                href="/tanya-mimin"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-pillDark text-white text-xs font-bold hover:bg-black transition shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
              >
                <MessageCircle className="w-4 h-4 text-brand-teal" />
                <span>Minta Mimin Cek Rute</span>
              </Link>
            </div>
          </div>

          {/* Day Ribbon Selector Tabs */}
          <div className="pt-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {trip.days.map((day, idx) => {
              const isActive = trip.activeDayIndex === idx;
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => setActiveDay(idx)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border text-left ${
                    isActive
                      ? "bg-brand-dark text-white border-brand-dark shadow-sm"
                      : "bg-white text-brand-secondary border-gray-200 hover:border-gray-300 hover:text-brand-dark"
                  }`}
                >
                  <span>Hari {day.dayNumber} ({day.dateLabel})</span>
                  <span className={`block text-[10px] font-normal ${isActive ? "text-brand-teal" : "text-gray-400"}`}>
                    {day.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Day Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-brand-surface border border-gray-200/60 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary block">
                Wilayah Utama
              </span>
              <span className="font-bold text-brand-dark">{activeDay.region}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary block">
                Total Jarak Rute
              </span>
              <span className="font-bold text-brand-dark font-mono">{activeDay.totalKm} km</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary block">
                Waktu di Jalan
              </span>
              <span className="font-bold text-brand-dark font-mono">{activeDay.totalDriveTime}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary block">
                Saran Basecamp
              </span>
              <span className="font-bold text-brand-deepTeal">{activeDay.stayArea}</span>
            </div>
          </div>
        </section>

        {/* Two-Column Workspace: 60% Timeline / 40% Map & Budget Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:hidden">
          {/* Left Column: Timeline Slots (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Traffic Congestion Alert (If active on day) */}
            {activeDay.trafficWarning && !activeDay.trafficWarning.resolved && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                      Peringatan Macet Sunset Uluwatu
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {activeDay.trafficWarning.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => resolveTrafficWarning(trip.activeDayIndex)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-sm"
                  >
                    Rapiin Jam Otomatis
                  </button>
                  <button
                    type="button"
                    onClick={() => resolveTrafficWarning(trip.activeDayIndex)}
                    className="px-3 py-2 rounded-xl text-xs font-medium text-amber-800 hover:text-amber-950"
                  >
                    Abaikan
                  </button>
                </div>
              </div>
            )}

            {/* Resolved Notification Badge */}
            {activeDay.trafficWarning && activeDay.trafficWarning.resolved && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center gap-2 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Jadwal telah dioptimalkan: berangkat 30 menit lebih awal untuk mengamankan tiket Tari Kecak.</span>
              </div>
            )}

            {/* Timeline Slot Cards with Transit Connectors */}
            <div className="space-y-4">
              {activeDay.slots.map((slot, sIdx) => {
                const isSelected = activeSlotId === slot.id;
                const isEditingNote = editingSlotId === slot.id;

                return (
                  <div key={slot.id} className="space-y-4">
                    {/* The Spot Card */}
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={() => setActiveSlotId(slot.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveSlotId(slot.id);
                        }
                      }}
                      className={`rounded-2xl p-4 sm:p-5 bg-white border transition-all duration-200 shadow-soft cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                        isSelected
                          ? "border-brand-teal ring-2 ring-brand-teal/20"
                          : "border-gray-200/80 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Spot Thumbnail */}
                        <div className="w-full sm:w-32 h-36 sm:h-28 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
                          <Image
                            src={slot.image}
                            alt={slot.title}
                            fill
                            sizes="140px"
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold">
                            #{sIdx + 1}
                          </div>
                        </div>

                        {/* Spot Body Details */}
                        <div className="flex-1 space-y-2 w-full">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-xl bg-teal-50 text-brand-deepTeal border border-brand-teal/20">
                                {slot.timeSlot}
                              </span>
                              <span className="text-xs font-mono font-semibold text-brand-secondary">
                                {slot.timeRange}
                              </span>
                            </div>

                            <span className="text-xs font-bold text-brand-dark">
                              {slot.entryFee}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-brand-dark leading-snug">
                              {slot.title}
                            </h3>
                            <p className="text-xs text-brand-secondary flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                              <span>{slot.location} · {slot.category}</span>
                            </p>
                          </div>

                          {/* Curated Note / Inline Note Editor */}
                          <div className="p-3 rounded-xl bg-brand-surface border border-gray-100 text-xs">
                            {isEditingNote ? (
                              <div className="space-y-2">
                                <textarea
                                  value={slotNoteInput}
                                  onChange={(e) => setSlotNoteInput(e.target.value)}
                                  rows={2}
                                  className="w-full p-2 rounded-lg border border-gray-200 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
                                />
                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveNote(slot.id)}
                                    className="px-3 py-1 rounded-lg bg-brand-teal text-brand-dark font-bold text-[11px]"
                                  >
                                    Simpan Catatan
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingSlotId(null)}
                                    className="px-2 py-1 text-[11px] text-gray-400"
                                  >
                                    Batal
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-brand-dark/85 leading-relaxed italic text-[11px] sm:text-xs">
                                  &ldquo;{slot.notes}&rdquo;
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStartEditNote(slot);
                                  }}
                                  className="text-gray-400 hover:text-brand-teal flex-shrink-0 p-1"
                                  title="Edit catatan"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transit Connector Badge (Between Spot A and Spot B) */}
                    {slot.transitToNext && (
                      <div className="flex items-center justify-center my-1">
                        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white border border-gray-200/70 text-[11px] text-brand-secondary shadow-sm font-mono">
                          <span className="flex items-center gap-1 font-semibold text-brand-dark">
                            <Bike className="w-3.5 h-3.5 text-brand-teal" />
                            <span>{slot.transitToNext.motorMins} mnt</span>
                          </span>
                          <span className="text-gray-300">·</span>
                          <span className="flex items-center gap-1 font-semibold text-brand-dark">
                            <Car className="w-3.5 h-3.5 text-brand-teal" />
                            <span>{slot.transitToNext.carMins} mnt</span>
                          </span>
                          <span className="text-gray-300">·</span>
                          <span>{slot.transitToNext.distanceKm} km</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add Spot Prompt */}
            <div className="p-4 rounded-2xl border border-dashed border-gray-300 bg-white/60 text-center space-y-2">
              <p className="text-xs text-brand-secondary">
                Mau tambah tempat nongkrong atau pantai lain di Hari {activeDay.dayNumber}?
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-brand-deepTeal text-xs font-bold transition border border-brand-teal/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Pilih Spot dari Katalog</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sticky Map & Real-time Budget Engine (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            {/* Sequential Map Route */}
            <ItineraryRouteMap
              slots={activeDay.slots}
              dayTitle={activeDay.title}
              activeSlotId={activeSlotId || undefined}
              onSelectSlot={(id) => setActiveSlotId(id)}
            />

            {/* Real-time Budget Breakdown Calculator */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-teal" />
                  <h4 className="text-xs sm:text-sm font-bold text-brand-dark font-sans">
                    Estimasi Anggaran (Hari {activeDay.dayNumber})
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-brand-secondary">Per Orang</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-brand-secondary">
                  <span>Akomodasi ({activeDay.stayArea})</span>
                  <span className="font-mono font-semibold text-brand-dark">
                    Rp {stayCostPerPerson.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-brand-secondary">
                  <span>Tiket Atraksi & Masuk ({activeDay.slots.length} spot)</span>
                  <span className="font-mono font-semibold text-brand-dark">
                    Rp {dayActivityCost.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-brand-secondary">
                  <span>Transportasi (Motor / Mobil)</span>
                  <span className="font-mono font-semibold text-brand-dark">
                    Rp {transportCostPerPerson.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-brand-secondary">
                  <span>Makan & Cafe Chill</span>
                  <span className="font-mono font-semibold text-brand-dark">
                    Rp {foodEstimatePerPerson.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between font-bold text-sm text-brand-dark">
                  <span>Total Estimasi Hari Ini:</span>
                  <span className="text-base text-brand-deepTeal font-mono">
                    Rp {totalCostPerPerson.toLocaleString("id-ID")}
                  </span>
                </div>
                {trip.partySize > 1 && (
                  <div className="flex items-center justify-between text-[11px] text-brand-secondary pt-1">
                    <span>Estimasi Rombongan ({trip.partySize} Orang):</span>
                    <span className="font-mono font-semibold text-brand-dark">
                      Rp {totalGroupCost.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Handoff Card to Mimin */}
            <div className="bg-gradient-to-br from-brand-dark to-[#162A2A] text-white rounded-2xl p-5 shadow-soft space-y-3">
              <div className="flex items-center gap-2 text-brand-teal text-xs font-mono font-bold">
                <Compass className="w-4 h-4" />
                <span>VALIDASI LOCAL BUDDY</span>
              </div>
              <h4 className="text-base font-bold tracking-tight">
                Rute Sudah Pas atau Mau Dicek Mimin?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Mimin Putu bisa bantu cek apakah urutan spot hari ini rawan macet atau ada warung lokal tersembunyi yang lebih hemat.
              </p>
              <Link
                href="/tanya-mimin"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-teal hover:bg-teal-400 text-brand-dark text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Itinerary ke Mimin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Add Bestie Modal */}
      {showAddBestieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-float relative border border-gray-100">
            <button
              type="button"
              onClick={() => setShowAddBestieModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-brand-dark"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-brand-dark mb-1">Tambah Bestie Liburan</h3>
            <p className="text-xs text-brand-secondary mb-4">
              Masukkan nama teman agar estimasi patungan budget otomatis terhitung.
            </p>
            <form onSubmit={handleAddBestieSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nama teman..."
                value={newBestieName}
                onChange={(e) => setNewBestieName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-brand-dark focus:border-brand-teal focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-teal text-brand-dark font-bold text-xs hover:bg-teal-400 transition"
              >
                Tambahkan Teman
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Mobile Bottom Floating App Dock */}
      <div className="print:hidden">
        <MobileBottomNav
          onOpenMimin={() => setIsMiminOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          savedCount={3}
        />
      </div>

      {/* Mimin Modal */}
      <MiminModal
        isOpen={isMiminOpen}
        onClose={() => setIsMiminOpen(false)}
        defaultTopic="Cek Efisiensi Rute Itinerary"
        defaultSpot={trip.title}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedSpotIds={["nyang-nyang", "tegalalang"]}
        onRemoveSpot={() => {}}
        onSelectSpot={() => {}}
        onSendWishlistToMimin={() => {
          setIsWishlistOpen(false);
          setIsMiminOpen(true);
        }}
      />
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F8F8] flex items-center justify-center text-xs text-brand-secondary font-mono">
          Memuat Itinerary KelanaBali...
        </div>
      }
    >
      <ItineraryContent />
    </Suspense>
  );
}

