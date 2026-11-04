# 🌴 KelanaBali — Visual-First Travel Hub untuk Wisatawan Muda

> **"Bali's Calling — Let's Vibe And Explore Together"**  
> Web application responsif berbasis **Next.js 15 (App Router)** & **Tailwind CSS**, dikembangkan berdasarkan desain visual dan spesifikasi Stitch project **KelanaBali Travel Landing Page**.

---

## 📸 Stitch Source Screens

Data visual, styling token, dan aset grafis diambil dari proyek Stitch:
- **Project Title:** KelanaBali Travel Landing Page
- **Project ID:** `8634551969823395590`

| Screen | Stitch Screen ID | Output Asset |
| :--- | :--- | :--- |
| **KelanaBali - Desktop Landing Page** | `49c2182e85024c32a454ec0afbcde52d` | `stitch_assets/desktop_landing.html` & `desktop_screenshot.png` |
| **KelanaBali - Mobile Landing Page** | `8253b3efad9d4208bd934ce052940e41` | `stitch_assets/mobile_landing.html` & `mobile_screenshot.png` |

---

## ✨ Fitur & Komponen Utama

1. **Floating Glassmorphic Navbar (`src/components/Navbar.tsx`)**
   - Logo bergaya wordmark dengan aksen cursive `La` (*Caveat font*) dan teal dot indicator.
   - Navigasi responsif (Home, Explore, Cara Seru, Blog, Gallery) dan dark pill CTA "Contact Us".
   - Drawer menu khusus mobile.

2. **Hero Section (`src/components/Hero.tsx`)**
   - Rounded 24px container dengan foto udara pesisir Bali resolusi tinggi.
   - Dual-gradient overlay untuk keterbacaan teks maksimal (memenuhi standar WCAG AA).
   - Eyebrow pill: *"Bali trip — no cap, just vibes."*
   - Interactive 2x2 Vibe Chips (*Spot Aesthetic, Vibe Chill, Adventure Mode, Zen Corner*) yang langsung memfilter spot.

3. **Credibility Stats (`src/components/Stats.tsx`)**
   - 4 metrik terpercaya: `100% Fun No Drama`, `200+ Trip Seru di Bali`, `5,000+ Happy Travelers`, `50+ Spot Aesthetic`.

4. **Curated Spots Carousel (`src/components/ExploreCarousel.tsx`)**
   - Tab kategori: *Beach Vibes*, *Nature Escape*, *Culture & Heritage*.
   - Carousel cards bertingkat (staggered desktop layout) dan horizontal swipeable di mobile.
   - Fitur simpan ke Wishlist / Trip Board dan Quick View Modal untuk melihat tiket masuk, jam terbaik, serta tips lokal.

5. **Cara Seru Explore Bali Bareng Mimin (`src/components/HowItWorks.tsx`)**
   - 3-Langkah interaktif: *01/ Pick Your Vibe!* → *02/ Set the Date, No More Wacana* → *03/ Cus Berangkat & Validasi Bareng Mimin*.
   - Kolase artistik 4 foto Bali dengan floating badges *"100+ Bali Vibes"* & *"100% Fun"*.

6. **FOMO Banner (`src/components/FomoBanner.tsx`)**
   - Pemandangan dramatis ombak toska Kelingking Beach, Nusa Penida dengan ajakan *"Bali makin bikin FOMO gak sih?"*.

7. **Editorial Magazine Section (`src/components/ArticlesSection.tsx`)**
   - 1 Artikel unggulan (Americano Canggu morning vibe) + 3 side story cards dengan modal pembaca artikel in-app.

8. **Closing CTA & Mimin Consultation (`src/components/ClosingCTA.tsx` & `src/components/MiminModal.tsx`)**
   - Headline display serif *"Ingin Tahu Lebih Banyak?"*.
   - Form konsultasi local buddy dengan handoff langsung ke WhatsApp resmi KelanaBali.

9. **Mobile Bottom Navigation (`src/components/MobileBottomNav.tsx`)**
   - Bottom app bar sticky di layar mobile untuk akses instan ke Home, Explore, Tanya Mimin, dan Wishlist.

---

## 🚀 Menjalankan Proyek Secara Lokal

### Prasyarat
- Node.js v18.17+ atau v20+ / v22+
- npm v10+

### Instalasi & Menjalankan Dev Server
```bash
# 1. Masuk ke direktori proyek
cd "d:\KelanaBali-Web App"

# 2. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Production Build
```bash
npm run build
npm run start
```

---

## 📁 Struktur Direktori

```text
KelanaBali-Web App/
├── public/
│   ├── images/               # 29 Aset foto yang diunduh dari Stitch
│   └── screenshots/          # Screenshot high-res desktop & mobile dari Stitch
├── src/
│   ├── app/
│   │   ├── globals.css       # Styling Tailwind & custom utilities
│   │   ├── layout.tsx        # Google Fonts (Inter, Newsreader, Caveat) & metadata
│   │   └── page.tsx          # Komposisi halaman utama landing page
│   ├── components/           # Komponen modular Next.js
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── ExploreCarousel.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FomoBanner.tsx
│   │   ├── ArticlesSection.tsx
│   │   ├── ClosingCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileBottomNav.tsx
│   │   ├── SpotModal.tsx
│   │   └── MiminModal.tsx
│   └── data/
│       └── mockData.ts       # Data spot, vibe, artikel, dan tips lokal
├── stitch_assets/            # File HTML & PNG mentah hasil unduhan Stitch
├── PRD KelanaBali ...md      # Product Requirements Document
├── tailwind.config.ts        # Design tokens KelanaBali
└── package.json
```

