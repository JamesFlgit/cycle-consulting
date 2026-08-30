"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getRenderableSections } from "@/data/nav-sections";
import NavLogoMark from "@/components/layout/NavLogoMark";
import NavDropdown from "@/components/layout/NavDropdown";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openDesktopKey, setOpenDesktopKey] = useState<string | null>(null);
  const [openMobileKey, setOpenMobileKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const sections = getRenderableSections();
  const mobileNavRef = useRef<HTMLElement>(null);
  const burgerBtnRef = useRef<HTMLButtonElement>(null);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) return;
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  function closeAll() {
    setOpen(false);
    setOpenDesktopKey(null);
    setOpenMobileKey(null);
  }

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (mobileNavRef.current?.contains(target) || burgerBtnRef.current?.contains(target)) return;
      setOpen(false);
      setOpenMobileKey(null);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <header
      className={`${isHome ? "fixed" : "sticky"} top-0 z-50 w-full border-b transition-colors duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-border-subtle bg-surface/95 backdrop-blur supports-backdrop-blur:bg-surface/80"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={closeAll}>
          <NavLogoMark className="h-9 w-auto" variant={transparent ? "light" : "color"} />
          <span
            className={`text-base uppercase tracking-wide transition-colors sm:text-lg ${transparent ? "text-white" : "text-anthracite"}`}
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Cycle Consulting
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {sections.map((section) => {
            if (section.mode === "hidden") return null;

            if (section.mode === "link") {
              const active = pathname === section.href;
              return (
                <Link
                  key={section.key}
                  href={section.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    transparent
                      ? active
                        ? "bg-white/10 text-white"
                        : "text-white hover:bg-white/10"
                      : active
                        ? "bg-surface-alt text-anthracite"
                        : "text-anthracite-soft hover:bg-surface-alt hover:text-anthracite"
                  }`}
                >
                  {section.label}
                </Link>
              );
            }

            const isActive = section.groups.some((g) => g.items.some((i) => i.href === pathname));
            return (
              <NavDropdown
                key={section.key}
                label={section.label}
                href={section.hubHref}
                groups={section.groups}
                isOpen={openDesktopKey === section.key}
                onToggle={() => setOpenDesktopKey((current) => (current === section.key ? null : section.key))}
                onOpen={() => setOpenDesktopKey(section.key)}
                onClose={() => setOpenDesktopKey(null)}
                isActive={isActive}
                showGroupTitles={section.key !== "expertises"}
                transparent={transparent}
              />
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact"
            className={`cta-primary ${transparent ? "" : "cta-primary-on-light"} ml-2 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold`}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="m3 5 7 6 7-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nous contacter
          </Link>
        </div>

        <button
          ref={burgerBtnRef}
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors lg:hidden ${
            transparent ? "border-white/30 text-white" : "border-border-subtle text-anthracite"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            ) : (
              <path
                d="M2.5 5h15M2.5 10h15M2.5 15h15"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav ref={mobileNavRef} className="border-t border-border-subtle bg-surface px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {sections.map((section) => {
              if (section.mode === "hidden") return null;

              if (section.mode === "link") {
                return (
                  <li key={section.key}>
                    <Link
                      href={section.href}
                      onClick={closeAll}
                      className="block rounded-md px-3 py-2 text-sm font-medium text-anthracite-soft hover:bg-surface-alt hover:text-anthracite"
                    >
                      {section.label}
                    </Link>
                  </li>
                );
              }

              const isGroupOpen = openMobileKey === section.key;
              return (
                <li key={section.key}>
                  <div className="flex w-full items-center justify-between rounded-md text-sm font-medium text-anthracite-soft hover:bg-surface-alt hover:text-anthracite">
                    {section.hubHref ? (
                      <Link
                        href={section.hubHref}
                        onClick={(e) => {
                          if (!isGroupOpen) {
                            e.preventDefault();
                            setOpenMobileKey(section.key);
                          } else {
                            closeAll();
                          }
                        }}
                        className="flex-1 px-3 py-2"
                      >
                        {section.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenMobileKey((current) => (current === section.key ? null : section.key))}
                        aria-expanded={isGroupOpen}
                        className="flex-1 px-3 py-2 text-left"
                      >
                        {section.label}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpenMobileKey((current) => (current === section.key ? null : section.key))}
                      aria-expanded={isGroupOpen}
                      aria-label={`Afficher le sous-menu ${section.label}`}
                      className="px-3 py-2"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform ${isGroupOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="m5 8 5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {isGroupOpen && (
                    <div className="pl-3">
                      {section.groups.map((group) => {
                        const showTitle = section.key !== "expertises" && Boolean(group.category);
                        return (
                          <div key={group.category || "_flat"} className={showTitle ? "py-1" : undefined}>
                            {showTitle && (
                              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-anthracite-mist">
                                {group.category}
                              </p>
                            )}
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeAll}
                                className="block rounded-md px-3 py-2 text-sm text-anthracite-soft hover:bg-surface-alt hover:text-anthracite"
                              >
                                {item.navLabel}
                              </Link>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={closeAll}
                className="cta-primary cta-primary-on-light flex items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm font-bold"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="m3 5 7 6 7-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Nous contacter
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
