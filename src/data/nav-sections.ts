import { poles } from "@/data/poles";
import { entrepriseNavItems } from "@/data/entreprise-nav";
import { ressourcesNavItems } from "@/data/ressources-nav";
import { casClients } from "@/data/cas-clients";

/** Turns a nav item into a visual card (logo sur fond sombre) au lieu d'un simple lien texte. */
export type NavCard = {
  /** Logo détouré (fond transparent ou fond noir). */
  logo: string;
  /** Dimensions intrinsèques du logo, pour next/image. */
  logoWidth: number;
  logoHeight: number;
  /** Facteur d'échelle du logo, pour équilibrer visuellement les marques entre elles. */
  logoScale?: number;
  /** Couleur de fond de la carte. */
  background: string;
  /** Mots-clés du slogan — un par ligne en desktop, séparés par un chevron. */
  tagline: string[];
  /** Classe Tailwind pour la couleur de l'accroche. */
  accentClassName?: string;
  /** Classe additionnelle sur le logo (ex. mix-blend-screen). */
  logoClassName?: string;
};

export type NavItem = {
  slug: string;
  href: string;
  navLabel: string;
  category?: string;
  visible: boolean;
  /** Set to false to keep an item out of the main nav while still showing it elsewhere (e.g. footer). Defaults to true. */
  showInNav?: boolean;
  /** Quand défini, l'item est rendu en carte visuelle dans le méga-menu au lieu d'un lien texte. */
  card?: NavCard;
};

export type NavSection = {
  key: string;
  label: string;
  items: NavItem[];
};

export type NavItemGroup = { category: string; items: NavItem[] };

export type RenderableSection =
  | { key: string; label: string; mode: "hidden" }
  | { key: string; label: string; mode: "link"; href: string }
  | {
      key: string;
      label: string;
      mode: "dropdown";
      groups: NavItemGroup[];
      hubHref?: string;
      /** Items marqués `card` — affichés en colonne de cartes à droite du méga-menu. */
      featured: NavItem[];
    };

const navSections: NavSection[] = [
  { key: "expertises", label: "Expertises", items: poles },
  {
    key: "cas-clients",
    label: "Nos réalisations",
    items: casClients.map((c) => ({
      slug: c.slug,
      href: c.href,
      navLabel: c.navLabel,
      category: c.secteur,
      visible: c.visible,
    })),
  },
  { key: "entreprise", label: "L'entreprise", items: entrepriseNavItems },
  { key: "ressources", label: "Ressources", items: ressourcesNavItems },
];

/** Sections that always link straight to their hub page instead of listing items in a dropdown. */
const HUB_LINK_SECTIONS: Record<string, string> = {
  "cas-clients": "/cas-clients",
};

/** Sections that keep their dropdown of sub-items but whose label also links
 * straight to a hub page — clicking the label navigates there, the chevron
 * still opens the sub-item list. */
const DROPDOWN_HUB_HREF: Record<string, string> = {
  entreprise: "/a-propos",
  ressources: "/ressources",
};

export function getRenderableSections(): RenderableSection[] {
  return navSections.map((section) => {
    const hubHref = HUB_LINK_SECTIONS[section.key];
    if (hubHref) {
      return { key: section.key, label: section.label, mode: "link", href: hubHref };
    }

    const visibleItems = section.items.filter((item) => item.visible && item.showInNav !== false);
    const dropdownHubHref = DROPDOWN_HUB_HREF[section.key];

    if (visibleItems.length === 0) {
      return { key: section.key, label: section.label, mode: "hidden" };
    }
    if (visibleItems.length === 1 && !dropdownHubHref) {
      return { key: section.key, label: section.label, mode: "link", href: visibleItems[0].href };
    }

    const featured = visibleItems.filter((item) => item.card);
    const listItems = visibleItems.filter((item) => !item.card);

    const distinctCategories = new Set(listItems.map((item) => item.category).filter(Boolean));
    const byCategory = new Map<string, NavItem[]>();
    for (const item of listItems) {
      const key = distinctCategories.size >= 2 ? item.category ?? "" : "";
      if (!byCategory.has(key)) byCategory.set(key, []);
      byCategory.get(key)!.push(item);
    }

    return {
      key: section.key,
      label: section.label,
      mode: "dropdown",
      groups: [...byCategory.entries()].map(([category, items]) => ({ category, items })),
      hubHref: dropdownHubHref,
      featured,
    };
  });
}
