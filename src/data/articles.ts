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
  {
    slug: "service-it-degrade-signes-causes-reprise-en-main",
    href: "/blog/service-it-degrade-signes-causes-reprise-en-main",
    categorie: "Production IT",
    titre: "Un service IT qui se dégrade : reconnaître les signes, comprendre les causes, reprendre le contrôle",
    extrait:
      "Backlog qui gonfle, incidents qui reviennent, utilisateurs qui contournent le support : les signes d'un service IT qui décroche, leurs causes réelles, et par où reprendre la main.",
    metaTitle: "Service IT qui se dégrade : reprendre le contrôle | Cycle Consulting",
    metaDescription:
      "Backlog qui gonfle, incidents qui reviennent, utilisateurs qui se plaignent : les signes d'un service IT qui décroche, leurs causes réelles, et par où reprendre la main.",
    dateLabel: "9 septembre 2026",
    dateISO: "2026-09-09",
    tempsLecture: "8 min de lecture",
    chapo:
      "Un service IT décroche rarement d'un coup. Il glisse : un backlog qui gonfle, des incidents qui reviennent, des utilisateurs qui contournent le support. Reprendre le contrôle ne consiste pas à travailler plus, mais à remettre trois choses en place : des rôles clairs, des processus réellement suivis, et une mesure de la performance à laquelle on peut se fier. Voici comment repérer la dérive tôt et par où commencer.",
    sections: [
      {
        titre: "Les signes qui doivent alerter",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La dégradation d'un service IT est progressive, ce qui la rend difficile à voir de l'intérieur. Quelques signaux ne trompent pas.",
          },
          {
            type: "liste",
            items: [
              "Le backlog de tickets augmente semaine après semaine sans explication ponctuelle.",
              "Les mêmes incidents reviennent : on rétablit le service, jamais la cause.",
              "Les délais de traitement s'allongent et, surtout, deviennent imprévisibles.",
              "Les utilisateurs contournent le canal officiel : ils appellent directement un technicien qu'ils connaissent, ou renoncent.",
              "Les mises en production génèrent régulièrement des régressions.",
              "En comité, on parle de ressenti parce qu'on n'a pas de chiffres partagés.",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "Un seul de ces signes peut être conjoncturel. Trois ou quatre ensemble indiquent un problème d'organisation, pas un manque de bonne volonté.",
          },
        ],
      },
      {
        titre: "Symptôme ou cause : ne pas traiter le mauvais problème",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le réflexe naturel face à un backlog qui monte est d'ajouter des ressources. Cela soulage quelques semaines, puis la dérive reprend, parce que la cause n'a pas bougé.",
          },
          {
            type: "paragraphe",
            texte:
              "La qualité perçue par les utilisateurs et la qualité mesurée par l'équipe sont deux choses différentes, et l'écart entre les deux est souvent révélateur. Une équipe peut tenir ses délais contractuels tout en laissant une impression détestable, parce que la communication, la priorisation ou le suivi des demandes complexes ne suivent pas.",
          },
          {
            type: "paragraphe",
            texte: "Avant d'agir, il faut donc distinguer les incidents ponctuels des causes structurelles :",
          },
          {
            type: "liste",
            items: [
              "les incidents ponctuels, qui demandent une correction rapide,",
              "les causes structurelles : un processus ambigu, une interface mal définie entre deux équipes, un outil que personne ne renseigne correctement, une priorisation implicite qui change selon qui parle le plus fort.",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "C'est l'analyse des incidents récurrents, et non leur simple résolution, qui fait baisser durablement le volume.",
          },
        ],
      },
      {
        titre: "Les trois piliers d'un service maîtrisé",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La maîtrise de la qualité d'un service numérique repose sur trois piliers, et une faiblesse sur l'un des trois suffit à faire décrocher l'ensemble.",
          },
          {
            type: "liste",
            items: [
              "Une organisation où les rôles et les responsabilités sont connus et acceptés. Qui priorise ? Qui arbitre un conflit de ressources ? Qui porte la relation avec les métiers ? Quand ces réponses varient selon les personnes présentes, le service devient instable.",
              "Des processus formalisés, alignés sur la réalité, et réellement suivis. Un processus qui existe sur le papier mais que personne n'applique crée une fausse sécurité. La distinction de base, entre un incident (quelque chose est cassé) et une demande de service (quelqu'un veut quelque chose de prévu), structure toute la file de traitement et les indicateurs.",
              "Des outils qui facilitent le travail des équipes et des utilisateurs, pas qui l'alourdissent. Un outil de ticketing mal configuré pousse les équipes à travailler à côté, et la donnée devient inexploitable.",
            ],
          },
        ],
      },
      {
        titre: "Reprendre le contrôle : par où commencer",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Face à un service dégradé, l'ordre des actions compte autant que les actions elles-mêmes.",
          },
          {
            type: "liste",
            items: [
              "Poser un diagnostic court et factuel. Sur deux à trois semaines : volume et typologie des demandes, incidents majeurs et récurrents, points de rupture dans les processus, écarts aux engagements.",
              "Remettre en place un pilotage minimal : un canal d'entrée unique, une échelle de priorité simple fondée sur l'impact et l'urgence, une revue hebdomadaire des tickets en cours et clos.",
              "Traiter les causes récurrentes. Une heure par semaine consacrée à l'analyse des incidents qui reviennent suffit souvent à enclencher la baisse du volume.",
              "Sécuriser les changements : toute modification de la production est annoncée, évaluée rapidement, tracée.",
              "Rétablir la visibilité côté métiers avec un tableau de bord partagé, même modeste, qui remplace le débat sur le ressenti.",
            ],
          },
          {
            type: "encadre",
            titre: "Le bon rythme",
            texte:
              "Viser une bascule complète en une fois est le meilleur moyen d'échouer. On stabilise d'abord le flux, puis on industrialise, puis on optimise les coûts.",
          },
        ],
      },
      {
        titre: "Ce qu'un regard extérieur apporte",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Une équipe prise dans la gestion quotidienne a rarement le recul et le temps de mener ce diagnostic. Un intervenant extérieur apporte une lecture non impliquée des irritants, une expérience d'autres contextes qui accélère l'identification des causes, et une capacité à porter la reprise du pilotage sans ajouter à la charge de l'équipe.",
          },
          {
            type: "paragraphe",
            texte:
              "C'est la démarche que nous avons appliquée pour un dispositif de Service Delivery du secteur retail, fortement dégradé après un déménagement : diagnostic des irritants, reprise du pilotage des SLA et des KPI, industrialisation progressive des pratiques. Le service est repassé à un niveau de qualité de 98 à 100 %, maintenu dans la durée.",
          },
          {
            type: "paragraphe",
            texte:
              "Restaurer un service ne consiste pas seulement à éteindre les incidents. Il s'agit de comprendre pourquoi ils surviennent, de reprendre le contrôle du pilotage, et d'installer une dynamique qui tient une fois l'aide extérieure partie.",
          },
        ],
      },
    ],
    aRetenir: [
      "La dégradation d'un service IT est progressive : backlog, incidents récurrents, contournement du support et débats au ressenti sont les signes à surveiller ensemble.",
      "Ajouter des ressources sans traiter la cause ne fait que repousser la dérive.",
      "Un service maîtrisé tient sur trois piliers : rôles clairs, processus réellement suivis, outils qui aident.",
      "On reprend le contrôle dans l'ordre : diagnostic court, pilotage minimal, traitement des causes récurrentes, sécurisation des changements.",
      "Un regard extérieur accélère le diagnostic et porte la reprise du pilotage sans alourdir l'équipe.",
    ],
    sources: [
      { label: "Management de la qualité des services IT", editeur: "Journal du Net" },
      { label: "Qualité de service IT perçue et qualité mesurée", editeur: "Inside Group" },
      { label: "Reprendre la maîtrise de son delivery : la qualité à la source", editeur: "OCTO Technology" },
      { label: "ITIL 4, pratiques de gestion des services", editeur: "AXELOS / PeopleCert" },
      { label: "Retour d'expérience : redressement d'un Service Delivery (retail)", editeur: "Cycle Consulting" },
    ],
    visible: true,
  },
  {
    slug: "gouvernance-ia-entreprise-cadrer-sans-bloquer",
    href: "/blog/gouvernance-ia-entreprise-cadrer-sans-bloquer",
    categorie: "Transformation",
    titre: "Gouvernance de l'IA en entreprise : cadrer l'usage sans bloquer les équipes",
    extrait:
      "Vos équipes utilisent déjà l'IA, souvent sans cadre. Comment poser une gouvernance utile : shadow AI, obligations de l'AI Act, politique d'usage et chantiers prioritaires.",
    metaTitle: "Gouvernance de l'IA en entreprise : par où commencer | Cycle Consulting",
    metaDescription:
      "Vos équipes utilisent déjà l'IA, souvent sans cadre. Comment poser une gouvernance de l'IA utile : shadow AI, obligations de l'AI Act, politique d'usage et chantiers prioritaires.",
    dateLabel: "16 septembre 2026",
    dateISO: "2026-09-16",
    tempsLecture: "8 min de lecture",
    chapo:
      "L'IA générative est entrée dans les entreprises par les usages avant d'entrer par la stratégie. Aujourd'hui, la question n'est plus « faut-il l'autoriser » mais « comment l'encadrer sans casser l'élan ». Une gouvernance utile tient en quelques décisions : savoir qui utilise quoi, poser des règles lisibles sur les données, répondre aux obligations réglementaires, et désigner qui arbitre.",
    sections: [
      {
        titre: "Le shadow AI, ou l'IA qui avance sans la DSI",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le « shadow AI » désigne l'usage d'outils d'intelligence artificielle en dehors de tout cadre défini par la DSI. C'est l'équivalent du shadow IT, avec un risque plus élevé, parce que ces outils manipulent du texte, du code et parfois des données confidentielles collées dans une fenêtre de discussion.",
          },
          {
            type: "paragraphe",
            texte:
              "L'ampleur du phénomène est désormais documentée : selon plusieurs études conduites en 2026, environ trois professionnels sur quatre utilisent déjà des outils d'IA non validés par leur organisation, et une large majorité le fait sans aucune approbation formelle.",
          },
          {
            type: "paragraphe",
            texte: "Les risques ne sont pas théoriques :",
          },
          {
            type: "liste",
            items: [
              "fuite de données : informations clients, éléments contractuels ou code propriétaire transmis à un service tiers dont on ne maîtrise ni l'hébergement ni la réutilisation,",
              "perte de traçabilité : impossible de dire quelles décisions ou quels livrables ont été produits avec quelle assistance,",
              "non-conformité : les usages non encadrés entrent vite en tension avec le RGPD et avec les exigences d'audit propres à certains secteurs (NIS2, DORA).",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "Interdire ne règle rien : les usages continuent, simplement moins visibles. L'enjeu est de les ramener dans un cadre.",
          },
        ],
      },
      {
        titre: "Ce que l'AI Act impose déjà",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le règlement européen sur l'intelligence artificielle (Règlement UE 2024/1689, dit « AI Act ») s'applique par étapes. L'une d'elles concerne toutes les organisations qui utilisent l'IA, pas seulement celles qui la développent.",
          },
          {
            type: "paragraphe",
            texte:
              "Son article 4, applicable depuis le 2 février 2025, impose un niveau suffisant de maîtrise de l'IA aux personnes chargées de son utilisation. Concrètement, cela suppose deux choses simples à formuler et exigeantes à tenir : un inventaire des usages réels dans l'organisation, et un plan de montée en compétence des équipes concernées.",
          },
          {
            type: "paragraphe",
            texte:
              "Ce point est souvent sous-estimé parce qu'il ne s'accompagne pas de sanction immédiate. Il fixe pourtant le socle : on ne peut pas gouverner ce qu'on n'a pas recensé.",
          },
        ],
      },
      {
        titre: "Une politique d'usage en trois cercles",
        blocs: [
          {
            type: "paragraphe",
            texte: "La forme la plus lisible d'une politique d'utilisation de l'IA tient en trois catégories.",
          },
          {
            type: "liste",
            items: [
              "Interdit. Outils grand public non maîtrisés pour tout traitement de données personnelles, confidentielles ou stratégiques. La règle est claire et sans exception.",
              "Sous conditions. Outils autorisés pour certains usages, avec des règles explicites : quelles données peuvent y entrer, quelle validation humaine avant diffusion, quelle mention de l'assistance IA.",
              "Validé. Outils intégrés au système d'information, encadrés contractuellement, avec un hébergement et des garanties connus. Usage libre dans le périmètre prévu.",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "Cette grille a un mérite : elle donne un cap sans exiger une liste exhaustive impossible à tenir à jour. Chaque nouvel outil se range dans l'un des trois cercles.",
          },
          {
            type: "encadre",
            titre: "Le piège à éviter",
            texte:
              "Une politique qui ne dit que « ce qui est interdit » pousse les équipes à ne rien déclarer. Une politique qui dit aussi « ce qui est possible, et comment » ramène les usages dans la lumière.",
          },
        ],
      },
      {
        titre: "Les cinq chantiers d'une gouvernance qui tient",
        blocs: [
          {
            type: "liste",
            items: [
              "Inventorier les usages. Un recensement simple, par métier : quels outils, pour quoi, avec quelles données. C'est la base réglementaire et le point de départ de tout le reste.",
              "Poser les règles sur les données. Ce qui peut entrer dans un outil, ce qui ne peut pas, et la conduite à tenir en cas de doute.",
              "Former. Pas un cours magistral, mais des repères pratiques : reconnaître une donnée sensible, relire une production IA, citer l'assistance quand c'est nécessaire.",
              "Tracer. Savoir, a minima, quels processus et quels livrables reposent sur une assistance IA, pour pouvoir répondre à un audit ou à un incident.",
              "Réviser. Une revue périodique de la politique et de l'inventaire, parce que les outils et les pratiques évoluent vite.",
            ],
          },
        ],
      },
      {
        titre: "Qui pilote",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La gouvernance de l'IA n'appartient à personne seul. Elle se construit à trois : la DSI pour la sécurité, l'intégration et le choix des outils ; la direction juridique et conformité pour les données et le cadre réglementaire ; les métiers pour les usages réels et leur valeur. Un pilote unique désigné coordonne, arbitre les cas en zone grise et tient la politique à jour.",
          },
          {
            type: "paragraphe",
            texte:
              "C'est une logique de gouvernance IT classique, appliquée à un objet nouveau : clarifier les responsabilités, formaliser des processus légers, mesurer, ajuster. Nous l'avons mise en oeuvre sur des programmes de transformation où plusieurs entités, plusieurs pays et plusieurs niveaux de maturité devaient converger vers des standards communs sans bloquer l'activité. Le principe est le même ici : un cadre commun, assez souple pour s'adapter aux réalités de chaque métier.",
          },
        ],
      },
    ],
    aRetenir: [
      "Vos équipes utilisent déjà l'IA : environ trois professionnels sur quatre le font sans cadre défini par la DSI.",
      "L'AI Act impose depuis février 2025 une maîtrise de l'IA, ce qui suppose un inventaire des usages et un plan de formation.",
      "Une politique en trois cercles (interdit, sous conditions, validé) donne un cap sans liste impossible à tenir.",
      "Cinq chantiers structurent la gouvernance : inventorier, poser les règles data, former, tracer, réviser.",
      "Le pilotage se partage entre DSI, juridique et métiers, avec un coordinateur unique désigné.",
    ],
    sources: [
      { label: "Règlement UE 2024/1689 sur l'intelligence artificielle (AI Act), article 4", editeur: "Union européenne" },
      { label: "Recommandations sur l'usage professionnel des systèmes d'IA", editeur: "CNIL" },
      { label: "Recommandations de sécurité pour les systèmes d'IA générative", editeur: "ANSSI" },
      { label: "Shadow AI en entreprise : ampleur et risques", editeur: "synthèse d'études sectorielles 2026" },
      { label: "Retour d'expérience : gouvernance IT sur un programme de transformation international", editeur: "Cycle Consulting" },
    ],
    visible: true,
  },
  {
    slug: "modele-prestation-it-regie-forfait-centre-de-services",
    href: "/blog/modele-prestation-it-regie-forfait-centre-de-services",
    categorie: "Stratégie",
    titre: "Régie, forfait, centre de services ou engagement de résultat : quel modèle de prestation IT choisir",
    extrait:
      "Régie, forfait, centre de services, engagement de résultat : ce que chaque modèle transfère comme risque et comme responsabilité, et comment choisir selon votre contexte.",
    metaTitle: "Régie, forfait ou centre de services : bien choisir | Cycle Consulting",
    metaDescription:
      "Régie, forfait, centre de services, engagement de résultat : ce que chaque modèle de prestation IT transfère comme risque et comme responsabilité, et comment choisir selon votre contexte.",
    dateLabel: "23 septembre 2026",
    dateISO: "2026-09-23",
    tempsLecture: "8 min de lecture",
    chapo:
      "Choisir un prestataire IT, c'est d'abord choisir un modèle de contrat. Régie, forfait, centre de services, engagement de résultat : chacun place le curseur du risque et de la responsabilité à un endroit différent. Le bon choix dépend de la maturité de vos équipes, de la criticité du besoin et de la visibilité que vous voulez garder.",
    sections: [
      {
        titre: "Les quatre modèles, en une phrase chacun",
        blocs: [
          {
            type: "liste",
            items: [
              "La régie repose sur une obligation de moyens. Le prestataire met à disposition une ou plusieurs personnes, généralement facturées au temps passé, souvent intégrées à votre équipe. Vous gardez le pilotage et la responsabilité du résultat.",
              "Le forfait repose sur une obligation de résultat. À partir d'un cahier des charges, le prestataire s'engage sur un périmètre, un délai et un prix ferme. Le risque d'exécution est de son côté, à condition que le besoin soit stable et bien défini.",
              "Le centre de services est une capacité pilotée : une équipe dédiée ou mutualisée qui prend en charge un périmètre récurrent (support, exploitation, maintenance) avec des engagements de service mesurés.",
              "L'engagement de résultat, au sens large, désigne toute prestation où le prestataire est tenu, et mesuré, sur des indicateurs de sortie : niveaux de service, délais, qualité, parfois productivité.",
            ],
          },
        ],
      },
      {
        titre: "Ce que chaque modèle transfère",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le vrai critère de choix n'est pas le prix affiché, c'est la répartition du risque et de la charge de pilotage.",
          },
          {
            type: "liste",
            items: [
              "Régie : le client porte le risque d'exécution, la charge de pilotage est élevée. Adaptée quand le besoin est flou ou évolutif et que l'équipe interne sait piloter.",
              "Forfait : le prestataire porte le risque, la charge côté client est concentrée sur le cadrage. Adapté quand le périmètre est stable et spécifiable.",
              "Centre de services : le risque est partagé via des engagements de service, le pilotage client est orienté performance. Adapté quand le besoin est récurrent et mesurable.",
              "Engagement de résultat : le prestataire est tenu sur des indicateurs, le client garde une gouvernance. Adapté quand vous voulez un résultat mesurable plus qu'une présence.",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "La régie a un avantage réel : la souplesse. Elle a un coût caché : c'est vous qui garantissez le résultat. Si votre équipe n'a ni le temps ni les compétences pour piloter, une régie mal encadrée reproduit à l'identique les problèmes qu'elle devait résoudre.",
          },
        ],
      },
      {
        titre: "La grille de choix",
        blocs: [
          {
            type: "paragraphe",
            texte: "Quatre questions suffisent à orienter la décision.",
          },
          {
            type: "liste",
            items: [
              "Le besoin est-il spécifiable ? Si oui, le forfait protège. Si le périmètre bouge encore, la régie ou le centre de services évitent de renégocier en permanence.",
              "Le besoin est-il ponctuel ou récurrent ? Un projet borné va vers le forfait ou la régie. Une activité qui tourne en continu va vers le centre de services.",
              "Votre équipe sait-elle piloter un prestataire ? Si la réponse est non, éviter la régie sèche : choisir un modèle où le prestataire porte une part de l'engagement.",
              "Quelle visibilité voulez-vous garder ? Plus vous déléguez le résultat, plus vous devez exiger des indicateurs et une gouvernance. Déléguer sans mesurer, c'est perdre le contrôle.",
            ],
          },
        ],
      },
      {
        titre: "Le piège de la régie par défaut",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Beaucoup d'organisations choisissent la régie non pas parce qu'elle est adaptée, mais parce qu'elle est simple à contractualiser. Le marché est en train de corriger ce réflexe : dans un contexte de reprise mesurée et de pression sur les budgets, les clients demandent de plus en plus des engagements sur des résultats, pas seulement des compétences mises à disposition.",
          },
          {
            type: "paragraphe",
            texte:
              "C'est une bonne nouvelle, à condition de l'assumer jusqu'au bout. Un engagement de résultat n'a de valeur que s'il s'accompagne d'indicateurs partagés, d'une gouvernance régulière et d'une capacité à traiter les écarts. Sinon, c'est un forfait sans cahier des charges, c'est-à-dire un litige en préparation.",
          },
        ],
      },
      {
        titre: "Combiner les modèles",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Dans la pratique, les dispositifs les plus solides mélangent les modèles. Un centre de services pour le run, un forfait pour un projet de transformation borné, une régie ponctuelle pour un renfort d'expertise sur un sujet pointu. L'important est que chaque brique ait le bon modèle pour ce qu'elle fait, et qu'une gouvernance d'ensemble tienne les interfaces.",
          },
          {
            type: "paragraphe",
            texte:
              "C'est la logique que nous appliquons sur les grands comptes : structurer le dispositif en fonction du niveau de responsabilité que le client souhaite confier, brique par brique, plutôt que d'imposer un modèle unique. Sur l'un de ces mandats, le pilotage d'un centre de services, la gestion des SLA et des plans d'amélioration, et la coordination des équipes techniques et prestataires ont été tenus dans un même cadre de gouvernance, en lien direct avec la DSI.",
          },
          {
            type: "paragraphe",
            texte:
              "Choisir un modèle de prestation, ce n'est pas choisir un fournisseur moins cher. C'est décider où vous voulez garder la main et où vous préférez transférer le risque, en le mesurant.",
          },
        ],
      },
    ],
    aRetenir: [
      "Régie et forfait s'opposent sur un point : obligation de moyens contre obligation de résultat.",
      "Le centre de services et l'engagement de résultat placent le curseur entre les deux, avec des indicateurs de service.",
      "Le vrai critère de choix est la répartition du risque et de la charge de pilotage, pas le prix affiché.",
      "La régie « par défaut » fait porter le résultat au client : à éviter si l'équipe interne ne peut pas piloter.",
      "Les dispositifs les plus solides combinent plusieurs modèles sous une gouvernance commune.",
    ],
    sources: [
      { label: "Régie, forfait ou centre de services : différences et critères de choix", editeur: "guides sectoriels ESN" },
      { label: "Obligation de moyens et obligation de résultat dans la prestation informatique", editeur: "repères juridiques" },
      { label: "Observatoire du marché du numérique 2026", editeur: "Numeum / Xerfi" },
      { label: "Retour d'expérience : pilotage d'un centre de services sur un grand compte", editeur: "Cycle Consulting" },
    ],
    visible: true,
  },
  {
    slug: "heberger-donnees-entreprise-2026-souverainete-reversibilite",
    href: "/blog/heberger-donnees-entreprise-2026-souverainete-reversibilite",
    categorie: "Cybersécurité",
    titre: "Où héberger vos données en 2026 : souveraineté, interopérabilité, réversibilité",
    extrait:
      "Souveraineté, réglementation, dépendance à un fournisseur : les trois critères qui doivent guider le choix d'hébergement de vos données en 2026, et comment garder la réversibilité.",
    metaTitle: "Où héberger vos données en 2026 : le guide de décision | Cycle Consulting",
    metaDescription:
      "Souveraineté, réglementation, dépendance à un fournisseur : les trois critères qui doivent guider le choix d'hébergement de vos données en 2026, et comment garder la réversibilité.",
    dateLabel: "30 septembre 2026",
    dateISO: "2026-09-30",
    tempsLecture: "9 min de lecture",
    chapo:
      "La question de l'hébergement des données n'est plus seulement technique ni seulement budgétaire. Elle est devenue réglementaire et stratégique. Trois critères doivent guider la décision : la sensibilité réelle des données, la capacité à les récupérer et à les déplacer, et les compétences disponibles pour gérer l'ensemble.",
    sections: [
      {
        titre: "Pourquoi la question se pose maintenant",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "L'arrêt Schrems II de la Cour de justice de l'Union européenne, en 2020, a rappelé que des données hébergées chez un fournisseur soumis au droit américain restent accessibles aux autorités de ce pays, quelle que soit la localisation physique des serveurs. En 2025, un dirigeant de Microsoft a reconnu publiquement ne pas pouvoir garantir la pleine souveraineté des données européennes. Le sujet est sorti du débat d'experts.",
          },
          {
            type: "paragraphe",
            texte:
              "Sur le plan réglementaire, le décret d'application de la loi SREN, publié le 16 avril 2026, impose aux administrations et à leurs opérateurs d'héberger leurs données sensibles chez des prestataires conformes au référentiel de l'ANSSI. La directive NIS 2, en application en 2026, étend des exigences de sécurité à un grand nombre de secteurs essentiels et importants. Beaucoup d'entreprises qui ne se sentaient pas concernées le sont désormais, directement ou via leurs clients.",
          },
          {
            type: "paragraphe",
            texte:
              "Résultat : le choix d'hébergement engage l'entreprise sur plusieurs années et plusieurs plans à la fois.",
          },
        ],
      },
      {
        titre: "Les trois critères qui tranchent",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La sensibilité réelle des données d'abord. Toutes n'ont pas le même niveau d'exigence. Avant tout arbitrage, il faut les classer : données personnelles, données stratégiques, données soumises à une obligation sectorielle, données ordinaires. Cette classification, souvent absente, permet de ne pas surprotéger l'anodin ni sous-protéger le critique.",
          },
          {
            type: "paragraphe",
            texte:
              "La réversibilité ensuite. C'est le critère le plus négligé et le plus déterminant à long terme : la capacité concrète à récupérer l'ensemble de vos données dans un format exploitable, et à les faire supprimer de façon sécurisée en fin de contrat. Plus une application s'appuie sur des services spécifiques à un fournisseur, plus elle est difficile à déplacer ensuite. Ce n'est pas interdit, mais cela doit être un choix conscient et documenté.",
          },
          {
            type: "paragraphe",
            texte:
              "Les compétences disponibles enfin. Un hébergement souverain, un multi-cloud ou une infrastructure gérée en interne demandent des savoir-faire différents : gestion des identités et des accès, maîtrise des coûts, sécurité des configurations, portabilité. Choisir une cible que l'on ne sait pas exploiter revient à déplacer le risque, pas à le réduire.",
          },
          {
            type: "encadre",
            titre: "La question à trancher tôt",
            texte:
              "Quelles données ne peuvent pas, pour des raisons juridiques ou contractuelles, être hébergées hors d'un périmètre maîtrisé ? La réponse conditionne toute l'architecture.",
          },
        ],
      },
      {
        titre: "Ce que « souverain » veut dire concrètement",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "Le mot est utilisé à toutes les sauces. En pratique, un hébergement est d'autant plus souverain qu'il cumule trois garanties : les données et les traitements restent sur le territoire concerné, l'opérateur n'est pas soumis à un droit extraterritorial qui obligerait à les communiquer, et le chiffrement et les clés sont maîtrisés par le client ou par un tiers de confiance.",
          },
          {
            type: "paragraphe",
            texte:
              "En France, le référentiel SecNumCloud de l'ANSSI qualifie les offres qui répondent à ce niveau d'exigence. Toutes les données n'ont pas besoin d'un cloud qualifié, mais celles qui en ont besoin doivent y aller, et le décret SREN rend cette obligation explicite pour une partie du marché.",
          },
        ],
      },
      {
        titre: "Le multi-cloud segmenté et gouverné",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La stratégie la plus robuste aujourd'hui n'est ni le tout-souverain ni le tout-hyperscaler. C'est un multi-cloud segmenté :",
          },
          {
            type: "liste",
            items: [
              "données et fonctions critiques sur un cloud souverain qualifié,",
              "usages moins sensibles sur des clouds de confiance ou publics,",
              "des clauses fortes de réversibilité, d'interopérabilité et de transparence sur chaque contrat,",
              "des standards ouverts et des technologies portables (conteneurs, orchestration) pour limiter l'enfermement.",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "Segmenté ne veut pas dire éclaté. L'ensemble doit être gouverné : une cartographie des données et de leur hébergement, des règles claires sur ce qui va où, et une revue périodique, parce que les offres et les prix évoluent.",
          },
        ],
      },
      {
        titre: "Verrouiller la réversibilité dès le contrat",
        blocs: [
          {
            type: "paragraphe",
            texte:
              "La réversibilité ne se négocie pas au moment de partir, elle se négocie à la signature. Un contrat solide précise :",
          },
          {
            type: "liste",
            items: [
              "le format de restitution des données et le délai associé,",
              "la prise en charge de l'opération de sortie et son coût,",
              "les modalités de suppression sécurisée et les preuves fournies,",
              "l'accès à la documentation technique nécessaire à une migration.",
            ],
          },
          {
            type: "paragraphe",
            texte:
              "Sans ces clauses, la dépendance est totale, quel que soit le discours commercial du fournisseur.",
          },
          {
            type: "paragraphe",
            texte:
              "Nous avons piloté des programmes de convergence et de migration d'infrastructures entre filiales internationales, en environnement bancaire fortement réglementé. La leçon la plus constante : harmoniser un système d'information ne consiste pas à déployer un standard unique, mais à construire un modèle commun qui s'adapte aux réalités locales tout en gardant une gouvernance et une réversibilité maîtrisées. Le choix d'hébergement obéit à la même logique.",
          },
        ],
      },
    ],
    aRetenir: [
      "Le choix d'hébergement est devenu réglementaire et stratégique, pas seulement technique et budgétaire.",
      "Trois critères tranchent : sensibilité réelle des données, réversibilité, compétences disponibles.",
      "« Souverain » signifie données sur le territoire, opérateur hors droit extraterritorial, clés maîtrisées ; en France, le référentiel SecNumCloud qualifie ces offres.",
      "La cible robuste est un multi-cloud segmenté et gouverné, pas un choix unique.",
      "La réversibilité se négocie à la signature : format, délai, coût de sortie, suppression sécurisée, accès à la documentation.",
    ],
    sources: [
      { label: "Arrêt Schrems II et portée du CLOUD Act", editeur: "Cour de justice de l'Union européenne" },
      { label: "Décret d'application de la loi SREN, hébergement des données sensibles", editeur: "Journal officiel, 16 avril 2026" },
      { label: "Directive NIS 2", editeur: "Union européenne" },
      { label: "Référentiel SecNumCloud", editeur: "ANSSI" },
      { label: "Data Ecosystems Interoperability", editeur: "Digital New Deal Foundation" },
      { label: "Retour d'expérience : convergence IT internationale en environnement réglementé", editeur: "Cycle Consulting" },
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
