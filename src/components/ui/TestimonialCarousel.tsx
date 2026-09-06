"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Temoignage } from "@/data/temoignages";

const AUTOPLAY_INTERVAL_MS = 5500;
const SCROLL_SETTLE_DELAY_MS = 150;

/** Nombre de cartes visibles = nombre de cartes qu'on avance à chaque pas.
 * Doit refléter les classes `basis-*` de la piste (1 / 2 / 3). */
function cardsPerView(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function TestimonialCarousel({ temoignages }: { temoignages: Temoignage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [perView, setPerView] = useState(3);

  const pageCount = Math.max(1, Math.ceil(temoignages.length / perView));
  // Le nombre de pages change avec le breakpoint (resize) : on borne la page
  // active a l'affichage plutot que via un setState dans un effet.
  const currentPage = Math.min(activePage, pageCount - 1);

  useEffect(() => {
    const update = () => setPerView(cardsPerView(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollToPage = useCallback(
    (page: number) => {
      const track = trackRef.current;
      const target = cardRefs.current[page * perView];
      if (!track || !target) return;
      isProgrammaticScroll.current = true;
      const targetLeft =
        target.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: targetLeft, behavior: reduce ? "auto" : "smooth" });
    },
    [perView],
  );

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActivePage((current) => (Math.min(current, pageCount - 1) + 1) % pageCount);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, pageCount]);

  useEffect(() => {
    scrollToPage(currentPage);
  }, [currentPage, scrollToPage]);

  // Après un swipe/scroll manuel, resynchronise `activePage` une fois le scroll stabilisé.
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
        const nearestPage = Math.min(Math.round(nearestCardIndex / perView), pageCount - 1);
        setActivePage(Math.max(0, nearestPage));
      }, SCROLL_SETTLE_DELAY_MS);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimeout);
    };
  }, [pageCount, perView]);

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
            key={t.ref}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="shrink-0 grow-0 snap-start basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard temoignage={t} />
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, page) => (
            <button
              key={page}
              type="button"
              aria-label={`Page de témoignages ${page + 1} sur ${pageCount}`}
              aria-current={page === currentPage}
              onClick={() => setActivePage(page)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                page === currentPage ? "bg-anthracite" : "bg-border-subtle hover:bg-accent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
