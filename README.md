# Cycle Consulting — Site vitrine

Site vitrine de l'ESN **Cycle Consulting** ("Apprendre, Comprendre, Entreprendre").

## Stack technique

- [Next.js 16](https://nextjs.org/) (App Router, TypeScript, `src/` dir)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Polices : Inter (texte courant) via `next/font/google`, Georgia en serif pour le wordmark du logo
- Aucune base de données ni CMS : le contenu texte est centralisé dans `src/data/*.ts`

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000.

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # ESLint
```

## Structure du projet

```
src/
  app/                     routes (App Router) — une page par pôle d'activité
  components/
    layout/Header.tsx       en-tête + navigation (menu mobile inclus)
    layout/Footer.tsx       pied de page (wordmark, coordonnées, liens)
    ui/                     composants réutilisables (cartes, colonnes, formulaire, hero, etc.)
  data/                     contenu du site (offres, coordonnées, navigation, témoignages...)
public/
  cycle-consulting-logo.svg           symbole seul — utilisé dans le header
  cycle-consulting-logo-wordmark.svg  symbole + texte — utilisé dans le footer et la page contact
```

Pour mettre à jour un texte (accroche d'une offre, item d'une colonne de service, coordonnées...),
il suffit d'éditer le fichier correspondant dans `src/data/` — aucune page n'a besoin d'être touchée.

## Contenu à compléter

Toutes les informations factuelles non fournies dans le brief (adresse, téléphone, e-mail, horaires,
SIRET) sont indiquées par des placeholders `[À COMPLÉTER — ...]` dans `src/data/entreprise.ts`.
Les logos partenaires (Ollium, Syker, Insiders, Microsoft) et clients (Malakoff Humanis, Burger King,
Gordon E., DBV) sont représentés par des vignettes texte génériques en attendant les visuels officiels
du client — voir `src/data/partenaires.ts` et le composant `PartnerLogo`.

Les liens "Voir brochure" des pages de services pointent vers `#` (ancre placeholder) : ils sont prêts
à être remplacés par de vrais liens ou fichiers PDF.

## Formulaire de contact

Le formulaire de la page `/contact` (`src/components/ui/ContactForm.tsx`) est **statique** : il affiche
un message de confirmation côté client mais n'envoie aucune donnée pour l'instant (pas de backend).

Pour le rendre fonctionnel sans back-end à maintenir, l'option la plus simple est
[Formspree](https://formspree.io/) (ou [Resend](https://resend.com/) si un envoi d'e-mail transactionnel
depuis une route API Next.js est préféré) : créer un formulaire Formspree, remplacer le `onSubmit` du
composant par un `fetch` vers l'endpoint fourni, et supprimer le `preventDefault` équivalent si vous
utilisez l'action HTML native du formulaire.
