"use client";

import React, { useState } from "react";
import { X, MessageCircle, Send, Sparkles, CheckCircle2 } from "lucide-react";

interface MiminModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  defaultSpot?: string;
}

export default function MiminModal({
  isOpen,
  onClose,
  defaultTopic = "Validasi Itinerary",
  defaultSpot = "",
}: MiminModalProps) {
  const [topic, setTopic] = useState<string>(defaultTopic);
  const [travelers, setTravelers] = useState<string>("Grup Teman (3-4 orang)");
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState<string>(
    defaultSpot ? `Mimin, mau tanya info rute & waktu terbaik ke ${defaultSpot} dong!` : ""
  );

  if (!isOpen) return null;

  const topics = [
    "Validasi Itinerary Liburan",
    "Rekomendasi Cafe & Hidden Gem",
    "Sewa Motor & Transport Aman",
    "Konsultasi Trip Custom",
  ];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "6281234567890"; // WhatsApp Hotline
    const message = `Halo Mimin KelanaBali! 👋\n\nSaya mau konsultasi liburan:\n• Topik: ${topic}\n• Jumlah Traveler: ${travelers}\n• Perkiraan Tanggal: ${
      date || "Belum pasti"
    }\n• Pertanyaan: ${note || "Mau tanya rute asik tanpa macet!"}\n\nMohon bantuannya ya mimin, makasii!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto no-scrollbar shadow-float relative border border-gray-100 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-dark transition"
          aria-label="Tutup form"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-surface text-brand-deepTeal text-xs font-bold border border-brand-teal/20">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            <span>Local Buddy KelanaBali</span>
          </div>
          <h3 className="text-2xl font-extrabold text-brand-dark tracking-tight">
            Tanya Mimin Sekarang
          </h3>
          <p className="text-xs sm:text-sm text-brand-secondary">
            Diskusi santai dan gratis bareng orang lokal Bali. No drama, no wacana!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          {/* Topik */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block">
              Pilih Topik Bantuan
            </label>
            <div className="grid grid-cols-2 gap-2">
              {topics.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`p-2.5 rounded-xl text-left text-xs font-semibold border transition ${
                    topic === t
                      ? "bg-brand-surface border-brand-teal text-brand-deepTeal shadow-sm"
                      : "bg-white border-gray-200 text-brand-secondary hover:border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Traveler Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block">
              Gaya Traveling Kamu
            </label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-brand-dark focus:border-brand-teal focus:outline-none bg-white"
            >
              <option value="Solo Traveler (Healing Sendiri)">Solo Traveler (Healing Sendiri)</option>
              <option value="Couple / Berdua">Couple / Berdua</option>
              <option value="Grup Teman (3-4 orang)">Grup Teman (3-4 orang)</option>
              <option value="Rombongan Besar (5+ orang)">Rombongan Besar (5+ orang)</option>
            </select>
          </div>

          {/* Tanggal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block">
              Perkiraan Tanggal Trip
            </label>
            <input
              type="text"
              placeholder="Contoh: Akhir bulan depan / 12-16 Des"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-brand-dark placeholder-gray-400 focus:border-brand-teal focus:outline-none"
            />
          </div>

          {/* Note / Pertanyaan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-brand-dark uppercase tracking-wider block">
              Pertanyaan atau Rencana Spot
            </label>
            <textarea
              rows={3}
              placeholder="Tulis spot yang pengen kamu datangi, atau kendala yang bikin bingung..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-brand-dark placeholder-gray-400 focus:border-brand-teal focus:outline-none resize-none"
            />
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-50/60 border border-teal-100 text-[11px] text-brand-deepTeal">
            <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
            <span>Respons cepat dalam 15-30 menit di jam operasional (08:00 - 21:00 WITA)</span>
          </div>

          {/* Submit WhatsApp Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-full bg-brand-pillDark hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow transition"
          >
            <MessageCircle className="w-4 h-4 text-brand-teal" />
            <span>Lanjut Chat ke WhatsApp Mimin</span>
            <Send className="w-3.5 h-3.5 text-white/70 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}

