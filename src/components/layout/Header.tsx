"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { polesNav } from "@/data/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/95 backdrop-blur supports-backdrop-blur:bg-surface/80">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src="/cycle-consulting-logo.svg"
            alt="Cycle Consulting"
            width={40}
            height={20}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {polesNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-surface-alt text-anthracite"
                    : "text-anthracite-soft hover:bg-surface-alt hover:text-anthracite"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-2 rounded-md bg-anthracite px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-anthracite-soft"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="m3 5 7 6 7-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Nous contacter
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle text-anthracite lg:hidden"
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
        <nav className="border-t border-border-subtle bg-surface px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {polesNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-anthracite-soft hover:bg-surface-alt hover:text-anthracite"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md bg-anthracite px-3 py-2 text-center text-sm font-semibold text-white hover:bg-anthracite-soft"
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
