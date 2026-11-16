"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, X, ArrowRight } from "lucide-react";
import { ARTICLES_DATA, Article } from "@/data/mockData";

export default function ArticlesSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { featured, sideArticles } = ARTICLES_DATA;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedArticle(null);
      }
    };
    if (selectedArticle) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedArticle]);

  return (
    <section
      className="py-14 sm:py-16 lg:py-20"
      data-purpose="editorial-news-section"
      id="artikel"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-teal block mb-1">
            EDITORIAL & INSIGHT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-dark">
            Baca 100+ Artikel Baru
          </h2>
        </div>
        <Link
          href="/artikel"
          className="text-xs sm:text-sm font-bold text-brand-dark hover:text-brand-deepTeal flex items-center gap-1.5 transition group focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded-lg px-2 py-1"
        >
          <span>Lihat semua</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* Magazine Grid: 1 Big Left Card + 3 Stacked Right Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Big Featured Article Card (Left) */}
        <article
          tabIndex={0}
          role="button"
          onClick={() => setSelectedArticle(featured)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedArticle(featured);
            }
          }}
          aria-label={`Baca artikel utama: ${featured.title}`}
          className="lg:col-span-6 group cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none rounded-2xl p-1"
        >
          <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-gray-100 mb-5 relative shadow-sm group-hover:shadow-soft transition-all duration-300">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full bg-brand-pillDark text-white text-[11px] font-bold tracking-wider uppercase">
                {featured.category}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-xs text-brand-secondary">
              <span>{featured.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {featured.readTime}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-brand-dark group-hover:text-brand-deepTeal transition leading-snug">
              {featured.title}
            </h3>

            <p className="text-xs sm:text-sm text-brand-secondary leading-relaxed line-clamp-2">
              {featured.excerpt}
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-brand-deepTeal inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Baca selengkapnya</span>
                <span>→</span>
              </span>
            </div>
          </div>
        </article>

        {/* Stack of 3 Horizontal Cards (Right) */}
        <div className="lg:col-span-6 flex flex-col gap-5 sm:gap-6">
          {sideArticles.map((article) => (
            <article
              key={article.id}
              tabIndex={0}
              role="button"
              onClick={() => setSelectedArticle(article)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedArticle(article);
                }
              }}
              aria-label={`Baca artikel: ${article.title}`}
              className="group flex gap-4 sm:gap-5 items-center p-3 sm:p-4 rounded-2xl bg-white hover:bg-brand-surface border border-transparent hover:border-brand-mutedBorder transition-all duration-200 cursor-pointer shadow-none hover:shadow-card focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
            >
              {/* Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="120px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-surface text-brand-deepTeal border border-brand-teal/20 text-[10px] font-bold">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-brand-secondary">
                    {article.readTime}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-brand-dark leading-snug group-hover:text-brand-deepTeal transition line-clamp-2">
                  {article.title}
                </h4>

                <p className="text-xs text-brand-secondary line-clamp-2 hidden sm:block">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto no-scrollbar shadow-float relative">
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-brand-dark transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
              aria-label="Tutup artikel"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-pillDark text-white text-xs font-bold uppercase tracking-wider">
                {selectedArticle.category}
              </span>
            </div>

            <h3
              id="article-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight mb-3"
            >
              {selectedArticle.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-brand-secondary mb-6 pb-4 border-b border-gray-100">
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
              <span>•</span>
              <span className="text-brand-deepTeal font-medium">Oleh Tim Redaksi KelanaBali</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-6 shadow-sm">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-sm sm:text-base text-brand-dark/90 leading-relaxed space-y-4">
              <p className="font-medium text-brand-dark">
                {selectedArticle.excerpt}
              </p>
              <p>
                Bali selalu punya ritme unik yang tidak pernah gagal memikat para
                traveler. Mulai dari deburan ombak pagi di pesisir Badung hingga
                aroma dupa dan kopi segar di cafe tersembunyi, semua menciptakan
                energi yang menyegarkan pikiran dan jiwa.
              </p>
              <p>
                Riset kami membuktikan bahwa wisatawan muda yang meluangkan waktu
                minimal satu jam di pagi hari untuk menikmati suasana tanpa
                terburu-buru melaporkan tingkat kepuasan liburan yang jauh lebih
                tinggi. Kuncinya adalah jangan over-plan: pilih vibe yang kamu
                suka, dan biarkan Pulau Dewata mengejutkanmu dengan kehangatannya.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between gap-3">
              <Link
                href="/artikel"
                className="px-5 py-2.5 rounded-full bg-teal-50 text-brand-deepTeal border border-brand-teal/30 hover:bg-teal-100 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <span>Buka Halaman Penuh Jurnal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full bg-brand-pillDark text-white text-xs font-semibold hover:bg-black transition focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:outline-none"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
