import type { ChiffreCle } from "@/data/chiffres-cles";
import Counter from "@/components/ui/Counter";

export default function StatItem({ chiffre }: { chiffre: ChiffreCle }) {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        <Counter to={parseInt(chiffre.valeur, 10)} />
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-white/70 sm:text-sm">{chiffre.libelle}</p>
    </div>
  );
}
