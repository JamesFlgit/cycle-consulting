"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/ui/TestimonialCard";
import type { Temoignage } from "@/data/temoignages";

const AUTOPLAY_INTERVAL_MS = 5500;
const SCROLL_SETTLE_DELAY_MS = 150;
// Delai laisse a l'animation "smooth" du bouclage avant le recalage sans animation.
const LOOP_RESET_DELAY_MS = 650;
const GAP_PX = 24;

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
  const previousPage = useRef(0);
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  const [canLoop, setCanLoop] = useState(false);

  const pageCount = Math.max(1, Math.ceil(temoignages.length / perView));
  // Le nombre de pages change avec le breakpoint (resize) : on borne la page
  // active a l'affichage plutot que via un setState dans un effet.
  const currentPage = Math.min(activePage, pageCount - 1);

  // On duplique la liste (uniquement apres montage, pour ne pas alourdir le SSR
  // ni exposer deux fois les citations aux robots) : la 2e copie sert de sas de
  // bouclage. Plutot que de rembobiner de la derniere page vers la premiere - un
  // defile tres rapide -, on continue vers la copie dans le meme sens puis on
  // recale la position sans animation : la boucle parait continue.
  const loops = canLoop && pageCount > 1;
  const slides = loops ? [...temoignages, ...temoignages] : temoignages;

  useEffect(() => {
    // Apres montage : on aligne le nombre de cartes par vue sur le viewport et
    // on autorise la piste dupliquee (pas de doublon des citations au SSR).
    const syncViewport = () => {
      setPerView(cardsPerView(window.innerWidth));
      setCanLoop(true);
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const scrollToCard = useCallback((cardIndex: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const target = cardRefs.current[cardIndex];
    if (!track || !target) return;
    isProgrammaticScroll.current = true;
    const targetLeft =
      target.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: targetLeft, behavior: reduce ? "instant" : behavior });
  }, []);

  // Largeur d'une copie complete de la liste (distance carte 0 -> carte clonee 0).
  const copyWidth = useCallback(() => {
    const first = cardRefs.current[0];
    const clone = cardRefs.current[temoignages.length];
    if (!first || !clone) return 0;
    return clone.getBoundingClientRect().left - first.getBoundingClientRect().left;
  }, [temoignages.length]);

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActivePage((current) => (Math.min(current, pageCount - 1) + 1) % pageCount);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, pageCount]);

  useEffect(() => {
    const previous = previousPage.current;
    previousPage.current = currentPage;

    // Bouclage : on revient de la derniere page vers la premiere. On avance dans
    // la copie (meme sens, mouvement court) puis on recale sur l'originale d'un
    // saut instantane - les cartes etant identiques, il est invisible.
    // `behavior: "instant"` est indispensable : la piste porte `scroll-smooth`,
    // donc "auto" repasserait par une animation (le rembobinage qu'on evite).
    if (loops && previous === pageCount - 1 && currentPage === 0) {
      scrollToCard(temoignages.length);
      const id = setTimeout(() => {
        const width = copyWidth();
        if (width) {
          isProgrammaticScroll.current = true;
          trackRef.current?.scrollBy({ left: -width, behavior: "instant" });
        }
      }, LOOP_RESET_DELAY_MS);
      return () => clearTimeout(id);
    }

    scrollToCard(currentPage * perView);
  }, [currentPage, perView, pageCount, loops, temoignages.length, scrollToCard, copyWidth]);

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
        // Derive manuelle dans la 2e copie : on revient sur l'originale sans
        // animation (cartes identiques, saut invisible).
        const width = copyWidth();
        if (loops && width && track.scrollLeft >= width - cardWidth / 2) {
          isProgrammaticScroll.current = true;
          track.scrollBy({ left: -width, behavior: "instant" });
          return;
        }
        const nearestCardIndex = Math.round(track.scrollLeft / (cardWidth + GAP_PX));
        const nearestPage = Math.min(Math.round(nearestCardIndex / perView), pageCount - 1);
        setActivePage(Math.max(0, nearestPage));
      }, SCROLL_SETTLE_DELAY_MS);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimeout);
    };
  }, [pageCount, perView, loops, copyWidth]);

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
        {slides.map((t, index) => {
          const isClone = index >= temoignages.length;
          return (
            <div
              key={isClone ? `clone-${index}` : t.ref}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              aria-hidden={isClone || undefined}
              className="shrink-0 grow-0 snap-start basis-full sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <TestimonialCard temoignage={t} />
            </div>
          );
        })}
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
