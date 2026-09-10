export type Partenaire = {
  nom: string;
};

export const partenaires: Partenaire[] = [
  { nom: "Ollium" },
  { nom: "Syker" },
  { nom: "Insiders" },
  { nom: "Microsoft" },
];

// `clientsLivreOr` (Malakoff Humanis, Burger King, Gordon E., DBV) a ete retire :
// ce bandeau nommait des clients sans accord d'affichage. Le livre d'or derive
// desormais ses logos des temoignages, ou seuls les clients ayant donne leur
// accord portent un `logo`.
