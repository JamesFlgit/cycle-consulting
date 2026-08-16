"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Temoignage } from "@/data/temoignages";

const CARDS_PER_PAGE = 3;
const AUTOPLAY_INTERVAL_MS = 5000;
const SCROLL_SETTLE_DELAY_MS = 150;

export default function TestimonialCarousel({ temoignages }: { temoignages: Temoignage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pageCount = Math.ceil(temoignages.length / CARDS_PER_PAGE);

  const scrollToPage = useCallback((page: number) => {
    const track = trackRef.current;
    const target = cardRefs.current[page * CARDS_PER_PAGE];
    if (!track || !target) return;
    isProgrammaticScroll.current = true;
    const targetLeft = target.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;
    const id = setInterval(() => {
      setActivePage((current) => (current + 1) % pageCount);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, pageCount]);

  useEffect(() => {
    scrollToPage(activePage);
  }, [activePage, scrollToPage]);

  // Sync activePage after the user manually swipes/scrolls the track (only once the scroll settles).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let settleTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => {
        if (isProgrammaticScroll.current) {
          isProgrammaticScroll.current = false;
          return;
        }
        const cardWidth = cardRefs.current[0]?.offsetWidth ?? track.clientWidth;
        const gap = 24;
        const nearestCardIndex = Math.round(track.scrollLeft / (cardWidth + gap));
        const nearestPage = Math.min(Math.round(nearestCardIndex / CARDS_PER_PAGE), pageCount - 1);
        setActivePage(nearestPage);
      }, SCROLL_SETTLE_DELAY_MS);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimeout);
    };
  }, [pageCount]);

  return (
    <div
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-none [-ms-overflow-style:none]"
      >
        {temoignages.map((t, index) => (
          <div
            key={t.auteur}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="h-80 shrink-0 grow-0 snap-start basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard temoignage={t} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: pageCount }, (_, page) => (
          <button
            key={page}
            type="button"
            aria-label={`Voir les témoignages ${page * CARDS_PER_PAGE + 1} à ${Math.min(
              (page + 1) * CARDS_PER_PAGE,
              temoignages.length,
            )}`}
            aria-current={page === activePage}
            onClick={() => setActivePage(page)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              page === activePage ? "bg-anthracite" : "bg-border-subtle hover:bg-accent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
