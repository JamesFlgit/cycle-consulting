import { GRADIENT_STOPS } from "@/components/logo/logo-geometry";

export type RepartitionItem = {
  label: string;
  value: number;
  color: string;
};

const [c1, c2, c3, c4, c5] = GRADIENT_STOPS.map((stop) => stop.color);

/** Répartition des effectifs par pôle d'expertise. */
export const repartitionPractices: RepartitionItem[] = [
  { label: "Service Managé", value: 31, color: c1 },
  { label: "Infogérance", value: 26, color: c2 },
  { label: "Business & Stratégie", value: 22, color: c3 },
  { label: "Centre Logistique", value: 14, color: c4 },
  { label: "Formations", value: 7, color: c5 },
];

/** Répartition Hommes / Femmes des effectifs. */
export const repartitionGenre: RepartitionItem[] = [
  { label: "Hommes", value: 62, color: c3 },
  { label: "Femmes", value: 38, color: c1 },
];
