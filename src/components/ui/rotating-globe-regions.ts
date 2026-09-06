/**
 * Constantes partagees du globe (regions, couleur d'accent). Isolees ici, sans
 * dependance a `three`, pour que `InternationalHighlight` puisse les importer
 * sans embarquer Three.js dans le bundle initial de la page (le globe lui-meme
 * est charge en `next/dynamic`).
 */

export type ContinentKey = "na" | "eu" | "af";

export const REGIONS: { key: ContinentKey; label: string; location: [number, number] }[] = [
  { key: "eu", label: "Europe", location: [50, 10] },
  { key: "af", label: "Afrique", location: [5, 20] },
  { key: "na", label: "Amérique du Nord", location: [45, -100] },
];

// La ligne + le badge du continent selectionne, et les puces du carrousel.
export const ACCENT = "#132bdd";
