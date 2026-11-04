# 🌴 KelanaBali — Visual-First Travel Hub untuk Wisatawan Muda

> **"Bali's Calling — Let's Vibe And Explore Together"**  

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
