import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMetadata } from "@/lib/site";
import LoginForm from "./LoginForm";

export const metadata: Metadata = pageMetadata({
  title: "Espace membre",
  description:
    "Connectez-vous à l'espace membre du Cycle Club : agenda des rencontres, annuaire et invitations.",
  path: "/cycle-club/connexion",
});

export default function CycleClubConnexionPage() {
  return (
    <section className="flex min-h-[calc(100vh-4.5rem)] flex-col justify-center bg-[#0c0b13]">
      <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="sr-only">Espace membre du Cycle Club</h1>

        <Link
          href="/cycle-club"
          className="text-sm text-white/60 transition-colors hover:text-white"
        >
          &larr; Cycle Club
        </Link>

        <Image
          src="/images/cycle-club/cycle-club-officiel.webp"
          alt="Cycle Club"
          width={1500}
          height={905}
          priority
          className="mx-auto mt-8 h-auto w-56"
        />

        <div className="mt-10">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
