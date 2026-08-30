"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqTheme } from "@/data/faq";

export default function FaqAccordion({ theme }: { theme: FaqTheme }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const groupId = useId();

  return (
    <div className="divide-y divide-border-subtle rounded-xl border border-border-subtle bg-surface">
      {theme.items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${groupId}-panel-${index}`;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-anthracite transition-colors hover:bg-surface-alt sm:text-base"
            >
              {item.question}
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm leading-relaxed whitespace-pre-line text-anthracite-mist">
                      {item.reponse}
                    </p>
                    <Link
                      href="/contact"
                      className="cta-primary cta-primary-on-light mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold"
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M3 5.5 10 11l7-5.5M3 5h14v10H3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Nous contacter
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
