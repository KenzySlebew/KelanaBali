"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useTripStore } from "@/data/tripStore";
import {
  MessageCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Compass,
  Bike,
  Sun,
  ShieldCheck,
  Check,
  Phone,
  Send,
  ExternalLink,
} from "lucide-react";

export default function TanyaMiminPage() {
  const { trip, applySuggestion, revertSuggestion } = useTripStore();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Cek Efisiensi Itinerary",
  ]);
  const [userNotes, setUserNotes] = useState<string>(
    "Kami ingin santai menikmati sunset di Uluwatu tapi takut kena macet parah dan telat nonton Tari Kecak. Ada rekomendasi urutan jam yang pas?"
  );
  const [phoneNumber, setPhoneNumber] = useState<string>("081234567890");
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [requestSent, setRequestSent] = useState(false);

  const topicsList = [
    {
      id: "Cek Efisiensi Itinerary",
      label: "Cek Efisiensi Itinerary",
      desc: "Hindari bolak-balik & jalan macet",
      icon: "🔄",
    },
    {
      id: "Rekomendasi Hidden Gems & Sunset",
      label: "Hidden Gems & Sunset",
      desc: "Spot sepi dengan view magis",
      icon: "🌅",
    },
    {
      id: "Sewa Motor & Driver Terpercaya",
      label: "Sewa Motor & Driver",
      desc: "Vendor aman tanpa harga getok",
      icon: "🛵",
    },
    {
      id: "Pemandu Lokal & Etika Wisata Adat",
      label: "Pemandu & Adat Pura",
      desc: "Aturan sarung, sesajen & budaya",
      icon: "🛕",
    },
  ];

  const quickTags = [
    "#BawaMotor",
    "#CariHiddenGem",
    "#SpotSunsetSepi",
    "#RamahHalal",
    "#BudgetHemat",
  ];

  const handleToggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.length > 1
          ? prev.filter((t) => t !== topicId)
          : prev
        : [...prev, topicId]
    );
  };

  const handleAddTag = (tag: string) => {
    if (!userNotes.includes(tag)) {
      setUserNotes((prev) => (prev ? `${prev} ${tag}` : tag));
    }
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
  };

  const handleDirectWhatsApp = () => {
    const message = `Halo Mimin Putu KelanaBali! 👋\n\nSaya mau konsultasi rute liburan:\n• Trip: ${trip.title}\n• Jadwal: ${trip.datesLabel} (${trip.partySize} Orang)\n• Topik: ${selectedTopics.join(", ")}\n• Catatan: ${userNotes}\n\nMohon sarannya ya min, terima kasih banyak!`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F6F8F8] text-brand-dark flex flex-col">
      {/* Top Floating Liquid Navbar */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-2">
        <Navbar onOpenMimin={() => {}} />
      </div>

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-6">
        {/* Back Link to Itinerary */}
        <div className="flex items-center justify-between">
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-deepTeal hover:text-brand-teal transition py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Itinerary Builder</span>
          </Link>
          <span className="text-[11px] font-mono font-medium text-brand-secondary">
            Live Local Consultation Hub
          </span>
        </div>

        {/* Hero Banner: Profil Mimin Putu */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar Photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-brand-teal/40 shadow-sm bg-gray-100">
              <Image
                src="/images/image_51.jpg"
                alt="Mimin Putu, kurator lokal asli Bali di KelanaBali"
                fill
                className="object-cover"
                priority
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            {/* Intro Text */}
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal-50 text-brand-deepTeal text-xs font-mono font-bold border border-brand-teal/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />
                <span>Mimin Putu · Kurator Asli Badung & Gianyar</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-dark font-sans leading-tight">
                Validasi Rute & Tanya Rahasia Lokal Bareng Mimin
              </h1>

              <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed max-w-3xl">
                Biar liburanmu tidak boncos di jalan dan terhindar dari jebakan turis komersial. Mimin bantu cek urutan rute, rekomendasikan hidden gems tersembunyi, dan kalkulasi jam berangkat paling pas biar bebas macet.
              </p>
            </div>
          </div>
        </section>

        {/* Two-Column Consultation Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Konsultasi (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft space-y-5">
              <div className="pb-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-brand-dark font-sans">
                  Formulir Permintaan Konsultasi
                </h3>
                <p className="text-xs text-brand-secondary mt-0.5">
                  Pilih topik dan sampaikan kebutuhan perjalanan teman-teman.
                </p>
              </div>

              <form onSubmit={handleSendRequest} className="space-y-5">
                {/* 1. Pilih Topik */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-dark block">
                    1. Pilih Topik Konsultasi:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {topicsList.map((top) => {
                      const isSelected = selectedTopics.includes(top.id);
                      return (
                        <button
                          key={top.id}
                          type="button"
                          onClick={() => handleToggleTopic(top.id)}
                          className={`p-3 rounded-xl text-left border transition-all text-xs focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none ${
                            isSelected
                              ? "bg-teal-50/80 border-brand-teal text-brand-dark font-bold shadow-sm"
                              : "bg-white border-gray-200 text-brand-secondary hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base mr-1">{top.icon}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-brand-teal" />}
                          </div>
                          <div className="mt-1 font-bold text-brand-dark">{top.label}</div>
                          <div className="text-[11px] text-brand-secondary font-normal">{top.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Active Trip Attachment Card */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                      2. Itinerary Aktif yang Dilampirkan:
                    </label>
                    <Link
                      href="/itinerary"
                      className="text-[11px] font-bold text-brand-deepTeal hover:text-brand-teal transition"
                    >
                      Ubah Rute
                    </Link>
                  </div>

                  <div className="p-4 rounded-2xl bg-brand-surface border border-gray-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-dark line-clamp-1">
                        {trip.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white border border-gray-200 text-brand-secondary">
                        {trip.partySize} Orang
                      </span>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                      {[
                        { img: "/images/image_52.jpg", name: "Suluban Cave" },
                        { img: "/images/image_53.jpg", name: "Uluwatu Cliff" },
                        { img: "/images/image_54.jpg", name: "Tegalalang" },
                        { img: "/images/image_55.jpg", name: "Seminyak Cafe" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 border border-gray-200 bg-gray-100"
                          title={item.name}
                        >
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Catatan & Gaya Liburan */}
                <div className="space-y-2">
                  <label htmlFor="notes-area" className="text-xs font-bold uppercase tracking-wider text-brand-dark block">
                    3. Cerita & Pertanyaan Rute:
                  </label>
                  <textarea
                    id="notes-area"
                    rows={4}
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-brand-dark placeholder-gray-400 focus:border-brand-teal focus:outline-none resize-none leading-relaxed"
                  />

                  {/* Quick Tag Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-brand-secondary font-medium mr-1">
                      Quick tags:
                    </span>
                    {quickTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddTag(tag)}
                        className="px-2.5 py-1 rounded-xl bg-gray-100 hover:bg-teal-50 text-brand-secondary hover:text-brand-deepTeal text-[11px] font-mono font-medium transition border border-transparent hover:border-brand-teal/20"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Kontak WhatsApp */}
                <div className="space-y-2">
                  <label htmlFor="phone-input" className="text-xs font-bold uppercase tracking-wider text-brand-dark block">
                    4. Nomor WhatsApp untuk Hasil Review:
                  </label>
                  <div className="relative">
                    <input
                      id="phone-input"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-brand-dark font-mono focus:border-brand-teal focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-brand-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-brand-pillDark hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
                >
                  <Send className="w-4 h-4 text-brand-teal" />
                  <span>Kirim Permintaan ke Mimin Putu · Estimasi 10 Menit</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Live Mimin Review Simulation (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-soft space-y-5">
              {/* Header Status Tracker */}
              <div className="pb-3 border-b border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-brand-dark font-sans">
                    Hasil Review Mimin Putu
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                    2 Saran Siap
                  </span>
                </div>
                <p className="text-xs text-brand-secondary leading-relaxed">
                  Rekomendasi taktis langsung dari kurator lokal. Kamu bebas menerima atau menolak saran dengan 1 klik.
                </p>
              </div>

              {/* Status Progress Pipeline */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-brand-surface border border-gray-200/60 text-[11px]">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Draf Masuk</span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-deepTeal font-bold">
                  <Clock className="w-3.5 h-3.5 text-brand-teal animate-spin" />
                  <span>Ditinjau</span>
                </div>
                <div className="flex items-center gap-1.5 text-brand-dark font-bold">
                  <span className="w-2 h-2 rounded-full bg-brand-teal" />
                  <span>Saran Siap</span>
                </div>
              </div>

              {/* Suggestion Cards */}
              <div className="space-y-4">
                {trip.suggestions.map((sug) => {
                  return (
                    <div
                      key={sug.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 space-y-3 ${
                        sug.applied
                          ? "bg-teal-50/50 border-brand-teal/40"
                          : "bg-white border-gray-200/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-brand-surface text-brand-deepTeal border border-brand-teal/20">
                            {sug.type === "reorder" ? "OPTIMASI JADWAL" : "REKOMENDASI LOKAL"}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-brand-dark leading-snug">
                            {sug.title}
                          </h4>
                        </div>

                        {sug.applied && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex-shrink-0">
                            <Check className="w-3 h-3" />
                            <span>Diterapkan</span>
                          </span>
                        )}
                      </div>

                      {/* Mimin Voice Quote */}
                      <div className="p-3.5 rounded-xl bg-white border border-gray-100 text-xs text-brand-dark/90 leading-relaxed italic border-l-4 border-l-brand-teal">
                        &ldquo;{sug.miminVoiceQuote}&rdquo;
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        {!sug.applied ? (
                          <button
                            type="button"
                            onClick={() => applySuggestion(sug.id)}
                            className="px-4 py-2 rounded-xl bg-brand-teal text-brand-dark text-xs font-bold hover:bg-teal-400 transition shadow-sm"
                          >
                            {sug.actionLabel}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => revertSuggestion(sug.id)}
                            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-secondary text-xs font-medium transition"
                          >
                            Kembalikan ke Rute Awal
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct WhatsApp Handoff Engine */}
              <div className="pt-2 border-t border-gray-100 space-y-3">
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Chat Mimin via WhatsApp (Langsung Nyambung)</span>
                  <ExternalLink className="w-4 h-4 opacity-75 ml-1" />
                </button>
                <div className="text-center text-[11px] text-brand-secondary font-medium">
                  Rata-rata dibalas dalam &lt; 10 menit · Konsultasi rute gratis
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Dock */}
      <MobileBottomNav
        onOpenMimin={() => {}}
        onOpenWishlist={() => {}}
        savedCount={3}
      />
    </div>
  );
}
