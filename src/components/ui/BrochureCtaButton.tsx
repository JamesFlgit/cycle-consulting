"use client";

import { useState } from "react";
import BrochureModal from "@/components/ui/BrochureModal";

export default function BrochureCtaButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        Télécharger notre brochure
      </button>
      <BrochureModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
