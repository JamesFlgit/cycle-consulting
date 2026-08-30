// Articles fictifs : contenu de travail (rédigé à partir de sources + IA) destiné
// à être relu, corrigé et validé avant la mise en ligne du site. Les textes ne
// sont pas signés par un consultant : ils relèvent de la rédaction Cycle Consulting.

export type ArticleBloc =
  | { type: "paragraphe"; texte: string }
  | { type: "liste"; items: string[] }
  | { type: "encadre"; titre: string; texte: string };

export type ArticleSection = {
  titre: string;
  blocs: ArticleBloc[];
};

export type ArticleSource = {
  label: string;
  editeur: string;
};

export type Article = {
  slug: string;
  href: string;
  categorie: string;
  titre: string;
  /** Teaser affiché sur les cartes du blog. */
  extrait: string;
  metaTitle: string;
  metaDescription: string;
  dateLabel: string;
  dateISO: string;
  tempsLecture: string;
  /** Chapô : paragraphe d'introduction affiché sous le titre. */
  chapo: string;
  sections: ArticleSection[];
  aRetenir: string[];
  sources: ArticleSource[];
  visible: boolean;
};

export const articles: Article[] = [
  {
    slug: "migration-microsoft-365-erreurs-deploiement",
    href: "/blog/migration-microsoft-365-erreurs-deploiement",
    categorie: "Transformation",
    titre: "Migration vers Microsoft 365 : les 5 erreurs qui ralentissent le déploiement",
    extrait:
      "Cadrage incomplet, conduite du changement négligée, licences mal dimensionnées : ce qui fait déraper un projet de migration et comment l'éviter.",
    metaTitle: "Migration Microsoft 365 : 5 erreurs à éviter | Cycle Consulting",
    metaDescription:
      "Les cinq erreurs les plus fréquentes sur un projet de migration vers Microsoft 365, et les bonnes pratiques pour un déploiement maîtrisé.",
    dateLabel: "12 février 2026",
    dateISO: "2026-02-12",
    tempsLecture: "7 min de lecture",
    chapo:
      "Sur le papier, migrer vers Microsoft 365 se résume à activer des licences et à synchroniser des boîtes mail. En pratique, les projets qui dérapent ont presque toujours les mêmes causes : un périmètre mal cadré, une préparation technique incomplète et des utilisateurs découverts trop tard. Voici les cinq erreurs qui reviennent le plus souvent, et la façon de les désamorcer.",
    sections: [
      {
        titre: "1. Lancer la migration sans inventaire précis de l'existant",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La première cause de retard est l'absence de photographie fiable du point de départ. Volumétrie des boîtes aux lettres, archives PST dispersées sur les postes, partages de fichiers, applications qui s'authentifient sur l'Active Directory, terminaux non conformes : chaque élément non recensé se transforme en incident pendant la bascule.",
          },
          {
            type: "paragraphe",
            texte:
              "Un inventaire sérieux couvre à la fois la messagerie, le stockage de fichiers, les identités, les postes de travail et les intégrations applicatives. Il permet de dimensionner les vagues de migration et d'identifier en amont les cas particuliers qui demanderont un traitement manuel.",
          },
          {
            type: "liste",
            items: [
              "Volumétrie et nombre d'éléments par boîte aux lettres",
              "Archives PST à réintégrer avant ou après la bascule",
              "Partages de fichiers, permissions et fichiers volumineux",
              "Applications dépendantes de l'annuaire ou du protocole SMTP",
              "Conformité du parc (version d'OS, client Office, espace disque)",
            ],
          },
        ],
      },
      {
        titre: "2. Sous-estimer la préparation des identités",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La qualité de l'annuaire conditionne toute la suite. Comptes orphelins, attributs incohérents, adresses de messagerie en doublon, UPN qui ne correspond pas à l'adresse principale : ces défauts bloquent la synchronisation et génèrent des tickets dès les premiers utilisateurs migrés.",
          },
          {
            type: "paragraphe",
            texte:
              "Le nettoyage de l'annuaire et la mise en cohérence des attributs doivent commencer plusieurs semaines avant la première vague. C'est aussi le moment de décider du modèle d'authentification cible et d'activer l'authentification multifacteur, qui ne devrait jamais être repoussée à « plus tard ».",
          },
          {
            type: "encadre",
            titre: "Le bon réflexe",
            texte:
              "Traiter la synchronisation d'annuaire comme un chantier à part entière, avec ses propres critères de sortie, plutôt que comme une tâche technique de dernière minute.",
          },
        ],
      },
      {
        titre: "3. Traiter la conduite du changement en option",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Une migration réussie techniquement peut être vécue comme un échec par les utilisateurs si personne ne les a préparés. Nouvelle interface, changement d'habitudes sur le partage de fichiers, disparition des lecteurs réseau, cohabitation temporaire de deux environnements : autant de points de friction qui alimentent la résistance.",
          },
          {
            type: "liste",
            items: [
              "Communiquer un calendrier clair, vague par vague, avec ce qui change concrètement",
              "Former les référents métier avant les utilisateurs finaux",
              "Prévoir un support renforcé pendant les 72 heures qui suivent chaque bascule",
              "Documenter les nouveaux usages dans le langage des équipes, pas dans celui de l'IT",
            ],
          },
        ],
      },
      {
        titre: "4. Mal dimensionner les licences et les services activés",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Acheter trop de licences pèse sur le budget ; en acheter trop peu bloque des utilisateurs le jour de la bascule. Mais le sujet le plus sous-estimé reste le périmètre des services activés : ouvrir tous les services d'un coup, sans configuration de sécurité ni gouvernance, crée une dette qu'il faudra rattraper dans la douleur.",
          },
          {
            type: "paragraphe",
            texte:
              "Mieux vaut activer les services par étapes : messagerie et fichiers d'abord, collaboration et outils avancés ensuite, une fois les règles de partage, de rétention et de sécurité définies.",
          },
        ],
      },
      {
        titre: "5. Négliger la phase de coexistence et le plan de repli",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Pendant plusieurs semaines, une partie des utilisateurs est sur l'ancien environnement et l'autre sur le nouveau. Si le routage du courrier, le partage des agendas et la résolution des noms ne sont pas testés dans cette configuration mixte, les incidents se multiplient précisément au pire moment.",
          },
          {
            type: "paragraphe",
            texte:
              "Chaque vague doit disposer de critères de succès explicites et d'un plan de repli connu. Savoir revenir en arrière proprement sur un lot d'utilisateurs vaut mieux que d'improviser sous la pression.",
          },
        ],
      },
    ],
    aRetenir: [
      "Un inventaire complet de l'existant est le meilleur investissement pour tenir les délais.",
      "La préparation des identités et l'authentification multifacteur se traitent en amont, pas en fin de projet.",
      "La conduite du changement conditionne la perception du projet autant que la technique.",
      "Activer les services par étapes évite d'accumuler une dette de sécurité et de gouvernance.",
      "Chaque vague de migration a besoin de critères de succès et d'un plan de repli.",
    ],
    sources: [
      { label: "Documentation de déploiement Microsoft 365", editeur: "Microsoft Learn" },
      { label: "Guide d'adoption et de conduite du changement", editeur: "Microsoft Adoption" },
      { label: "Recommandations de sécurité pour les suites collaboratives", editeur: "ANSSI" },
    ],
    visible: true,
  },
  {
    slug: "itil-4-demarrer-petite-equipe-support",
    href: "/blog/itil-4-demarrer-petite-equipe-support",
    categorie: "Production IT",
    titre: "ITIL 4 en pratique : par où commencer quand on gère une petite équipe support",
    extrait:
      "Les quelques pratiques à mettre en place en priorité pour fiabiliser un service support sans alourdir le quotidien des équipes.",
    metaTitle: "ITIL 4 : par où commencer avec une petite équipe | Cycle Consulting",
    metaDescription:
      "Une approche pragmatique d'ITIL 4 pour une petite équipe support : les pratiques prioritaires, celles qui peuvent attendre, et les pièges à éviter.",
    dateLabel: "3 mars 2026",
    dateISO: "2026-03-03",
    tempsLecture: "6 min de lecture",
    chapo:
      "ITIL 4 décrit trente-quatre pratiques. Une petite équipe support n'a ni le temps ni l'intérêt de toutes les déployer. La bonne question n'est pas « comment être conforme à ITIL » mais « quelles pratiques amélioreront concrètement la qualité de service dans les prochains mois ». Voici un ordre de priorité qui fonctionne dans la plupart des contextes.",
    sections: [
      {
        titre: "Commencer par la gestion des incidents et des demandes",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Distinguer clairement un incident (quelque chose est cassé) d'une demande de service (quelqu'un veut quelque chose de prévu) est le socle de tout le reste. Cette distinction structure la file de traitement, les priorités et les indicateurs.",
          },
          {
            type: "paragraphe",
            texte:
              "L'objectif à ce stade est modeste mais décisif : chaque sollicitation est tracée, catégorisée, priorisée selon son impact et son urgence, et affectée à quelqu'un. Sans ce minimum, aucune amélioration n'est mesurable.",
          },
          {
            type: "liste",
            items: [
              "Un canal d'entrée unique et connu de tous",
              "Une échelle de priorité simple, basée sur l'impact et l'urgence",
              "Un modèle de traitement pour les incidents les plus fréquents",
              "Une revue hebdomadaire des tickets en cours et des tickets clos",
            ],
          },
        ],
      },
      {
        titre: "Enchaîner sur la base de connaissances et les demandes standard",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Une fois le flux maîtrisé, la priorité devient la réduction de la charge répétitive. Documenter les résolutions récurrentes et cataloguer les demandes standard permet de traiter plus vite, de déléguer au premier niveau et de préparer d'éventuelles automatisations.",
          },
          {
            type: "encadre",
            titre: "Piège classique",
            texte:
              "Vouloir une base de connaissances exhaustive dès le départ. Mieux vaut dix fiches utilisées tous les jours que cent fiches que personne ne consulte.",
          },
        ],
      },
      {
        titre: "Introduire la gestion des changements et des problèmes, sans lourdeur",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La gestion des changements ne signifie pas un comité qui se réunit toutes les deux semaines. Pour une petite structure, il s'agit d'abord d'un réflexe : toute modification de l'environnement de production est annoncée, évaluée rapidement et tracée.",
          },
          {
            type: "paragraphe",
            texte:
              "La gestion des problèmes, elle, consiste à prendre le temps d'analyser les incidents récurrents pour en traiter la cause. Une heure par semaine dédiée à cet exercice suffit souvent à faire baisser durablement le volume de tickets.",
          },
        ],
      },
      {
        titre: "Ce qui peut attendre",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Gestion financière des services, gestion de la capacité formalisée, gestion des niveaux de service avec contrats détaillés : ces pratiques ont de la valeur, mais rarement en priorité pour une petite équipe. Les mettre en place trop tôt produit de la documentation plutôt que de la qualité de service.",
          },
        ],
      },
    ],
    aRetenir: [
      "La distinction incident / demande est le point de départ non négociable.",
      "La priorité suivante est de réduire la charge répétitive : base de connaissances et demandes standard.",
      "Gestion des changements et des problèmes peuvent démarrer légères, sous forme de réflexes plutôt que de comités.",
      "Adopter une pratique parce qu'elle est utile, jamais pour « faire de l'ITIL ».",
    ],
    sources: [
      { label: "ITIL 4 Foundation", editeur: "AXELOS / PeopleCert" },
      { label: "Practice Guides ITIL 4", editeur: "AXELOS" },
    ],
    visible: true,
  },
  {
    slug: "cloud-on-premise-hybride-arbitrer",
    href: "/blog/cloud-on-premise-hybride-arbitrer",
    categorie: "Stratégie",
    titre: "Cloud, on-premise ou hybride : comment arbitrer sans se tromper",
    extrait:
      "Une grille de lecture simple (coûts, souveraineté des données, compétences internes, réversibilité) pour choisir la bonne cible d'hébergement.",
    metaTitle: "Cloud, on-premise ou hybride : comment choisir | Cycle Consulting",
    metaDescription:
      "Les critères qui doivent guider un arbitrage entre cloud, on-premise et hybride : coûts réels, souveraineté, compétences, réversibilité et gouvernance.",
    dateLabel: "24 mars 2026",
    dateISO: "2026-03-24",
    tempsLecture: "8 min de lecture",
    chapo:
      "« On passe tout dans le cloud » et « on garde tout en interne » sont deux slogans, pas deux stratégies. La plupart des organisations gagnent à raisonner application par application, à partir d'un petit nombre de critères stables. Voici la grille de lecture que nous utilisons pour cadrer ces décisions.",
    sections: [
      {
        titre: "Le coût réel, pas le coût affiché",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le cloud déplace le coût du capital vers la dépense courante et le rend proportionnel à l'usage. C'est un avantage quand la charge est variable ou difficile à prévoir ; c'est un piège quand la charge est stable et importante, car la facture mensuelle finit par dépasser l'amortissement d'une infrastructure dédiée.",
          },
          {
            type: "liste",
            items: [
              "Trafic sortant, stockage et sauvegardes, souvent sous-estimés",
              "Coût des environnements de non-production laissés allumés",
              "Temps humain d'exploitation, dans les deux modèles",
              "Coût de sortie et de remigration éventuelle",
            ],
          },
        ],
      },
      {
        titre: "La sensibilité et la souveraineté des données",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Toutes les données n'ont pas le même niveau d'exigence. Certaines relèvent d'obligations réglementaires ou contractuelles précises sur leur localisation et sur les tiers susceptibles d'y accéder. Ce critère peut à lui seul écarter une option, indépendamment de toute considération financière.",
          },
          {
            type: "encadre",
            titre: "Question à trancher tôt",
            texte:
              "Quelles données ne peuvent pas, pour des raisons juridiques ou contractuelles, être hébergées hors d'un périmètre maîtrisé ? La réponse conditionne l'architecture cible.",
          },
        ],
      },
      {
        titre: "Les compétences internes disponibles",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le cloud ne supprime pas le besoin de compétences, il le déplace. Automatisation, gestion fine des identités et des accès, maîtrise des coûts, sécurité des configurations : ces savoir-faire deviennent centraux. Une organisation qui n'a ni ces compétences ni la volonté de les acquérir prend un risque réel en migrant vite.",
          },
        ],
      },
      {
        titre: "La réversibilité et le degré de dépendance",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Plus une application s'appuie sur des services managés spécifiques à un fournisseur, plus elle est difficile à déplacer ensuite. Ce n'est pas nécessairement un problème, mais cela doit être un choix conscient, documenté, et pesé au regard de la criticité de l'application.",
          },
          {
            type: "paragraphe",
            texte:
              "L'hybride prend tout son sens ici : garder en interne les socles stables et sensibles, placer dans le cloud ce qui bénéficie de l'élasticité et de l'innovation, et assumer les interconnexions entre les deux.",
          },
        ],
      },
      {
        titre: "Décider, puis gouverner",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Un arbitrage n'est utile que s'il est réévalué. Les prix évoluent, les charges changent, les compétences se construisent. Fixer un point de revue annuel, avec des indicateurs de coût et de performance par application, évite de rester prisonnier d'une décision prise dans un contexte qui n'existe plus.",
          },
        ],
      },
    ],
    aRetenir: [
      "Raisonner application par application, pas par slogan global.",
      "Comparer les coûts complets sur plusieurs années, pas la facture du premier mois.",
      "La souveraineté des données peut trancher seule, avant tout calcul économique.",
      "Le cloud déplace le besoin de compétences, il ne le supprime pas.",
      "Documenter le niveau de dépendance accepté et réévaluer l'arbitrage chaque année.",
    ],
    sources: [
      { label: "Doctrine d'usage de l'informatique en nuage", editeur: "Direction interministérielle du numérique" },
      { label: "Recommandations pour les entreprises recourant au cloud", editeur: "ANSSI" },
      { label: "Cadre d'architecture bien conçue", editeur: "Documentation des principaux fournisseurs cloud" },
    ],
    visible: true,
  },
  {
    slug: "pme-socle-cybersecurite-90-jours",
    href: "/blog/pme-socle-cybersecurite-90-jours",
    categorie: "Cybersécurité",
    titre: "PME : construire un socle de cybersécurité en 90 jours",
    extrait:
      "Sauvegardes, authentification multifacteur, gestion des accès, sensibilisation : un plan d'action réaliste pour passer un premier cap de sécurité avec des moyens limités.",
    metaTitle: "PME : un socle de cybersécurité en 90 jours | Cycle Consulting",
    metaDescription:
      "Un plan en trois étapes pour doter une PME d'un socle de cybersécurité solide en trois mois, sans équipe dédiée ni budget démesuré.",
    dateLabel: "15 avril 2026",
    dateISO: "2026-04-15",
    tempsLecture: "9 min de lecture",
    chapo:
      "Une PME n'a généralement ni équipe sécurité ni budget dédié important. Ce n'est pas une raison pour rester exposée aux attaques les plus courantes, qui visent justement les organisations les moins préparées. En trois mois, en se concentrant sur l'essentiel, on peut faire passer une PME d'un niveau de risque élevé à un socle raisonnable.",
    sections: [
      {
        titre: "Mois 1 : sécuriser ce qui permet de survivre à une attaque",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La priorité absolue est la capacité à se relever d'un incident. Cela passe par des sauvegardes régulières, testées, dont au moins une copie est hors ligne ou immuable, donc hors d'atteinte d'un rançongiciel qui chiffrerait le réseau.",
          },
          {
            type: "paragraphe",
            texte:
              "En parallèle, l'activation de l'authentification multifacteur sur la messagerie, les accès distants et les comptes d'administration ferme la porte à la grande majorité des compromissions de comptes.",
          },
          {
            type: "liste",
            items: [
              "Sauvegardes automatisées, avec une copie isolée et un test de restauration réel",
              "Authentification multifacteur sur la messagerie et les accès distants",
              "Inventaire des comptes à privilèges et suppression des comptes inutiles",
              "Mise à jour des systèmes et équipements exposés sur Internet",
            ],
          },
        ],
      },
      {
        titre: "Mois 2 : réduire la surface d'attaque",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le deuxième mois vise à limiter ce qu'un attaquant peut atteindre et faire. Séparer les comptes d'administration des comptes courants, appliquer le principe du moindre privilège, cloisonner le réseau et désactiver les services non utilisés réduisent fortement l'impact d'une intrusion.",
          },
          {
            type: "encadre",
            titre: "Effort / impact",
            texte:
              "Retirer les droits d'administrateur local aux postes de travail est l'une des mesures au meilleur rapport entre effort et réduction du risque.",
          },
          {
            type: "paragraphe",
            texte:
              "C'est aussi le moment de déployer une protection des postes de travail correctement configurée et supervisée, plutôt qu'un simple antivirus laissé à lui-même.",
          },
        ],
      },
      {
        titre: "Mois 3 : préparer la réponse et impliquer les équipes",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Une organisation préparée réagit vite. Rédiger une procédure de réponse à incident tenant sur une page (qui prévenir, comment isoler un poste, où trouver les sauvegardes, quels prestataires appeler) fait une différence considérable le jour venu.",
          },
          {
            type: "paragraphe",
            texte:
              "La sensibilisation des collaborateurs referme la boucle. L'objectif n'est pas de transformer chacun en expert, mais de créer les bons réflexes face à un courriel suspect, une demande inhabituelle de virement ou un appel se faisant passer pour le support informatique.",
          },
          {
            type: "liste",
            items: [
              "Une fiche de réponse à incident, connue et accessible hors ligne",
              "Des coordonnées de prestataires et de l'assurance à jour",
              "Une session de sensibilisation courte, suivie d'un exercice concret",
              "Un point de contrôle à 90 jours pour mesurer le chemin parcouru",
            ],
          },
        ],
      },
    ],
    aRetenir: [
      "Commencer par la résilience : sauvegardes isolées et testées, authentification multifacteur.",
      "Réduire ensuite la surface d'attaque : moindre privilège, cloisonnement, retrait des droits d'administrateur local.",
      "Préparer la réponse à incident avant d'en avoir besoin, sur une seule page.",
      "La sensibilisation vise les bons réflexes, pas l'expertise.",
      "Fixer un point de contrôle à 90 jours pour ancrer la démarche dans la durée.",
    ],
    sources: [
      { label: "Guide d'hygiène informatique", editeur: "ANSSI" },
      { label: "Dispositif d'assistance aux victimes d'actes de cybermalveillance", editeur: "Cybermalveillance.gouv.fr" },
      { label: "Recommandations de sécurité relatives à l'authentification multifacteur", editeur: "ANSSI" },
    ],
    visible: true,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getAutresArticles(slug: string, limit = 2): Article[] {
  return articles.filter((article) => article.visible && article.slug !== slug).slice(0, limit);
}
