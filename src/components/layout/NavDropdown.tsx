"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { NavItemGroup } from "@/data/nav-sections";

export default function NavDropdown({
  label,
  groups,
  isOpen,
  onToggle,
  onOpen,
  onClose,
  isActive,
  showGroupTitles = true,
  transparent = false,
}: {
  label: string;
  groups: NavItemGroup[];
  isOpen: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  isActive: boolean;
  showGroupTitles?: boolean;
  transparent?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onClose();
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  function handleMouseEnter() {
    window.clearTimeout(closeTimeoutRef.current);
    onOpen();
  }

  function handleMouseLeave() {
    closeTimeoutRef.current = window.setTimeout(onClose, 150);
  }

  return (
    <div ref={rootRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          transparent
            ? isActive || isOpen
              ? "bg-white/10 text-white"
              : "text-white/80 hover:bg-white/10 hover:text-white"
            : isActive || isOpen
              ? "bg-surface-alt text-anthracite"
              : "text-anthracite-soft hover:bg-surface-alt hover:text-anthracite"
        }`}
      >
        {label}
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border-subtle bg-surface p-3 shadow-lg">
          {groups.map((group) => {
            const showTitle = showGroupTitles && Boolean(group.category);
            return (
              <div key={group.category || "_flat"} className={showTitle ? "py-2 first:pt-0 last:pb-0" : undefined}>
                {showTitle && (
                  <p className="px-3 text-xs font-semibold uppercase tracking-wide text-anthracite-mist">
                    {group.category}
                  </p>
                )}
                <div className={showTitle ? "mt-1" : undefined}>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-md px-3 py-2 text-sm text-anthracite-soft transition-colors hover:bg-surface-alt hover:text-anthracite"
                    >
                      {item.navLabel}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
