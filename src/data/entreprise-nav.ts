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
  { slug: "evenements", href: "/evenements", navLabel: "Salons & évènements", visible: true },
  { slug: "rejoignez-nous", href: "/rejoignez-nous", navLabel: "Rejoignez-nous", visible: true },
  { slug: "faq", href: "/faq", navLabel: "FAQ", visible: true },
  {
    slug: "cycle-fondation",
    href: "/cycle-fondation",
    navLabel: "Cycle Foundation",
    visible: true,
    card: {
      logo: "/images/cycle-fondation/logo.webp",
      logoWidth: 1600,
      logoHeight: 1087,
      logoScale: 1.3,
      background: "#050505",
      tagline: ["Apprendre", "Comprendre", "Transmettre"],
      accentClassName: "text-[#ecd9a0]",
    },
  },
  {
    slug: "cycle-club",
    href: "/cycle-club",
    navLabel: "Cycle Club",
    visible: true,
    card: {
      logo: "/images/cycle-club/cycle-club-officiel.webp",
      logoWidth: 1500,
      logoHeight: 905,
      logoScale: 1,
      background: "#0c0b13",
      tagline: ["Passion", "Relation", "Émotion"],
      accentClassName: "text-[#d0b3f7]",
    },
  },
  { slug: "partenaires", href: "/#partenaires", navLabel: "Nos partenaires", visible: true, showInNav: false },
  { slug: "livre-or", href: "/livre-or", navLabel: "Livre d'or", visible: true, showInNav: false },
];
