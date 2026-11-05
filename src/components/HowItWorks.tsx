"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";

interface HowItWorksProps {
  onOpenMimin: () => void;
}

export default function HowItWorks({ onOpenMimin }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      number: "01",
      title: "Pick Your Vibe!",
      tagline: "Sesuaikan selera healing kamu",
      description:
        "Tim sunset hunter, nature addict, atau yang suka aesthetic cafe spot buat foto-foto OOTD? Whatever your vibe is, Bali's got it all! Pilih vibe favoritmu dalam sekali klik.",
    },
    {
      number: "02",
      title: "Set the Date, No More Wacana",
      tagline: "Kunci tanggal tanpa ribet di grup chat",
      description:
        "Tentukan tanggal liburanmu tanpa drama wacana di grup WhatsApp. Mimin bantu cari musim terbaik, perkiraan ombak, dan rekomendasi area menginap yang pas dengan rute spot impianmu.",
    },
    {
      number: "03",
      title: "Cus Berangkat & Validasi Bareng Mimin",
      tagline: "Itinerary diverifikasi local buddy terpercaya",
      description:
        "Kirim draft itinerary-mu langsung ke Mimin local buddy buat dicek estimasi macet dan waktu tempuhnya. Bebas drama tersesat dan anti boncos waktu di jalan!",
    },
  ];

  return (
    <section
      className="py-16 lg:py-24 border-t border-gray-100"
      data-purpose="how-it-works"
      id="cara-seru"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Steps & Accordion */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-teal mb-2">
              CARA ASIK NIKMATIN BALI
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-dark leading-tight">
              Cara Seru Explore <br className="hidden sm:inline" />
              Bali Bareng Mimin
            </h2>
          </div>

          <p className="text-sm sm:text-base text-brand-secondary leading-relaxed">
            Gaperlu ribet buat liburan, brok — cukup pilih tempat, atur waktu,
            terus gas berangkat! Hidup udah capek, masa healing-nya ribet juga?
          </p>

          {/* Accordion / Step Lists */}
          <div className="space-y-3.5 pt-2">
            {steps.map((step, idx) => {
              const stepNumber = idx + 1;
              const isExpanded = activeStep === stepNumber;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(stepNumber)}
                  className={`rounded-2xl transition-all duration-300 border cursor-pointer ${
                    isExpanded
                      ? "p-5 sm:p-6 bg-brand-surface border-brand-teal/40 shadow-soft"
                      : "p-4 sm:p-5 bg-white hover:bg-gray-50/60 border-brand-mutedBorder/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-3 h-3 rounded-full transition-colors ${
                          isExpanded ? "bg-brand-teal" : "bg-gray-300"
                        }`}
                      />
                      <span className="text-sm sm:text-base font-bold text-brand-dark">
                        {step.number}/ {step.title}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-brand-secondary transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-brand-teal" : ""
                      }`}
                    />
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pl-6 sm:pl-7 pt-2 border-t border-gray-200/50 text-xs sm:text-sm text-brand-secondary leading-relaxed space-y-3 animate-in fade-in duration-200">
                      <p>{step.description}</p>
                      <div className="pt-1 flex flex-wrap items-center gap-3">
                        <Link
                          href="/planner"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dark text-white text-xs font-bold hover:bg-black transition"
                        >
                          <span>Mulai di Planner</span>
                          <span>→</span>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenMimin();
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-deepTeal hover:text-brand-teal transition"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Tanya Mimin</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Photo Collage with Floating Badges */}
        <div className="lg:col-span-6 relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-4 bg-brand-surface/70 rounded-3xl border border-brand-mutedBorder/50">
            {/* Photo 1: Pura Lempuyang Gate of Heaven */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm group">
              <Image
                src="/images/collage_lempuyang.jpg"
                alt="Pura Lempuyang Gate of Heaven Bali"
                fill
                sizes="(max-width: 640px) 150px, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] font-semibold">Pura Lempuyang</p>
                <p className="text-[9px] text-white/80">Karangasem</p>
              </div>
            </div>

            {/* Photo 2: Ulun Danu Beratan */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm group translate-y-3 sm:translate-y-4">
              <Image
                src="/images/collage_ulun_danu.jpg"
                alt="Ulun Danu Beratan Lake Temple"
                fill
                sizes="(max-width: 640px) 150px, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] font-semibold">Ulun Danu Beratan</p>
                <p className="text-[9px] text-white/80">Bedugul</p>
              </div>
            </div>

            {/* Photo 3: Turquoise Coast Cliff */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm group">
              <Image
                src="/images/collage_beach_cliff.jpg"
                alt="Turquoise Beach Cliff in Bali"
                fill
                sizes="(max-width: 640px) 150px, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] font-semibold">Melasti Cliff</p>
                <p className="text-[9px] text-white/80">Uluwatu</p>
              </div>
            </div>

            {/* Photo 4: Tropical Jungle Waterfall */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm group translate-y-3 sm:translate-y-4">
              <Image
                src="/images/collage_jungle.jpg"
                alt="Lush Tropical Jungle Bali"
                fill
                sizes="(max-width: 640px) 150px, 300px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-[11px] font-semibold">Tibumana Forest</p>
                <p className="text-[9px] text-white/80">Bangli</p>
              </div>
            </div>
          </div>

          {/* Floating Badge 1: Top Left */}
          <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-10 px-4 py-2 rounded-full bg-white shadow-float border border-gray-100 flex items-center gap-2 animate-bounce duration-1000">
            <span className="w-2 h-2 rounded-full bg-brand-teal" />
            <span className="text-xs font-extrabold text-brand-dark">
              100+ Bali Vibes
            </span>
          </div>

          {/* Floating Badge 2: Bottom Right */}
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 z-10 px-4 py-2 rounded-full bg-brand-pillDark text-white shadow-float flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
            <span className="text-xs font-extrabold">100% Fun No Drama</span>
          </div>
        </div>
      </div>
    </section>
  );
}

