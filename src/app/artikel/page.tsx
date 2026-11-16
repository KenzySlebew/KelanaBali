"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  MapPin,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Bookmark,
  PlusCircle,
  ExternalLink,
  Wifi,
  Sparkles,
  Waves,
  ArrowRight,
  ChevronRight,
  Send,
  Compass,
  Star,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import SpotModal from "@/components/SpotModal";
import MiminModal from "@/components/MiminModal";
import WishlistDrawer from "@/components/WishlistDrawer";
import { ALL_SPOTS, Spot } from "@/data/mockData";
import { useTripStore } from "@/data/tripStore";

interface RelatedArticleItem {
  id: string;
  category: string;
  readTime: string;
  region: string;
  updatedDate: string;
  title: string;
  excerpt: string;
  author: string;
  image: string;
}

const RELATED_ARTICLES: RelatedArticleItem[] = [
  {
    id: "ngopi-ubud",
    category: "Work & Focus",
    readTime: "4 mnt baca",
    region: "Ubud & Tegallalang",
    updatedDate: "14 Mei 2026",
    title: "5 Kafe Tenang di Ubud untuk Kerja Tanpa Bising",
    excerpt:
      "Pilihan tempat ngopi di tengah rimbunnya lembah hijau Ubud dengan koneksi internet serat optik yang stabil dan tata letak meja yang nyaman untuk fokus bekerja.",
    author: "Mimin Putu",
    image: "/images/image_60.jpg",
  },
  {
    id: "kopi-kintamani",
    category: "Kuliner Lokal",
    readTime: "6 mnt baca",
    region: "Kintamani & Batur",
    updatedDate: "10 Mei 2026",
    title: "Catatan Rasa Kopi Arabika Kintamani dari Lereng Batur",
    excerpt:
      "Menelusuri kebun kopi vulkanis di ketinggian 1.300 mdpl dan kebiasaan petani lokal mengolah ceri kopi menjadi seduhan sedap berkarakter sitrus alami.",
    author: "Mimin Wayan",
    image: "/images/image_61.jpg",
  },
  {
    id: "budget-solo-trip",
    category: "Tips & Budget",
    readTime: "7 mnt baca",
    region: "Selatan & Tengah",
    updatedDate: "06 Mei 2026",
    title: "Rincian Biaya Solo Trip 4 Hari di Bali yang Masuk Akal",
    excerpt:
      "Hitungan pengeluaran harian yang realistis, mulai dari sewa skuter matic, rekomendasi penginapan bersih, hingga daftar warung makan lokal dengan porsi mengenyangkan.",
    author: "Mimin Ketut",
    image: "/images/image_62.jpg",
  },
];

const CATEGORIES = [
  "Semua Cerita",
  "Cafe & Kuliner",
  "Hidden Gems Alam",
  "Etika & Budaya",
  "Rute & Panduan",
];

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("Cafe & Kuliner");
  const [isCopied, setIsCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Spot detail modal
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  // Mimin modal
  const [isMiminOpen, setIsMiminOpen] = useState(false);

  // Wishlist drawer
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>(["crate-cafe"]);

  // Newsletter state
  const [emailInput, setEmailInput] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Trip store hook
  const { addCangguCoffeeRoute, trip } = useTripStore();
  const [isRouteAdded, setIsRouteAdded] = useState(false);

  // Check if route spots already in trip
  useEffect(() => {
    const day4 = trip.days[3];
    if (day4) {
      const hasCrate = day4.slots.some((s) => s.spotId === "crate-cafe");
      const hasLawn = day4.slots.some((s) => s.spotId === "the-lawn");
      if (hasCrate && hasLawn) {
        setIsRouteAdded(true);
      }
    }
  }, [trip]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      showToast("Tautan artikel berhasil disalin!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleToggleSaveSpot = (spot: Spot) => {
    setSavedSpotIds((prev) => {
      const exists = prev.includes(spot.id);
      if (exists) {
        showToast(`${spot.title} dihapus dari wishlist`);
        return prev.filter((id) => id !== spot.id);
      } else {
        showToast(`${spot.title} disimpan ke wishlist!`);
        return [...prev, spot.id];
      }
    });
  };

  const handleAddMiniRouteToTrip = () => {
    addCangguCoffeeRoute();
    setIsRouteAdded(true);
    showToast("Rute ngopi Canggu (2 spot) berhasil ditambahkan ke Day 4 Itinerary!");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      showToast("Mohon masukkan alamat email yang valid");
      return;
    }
    setIsSubscribed(true);
    showToast("Terima kasih! Rekomendasi mingguan Mimin akan dikirim tiap Kamis.");
  };

  // Find spots in ALL_SPOTS
  const crateSpot = ALL_SPOTS.find((s) => s.id === "crate-cafe") || null;
  const lawnSpot = ALL_SPOTS.find((s) => s.id === "the-lawn") || null;

  return (
    <div className="relative min-h-screen bg-brand-surface selection:bg-brand-teal/20 selection:text-brand-dark">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-2.5 px-4 py-3 bg-brand-dark text-white text-xs sm:text-sm font-medium rounded-2xl shadow-float animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-16">
        {/* Sticky Top Navbar */}
        <Navbar onOpenMimin={() => setIsMiminOpen(true)} />

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mt-2 mb-6">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs text-brand-secondary">
            <li>
              <Link href="/" className="hover:text-brand-dark transition">
                Beranda
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </li>
            <li>
              <Link href="/artikel" className="text-brand-dark font-medium">
                Jurnal Kelana
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </li>
            <li>
              <span className="text-brand-secondary">Kuliner &amp; Cafe Culture</span>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </li>
            <li className="text-brand-teal font-semibold">Canggu &amp; Pererenan</li>
          </ol>
        </nav>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-gray-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-brand-pillDark text-white shadow-sm"
                  : "bg-white text-brand-secondary hover:text-brand-dark border border-gray-100 hover:border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ======================================================== */}
        {/* ARTICLE HEADER & METADATA                                */}
        {/* ======================================================== */}
        <header className="max-w-4xl mx-auto space-y-5 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-teal-50 text-brand-deepTeal text-[11px] font-bold tracking-wider uppercase border border-brand-teal/20">
              Edisi Spesial #07 · Pesisir Canggu
            </span>
            <span className="flex items-center gap-1.5 text-xs text-brand-secondary">
              <Clock className="w-3.5 h-3.5 text-brand-teal" />
              5 menit baca
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-brand-secondary">
              Kurasi oleh <strong className="text-brand-dark font-semibold">Mimin Putu</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-dark tracking-tight leading-[1.18]">
            Alasan Americano Dingin Jadi Pilihan Paling Masuk Akal Buat Pagi Hari di Canggu
          </h1>

          <p className="text-base sm:text-lg text-brand-secondary leading-relaxed font-sans">
            Udara pesisir Canggu cepat terasa gerah begitu matahari naik. Buat yang terbiasa membuka laptop di tepi sawah atau bersiap ke pantai, kopi hitam dingin berbahan biji Kintamani terasa jauh lebih ramah di lambung dibanding susu panas.
          </p>

          {/* Author & Action Bar */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Author Portrait */}
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-teal/30">
                <Image
                  src="/images/image_56.jpg"
                  alt="Mimin Putu"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-brand-dark">Mimin Putu</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-brand-secondary">
                    Local Guide
                  </span>
                </div>
                <p className="text-xs text-brand-secondary mt-0.5">
                  Diperbarui 18 Mei 2026 · Terverifikasi Langsung di Lokasi
                </p>
              </div>
            </div>

            {/* Quick Share / Ask Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 text-xs font-semibold text-brand-dark hover:bg-gray-50 transition"
                title="Salin tautan artikel"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{isCopied ? "Tersalin" : "Salin Tautan"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMiminOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-pillDark text-white text-xs font-semibold hover:bg-black transition shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-teal" />
                <span>Tanya Mimin</span>
              </button>
            </div>
          </div>
        </header>

        {/* ======================================================== */}
        {/* HERO IMAGE SHOWCASE                                      */}
        {/* ======================================================== */}
        <figure className="max-w-5xl mx-auto mb-12">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 shadow-soft">
            <Image
              src="/images/image_57.jpg"
              alt="Pagi tenang di Echo Beach Canggu"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
          <figcaption className="flex items-center justify-between text-xs text-brand-secondary mt-3 px-2">
            <span>Pagi tenang di Echo Beach, Canggu · 07:45 WITA</span>
            <span className="font-medium">Foto: Tim Editorial KelanaBali</span>
          </figcaption>
        </figure>

        {/* ======================================================== */}
        {/* 2-COLUMN LAYOUT: EDITORIAL PROSE (8) + SIDEBAR (4)       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Editorial Text (Left 8 Cols) */}
          <article className="lg:col-span-8 space-y-8 text-brand-dark leading-relaxed font-sans">
            {/* Paragraph 1 */}
            <div className="prose prose-lg max-w-none text-brand-dark/90 text-[15px] sm:text-base leading-relaxed space-y-4">
              <p>
                Antara jam tujuh sampai sembilan pagi, Canggu punya ritme yang sangat berbeda. Jalan Padang Linjong dan pesisir Batu Bolong belum padat antrean motor matic sewaan, dan deretan beach club belum mulai memutar musik kencang.
              </p>
              <p>
                Matahari baru saja naik di ufuk timur. Udara pagi masih membawa semilir angin laut yang sejuk, berpadu dengan aroma tanah sawah yang baru dialiri air irigasi. Bagi banyak orang yang tinggal atau bekerja jarak jauh di sini, jeda pagi ini adalah waktu paling tenang sebelum kesibukan hari dimulai.
              </p>
            </div>

            {/* Section: Kenapa Americano Dingin */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-dark tracking-tight">
                Kenapa Kopi Hitam Dingin Lebih Masuk Akal Dibanding Latte Panas?
              </h2>

              <p className="text-[15px] sm:text-base text-brand-secondary leading-relaxed">
                Di iklim pesisir dengan kelembapan tinggi, minuman berbasis susu kental seperti latte atau flat white hangat sering kali terasa terlalu berat di perut saat matahari mulai terik. Secangkir americano dingin memberikan asupan kafein yang bersih tanpa meninggalkan sisa rasa lemak di lidah.
              </p>

              <p className="text-[15px] sm:text-base text-brand-secondary leading-relaxed">
                Apalagi jika kafe tersebut menyeduh biji kopi Arabika dari Kintamani yang diproses <em>natural</em> atau <em>honey</em>. Profil rasanya cenderung memiliki keasaman sitrus segar menyerupai jeruk bali merah dengan sentuhan manis karamel lembut di akhir. Ketika diseduh double shot dan dituangkan di atas es batu bening, rasanya segar dan pas diminum perlahan sambil menatap hamparan sawah hijau.
              </p>
            </div>

            {/* Pull Quote Box */}
            <blockquote className="my-8 p-6 sm:p-8 rounded-3xl bg-teal-50/70 border-l-4 border-brand-teal text-brand-dark space-y-3">
              <p className="font-serif italic text-lg sm:text-xl text-brand-deepTeal leading-relaxed">
                “Ngopi pagi di Canggu selalu jadi momen transisi terbaik: duduk santai menghirup udara pantai sebelum memutuskan mau ke mana hari ini.”
              </p>
              <cite className="block text-xs font-bold uppercase tracking-wider text-brand-secondary not-italic">
                — Mimin Putu, Kurator Lokal KelanaBali
              </cite>
            </blockquote>

            {/* ======================================================== */}
            {/* SPOT KURASI #01: CRATE CAFE & BAKERY                     */}
            {/* ======================================================== */}
            <section className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-100 shadow-soft space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-brand-teal">
                  SPOT KURASI #01
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9
                  </span>
                  <span className="text-xs text-brand-secondary">(1.2k ulasan)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/image_58.jpg"
                    alt="Crate Cafe Canggu"
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-pillDark/90 backdrop-blur-sm text-white text-[10px] font-bold">
                    Work Friendly
                  </span>
                </div>

                <div className="sm:col-span-7 space-y-2.5">
                  <h3 className="text-xl font-bold text-brand-dark tracking-tight">
                    Crate Cafe &amp; Bakery Canggu
                  </h3>
                  <p className="text-xs text-brand-secondary flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                    Jl. Canggu Padang Linjong No.49 · 06:00 – 16:00 WITA
                  </p>
                  <p className="text-xs text-brand-secondary flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                    Wi-Fi 120 Mbps &amp; Colokan Melimpah · Mulai Rp 35.000
                  </p>
                  <p className="text-xs italic text-brand-secondary bg-gray-50 p-3 rounded-xl border border-gray-100">
                    “Spot wajib para digital nomad. Iced americano-nya memakai beans Kintamani single origin dengan acidity yang segar. Datanglah sebelum jam 8 pagi kalau ingin sofa pinggir sawah.”
                  </p>
                </div>
              </div>

              {/* Spot Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (crateSpot) handleToggleSaveSpot(crateSpot);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold transition ${
                    savedSpotIds.includes("crate-cafe")
                      ? "bg-teal-50 text-brand-deepTeal border border-brand-teal/40"
                      : "bg-brand-pillDark text-white hover:bg-black"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedSpotIds.includes("crate-cafe") ? "fill-brand-teal text-brand-teal" : ""
                    }`}
                  />
                  <span>
                    {savedSpotIds.includes("crate-cafe")
                      ? "Tersimpan di Wishlist"
                      : "+ Simpan ke Trip Planner"}
                  </span>
                </button>

                {crateSpot && (
                  <button
                    type="button"
                    onClick={() => setSelectedSpot(crateSpot)}
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-full border border-gray-200 text-xs font-semibold text-brand-dark hover:bg-gray-50 transition"
                  >
                    <span>Detail Spot</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-secondary" />
                  </button>
                )}
              </div>
            </section>

            {/* Section: 3 Etika Kerja di Kafe Bali */}
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-dark tracking-tight">
                Tiga Etika Kerja di Kafe Bali yang Perlu Diingat
              </h2>
              <p className="text-[15px] sm:text-base text-brand-secondary leading-relaxed">
                Canggu memang menjadi titik kumpul para pekerja jarak jauh dari berbagai negara. Namun, agar kenyamanan bersama tetap terjaga, ada beberapa kebiasaan sederhana yang patut dihormati:
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-50 text-brand-deepTeal font-bold flex items-center justify-center text-xs">
                    01
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-dark">
                      Perhatikan durasi duduk dan pesanan
                    </h4>
                    <p className="text-xs text-brand-secondary leading-relaxed">
                      Jika menempati meja dan memanfaatkan colokan listrik lebih dari dua jam, pesanlah menu tambahan seperti camilan atau kopi kedua sebagai bentuk apresiasi kepada pengelola kafe.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-50 text-brand-deepTeal font-bold flex items-center justify-center text-xs">
                    02
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-dark">
                      Sapa staf dengan santun
                    </h4>
                    <p className="text-xs text-brand-secondary leading-relaxed">
                      Keramahan di Bali selalu dua arah. Senyuman hangat dan sapaan sederhana seperti salam pagi atau ucapan terima kasih tulus membuat interaksi sehari-hari terasa lebih menyenangkan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-50 text-brand-deepTeal font-bold flex items-center justify-center text-xs">
                    03
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-brand-dark">
                      Parkir motor dengan tertib dan hormati canang sari
                    </h4>
                    <p className="text-xs text-brand-secondary leading-relaxed">
                      Letakkan motor rapi di area parkir yang ditentukan. Pastikan roda tidak menutupi akses jalan masuk rumah warga atau menginjak canang sari yang baru saja diletakkan di pagi hari.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transition Paragraph */}
            <p className="text-[15px] sm:text-base text-brand-secondary leading-relaxed">
              Begitu laptop ditutup menjelang siang, perpindahan paling menyenangkan adalah meluncur santai ke arah Pantai Batu Bolong untuk menikmati semilir angin laut lepas.
            </p>

            {/* ======================================================== */}
            {/* SPOT KURASI #02: THE LAWN CANGGU                         */}
            {/* ======================================================== */}
            <section className="p-6 sm:p-7 rounded-3xl bg-white border border-gray-100 shadow-soft space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-brand-teal">
                  SPOT KURASI #02
                </span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.8
                  </span>
                  <span className="text-xs text-brand-secondary">(890 ulasan)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/image_59.jpg"
                    alt="The Lawn Canggu Morning Deck"
                    fill
                    sizes="(max-width: 640px) 100vw, 300px"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-pillDark/90 backdrop-blur-sm text-white text-[10px] font-bold">
                    Oceanfront
                  </span>
                </div>

                <div className="sm:col-span-7 space-y-2.5">
                  <h3 className="text-xl font-bold text-brand-dark tracking-tight">
                    The Lawn Canggu - Morning Deck
                  </h3>
                  <p className="text-xs text-brand-secondary flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                    Batu Bolong Beachfront, Canggu · 09:00 – 23:00 WITA
                  </p>
                  <p className="text-xs text-brand-secondary flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                    Pemandangan Ombak Lepas · Mulai Rp 45.000
                  </p>
                  <p className="text-xs italic text-brand-secondary bg-gray-50 p-3 rounded-xl border border-gray-100">
                    “Jika ingin duduk tenang menghadap peselancar yang mengejar ombak pertama, datanglah saat dek baru dibuka jam 9 pagi. Suasananya sejuk dan belum ramai musik sore.”
                  </p>
                </div>
              </div>

              {/* Spot Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (lawnSpot) handleToggleSaveSpot(lawnSpot);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold transition ${
                    savedSpotIds.includes("the-lawn")
                      ? "bg-teal-50 text-brand-deepTeal border border-brand-teal/40"
                      : "bg-brand-pillDark text-white hover:bg-black"
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedSpotIds.includes("the-lawn") ? "fill-brand-teal text-brand-teal" : ""
                    }`}
                  />
                  <span>
                    {savedSpotIds.includes("the-lawn")
                      ? "Tersimpan di Wishlist"
                      : "+ Simpan ke Trip Planner"}
                  </span>
                </button>

                {lawnSpot && (
                  <button
                    type="button"
                    onClick={() => setSelectedSpot(lawnSpot)}
                    className="flex items-center gap-1.5 py-2.5 px-4 rounded-full border border-gray-200 text-xs font-semibold text-brand-dark hover:bg-gray-50 transition"
                  >
                    <span>Detail Spot</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-secondary" />
                  </button>
                )}
              </div>
            </section>

            {/* Closing Note & Tags */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <p className="text-sm text-brand-secondary leading-relaxed">
                Rute ngopi pagi ini cocok dijalani santai dengan skuter matic. Kawan Kelana bisa menyimpan kedua spot di atas langsung ke dalam perencana perjalanan agar siap dijalankan saat berada di Bali.
              </p>
              <div className="flex items-center flex-wrap gap-2 pt-2">
                <span className="text-xs text-brand-secondary font-medium mr-1">Topik:</span>
                {["#CangguVibes", "#NgopiPagi", "#WorkFromBali", "#EchoBeach"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-brand-secondary hover:text-brand-dark hover:border-gray-300 transition cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* ======================================================== */}
          {/* STICKY SIDEBAR (Right 4 Cols)                            */}
          {/* ======================================================== */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Widget 1: Rute Mini Artikel Ini */}
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-soft space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-teal block">
                    Rute Mini Artikel Ini
                  </span>
                  <h3 className="text-base font-bold text-brand-dark mt-0.5">
                    Canggu Morning Coffee Walk
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-50 text-brand-deepTeal text-[11px] font-bold">
                  Est. 3-4 Jam
                </span>
              </div>

              {/* Sequential Timeline Stops */}
              <div className="space-y-3 relative pl-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-100">
                {/* Stop 1 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-brand-teal text-brand-dark text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-dark">Crate Cafe Canggu</span>
                    <span className="text-[11px] text-brand-secondary">07:30 WITA</span>
                  </div>
                  <p className="text-[11px] text-brand-secondary">
                    Sarapan sehat &amp; es americano di teras tepi sawah.
                  </p>
                </div>

                {/* Transit Badge */}
                <div className="py-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-[10px] text-brand-secondary font-medium">
                    🛵 8 menit berkendara motor (2.1 km)
                  </span>
                </div>

                {/* Stop 2 */}
                <div className="relative space-y-1">
                  <span className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-brand-dark text-white text-[11px] font-bold flex items-center justify-center">
                    2
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-dark">The Lawn Morning Deck</span>
                    <span className="text-[11px] text-brand-secondary">09:30 WITA</span>
                  </div>
                  <p className="text-[11px] text-brand-secondary">
                    Duduk santai di dek kayu menghadap deburan ombak Batu Bolong.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddMiniRouteToTrip}
                  className={`w-full py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                    isRouteAdded
                      ? "bg-teal-50 border border-brand-teal text-brand-deepTeal"
                      : "bg-brand-pillDark text-white hover:bg-black"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${isRouteAdded ? "text-brand-teal" : "text-white"}`}
                  />
                  <span>{isRouteAdded ? "Sudah di Itinerary Day 4" : "Jadikan Itinerary Saya"}</span>
                </button>

                <Link
                  href="/itinerary"
                  className="w-full py-2.5 px-4 rounded-full border border-gray-200 text-xs font-semibold text-brand-dark hover:bg-gray-50 flex items-center justify-center gap-1.5 transition text-center"
                >
                  <span>Buka di Itinerary Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Widget 2: Tanya Mimin Quick Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-500/10 via-brand-surface to-white border border-brand-teal/20 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-brand-dark font-bold text-sm">
                  MP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-dark">Punya Pertanyaan Canggu?</h4>
                  <p className="text-[11px] text-brand-secondary">Mimin Putu siap bantu rekomendasi</p>
                </div>
              </div>
              <p className="text-xs text-brand-secondary leading-relaxed">
                Mau tahu kafe yang buka lebih pagi di Pererenan atau tempat sewa motor terpercaya di sekitar Echo Beach?
              </p>
              <button
                type="button"
                onClick={() => setIsMiminOpen(true)}
                className="w-full py-2.5 rounded-full bg-white border border-brand-teal/30 text-brand-deepTeal text-xs font-bold hover:bg-teal-50 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-teal" />
                <span>Konsultasi Bebas Biaya</span>
              </button>
            </div>
          </aside>
        </div>

        {/* ======================================================== */}
        {/* RELATED ARTICLES SECTION                                 */}
        {/* ======================================================== */}
        <section className="mt-16 pt-12 border-t border-gray-100 space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block mb-1">
                BACA ARTIKEL LAINNYA
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-dark tracking-tight">
                Jurnal Kelana Terkait
              </h2>
            </div>
            <Link
              href="/explore"
              className="text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-deepTeal flex items-center gap-1.5 transition"
            >
              <span>Jelajahi Semua Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_ARTICLES.map((article) => (
              <article
                key={article.id}
                className="group rounded-3xl bg-white border border-gray-100 overflow-hidden shadow-soft hover:shadow-float transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-pillDark/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-wider uppercase">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-xs text-brand-secondary">
                      <span>{article.region}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-bold text-base text-brand-dark group-hover:text-brand-deepTeal transition leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-brand-secondary leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-brand-dark">
                  <span>{article.author}</span>
                  <span className="text-brand-teal group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Baca Catatan →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* NEWSLETTER: SURAT KELANA MINGGUAN                         */}
        {/* ======================================================== */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl bg-brand-pillDark text-white relative overflow-hidden shadow-float">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-brand-teal block">
              SURAT KELANA MINGGUAN
            </span>

            <h2 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight">
              Dapatkan Rekomendasi Spot Tenang Mingguan dari Mimin
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Setiap Kamis pagi, kami mengirimkan kurasi tiga spot hening pilihan, catatan rute bebas macet, dan tips praktis menjelajahi Bali langsung ke email Anda.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
            >
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                aria-label="Alamat email untuk buletin mingguan KelanaBali"
                placeholder="Masukkan alamat email Anda"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={isSubscribed}
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSubscribed}
                className="px-6 py-3 rounded-full bg-brand-teal text-brand-dark text-xs font-bold hover:bg-teal-300 transition flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-75"
              >
                <span>{isSubscribed ? "Terdaftar" : "Langganan Gratis"}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <p className="text-[11px] text-gray-400 pt-1">
              Bebas email berantai yang mengganggu · Anda dapat berhenti berlangganan kapan saja
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16">
          <Footer />
        </div>
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
        onSelectSpot={(spot) => setSelectedSpot(spot)}
        onSendWishlistToMimin={() => {
          setIsWishlistOpen(false);
          setIsMiminOpen(true);
        }}
      />

      {/* Spot Detail Modal */}
      <SpotModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        onSaveSpot={handleToggleSaveSpot}
        isSaved={selectedSpot ? savedSpotIds.includes(selectedSpot.id) : false}
        onAskMimin={() => {
          setSelectedSpot(null);
          setIsMiminOpen(true);
        }}
      />

      {/* Mimin Modal */}
      <MiminModal
        isOpen={isMiminOpen}
        onClose={() => setIsMiminOpen(false)}
        defaultTopic="Rekomendasi Cafe & Hidden Gem Pesisir"
        defaultSpot="Crate Cafe & The Lawn Canggu"
      />
    </div>
  );
}
