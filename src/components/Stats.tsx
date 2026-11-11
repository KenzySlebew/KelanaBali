import React from "react";
import { QUICK_STATS } from "@/data/mockData";

export default function Stats() {
  return (
    <section
      className="py-10 sm:py-12 lg:py-16 border-b border-gray-100"
      data-purpose="quick-metrics"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {QUICK_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 md:p-0 rounded-2xl md:rounded-none bg-brand-surface md:bg-transparent border border-brand-mutedBorder/50 md:border-none text-left space-y-1 transition hover:bg-gray-50/80 md:hover:bg-transparent"
          >
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-dark">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-medium text-brand-secondary">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
