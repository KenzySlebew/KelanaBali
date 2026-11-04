export interface Spot {
  id: string;
  index: string;
  title: string;
  location: string;
  region: "Ubud" | "Gianyar" | "Bukit & Uluwatu" | "Karangasem" | "Nusa Penida";
  category: "Nature Escape" | "Beach Vibes" | "Culture & Heritage";
  tag: string;
  rating: number;
  reviewCount: number;
  image: string;
  entryFee: string;
  bestTime: string;
  duration: string;
  vibe: string[];
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

export const SPOTS_DATA: Spot[] = [
  {
    id: "monkey-forest",
    index: "01",
    title: "Monkey Forest, Ubud",
    location: "Ubud, Bali",
    region: "Ubud",
    category: "Nature Escape",
    tag: "Top Nature",
    rating: 4.8,
    reviewCount: 3420,
    image: "/images/spot_monkey_forest.jpg",
    entryFee: "Rp 80.000 / orang",
    bestTime: "08:30 - 10:30 WITA",
    duration: "1.5 - 2 Jam",
    vibe: ["Nature Escape", "Aesthetic", "Zen Corner"],
    description:
      "Cagar alam dan kompleks candi suci di Ubud yang dihuni ratusan kera ekor panjang di tengah hutan pala purba berkabut sejuk.",
    tips: "Jangan bawa kantong plastik kresek atau pakai kacamata longgar ya brok, monyetnya pinter banget ngincer barang unik!",
  },
  {
    id: "tegalalang",
    index: "02",
    title: "Tegalalang Rice Terrace",
    location: "Tegalalang, Gianyar",
    region: "Gianyar",
    category: "Nature Escape",
    tag: "Must Visit",
    rating: 4.9,
    reviewCount: 5210,
    image: "/images/spot_tegalalang.jpg",
    entryFee: "Rp 25.000 / orang",
    bestTime: "06:30 - 08:30 WITA (Golden Hour)",
    duration: "2 Jam",
    vibe: ["Spot Aesthetic", "Nature Escape", "Vibe Chill"],
    description:
      "Hamparan terasering sawah bertingkat hijau zamrud legendaris dengan sistem irigasi Subak warisan UNESCO, lengkap dengan giant swings.",
    tips: "Datang pas matahari baru terbit biar dapat sinar berkas cahaya (ray of light) tembus kabut pagi, foto OOTD dijamin auto viral!",
  },
  {
    id: "campuhan",
    index: "03",
    title: "Campuhan Ridge Walk",
    location: "Campuhan, Ubud",
    region: "Ubud",
    category: "Nature Escape",
    tag: "Chill Walk",
    rating: 4.7,
    reviewCount: 2890,
    image: "/images/spot_campuhan.jpg",
    entryFee: "Gratis (Free Entry)",
    bestTime: "06:00 - 07:30 / 17:00 - 18:15 WITA",
    duration: "1 - 1.5 Jam",
    vibe: ["Vibe Chill", "Nature Escape", "Zen Corner"],
    description:
      "Jalur setapak bukit hijau diapit dua lembah sungai dengan semilir angin sejuk dan pemandangan perbukitan alang-alang yang menenangkan jiwa.",
    tips: "Sangat pas buat jalan santai pagi tanpa drama macet. Jangan lupa bawa tumbler minum!",
  },
  {
    id: "nyang-nyang",
    index: "04",
    title: "Nyang Nyang Beach",
    location: "Uluwatu, Badung",
    region: "Bukit & Uluwatu",
    category: "Beach Vibes",
    tag: "Hidden Gem",
    rating: 4.9,
    reviewCount: 1650,
    image: "/images/spot_nyang_nyang.jpg",
    entryFee: "Rp 10.000 / motor",
    bestTime: "15:30 - 18:30 WITA (Sunset)",
    duration: "2 - 3 Jam",
    vibe: ["Beach Vibes", "Adventure Mode", "Spot Aesthetic"],
    description:
      "Garis pantai pasir putih luas tersembunyi di bawah tebing kapur megah Uluwatu dengan deburan ombak pirus murni yang syahdu.",
    tips: "Sekarang sudah ada akses jalan cor dan ojek lokal, jadi kamu gak perlu tracking 500 anak tangga lagi!",
  },
];

export const BEACH_SPOTS: Spot[] = [
  {
    id: "nyang-nyang-2",
    index: "01",
    title: "Nyang Nyang Beach, Uluwatu",
    location: "Uluwatu, Bali",
    region: "Bukit & Uluwatu",
    category: "Beach Vibes",
    tag: "Hidden Gem",
    rating: 4.9,
    reviewCount: 1890,
    image: "/images/spot_nyang_nyang.jpg",
    entryFee: "Rp 10.000 / motor",
    bestTime: "15:30 - 18:30 WITA",
    duration: "2.5 Jam",
    vibe: ["Beach Vibes", "Vibe Chill"],
    description: "Pantai pasir putih terpanjang di semenanjung bukit dengan suasana privat dan ombak pirus menakjubkan.",
    tips: "Spot terbaik menikmati sunset tanpa berdesak-desakan.",
  },
  {
    id: "kelingking-nusa",
    index: "02",
    title: "Kelingking Secret Point",
    location: "Nusa Penida, Klungkung",
    region: "Nusa Penida",
    category: "Beach Vibes",
    tag: "Iconic Bali",
    rating: 5.0,
    reviewCount: 8400,
    image: "/images/banner_kelingking.jpg",
    entryFee: "Rp 15.000 / orang",
    bestTime: "08:00 - 11:00 WITA",
    duration: "2 Jam",
    vibe: ["Beach Vibes", "Adventure Mode", "Spot Aesthetic"],
    description: "Tebing menyerupai T-Rex yang menjorok ke samudra lepas dengan warna air gradasi toska berkilau.",
    tips: "Pakai sepatu kets yang nyaman kalau mau turun ke bibir tebing.",
  },
  {
    id: "melasti-beach",
    index: "03",
    title: "Melasti Beach & High Cliff",
    location: "Ungasan, Badung",
    region: "Bukit & Uluwatu",
    category: "Beach Vibes",
    tag: "Aesthetic Road",
    rating: 4.8,
    reviewCount: 4200,
    image: "/images/collage_beach_cliff.jpg",
    entryFee: "Rp 10.000 / orang",
    bestTime: "16:00 - 18:30 WITA",
    duration: "2 Jam",
    vibe: ["Beach Vibes", "Spot Aesthetic"],
    description: "Jalanan tebing kapur berkelok dramatis yang langsung bermuara ke pantai pasir putih jernih dan beach clubs modern.",
    tips: "Abadikan momen saat berkendara menuruni tebing!",
  },
];

export const CULTURE_SPOTS: Spot[] = [
  {
    id: "lempuyang-temple",
    index: "01",
    title: "Pura Penataran Agung Lempuyang",
    location: "Karangasem, Bali Timur",
    region: "Karangasem",
    category: "Culture & Heritage",
    tag: "Gate of Heaven",
    rating: 4.7,
    reviewCount: 3980,
    image: "/images/collage_lempuyang.jpg",
    entryFee: "Rp 55.000 / orang",
    bestTime: "06:00 - 08:00 WITA",
    duration: "2.5 Jam",
    vibe: ["Culture & Heritage", "Spot Aesthetic", "Zen Corner"],
    description: "Candi sakral dengan candi bentar legendaris yang membingkai kemegahan Gunung Agung secara simetris magis.",
    tips: "Ambil nomor antrean foto dari pagi buta untuk menghindari antrean panjang.",
  },
  {
    id: "ulun-danu",
    index: "02",
    title: "Pura Ulun Danu Beratan",
    location: "Bedugul, Tabanan",
    region: "Ubud",
    category: "Culture & Heritage",
    tag: "Floating Temple",
    rating: 4.9,
    reviewCount: 6100,
    image: "/images/collage_ulun_danu.jpg",
    entryFee: "Rp 40.000 / orang",
    bestTime: "08:00 - 11:00 WITA",
    duration: "1.5 Jam",
    vibe: ["Culture & Heritage", "Zen Corner", "Vibe Chill"],
    description: "Pura air terapung ikonik yang terletak di tepi Danau Beratan dengan latar kabut pegunungan Bedugul yang sejuk.",
    tips: "Suhu udara dingin berkisar 18-22 derajat Celsius, siapkan outer hangat.",
  },
];

export const ARTICLES_DATA: { featured: Article; sideArticles: Article[] } = {
  featured: {
    id: "americano-canggu",
    title: "Sruputttt! Ini Alasan Kenapa Americano Cocok Jadi Teman Setia di Pagi Hari di Canggu",
    category: "NEWS",
    badgeType: "news",
    date: "2 Nov 2026",
    readTime: "4 mnt baca",
    image: "/images/article_americano.jpg",
    excerpt:
      "Menikmati semilir angin pantai Canggu sambil menyesap secangkir Americano dingin bukan cuma rutinitas, tapi seni memulai hari buat para traveler & digital nomad yang ogah ribet.",
  },
  sideArticles: [
    {
      id: "ngopi-dulu",
      title: "Ngopi Dulu Derrrrrr Biar Nggak Salah Pencet!",
      category: "Hidden Gem",
      badgeType: "curation",
      date: "31 Okt 2026",
      readTime: "3 mnt baca",
      image: "/images/article_cafe_aesthetic.jpg",
      excerpt:
        "Deretan cafe estetik tersembunyi di gang-gang Pererenan dengan stopkontak melimpah dan cold brew istimewa.",
    },
    {
      id: "kenapa-rasa-kopi",
      title: "Kenapa Rasa Kopi Mirip Mantan? Pahit Tapi Bikin Kangen!",
      category: "Sunset Vibe",
      badgeType: "guide",
      date: "29 Okt 2026",
      readTime: "5 mnt baca",
      image: "/images/article_sunset_drink.jpg",
      excerpt:
        "Eksplorasi spot sunset bar pinggir tebing Uluwatu yang menyajikan mocktail segar beraroma kopi dan jeruk Bali.",
    },
    {
      id: "kopi-kerja-repeat",
      title: "Kopi, Kerja, Repeat: Resep Bahagia Para Pejuang Deadline",
      category: "Digital Nomad",
      badgeType: "curation",
      date: "27 Okt 2026",
      readTime: "4 mnt baca",
      image: "/images/article_remote_work.jpg",
      excerpt:
        "Panduan memilih coworking space di Ubud yang dikelilingi sawah hijau agar kerjaan kelar tanpa burnout.",
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
  { id: "aesthetic", label: "Spot Aesthetic", emoji: "✨" },
  { id: "chill", label: "Vibe Chill", emoji: "🌊" },
  { id: "adventure", label: "Adventure Mode", emoji: "🧗" },
  { id: "zen", label: "Zen Corner", emoji: "🍃" },
];

