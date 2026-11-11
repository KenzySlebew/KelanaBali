"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LiquidNavbar, LiquidNavItem, NimbusIcons } from "@/components/ui/liquid-glass-navbar";

interface MobileBottomNavProps {
  onOpenMimin?: () => void;
  onOpenWishlist: () => void;
  savedCount: number;
}

export default function MobileBottomNav({
  onOpenMimin,
  onOpenWishlist,
  savedCount,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  // Route-based active tab detection
  useEffect(() => {
    if (pathname === "/explore") {
      setActiveIndex(1);
    } else if (pathname === "/itinerary" || pathname === "/planner") {
      setActiveIndex(2);
    } else if (pathname === "/tanya-mimin") {
      setActiveIndex(3);
    } else if (pathname === "/") {
      setActiveIndex(0);
    }
  }, [pathname]);

  // Scroll detection to glide the active liquid bubble across sections on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const offset = window.scrollY + 280;
      const exploreEl = document.getElementById("explore");
      const caraSeruEl = document.getElementById("cara-seru");
      const kontakEl = document.getElementById("kontak");

      if (kontakEl && offset >= kontakEl.offsetTop) {
        setActiveIndex(3);
      } else if (caraSeruEl && offset >= caraSeruEl.offsetTop) {
        setActiveIndex(2);
      } else if (exploreEl && offset >= exploreEl.offsetTop) {
        setActiveIndex(1);
      } else {
        setActiveIndex(0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const dockItems: LiquidNavItem[] = useMemo(
    () => [
      {
        label: "Home",
        icon: NimbusIcons.home,
        fx: "glow",
      },
      {
        label: "Explore",
        icon: NimbusIcons.globe,
        fx: "spin",
      },
      {
        label: "Itinerary",
        icon: NimbusIcons.map,
        fx: "drop",
      },
      {
        label: "Mimin",
        icon: NimbusIcons.chat,
        fx: "wave",
      },
      {
        label: "Wishlist",
        icon: NimbusIcons.bookmark,
        badge: savedCount > 0 ? savedCount : undefined,
        fx: "pop",
      },
    ],
    [savedCount]
  );

  const handleDockChange = (index: number) => {
    setActiveIndex(index);

    if (index === 0) {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
    } else if (index === 1) {
      if (pathname === "/") {
        const el = document.getElementById("explore");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/explore");
      } else {
        router.push("/explore");
      }
    } else if (index === 2) {
      router.push("/itinerary");
    } else if (index === 3) {
      if (pathname !== "/tanya-mimin" && onOpenMimin) {
        onOpenMimin();
      } else {
        router.push("/tanya-mimin");
      }
    } else if (index === 4) {
      onOpenWishlist();
    }
  };

  return (
    <div
      className="md:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 max-w-md mx-auto z-40 pointer-events-auto"
      aria-label="Navigasi Aplikasi Bawah"
    >
      <LiquidNavbar
        items={dockItems}
        active={activeIndex}
        onChange={handleDockChange}
        variant="dock"
        tone="light"
        sound
        className="shadow-float"
      />
    </div>
  );
}
