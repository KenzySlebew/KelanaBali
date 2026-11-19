"use client";

import { useState, useEffect } from "react";

export interface TransitInfo {
  motorMins: number;
  carMins: number;
  distanceKm: number;
}

export interface ItinerarySlot {
  id: string;
  timeSlot: "Pagi" | "Siang" | "Sore" | "Malam";
  timeRange: string;
  spotId: string;
  title: string;
  category: string;
  location: string;
  image: string;
  entryFee: string;
  costNum: number;
  notes: string;
  transitToNext?: TransitInfo;
}

export interface DayPlan {
  dayNumber: number;
  dateLabel: string;
  title: string;
  region: string;
  stayArea: string;
  totalKm: number;
  totalDriveTime: string;
  slots: ItinerarySlot[];
  trafficWarning?: {
    message: string;
    suggestedShiftMins: number;
    resolved: boolean;
  };
}

export interface MiminSuggestion {
  id: string;
  type: "reorder" | "replace_spot";
  title: string;
  miminVoiceQuote: string;
  actionLabel: string;
  applied: boolean;
}

export interface TripState {
  id: string;
  title: string;
  datesLabel: string;
  partySize: number;
  travelerNames: string[];
  activeDayIndex: number;
  days: DayPlan[];
  suggestions: MiminSuggestion[];
  source?: "planner" | "default";
  durationDays?: number;
  selectedVibeIds?: string[];
  groupType?: string;
  budgetTier?: number;
  basecampArea?: string;
  savedAt?: string;
}

export const INITIAL_TRIP_STATE: TripState = {
  id: "kelanabali-trip-01",
  title: "Trip Santai Bestie 5D4N: Bali Vibe Healing & Sunset Catching",
  datesLabel: "14 - 18 Mei 2026",
  partySize: 4,
  travelerNames: ["Raka (You)", "Naya", "Dimas", "Sarah"],
  activeDayIndex: 0,
  days: [
    {
      dayNumber: 1,
      dateLabel: "14 Mei",
      title: "Uluwatu Coastline",
      region: "Bukit & Uluwatu",
      stayArea: "Bingin / Pecatu",
      totalKm: 28.4,
      totalDriveTime: "1j 45m",
      trafficWarning: {
        message:
          "Jalur dari Nyang Nyang ke Single Fin padat mulai jam 17:00 WITA. Tarik waktu berangkat 30 menit lebih awal agar tidak terlambat golden hour tebing.",
        suggestedShiftMins: 30,
        resolved: false,
      },
      slots: [
        {
          id: "slot-1",
          timeSlot: "Pagi",
          timeRange: "08:30 - 11:30 WITA",
          spotId: "nyang-nyang",
          title: "Nyang Nyang Beach",
          category: "Beach Chill",
          location: "Uluwatu Selatan",
          image: "/images/image_46.jpg",
          entryFee: "Rp 5.000 / motor",
          costNum: 5000,
          notes: "Air surut pagi sangat cocok untuk jalan santai ke karang hijau & spot foto bangkai kapal terdampar.",
          transitToNext: {
            motorMins: 20,
            carMins: 35,
            distanceKm: 7.8,
          },
        },
        {
          id: "slot-2",
          timeSlot: "Siang",
          timeRange: "12:00 - 15:00 WITA",
          spotId: "single-fin-suluban",
          title: "Single Fin & Suluban Cave",
          category: "Lunch & Cafe Chill",
          location: "Pantai Suluban",
          image: "/images/image_47.jpg",
          entryFee: "Gratis (Beli makan/minum)",
          costNum: 85000,
          notes: "Balkon atas Single Fin pas untuk nonton peselancar pro sambil isi tenaga cold brew.",
          transitToNext: {
            motorMins: 15,
            carMins: 25,
            distanceKm: 5.2,
          },
        },
        {
          id: "slot-3",
          timeSlot: "Sore",
          timeRange: "15:30 - 18:30 WITA",
          spotId: "uluwatu-kecak",
          title: "Pura Luhur Uluwatu & Tari Kecak",
          category: "Culture & Epic Sunset",
          location: "Tebing Uluwatu",
          image: "/images/image_48.jpg",
          entryFee: "Rp 150.000 / tiket Kecak",
          costNum: 150000,
          notes: "Tukar tiket Kecak sebelum jam 16:30 WITA agar dapat kursi baris tengah yang menghadap langsung matahari terbenam.",
          transitToNext: {
            motorMins: 30,
            carMins: 45,
            distanceKm: 12.4,
          },
        },
        {
          id: "slot-4",
          timeSlot: "Malam",
          timeRange: "19:30 - 21:30 WITA",
          spotId: "kedonganan-seafood",
          title: "Seafood Bakar Nelayan Kedonganan",
          category: "Dinner & Beach Vibe",
          location: "Pantai Kedonganan",
          image: "/images/image_49.jpg",
          entryFee: "Kisaran Rp 75.000 / orang",
          costNum: 75000,
          notes: "Pilih ikan langsung dari pasar samping, bakar bumbu khas Jimbaran. Lebih hemat 40% dari resto turis biasa.",
        },
      ],
    },
    {
      dayNumber: 2,
      dateLabel: "15 Mei",
      title: "Ubud Green & Heritage",
      region: "Ubud & Gianyar",
      stayArea: "Ubud Center",
      totalKm: 22.0,
      totalDriveTime: "1j 15m",
      slots: [
        {
          id: "slot-2-1",
          timeSlot: "Pagi",
          timeRange: "08:00 - 10:30 WITA",
          spotId: "tegalalang",
          title: "Tegalalang Rice Terrace",
          category: "Nature & Sunrise",
          location: "Tegalalang, Gianyar",
          image: "/images/image_54.jpg",
          entryFee: "Rp 25.000 / orang",
          costNum: 25000,
          notes: "Datang pagi saat kabut tipis masih menyelimuti sawah berundak.",
          transitToNext: { motorMins: 15, carMins: 20, distanceKm: 6.0 },
        },
        {
          id: "slot-2-2",
          timeSlot: "Siang",
          timeRange: "11:30 - 14:00 WITA",
          spotId: "campuhan",
          title: "Campuhan Ridge Walk & Cafe",
          category: "Nature Walk & Brunch",
          location: "Ubud Barat",
          image: "/images/spot_campuhan.jpg",
          entryFee: "Gratis",
          costNum: 60000,
          notes: "Jalur bukit hijau yang menenangkan dengan deretan cafe estetik di ujung jalur.",
          transitToNext: { motorMins: 25, carMins: 35, distanceKm: 9.5 },
        },
        {
          id: "slot-2-3",
          timeSlot: "Sore",
          timeRange: "15:00 - 17:30 WITA",
          spotId: "tibumana",
          title: "Air Terjun Tibumana",
          category: "Nature Escape",
          location: "Bangli",
          image: "/images/spot_tibumana_hd.jpg",
          entryFee: "Rp 20.000 / orang",
          costNum: 20000,
          notes: "Kolam alami jernih di bawah air terjun tirai yang rimbun.",
        },
      ],
    },
    {
      dayNumber: 3,
      dateLabel: "16 Mei",
      title: "Kintamani Sunrise & Lake",
      region: "Kintamani & Batur",
      stayArea: "Kintamani Penelokan",
      totalKm: 34.5,
      totalDriveTime: "1j 50m",
      slots: [
        {
          id: "slot-3-1",
          timeSlot: "Pagi",
          timeRange: "06:00 - 09:30 WITA",
          spotId: "kintamani-cafe",
          title: "Sunrise Coffee View Gunung Batur",
          category: "Cafe Chill & View",
          location: "Penelokan, Kintamani",
          image: "/images/image_34.jpg",
          entryFee: "Rp 45.000 / orang",
          costNum: 45000,
          notes: "Nikmati kopi panas dengan pemandangan lautan awan dan kaldera megah.",
        },
      ],
    },
    {
      dayNumber: 4,
      dateLabel: "17 Mei",
      title: "Canggu Sunset & Beach Club",
      region: "Canggu & Seminyak",
      stayArea: "Pererenan / Canggu",
      totalKm: 18.2,
      totalDriveTime: "1j 10m",
      slots: [
        {
          id: "slot-4-1",
          timeSlot: "Sore",
          timeRange: "16:00 - 19:30 WITA",
          spotId: "pererenan-sunset",
          title: "Pererenan Beach Sunset",
          category: "Sunset Chill",
          location: "Pererenan, Canggu",
          image: "/images/image_30.jpg",
          entryFee: "Rp 2.000 / motor",
          costNum: 2000,
          notes: "Pantai pasir hitam dengan suasana lebih tenang dibandingkan Batu Bolong.",
        },
      ],
    },
    {
      dayNumber: 5,
      dateLabel: "18 Mei",
      title: "Seminyak Brunch & Souvenirs",
      region: "Seminyak & Kuta",
      stayArea: "Dekat Bandara",
      totalKm: 14.0,
      totalDriveTime: "55m",
      slots: [
        {
          id: "slot-5-1",
          timeSlot: "Pagi",
          timeRange: "09:30 - 12:30 WITA",
          spotId: "seminyak-brunch",
          title: "Tropical Brunch Seminyak",
          category: "Cafe & OOTD",
          location: "Petitenget, Seminyak",
          image: "/images/image_55.jpg",
          entryFee: "Rp 75.000 / orang",
          costNum: 75000,
          notes: "Tempat brunch nyaman sebelum belanja oleh-oleh khas Bali dan kembali ke bandara.",
        },
      ],
    },
  ],
  suggestions: [
    {
      id: "sug-1",
      type: "reorder",
      title: "Tukar urutan: Ke Suluban Cave jam 13:30 sebelum ke Pura Uluwatu",
      miminVoiceQuote:
        "Halo Raka! Kalau kalian ke Single Fin jam 16:30, parkiran sunset padat luar biasa dan kalian bakal telat nonton Tari Kecak jam 18:00. Saran Mimin: Turun ke Suluban Cave jam 13:30 saat air laut surut (bagus buat foto), lalu meluncur ke Pura Uluwatu jam 15:45 buat tukar tiket baris tengah!",
      actionLabel: "Terima Saran Rute",
      applied: false,
    },
    {
      id: "sug-2",
      type: "replace_spot",
      title: "Ganti Seafood Komersial Jimbaran dengan Warung Nelayan Kedonganan",
      miminVoiceQuote:
        "Kalian bisa pilih ikan segar langsung di pasar basah sampingnya lalu dimasakin bumbu bakar Jimbaran khas Bali asli. Harganya 30-40% lebih bersahabat dan view sunset meja pinggir pantainya tetap dapet 100%!",
      actionLabel: "Terapkan Warung Kedonganan",
      applied: true,
    },
  ],
};

export interface PlannerSyncParams {
  durationDays: number;
  selectedVibeIds: string[];
  groupType: string;
  peopleCount: number;
  budgetTier: number;
  selectedStartDate?: number;
  basecampArea?: string;
}

const DAY_BLUEPRINTS: Omit<DayPlan, "dayNumber" | "dateLabel">[] = [
  // 0. Uluwatu Coastline
  {
    title: "Uluwatu Coastline",
    region: "Bukit & Uluwatu",
    stayArea: "Bingin / Pecatu",
    totalKm: 28.4,
    totalDriveTime: "1j 45m",
    trafficWarning: {
      message:
        "Jalur dari Nyang Nyang ke Single Fin padat mulai jam 17:00 WITA. Tarik waktu berangkat 30 menit lebih awal agar tidak terlambat golden hour tebing.",
      suggestedShiftMins: 30,
      resolved: false,
    },
    slots: [
      {
        id: "slot-d1-1",
        timeSlot: "Pagi",
        timeRange: "08:30 - 11:30 WITA",
        spotId: "nyang-nyang",
        title: "Nyang Nyang Beach",
        category: "Beach Chill",
        location: "Uluwatu Selatan",
        image: "/images/image_46.jpg",
        entryFee: "Rp 5.000 / motor",
        costNum: 5000,
        notes: "Air surut pagi sangat cocok untuk jalan santai ke karang hijau & spot foto bangkai kapal terdampar.",
        transitToNext: { motorMins: 20, carMins: 35, distanceKm: 7.8 },
      },
      {
        id: "slot-d1-2",
        timeSlot: "Siang",
        timeRange: "12:00 - 14:30 WITA",
        spotId: "suluban-cave",
        title: "Suluban Beach Cave",
        category: "Beach Cave",
        location: "Pecatu, Uluwatu",
        image: "/images/spot_suluban_hd.jpg",
        entryFee: "Gratis (Parkir Rp 5.000)",
        costNum: 5000,
        notes: "Akses celah tebing karang ikonik. Paling pas dieksplor saat laut surut sebelum ombak pasang sore.",
        transitToNext: { motorMins: 15, carMins: 25, distanceKm: 4.2 },
      },
      {
        id: "slot-d1-3",
        timeSlot: "Sore",
        timeRange: "16:00 - 18:45 WITA",
        spotId: "melasti-beach",
        title: "Melasti Beach High Cliff Sunset",
        category: "Iconic Sunset",
        location: "Ungasan, Badung",
        image: "/images/image_49.jpg",
        entryFee: "Rp 10.000 / orang",
        costNum: 10000,
        notes: "Tebing kapur megah dan jalan aspal berliku tepi pantai. Sunset keemasan dengan deburan ombak tenang.",
        transitToNext: { motorMins: 25, carMins: 40, distanceKm: 12.5 },
      },
      {
        id: "slot-d1-4",
        timeSlot: "Malam",
        timeRange: "19:30 - 21:30 WITA",
        spotId: "kedonganan",
        title: "Warung Nelayan Seafood Kedonganan",
        category: "Culinary Sunset",
        location: "Kedonganan, Jimbaran",
        image: "/images/image_50.jpg",
        entryFee: "Mulai Rp 75.000",
        costNum: 75000,
        notes: "Pilih ikan segar langsung dari pasar basah nelayan. Bumbu bakar Jimbaran otentik dengan meja pasir pantai.",
      },
    ],
  },
  // 1. Ubud Emerald Nature & Sawah Tingkat
  {
    title: "Ubud Emerald Nature",
    region: "Ubud & Gianyar",
    stayArea: "Ubud Sentral",
    totalKm: 22.8,
    totalDriveTime: "1j 20m",
    slots: [
      {
        id: "slot-d2-1",
        timeSlot: "Pagi",
        timeRange: "06:30 - 08:30 WITA",
        spotId: "campuhan",
        title: "Campuhan Ridge Walk",
        category: "Zen Mist Walk",
        location: "Campuhan, Ubud",
        image: "/images/image_47.jpg",
        entryFee: "Gratis",
        costNum: 0,
        notes: "Jalan pagi berbukit hijau di antara dua lembah sungai. Udara masih sejuk dan bebas terik matahari.",
        transitToNext: { motorMins: 18, carMins: 30, distanceKm: 8.5 },
      },
      {
        id: "slot-d2-2",
        timeSlot: "Siang",
        timeRange: "09:30 - 13:00 WITA",
        spotId: "tegalalang",
        title: "Tegalalang Rice Terrace",
        category: "Nature Escape",
        location: "Tegalalang, Ubud",
        image: "/images/image_33.jpg",
        entryFee: "Rp 25.000 / orang",
        costNum: 25000,
        notes: "Pemandangan sawah terasering berundak dengan jajaran pohon kelapa rimbun. Spot foto ayunan raksasa.",
        transitToNext: { motorMins: 20, carMins: 35, distanceKm: 9.2 },
      },
      {
        id: "slot-d2-3",
        timeSlot: "Sore",
        timeRange: "14:30 - 17:30 WITA",
        spotId: "monkey-forest",
        title: "Monkey Forest Sanctuary Ubud",
        category: "Top Nature",
        location: "Padangtegal, Ubud",
        image: "/images/image_35.jpg",
        entryFee: "Rp 80.000 / orang",
        costNum: 80000,
        notes: "Hutan lindung suci dengan ribuan kera ekor panjang dan pohon beringin raksasa berumur ratusan tahun.",
        transitToNext: { motorMins: 10, carMins: 15, distanceKm: 3.1 },
      },
      {
        id: "slot-d2-4",
        timeSlot: "Malam",
        timeRange: "18:30 - 20:30 WITA",
        spotId: "ubud-art-market",
        title: "Pasar Seni Ubud & Kuliner Bebek",
        category: "Culture Chill",
        location: "Jl. Raya Ubud",
        image: "/images/image_48.jpg",
        entryFee: "Mulai Rp 65.000",
        costNum: 65000,
        notes: "Makan malam bebek goreng renyah bumbu Bali dan jalan santai melihat kerajinan tangan lokal Ubud.",
      },
    ],
  },
  // 2. Canggu Cafe Hopping & Coastal Chill
  {
    title: "Canggu Cafe & Coastal Chill",
    region: "Canggu & Seminyak",
    stayArea: "Canggu / Pererenan",
    totalKm: 14.2,
    totalDriveTime: "55m",
    slots: [
      {
        id: "slot-d3-1",
        timeSlot: "Pagi",
        timeRange: "07:30 - 09:30 WITA",
        spotId: "crate-cafe",
        title: "Crate Cafe & Bakery Canggu",
        category: "Cafe & Chill",
        location: "Padang Linjong, Canggu",
        image: "/images/image_58.jpg",
        entryFee: "Mulai Rp 35.000",
        costNum: 35000,
        notes: "Sarapan sehat smoothie bowl dan es americano segar Kintamani di teras terbuka tepi sawah hijau.",
        transitToNext: { motorMins: 8, carMins: 15, distanceKm: 2.1 },
      },
      {
        id: "slot-d3-2",
        timeSlot: "Siang",
        timeRange: "10:00 - 13:00 WITA",
        spotId: "the-lawn",
        title: "The Lawn Canggu - Morning Deck",
        category: "Oceanfront Chill",
        location: "Batu Bolong Beachfront",
        image: "/images/image_59.jpg",
        entryFee: "Mulai Rp 45.000",
        costNum: 45000,
        notes: "Duduk santai di dek kayu menghadap deburan ombak Batu Bolong sebelum musik sore dimulai.",
        transitToNext: { motorMins: 10, carMins: 18, distanceKm: 2.8 },
      },
      {
        id: "slot-d3-3",
        timeSlot: "Sore",
        timeRange: "15:30 - 18:30 WITA",
        spotId: "pantai-canggu",
        title: "Pantai Batu Bolong Sunset Vibe",
        category: "Sunset Moment",
        location: "Canggu, Badung",
        image: "/images/image_57.jpg",
        entryFee: "Parkir Rp 2.000",
        costNum: 2000,
        notes: "Menikmati langit jingga keemasan sambil melihat komunitas peselancar lokal menunggang ombak sore.",
        transitToNext: { motorMins: 6, carMins: 12, distanceKm: 1.5 },
      },
      {
        id: "slot-d3-4",
        timeSlot: "Malam",
        timeRange: "19:15 - 21:30 WITA",
        spotId: "canggu-night",
        title: "Canggu Street Food & Night Chill",
        category: "Social & Trendy",
        location: "Jl. Pantai Batu Bolong",
        image: "/images/image_60.jpg",
        entryFee: "Mulai Rp 50.000",
        costNum: 50000,
        notes: "Eksplorasi kuliner malam santai, gelato artisan, dan musik akustik hangat.",
      },
    ],
  },
  // 3. Island Adventure ke Nusa Penida
  {
    title: "Nusa Penida Island Adventure",
    region: "Nusa Penida",
    stayArea: "Sanur / Penida",
    totalKm: 36.5,
    totalDriveTime: "2j 10m",
    slots: [
      {
        id: "slot-d4-1",
        timeSlot: "Pagi",
        timeRange: "07:00 - 09:30 WITA",
        spotId: "sanur-harbor",
        title: "Fastboat Sanur ke Nusa Penida",
        category: "Boat Crossing",
        location: "Pelabuhan Sanur",
        image: "/images/image_46.jpg",
        entryFee: "Rp 150.000 (PP)",
        costNum: 150000,
        notes: "Penyeberangan 35 menit membelah selat Badung dengan pemandangan Gunung Agung di kejauhan.",
        transitToNext: { motorMins: 40, carMins: 55, distanceKm: 16.2 },
      },
      {
        id: "slot-d4-2",
        timeSlot: "Siang",
        timeRange: "10:30 - 14:00 WITA",
        spotId: "kelingking",
        title: "Kelingking Beach T-Rex Cliff",
        category: "Iconic Panorama",
        location: "Bunga Mekar, Nusa Penida",
        image: "/images/spot_kelingking_hd.jpg",
        entryFee: "Rp 10.000 / orang",
        costNum: 10000,
        notes: "Formasi tebing dinosaurus kapur legendaris dengan air laut biru toska bergradasi jernih.",
        transitToNext: { motorMins: 35, carMins: 50, distanceKm: 14.8 },
      },
      {
        id: "slot-d4-3",
        timeSlot: "Sore",
        timeRange: "15:00 - 17:30 WITA",
        spotId: "crystal-bay",
        title: "Crystal Bay Beach Snorkeling",
        category: "Beach Vibes",
        location: "Sakti, Nusa Penida",
        image: "/images/spot_nyang_nyang_hd.jpg",
        entryFee: "Rp 10.000 / motor",
        costNum: 10000,
        notes: "Teluk tenang dengan jajaran kelapa teduh, sangat aman untuk snorkeling dan menikmati kelapa muda segar.",
        transitToNext: { motorMins: 30, carMins: 45, distanceKm: 12.0 },
      },
      {
        id: "slot-d4-4",
        timeSlot: "Malam",
        timeRange: "18:30 - 20:30 WITA",
        spotId: "sanur-dinner",
        title: "Kembali ke Sanur & Ikan Bakar",
        category: "Seafood Feast",
        location: "Sanur, Denpasar",
        image: "/images/image_50.jpg",
        entryFee: "Mulai Rp 75.000",
        costNum: 75000,
        notes: "Kembali dengan fastboat sore dan santap malam ikan bakar sambal matah khas Sanur.",
      },
    ],
  },
  // 4. Heritage Karangasem & Pura Air Sakral
  {
    title: "Heritage Pura & Tirta Sakral",
    region: "Karangasem & Bali Timur",
    stayArea: "Candidasa / Ubud",
    totalKm: 42.0,
    totalDriveTime: "2j 25m",
    slots: [
      {
        id: "slot-d5-1",
        timeSlot: "Pagi",
        timeRange: "06:00 - 09:00 WITA",
        spotId: "lempuyang",
        title: "Pura Penataran Agung Lempuyang",
        category: "Pura Sakral",
        location: "Abang, Karangasem",
        image: "/images/image_36.jpg",
        entryFee: "Rp 55.000 / orang",
        costNum: 55000,
        notes: "Gerbang surga dengan latar pemandangan Gunung Agung yang megah di pagi hari bebas kabut tebal.",
        transitToNext: { motorMins: 25, carMins: 40, distanceKm: 12.3 },
      },
      {
        id: "slot-d5-2",
        timeSlot: "Siang",
        timeRange: "10:00 - 13:00 WITA",
        spotId: "tirta-gangga",
        title: "Tirta Gangga Water Palace",
        category: "Culture & Heritage",
        location: "Ababi, Karangasem",
        image: "/images/image_34.jpg",
        entryFee: "Rp 50.000 / orang",
        costNum: 50000,
        notes: "Taman air peninggalan Kerajaan Karangasem dengan kolam ikan koi besar dan bebatuan pijak geometris.",
        transitToNext: { motorMins: 35, carMins: 50, distanceKm: 18.5 },
      },
      {
        id: "slot-d5-3",
        timeSlot: "Sore",
        timeRange: "14:30 - 17:00 WITA",
        spotId: "tenganan",
        title: "Desa Tradisional Tenganan Pegringsingan",
        category: "Ancient Village",
        location: "Manggis, Karangasem",
        image: "/images/image_61.jpg",
        entryFee: "Donasi Rp 20.000",
        costNum: 20000,
        notes: "Desa Bali Aga tertua dengan arsitektur rumah batu asli dan tenun ikat gringsing langka bernilai tinggi.",
        transitToNext: { motorMins: 25, carMins: 35, distanceKm: 11.2 },
      },
      {
        id: "slot-d5-4",
        timeSlot: "Malam",
        timeRange: "18:00 - 20:00 WITA",
        spotId: "candidasa-sunset",
        title: "Sunset Tepi Pantai Candidasa",
        category: "Ocean Sunset",
        location: "Candidasa, Karangasem",
        image: "/images/image_57.jpg",
        entryFee: "Gratis",
        costNum: 0,
        notes: "Suasana tenang pesisir timur Bali yang sunyi, jauh dari kebisingan klub malam.",
      },
    ],
  },
  // 5. Bedugul Hawa Dingin & Sawah Jatiluwih
  {
    title: "Bedugul Danau & Sawah Jatiluwih",
    region: "Bedugul & Tabanan",
    stayArea: "Bedugul / Ubud",
    totalKm: 38.5,
    totalDriveTime: "2j 05m",
    slots: [
      {
        id: "slot-d6-1",
        timeSlot: "Pagi",
        timeRange: "08:00 - 11:00 WITA",
        spotId: "ulun-danu",
        title: "Pura Ulun Danu Beratan",
        category: "Culture & Heritage",
        location: "Candikuning, Baturiti",
        image: "/images/image_37.jpg",
        entryFee: "Rp 40.000 / orang",
        costNum: 40000,
        notes: "Pura mengapung di Danau Beratan dengan hawa pegunungan sejuk berkabut dan bunga teratai danau.",
        transitToNext: { motorMins: 30, carMins: 45, distanceKm: 15.2 },
      },
      {
        id: "slot-d6-2",
        timeSlot: "Siang",
        timeRange: "12:00 - 15:00 WITA",
        spotId: "jatiluwih",
        title: "Sawah Terasering Jatiluwih UNESCO",
        category: "Nature Escape",
        location: "Penebel, Tabanan",
        image: "/images/image_33.jpg",
        entryFee: "Rp 40.000 / orang",
        costNum: 40000,
        notes: "Hamparan sawah terasering terluas di Bali yang diakui UNESCO dengan sistem irigasi subak kuno.",
        transitToNext: { motorMins: 25, carMins: 35, distanceKm: 12.8 },
      },
      {
        id: "slot-d6-3",
        timeSlot: "Sore",
        timeRange: "15:30 - 17:30 WITA",
        spotId: "bedugul-strawberry",
        title: "Petik Strawberry Segar & Kopi",
        category: "Fresh Nature",
        location: "Bedugul, Tabanan",
        image: "/images/image_60.jpg",
        entryFee: "Rp 35.000",
        costNum: 35000,
        notes: "Sensasi memetik buah strawberry segar langsung dari kebun dan menikmati jus buah dingin berkabut.",
        transitToNext: { motorMins: 20, carMins: 30, distanceKm: 10.5 },
      },
      {
        id: "slot-d6-4",
        timeSlot: "Malam",
        timeRange: "18:30 - 20:30 WITA",
        spotId: "tabanan-dinner",
        title: "Santap Hangat Sup Ikan Rempah",
        category: "Local Feast",
        location: "Baturiti, Tabanan",
        image: "/images/image_61.jpg",
        entryFee: "Mulai Rp 45.000",
        costNum: 45000,
        notes: "Makan malam hangat sup ikan rempah khas Tabanan yang pas di udara dingin pegunungan.",
      },
    ],
  },
  // 6. Sanur Sunrise, Pasar Seni & Departure
  {
    title: "Pasar Seni & Sayonara Bali",
    region: "Sanur & Badung",
    stayArea: "Sanur / Bandara Transit",
    totalKm: 18.2,
    totalDriveTime: "1j 15m",
    slots: [
      {
        id: "slot-d7-1",
        timeSlot: "Pagi",
        timeRange: "05:45 - 08:30 WITA",
        spotId: "sanur-sunrise",
        title: "Sanur Boardwalk Golden Sunrise",
        category: "Morning Walk",
        location: "Pantai Sanur, Denpasar",
        image: "/images/image_57.jpg",
        entryFee: "Gratis",
        costNum: 0,
        notes: "Gowes sepeda santai di sepanjang jalur pedestrian tepi pantai Sanur menyambut matahari terbit keemasan.",
        transitToNext: { motorMins: 20, carMins: 30, distanceKm: 9.5 },
      },
      {
        id: "slot-d7-2",
        timeSlot: "Siang",
        timeRange: "09:30 - 12:30 WITA",
        spotId: "sukawati",
        title: "Pasar Seni Sukawati & Belanja Oleh-Oleh",
        category: "Shopping & Craft",
        location: "Sukawati, Gianyar",
        image: "/images/image_48.jpg",
        entryFee: "Gratis (Parkir Rp 5.000)",
        costNum: 5000,
        notes: "Pusat kerajinan tangan, kain pantai Bali, lukisan, dan camilan pie susu khas Bali dengan harga grosir ramah.",
        transitToNext: { motorMins: 25, carMins: 40, distanceKm: 12.8 },
      },
      {
        id: "slot-d7-3",
        timeSlot: "Sore",
        timeRange: "13:30 - 15:30 WITA",
        spotId: "sanur-menweti",
        title: "Makan Siang Nasi Campur Khas Sanur",
        category: "Culinary Legend",
        location: "Sanur, Denpasar",
        image: "/images/image_62.jpg",
        entryFee: "Rp 45.000 / porsi",
        costNum: 45000,
        notes: "Nasi campur legendaris dengan suwiran ayam betutu, sate lilit, dan kulit ayam garing gurih.",
        transitToNext: { motorMins: 25, carMins: 35, distanceKm: 11.5 },
      },
      {
        id: "slot-d7-4",
        timeSlot: "Malam",
        timeRange: "16:30 - 18:30 WITA",
        spotId: "airport-drop",
        title: "Drop ke Bandara Ngurah Rai (See You!)",
        category: "Flight Departure",
        location: "Tuban, Kuta",
        image: "/images/image_46.jpg",
        entryFee: "Parkir Bandara Rp 10.000",
        costNum: 10000,
        notes: "Check-in penerbangan pulang dengan segudang memori indah dan foto estetik selama di Bali.",
      },
    ],
  },
];

export function buildDynamicDays(
  durationDays: number,
  startDayNum: number,
  basecampArea?: string
): DayPlan[] {
  let blueprintIndices: number[] = [];
  if (durationDays === 3) {
    blueprintIndices = [0, 1, 2];
  } else if (durationDays === 4) {
    blueprintIndices = [0, 1, 3, 2];
  } else if (durationDays === 5) {
    blueprintIndices = [0, 1, 3, 2, 4];
  } else if (durationDays === 7) {
    blueprintIndices = [0, 1, 3, 2, 4, 5, 6];
  } else {
    for (let i = 0; i < durationDays; i++) {
      blueprintIndices.push(i % DAY_BLUEPRINTS.length);
    }
  }

  return blueprintIndices.map((bIndex, i) => {
    const bp = DAY_BLUEPRINTS[bIndex];
    return {
      dayNumber: i + 1,
      dateLabel: `${startDayNum + i} Mei`,
      title: bp.title,
      region: bp.region,
      stayArea:
        basecampArea && i < 2
          ? basecampArea.split("+")[0]?.trim() || bp.stayArea
          : bp.stayArea,
      totalKm: bp.totalKm,
      totalDriveTime: bp.totalDriveTime,
      slots: bp.slots,
      trafficWarning: bp.trafficWarning,
    };
  });
}

export function generateTripFromPlanner(params: PlannerSyncParams): TripState {
  const {
    durationDays = 5,
    selectedVibeIds = ["beach-sunset", "nature-jungle"],
    groupType = "group",
    peopleCount = 4,
    budgetTier = 2,
    selectedStartDate = 14,
    basecampArea = "Canggu + Ubud",
  } = params;

  let styleName = "Geng Bestie";
  let travelerNames: string[] = ["Raka (You)"];

  if (groupType === "solo") {
    styleName = "Solo Explorer";
    travelerNames = ["Raka (Solo Explorer)"];
  } else if (groupType === "couple") {
    styleName = "Pasangan Romantis";
    travelerNames = ["Raka (You)", "Naya (Partner)"];
  } else if (groupType === "family") {
    styleName = "Keluarga Santai";
    travelerNames = ["Raka (You)", "Keluarga (4 Orang)"];
  } else {
    styleName = "Geng Bestie";
    const defaultFriends = ["Naya", "Dimas", "Sarah", "Budi", "Chitoge", "Rizal"];
    for (let i = 1; i < peopleCount; i++) {
      travelerNames.push(defaultFriends[i - 1] || `Bestie ${i}`);
    }
  }

  const days = buildDynamicDays(durationDays, selectedStartDate, basecampArea);
  const endDay = selectedStartDate + durationDays - 1;
  const datesLabel = `${selectedStartDate} - ${endDay} Mei 2026`;

  const vibeLabels = selectedVibeIds.map((v) => {
    if (v.includes("beach")) return "Pesisir";
    if (v.includes("nature")) return "Alam";
    if (v.includes("culture")) return "Budaya";
    if (v.includes("cafe")) return "Kafe Hits";
    if (v.includes("adventure")) return "Petualangan";
    return "Healing";
  });
  const vibeSubtitle =
    Array.from(new Set(vibeLabels)).slice(0, 2).join(" & ") || "Eksplorasi";

  const title = `Trip ${styleName} ${durationDays}D${durationDays - 1}N: ${vibeSubtitle} Bali`;

  return {
    id: `trip-${Date.now()}`,
    title,
    datesLabel,
    partySize: peopleCount,
    travelerNames,
    activeDayIndex: 0,
    days,
    suggestions: INITIAL_TRIP_STATE.suggestions,
    source: "planner",
    durationDays,
    selectedVibeIds,
    groupType,
    budgetTier,
    basecampArea,
    savedAt: new Date().toISOString(),
  };
}

export function buildTripShareUrl(trip: TripState, origin: string = ""): string {
  const daysCount = trip.days?.length || trip.durationDays || 5;
  const startDay = parseInt(trip.days?.[0]?.dateLabel?.replace(/[^0-9]/g, "") || "14", 10) || 14;
  const params = new URLSearchParams();
  params.set("days", String(daysCount));
  params.set("party", String(trip.partySize || 4));
  params.set("group", trip.groupType || "group");
  params.set("budget", String(trip.budgetTier || 2));
  if (trip.selectedVibeIds && trip.selectedVibeIds.length > 0) {
    params.set("vibes", trip.selectedVibeIds.join(","));
  }
  params.set("start", String(startDay));
  if (trip.basecampArea) {
    params.set("basecamp", trip.basecampArea);
  }
  const queryString = params.toString();
  return `${origin}/itinerary?${queryString}`;
}

export function parseTripFromSearchParams(
  searchParams: { get: (key: string) => string | null } | URLSearchParams
): PlannerSyncParams | null {
  const daysStr = searchParams.get("days");
  if (!daysStr) return null;
  const durationDays = parseInt(daysStr, 10);
  if (isNaN(durationDays) || durationDays <= 0) return null;

  const partyStr = searchParams.get("party");
  const peopleCount = partyStr ? parseInt(partyStr, 10) || 4 : 4;

  const groupType = searchParams.get("group") || "group";

  const budgetStr = searchParams.get("budget");
  const budgetTier = budgetStr ? parseInt(budgetStr, 10) || 2 : 2;

  const vibesStr = searchParams.get("vibes");
  const selectedVibeIds = vibesStr
    ? vibesStr.split(",").map((s) => s.trim()).filter(Boolean)
    : ["beach-sunset", "nature-jungle"];

  const startStr = searchParams.get("start");
  const selectedStartDate = startStr ? parseInt(startStr, 10) || 14 : 14;

  const basecampArea = searchParams.get("basecamp") || "Canggu + Ubud";

  return {
    durationDays,
    peopleCount,
    groupType,
    budgetTier,
    selectedVibeIds,
    selectedStartDate,
    basecampArea,
  };
}

const STORAGE_KEY = "kelanabali_trip_state_v1";

export function useTripStore() {
  const [trip, setTrip] = useState<TripState>(INITIAL_TRIP_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTrip(JSON.parse(saved));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
      } catch {}
    }
  }, [trip, isLoaded]);

  // Actions
  const updateTitle = (newTitle: string) => {
    setTrip((prev) => ({ ...prev, title: newTitle }));
  };

  const setActiveDay = (index: number) => {
    setTrip((prev) => ({ ...prev, activeDayIndex: index }));
  };

  const updateSlotNotes = (dayIndex: number, slotId: string, newNotes: string) => {
    setTrip((prev) => {
      const updatedDays = [...prev.days];
      const targetDay = updatedDays[dayIndex];
      if (targetDay) {
        targetDay.slots = targetDay.slots.map((s) =>
          s.id === slotId ? { ...s, notes: newNotes } : s
        );
      }
      return { ...prev, days: updatedDays };
    });
  };

  const resolveTrafficWarning = (dayIndex: number) => {
    setTrip((prev) => {
      const updatedDays = [...prev.days];
      const day = updatedDays[dayIndex];
      if (day && day.trafficWarning) {
        day.trafficWarning = { ...day.trafficWarning, resolved: true };
        // Automatically shift slot times forward by 30 mins
        day.slots = day.slots.map((slot, i) => {
          if (i === 1) return { ...slot, timeRange: "11:30 - 14:30 WITA" };
          if (i === 2) return { ...slot, timeRange: "15:00 - 18:00 WITA" };
          return slot;
        });
      }
      return { ...prev, days: updatedDays };
    });
  };

  const applySuggestion = (suggestionId: string) => {
    setTrip((prev) => {
      const updatedSuggestions = prev.suggestions.map((sug) =>
        sug.id === suggestionId ? { ...sug, applied: true } : sug
      );

      // If sug-1 (reorder timing)
      const updatedDays = [...prev.days];
      if (suggestionId === "sug-1") {
        const day1 = updatedDays[0];
        if (day1) {
          if (day1.trafficWarning) {
            day1.trafficWarning.resolved = true;
          }
          day1.slots = day1.slots.map((s) => {
            if (s.id === "slot-2") {
              return { ...s, timeRange: "13:30 - 15:15 WITA", notes: "Saran Mimin: Turun ke gua saat surut." };
            }
            if (s.id === "slot-3") {
              return { ...s, timeRange: "15:45 - 18:30 WITA", notes: "Tukar tiket Kecak jam 15:45 baris tengah aman!" };
            }
            return s;
          });
        }
      }

      return { ...prev, days: updatedDays, suggestions: updatedSuggestions };
    });
  };

  const revertSuggestion = (suggestionId: string) => {
    setTrip((prev) => ({
      ...prev,
      suggestions: prev.suggestions.map((sug) =>
        sug.id === suggestionId ? { ...sug, applied: false } : sug
      ),
    }));
  };

  const addBestie = (name: string) => {
    if (!name.trim()) return;
    setTrip((prev) => ({
      ...prev,
      partySize: prev.partySize + 1,
      travelerNames: [...prev.travelerNames, name.trim()],
    }));
  };

  const addCangguCoffeeRoute = () => {
    setTrip((prev) => {
      const updatedDays = [...prev.days];
      const day4 = updatedDays[3];
      if (day4) {
        const hasCrate = day4.slots.some((s) => s.spotId === "crate-cafe");
        const hasLawn = day4.slots.some((s) => s.spotId === "the-lawn");
        if (!hasCrate || !hasLawn) {
          const crateSlot: ItinerarySlot = {
            id: `slot-crate-${Date.now()}`,
            timeSlot: "Pagi",
            timeRange: "07:30 - 09:30 WITA",
            spotId: "crate-cafe",
            title: "Crate Cafe & Bakery Canggu",
            category: "Cafe & Chill",
            location: "Padang Linjong, Canggu",
            image: "/images/image_58.jpg",
            entryFee: "Mulai Rp 35.000",
            costNum: 35000,
            notes: "Kopi Kintamani dingin & sarapan sehat menghadap sawah hijau.",
            transitToNext: {
              motorMins: 8,
              carMins: 15,
              distanceKm: 2.1,
            },
          };
          const lawnSlot: ItinerarySlot = {
            id: `slot-lawn-${Date.now() + 1}`,
            timeSlot: "Siang",
            timeRange: "09:45 - 12:30 WITA",
            spotId: "the-lawn",
            title: "The Lawn Canggu - Morning Deck",
            category: "Cafe & Chill",
            location: "Batu Bolong, Canggu",
            image: "/images/image_59.jpg",
            entryFee: "Mulai Rp 45.000",
            costNum: 45000,
            notes: "Dek kayu santai tepi pantai Batu Bolong sebelum musik sore dimulai.",
            transitToNext: {
              motorMins: 12,
              carMins: 20,
              distanceKm: 3.5,
            },
          };
          day4.slots = [crateSlot, lawnSlot, ...day4.slots.filter((s) => s.spotId !== "crate-cafe" && s.spotId !== "the-lawn")];
          day4.totalKm = parseFloat((day4.totalKm + 5.6).toFixed(1));
          day4.totalDriveTime = "1j 30m";
        }
      }
      return { ...prev, days: updatedDays };
    });
  };

  const syncFromPlanner = (params: PlannerSyncParams) => {
    const newTrip = generateTripFromPlanner(params);
    setTrip(newTrip);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrip));
      } catch {}
    }
    return newTrip;
  };

  const resetToDefault = () => {
    setTrip(INITIAL_TRIP_STATE);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRIP_STATE));
      } catch {}
    }
  };

  return {
    trip,
    isLoaded,
    updateTitle,
    setActiveDay,
    updateSlotNotes,
    resolveTrafficWarning,
    applySuggestion,
    revertSuggestion,
    addBestie,
    addCangguCoffeeRoute,
    syncFromPlanner,
    resetToDefault,
  };
}

