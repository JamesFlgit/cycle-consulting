export type NavItem = {
  label: string;
  href: string;
};

export const polesNav: NavItem[] = [
  { label: "Formations", href: "/formations" },
  { label: "Service Managé", href: "/service-manage" },
  { label: "Business & Stratégie", href: "/business-strategie" },
  { label: "Ingénierie & IT Support", href: "/ingenierie-it-support" },
  { label: "Centre Logistique", href: "/centre-logistique" },
];

export const secondaryNav: NavItem[] = [
  { label: "Nos partenaires", href: "/partenaires" },
  { label: "Livre d'or", href: "/livre-or" },
];

export const footerNav: NavItem[] = [...polesNav, ...secondaryNav, { label: "Nous contacter", href: "/contact" }];
