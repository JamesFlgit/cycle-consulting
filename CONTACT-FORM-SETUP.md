# Formulaire de contact : configuration de l'envoi d'e-mails

Le formulaire de contact (`src/components/ui/ContactForm.tsx`, présent sur la homepage, `/contact` et
`/rejoignez-nous`) envoie chaque demande par e-mail via la route `src/app/api/contact/route.ts`.

## Ce qui a été codé

- **`src/app/api/contact/route.ts`** : reçoit la soumission, filtre le spam, puis envoie un e-mail
  (SMTP via `nodemailer`) à l'adresse de contact. Le `Reply-To` est l'adresse du visiteur, donc un
  simple « Répondre » depuis la boîte mail répond directement au prospect.
- **`src/components/ui/ContactForm.tsx`** : formulaire contrôlé, états chargement / succès / erreur.
  En cas d'échec d'envoi, un message propose d'écrire directement à l'adresse de contact (lien
  `mailto:`).

### Anti-spam (sans service tiers)

Deux protections, invisibles pour le visiteur :

1. **Honeypot** : un champ « Site web » caché hors écran. Un bot le remplit, un humain jamais → la
   soumission est silencieusement ignorée.
2. **Piège temporel signé** : au chargement du formulaire, `/api/captcha` renvoie un jeton horodaté
   signé (HMAC `CAPTCHA_SECRET`). Une soumission en moins de 1,5 s, ou plus de 30 min après, est
   rejetée.

Contrairement à la modale brochure, **aucune question de calcul visible** n'est affichée sur le
formulaire de contact. Si le spam devient un problème, on peut soit activer la même question
(« combien font 3 + 5 ? »), soit ajouter Cloudflare Turnstile (gratuit, sans tracking) — me le dire.

## Variables d'environnement à renseigner

En local dans `site_eric/.env.local` (fichier ignoré par git, à créer), en production dans les
paramètres d'environnement de l'hébergeur :

```
# SMTP — obligatoire pour que les e-mails partent
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=contact@cycle-consulting.fr
SMTP_PASS=le-mot-de-passe-de-la-boite-mail

# Optionnel
SMTP_SECURE=true          # auto : true si SMTP_PORT=465, false sinon (587/25 = STARTTLS)
CONTACT_TO=contact@cycle-consulting.fr   # défaut : entreprise.email (src/data/entreprise.ts)
CONTACT_FROM=contact@cycle-consulting.fr # défaut : SMTP_USER

# Anti-spam — partagé avec la modale brochure
CAPTCHA_SECRET=une-longue-chaine-aleatoire   # openssl rand -hex 32
```

Tant que `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` ne sont pas définis, la route répond `502` et le
formulaire affiche le message d'erreur avec le lien `mailto:` de repli. **Aucune demande n'est
perdue silencieusement.**

### Paramètres SMTP Hostinger

- Hôte : `smtp.hostinger.com`
- Port : `465` (SSL/TLS) ou `587` (STARTTLS)
- Utilisateur : l'adresse e-mail complète (`contact@cycle-consulting.fr`)
- Mot de passe : celui défini pour cette boîte dans hPanel → E-mails

Vérifier que le domaine `cycle-consulting.fr` a bien ses enregistrements **SPF** et **DKIM**
configurés (hPanel → E-mails → Paramètres DNS) pour éviter que les e-mails partent en spam.

> ⚠️ Une boîte mail Hostinger classique a une limite d'envoi (de l'ordre de quelques centaines
> d'e-mails/jour) et n'est pas un service transactionnel. Pour le volume attendu d'un formulaire de
> contact de site vitrine, c'est suffisant. Si un jour le volume grimpe (newsletters, campagnes),
> passer sur un SMTP dédié (Brevo, Resend, Mailgun) : il suffira de changer les 4 variables `SMTP_*`,
> le code ne bouge pas.

## Où arrivent les demandes

Chaque demande valide arrive dans la boîte **`contact@cycle-consulting.fr`** (ou `CONTACT_TO`), avec :

- **Objet** : `Nouvelle demande de contact : Prénom Nom`
- **Reply-To** : `Prénom Nom <email-du-visiteur>`
- **Corps** : prénom, nom, entreprise, e-mail, téléphone, puis le message.

La « liste » de prospects se construit donc dans cette boîte mail (filtre / libellé sur l'objet).

## Rappel : la modale brochure est séparée

Le téléchargement de la brochure (`BrochureModal.tsx` → `/api/brochure-lead`) reste branché sur
**Brevo** — voir `../BROCHURE-LEADS-SETUP.md`.

- ✅ Vraie brochure en place : `public/Cycle-Consulting_Brochure.pdf` (servie sur
  `/Cycle-Consulting_Brochure.pdf`, référencée par `PDF_URL` dans `BrochureModal.tsx`).
- Reste à renseigner `BREVO_API_KEY` + `BREVO_LIST_ID` pour que les leads brochure alimentent une
  liste Brevo (sinon ils ne sont enregistrés que dans le fichier local best-effort `data/`).
