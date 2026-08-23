import type { NavItem } from "@/data/nav-sections";

export const entrepriseNavItems: NavItem[] = [
  { slug: "a-propos", href: "/a-propos", navLabel: "À propos de Cycle Consulting", visible: true },
  {
    slug: "nos-valeurs-et-engagements",
    href: "/a-propos#nos-valeurs-et-engagements",
    navLabel: "Nos valeurs et engagements",
    visible: true,
  },
  {
    slug: "nos-atouts-et-differences",
    href: "/a-propos#nos-atouts-et-differences",
    navLabel: "Nos atouts et différences",
    visible: true,
  },
  { slug: "rejoignez-nous", href: "/rejoignez-nous", navLabel: "Rejoignez-nous", visible: true },
  { slug: "faq", href: "/faq", navLabel: "FAQ", visible: true },
  { slug: "partenaires", href: "/partenaires", navLabel: "Nos partenaires", visible: true, showInNav: false },
  { slug: "livre-or", href: "/livre-or", navLabel: "Livre d'or", visible: true, showInNav: false },
];
