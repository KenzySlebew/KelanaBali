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
          image: "/images/image_31.jpg",
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

  const resetToDefault = () => {
    setTrip(INITIAL_TRIP_STATE);
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
    resetToDefault,
  };
}

