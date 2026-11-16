export interface Spot {
  id: string;
  index: string;
  title: string;
  location: string;
  region: "Ubud" | "Gianyar" | "Bukit & Uluwatu" | "Karangasem" | "Nusa Penida" | "Canggu & Seminyak" | "Bedugul";
  category: "Nature Escape" | "Beach Vibes" | "Culture & Heritage" | "Cafe & Chill";
  tag: string;
  rating: number;
  reviewCount: number;
  image: string;
  entryFee: string;
  entryFeeNum: number;
  bestTime: string;
  duration: "< 2 Jam" | "Setengah Hari" | "Seharian";
  vibe: string[];
  crowdLevel: "Sepi Chill" | "Sedang" | "Ramai Hits" | "Sepi Pagi";
  budgetCategory: "Free" | "< 50rb" | "50k-150k" | "Premium";
  distanceFromCanggu: string;
  mapCoords: { x: number; y: number }; // Percentage on Bali SVG map
  description: string;
  tips: string;
}

export interface Article {
  id: string;
  title: string;
  category: "NEWS" | "Hidden Gem" | "Sunset Vibe" | "Digital Nomad";
  badgeType: "news" | "guide" | "curation";
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
}

export const ALL_SPOTS: Spot[] = [
  {
    id: "nyang-nyang",
    index: "01",
    title: "Nyang Nyang Beach",
    location: "Uluwatu, Badung",
    region: "Bukit & Uluwatu",
    category: "Beach Vibes",
    tag: "Beach Vibes",
    rating: 4.9,
    reviewCount: 1890,
    image: "/images/image_30.jpg",
    entryFee: "Rp 5.000 / motor",
    entryFeeNum: 5000,
    bestTime: "15:30 - 18:30 WITA",
    duration: "Setengah Hari",
    vibe: ["Beach Vibes", "Vibe Chill", "Spot Aesthetic"],
    crowdLevel: "Sepi Chill",
    budgetCategory: "< 50rb",
    distanceFromCanggu: "45 min dari Canggu",
    mapCoords: { x: 38, y: 88 },
    description:
      "Garis pantai pasir putih luas tersembunyi di bawah tebing kapur megah Uluwatu dengan deburan ombak pirus murni yang syahdu dan sepi pengunjung.",
    tips: "Sekarang sudah ada akses jalan cor dan ojek lokal, jadi kamu gak perlu tracking 500 anak tangga lagi!",
  },
  {
    id: "kelingking",
    index: "02",
    title: "Kelingking Beach",
    location: "Nusa Penida, Klungkung",
    region: "Nusa Penida",
    category: "Beach Vibes",
    tag: "Iconic View",
    rating: 5.0,
    reviewCount: 8400,
    image: "/images/image_31.jpg",
    entryFee: "Rp 10.000 / orang",
    entryFeeNum: 10000,
    bestTime: "08:00 - 11:00 WITA",
    duration: "Seharian",
    vibe: ["Beach Vibes", "Adventure Mode", "Spot Aesthetic"],
    crowdLevel: "Ramai Hits",
    budgetCategory: "< 50rb",
    distanceFromCanggu: "1.5 jam (termasuk fastboat)",
    mapCoords: { x: 78, y: 76 },
    description:
      "Tebing spektakuler menyerupai kepala T-Rex yang menjorok ke perairan laut toska berombak putih dramatis. Salah satu ikon panorama dunia.",
    tips: "Kalau mau turun ke pantainya butuh stamina ekstra dan bawa air mineral banyak, jalurnya curam dan terik!",
  },
  {
    id: "suluban-cave",
    index: "03",
    title: "Suluban Beach Cave",
    location: "Pecatu, Uluwatu",
    region: "Bukit & Uluwatu",
    category: "Beach Vibes",
    tag: "Surfers Cave",
    rating: 4.8,
    reviewCount: 3120,
    image: "/images/spot_suluban.jpg",
    entryFee: "Gratis (Parkir Rp 5k)",
    entryFeeNum: 0,
    bestTime: "14:00 - 17:30 WITA",
    duration: "< 2 Jam",
    vibe: ["Beach Vibes", "Spot Aesthetic", "Adventure Mode"],
    crowdLevel: "Sedang",
    budgetCategory: "Free",
    distanceFromCanggu: "50 min dari Canggu",
    mapCoords: { x: 32, y: 84 },
    description:
      "Gua karang alami eksotis tempat para peselancar dunia turun ke ombak Uluwatu. Lorong gua membingkai cakrawala laut lepas nan magis.",
    tips: "Pantau pasang surut air laut sebelum turun. Pas surut, kolam-kolam alami di antara karang asik banget buat berendam santai.",
  },
  {
    id: "tegalalang",
    index: "04",
    title: "Tegalalang Rice Terrace",
    location: "Tegalalang, Ubud",
    region: "Ubud",
    category: "Nature Escape",
    tag: "Nature Escape",
    rating: 4.9,
    reviewCount: 5210,
    image: "/images/image_33.jpg",
    entryFee: "Rp 25.000 / orang",
    entryFeeNum: 25000,
    bestTime: "06:30 - 08:30 WITA",
    duration: "< 2 Jam",
    vibe: ["Spot Aesthetic", "Nature Escape", "Vibe Chill"],
    crowdLevel: "Ramai Hits",
    budgetCategory: "< 50rb",
    distanceFromCanggu: "60 min dari Canggu",
    mapCoords: { x: 50, y: 50 },
    description:
      "Hamparan terasering sawah bertingkat hijau zamrud legendaris dengan sistem irigasi Subak warisan UNESCO, lengkap dengan giant swings.",
    tips: "Datang pas matahari baru terbit biar dapat sinar berkas cahaya (ray of light) tembus kabut pagi, foto OOTD dijamin auto viral!",
  },
  {
    id: "campuhan",
    index: "05",
    title: "Campuhan Ridge Walk",
    location: "Campuhan, Ubud",
    region: "Ubud",
    category: "Nature Escape",
    tag: "Nature Chill",
    rating: 4.7,
    reviewCount: 2890,
    image: "/images/image_34.jpg",
    entryFee: "Gratis (Free Entry)",
    entryFeeNum: 0,
    bestTime: "06:00 - 07:30 WITA",
    duration: "< 2 Jam",
    vibe: ["Vibe Chill", "Nature Escape", "Zen Corner"],
    crowdLevel: "Sepi Pagi",
    budgetCategory: "Free",
    distanceFromCanggu: "55 min dari Canggu",
    mapCoords: { x: 47, y: 53 },
    description:
      "Jalur setapak bukit hijau diapit dua lembah sungai dengan semilir angin sejuk dan pemandangan perbukitan alang-alang yang menenangkan jiwa.",
    tips: "Sangat pas buat jalan santai pagi tanpa drama macet. Jangan lupa bawa tumbler minum!",
  },
  {
    id: "tirta-gangga",
    index: "06",
    title: "Tirta Gangga Water Palace",
    location: "Ababi, Karangasem",
    region: "Karangasem",
    category: "Culture & Heritage",
    tag: "Culture & Heritage",
    rating: 4.8,
    reviewCount: 4190,
    image: "/images/spot_tirta_gangga.jpg",
    entryFee: "Rp 50.000 / orang",
    entryFeeNum: 50000,
    bestTime: "08:30 - 11:00 WITA",
    duration: "Setengah Hari",
    vibe: ["Culture & Heritage", "Spot Aesthetic", "Zen Corner"],
    crowdLevel: "Sedang",
    budgetCategory: "50k-150k",
    distanceFromCanggu: "2 jam dari Canggu",
    mapCoords: { x: 74, y: 44 },
    description:
      "Taman air kerajaan kuno dengan kolam bertingkat yang dipenuhi ikan koi mas jinak, pancuran air bertingkat, dan patung-patung batu sakral megah.",
    tips: "Beli pakan ikan koi di loket depan seharga 5 ribu rupiah buat foto estetik sambil dikerubungi ratusan ikan mas emas!",
  },
  {
    id: "monkey-forest",
    index: "07",
    title: "Monkey Forest Ubud",
    location: "Padangtegal, Ubud",
    region: "Ubud",
    category: "Nature Escape",
    tag: "Top Nature",
    rating: 4.8,
    reviewCount: 3420,
    image: "/images/spot_monkey_forest.jpg",
    entryFee: "Rp 80.000 / orang",
    entryFeeNum: 80000,
    bestTime: "08:30 - 10:30 WITA",
    duration: "< 2 Jam",
    vibe: ["Nature Escape", "Spot Aesthetic", "Zen Corner"],
    crowdLevel: "Sedang",
    budgetCategory: "50k-150k",
    distanceFromCanggu: "50 min dari Canggu",
    mapCoords: { x: 48, y: 56 },
    description:
      "Cagar alam dan kompleks candi suci di Ubud yang dihuni ratusan kera ekor panjang di tengah hutan pala purba berkabut sejuk.",
    tips: "Jangan bawa kantong plastik kresek atau pakai kacamata longgar ya brok, monyetnya pinter banget ngincer barang unik!",
  },
  {
    id: "lempuyang",
    index: "08",
    title: "Pura Penataran Agung Lempuyang",
    location: "Karangasem, Bali Timur",
    region: "Karangasem",
    category: "Culture & Heritage",
    tag: "Gate of Heaven",
    rating: 4.7,
    reviewCount: 3980,
    image: "/images/collage_lempuyang.jpg",
    entryFee: "Rp 55.000 / orang",
    entryFeeNum: 55000,
    bestTime: "06:00 - 08:00 WITA",
    duration: "Setengah Hari",
    vibe: ["Culture & Heritage", "Spot Aesthetic", "Zen Corner"],
    crowdLevel: "Ramai Hits",
    budgetCategory: "50k-150k",
    distanceFromCanggu: "2.2 jam dari Canggu",
    mapCoords: { x: 80, y: 40 },
    description:
      "Candi sakral dengan candi bentar legendaris yang membingkai kemegahan Gunung Agung secara simetris magis.",
    tips: "Ambil nomor antrean foto dari pagi buta untuk menghindari antrean panjang.",
  },
  {
    id: "ulun-danu",
    index: "09",
    title: "Pura Ulun Danu Beratan",
    location: "Bedugul, Tabanan",
    region: "Bedugul",
    category: "Culture & Heritage",
    tag: "Floating Temple",
    rating: 4.9,
    reviewCount: 6100,
    image: "/images/collage_ulun_danu.jpg",
    entryFee: "Rp 40.000 / orang",
    entryFeeNum: 40000,
    bestTime: "08:00 - 11:00 WITA",
    duration: "Setengah Hari",
    vibe: ["Culture & Heritage", "Zen Corner", "Vibe Chill"],
    crowdLevel: "Sedang",
    budgetCategory: "< 50rb",
    distanceFromCanggu: "1.5 jam dari Canggu",
    mapCoords: { x: 42, y: 35 },
    description:
      "Pura air terapung ikonik yang terletak di tepi Danau Beratan dengan latar kabut pegunungan Bedugul yang sejuk.",
    tips: "Suhu udara dingin berkisar 18-22 derajat Celsius, siapkan outer hangat.",
  },
  {
    id: "melasti-beach",
    index: "10",
    title: "Melasti Beach & High Cliff",
    location: "Ungasan, Badung",
    region: "Bukit & Uluwatu",
    category: "Beach Vibes",
    tag: "Aesthetic Road",
    rating: 4.8,
    reviewCount: 4200,
    image: "/images/collage_beach_cliff.jpg",
    entryFee: "Rp 10.000 / orang",
    entryFeeNum: 10000,
    bestTime: "16:00 - 18:30 WITA",
    duration: "< 2 Jam",
    vibe: ["Beach Vibes", "Spot Aesthetic"],
    crowdLevel: "Sedang",
    budgetCategory: "< 50rb",
    distanceFromCanggu: "45 min dari Canggu",
    mapCoords: { x: 40, y: 92 },
    description:
      "Jalanan tebing kapur berkelok dramatis yang langsung bermuara ke pantai pasir putih jernih dan beach clubs modern.",
    tips: "Abadikan momen saat berkendara menuruni tebing!",
  },
  {
    id: "crate-cafe",
    index: "09",
    title: "Crate Cafe & Bakery Canggu",
    location: "Jl. Canggu Padang Linjong No.49, Canggu",
    region: "Canggu & Seminyak",
    category: "Cafe & Chill",
    tag: "Work From Bali",
    rating: 4.9,
    reviewCount: 1240,
    image: "/images/image_58.jpg",
    entryFee: "Mulai Rp 35.000",
    entryFeeNum: 35000,
    bestTime: "06:30 - 09:00 WITA",
    duration: "< 2 Jam",
    vibe: ["aesthetic", "chill"],
    crowdLevel: "Sepi Pagi",
    budgetCategory: "< 50rb",
    distanceFromCanggu: "Pusat Canggu",
    mapCoords: { x: 38, y: 72 },
    description:
      "Tempat ngopi semi-terbuka yang menghadap langsung ke hamparan sawah hijau Padang Linjong. Terkenal dengan sajian sarapan sehat, roti panggang segar, dan es americano berbahan biji Kintamani.",
    tips: "Datang sebelum jam 8 pagi untuk mendapatkan sofa pinggir sawah dan suasana hening sebelum ramai.",
  },
  {
    id: "the-lawn",
    index: "10",
    title: "The Lawn Canggu - Morning Deck",
    location: "Batu Bolong Beachfront, Canggu",
    region: "Canggu & Seminyak",
    category: "Cafe & Chill",
    tag: "Oceanfront Chill",
    rating: 4.8,
    reviewCount: 890,
    image: "/images/image_59.jpg",
    entryFee: "Mulai Rp 45.000",
    entryFeeNum: 45000,
    bestTime: "09:00 - 11:30 WITA",
    duration: "< 2 Jam",
    vibe: ["chill", "aesthetic"],
    crowdLevel: "Sepi Pagi",
    budgetCategory: "50k-150k",
    distanceFromCanggu: "5 min dari Echo Beach",
    mapCoords: { x: 37, y: 74 },
    description:
      "Dek kayu santai di tepi Pantai Batu Bolong dengan pemandangan ombak lepas dan para peselancar. Area paginya tenang dan cocok untuk membaca buku atau menikmati angin laut.",
    tips: "Pilih tempat duduk di sisi teras atas yang terlindung dari terik matahari langsung saat menjelang siang.",
  },
];

export const SPOTS_DATA: Spot[] = ALL_SPOTS.slice(0, 4);
export const BEACH_SPOTS: Spot[] = ALL_SPOTS.filter((s) => s.category === "Beach Vibes");
export const CULTURE_SPOTS: Spot[] = ALL_SPOTS.filter((s) => s.category === "Culture & Heritage");

// Planner Specific Data
export interface PlannerVibeCard {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  recommendedAreas: string[];
}

export const PLANNER_VIBE_CARDS: PlannerVibeCard[] = [
  {
    id: "beach-sunset",
    title: "Beach Vibes & Coastal Sunset",
    tag: "Chill & Aesthetic",
    image: "/images/vibe_beach_sunset.jpg",
    description: "Nikmati semilir angin laut, sunset tebing eksotis di Uluwatu, dan deburan ombak pasir putih.",
    recommendedAreas: ["Uluwatu", "Seminyak", "Nusa Penida"],
  },
  {
    id: "nature-jungle",
    title: "Nature Escape & Jungle Healing",
    tag: "Zen & Fresh",
    image: "/images/vibe_nature_jungle.jpg",
    description: "Suasana sawah berkabut sejuk, hutan pala purba, air terjun alami, dan kedamaian Ubud.",
    recommendedAreas: ["Ubud", "Bedugul", "Sidemen"],
  },
  {
    id: "culture-heritage",
    title: "Culture, Temples & Heritage",
    tag: "Authentic Bali",
    image: "/images/vibe_culture_heritage.jpg",
    description: "Candi bentar Lempuyang, pura air Tirta Gangga, tarian sakral, dan kearifan lokal Bali.",
    recommendedAreas: ["Karangasem", "Gianyar", "Klungkung"],
  },
  {
    id: "adventure-hiking",
    title: "Adventure, Waterfall & Hiking",
    tag: "Adrenaline",
    image: "/images/vibe_adventure_hiking.jpg",
    description: "Sunrise trekking Gunung Batur, cliff jumping, dan susur tebing Kelingking Nusa Penida.",
    recommendedAreas: ["Kintamani", "Nusa Penida", "Buleleng"],
  },
  {
    id: "cafe-social",
    title: "Cafe Hopping & Sunset Clubs",
    tag: "Social & Trendy",
    image: "/images/vibe_cafe_hopping.jpg",
    description: "Deretan cafe artisan aesthetic, artisan bakery, matcha bar, dan beach club hits Canggu.",
    recommendedAreas: ["Canggu", "Pererenan", "Uluwatu"],
  },
];

export const GROUP_TYPES = [
  { id: "solo", label: "Solo Explorer", icon: "🎒", defaultCount: 1 },
  { id: "couple", label: "Couple / Romantis", icon: "❤️", defaultCount: 2 },
  { id: "group", label: "Grup Bestie", icon: "👯", defaultCount: 4 },
  { id: "family", label: "Family Trip", icon: "👨‍👩‍👧‍👦", defaultCount: 5 },
];

export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Cafe & Kuliner" | "Hidden Gems Alam" | "Etika & Budaya" | "Rute & Panduan";
  editionLabel: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    verifiedLocation: string;
  };
  heroImage: string;
  heroCaption: string;
  excerpt: string;
  tags: string[];
  routeStops?: {
    time: string;
    spotId: string;
    title: string;
    desc: string;
    transitNote?: string;
  }[];
}

export const ARTICLES_DATA: { featured: Article; sideArticles: Article[] } = {
  featured: {
    id: "americano-canggu",
    title: "Alasan Americano Dingin Jadi Pilihan Paling Masuk Akal Buat Pagi Hari di Canggu",
    category: "NEWS",
    badgeType: "news",
    date: "18 Mei 2026",
    readTime: "5 mnt baca",
    image: "/images/image_57.jpg",
    excerpt:
      "Udara pesisir Canggu cepat terasa gerah begitu matahari naik. Buat yang terbiasa membuka laptop di tepi sawah atau bersiap ke pantai, kopi hitam dingin berbahan biji Kintamani terasa jauh lebih ramah di lambung dibanding susu panas.",
  },
  sideArticles: [
    {
      id: "ngopi-ubud",
      title: "5 Kafe Tenang di Ubud untuk Kerja Tanpa Bising",
      category: "Hidden Gem",
      badgeType: "curation",
      date: "14 Mei 2026",
      readTime: "4 mnt baca",
      image: "/images/image_60.jpg",
      excerpt:
        "Pilihan tempat ngopi di tengah rimbunnya lembah hijau Ubud dengan koneksi internet serat optik yang stabil dan tata letak meja yang nyaman untuk fokus bekerja.",
    },
    {
      id: "kopi-kintamani",
      title: "Catatan Rasa Kopi Arabika Kintamani dari Lereng Batur",
      category: "Sunset Vibe",
      badgeType: "guide",
      date: "10 Mei 2026",
      readTime: "6 mnt baca",
      image: "/images/image_61.jpg",
      excerpt:
        "Menelusuri kebun kopi vulkanis di ketinggian 1.300 mdpl dan kebiasaan petani lokal mengolah ceri kopi menjadi seduhan sedap berkarakter sitrus alami.",
    },
    {
      id: "budget-solo-trip",
      title: "Rincian Biaya Solo Trip 4 Hari di Bali yang Masuk Akal",
      category: "Digital Nomad",
      badgeType: "curation",
      date: "06 Mei 2026",
      readTime: "7 mnt baca",
      image: "/images/image_62.jpg",
      excerpt:
        "Hitungan pengeluaran harian yang realistis, mulai dari sewa skuter matic, rekomendasi penginapan bersih, hingga daftar warung makan lokal dengan porsi mengenyangkan.",
    },
  ],
};

export const QUICK_STATS = [
  { value: "100%", label: "Fun No Drama" },
  { value: "200+", label: "Trip Seru di Bali" },
  { value: "5,000+", label: "Happy Travelers" },
  { value: "50+", label: "Spot Aesthetic" },
];

export const VIBE_CHIPS = [
  { id: "aesthetic", label: "Spot Aesthetic", emoji: "📸" },
  { id: "chill", label: "Vibe Chill", emoji: "🌊" },
  { id: "adventure", label: "Adventure Mode", emoji: "🧗" },
  { id: "zen", label: "Zen Corner", emoji: "🍃" },
];
