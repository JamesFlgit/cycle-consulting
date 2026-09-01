export type CasClientSection = {
  titre: string;
  description?: string;
};

export type ChiffreCle = {
  valeur: string;
  libelle: string;
};

export type CasClient = {
  slug: string;
  href: string;
  navLabel: string;
  secteur: string;
  environnement?: string;
  expertise?: string;
  profilMobilise?: string;
  enjeuxTags?: string[];
  visible: boolean;
  metaTitle?: string;
  metaDescription?: string;
  /** Short teaser used on listing cards and the homepage preview. */
  resume: string;
  /** Path to an illustration for the card header, e.g. "/cas-clients/xxx.webp". Optional — falls back to a branded placeholder frame. */
  image?: string;
  /** Texte alternatif de `image` (accessibilite + SEO). Laisser vide si l'illustration est purement decorative. */
  imageAlt?: string;
  /** 2-3 line summary of the challenge, for the sticky conversion card. */
  resumeDefi?: string;
  /** 2-3 line summary of the solution/outcome, for the sticky conversion card. */
  resumeSolution?: string;

  contexte: string[];
  /** Bullet list of stakes, when the case includes an explicit "Les enjeux" list. */
  enjeux?: string[];
  /** "Comprendre" — diagnostic / intervention items. */
  intervention: CasClientSection[];
  /** "Entreprendre" — execution actions, when distinct from the outcomes below. */
  actions?: CasClientSection[];
  /** Highlighted metrics, only included when a real figure was provided by the client. */
  chiffresCles?: ChiffreCle[];
  resultatsIntro?: string;
  resultats: CasClientSection[];
  /** Omitted when no genuine, non-fabricated quote was provided for this case. */
  citation?: { texte: string; attribution?: string };
  conclusion?: string;
};

export const casClients: CasClient[] = [
  {
    slug: "transformation-centre-de-services-industrie",
    href: "/cas-clients/transformation-centre-de-services-industrie",
    navLabel: "Transformation et industrialisation d'un Centre de Services",
    secteur: "Industrie",
    image: "/images/cas-clients/transformation-centre-de-services-industrie.webp",
    imageAlt: "Pictogramme d'un engrenage connecte a un circuit, symbole d'industrialisation d'un centre de services",
    environnement: "Centre de Services / IT Operations",
    expertise: "Transformation, gouvernance et performance opérationnelle",
    visible: true,
    metaTitle: "Transformation d'un Centre de Services IT : cas client Industrie | Cycle Consulting",
    metaDescription:
      "Comment Cycle Consulting a industrialisé et structuré le Centre de Services IT d'un acteur industriel en forte croissance.",
    resume:
      "Industrialisation des processus et mise en place d'une gouvernance de performance pour un Centre de Services en forte croissance.",
    resumeDefi:
      "Après un déménagement, le Centre de Services perdait en visibilité et en performance face à une activité en forte croissance.",
    resumeSolution:
      "Industrialisation des processus, gouvernance renforcée et pilotage par la donnée pour restaurer qualité de service et maîtrise opérationnelle.",
    contexte: [
      "À la suite du déménagement de son entrepôt, le Centre de Services de notre client a traversé une période de forte perturbation opérationnelle.",
      "La croissance de l'activité, combinée à des processus insuffisamment structurés, avait progressivement généré des difficultés de pilotage, une visibilité limitée sur les flux et un manque de standardisation des pratiques.",
      "Dans ce contexte, le Centre de Services devait retrouver un niveau de performance et de qualité de service compatible avec les exigences de ses clients, tout en préparant sa montée en capacité.",
    ],
    enjeux: [
      "Industrialiser les processus opérationnels",
      "Fluidifier les flux internes et externes",
      "Améliorer la visibilité sur l'activité",
      "Renforcer le pilotage de la performance",
      "Clarifier les rôles et responsabilités",
      "Améliorer la qualité de service",
      "Optimiser l'organisation et les coûts",
      "Mettre en place les conditions nécessaires à la montée en charge du Centre de Services",
    ],
    intervention: [
      {
        titre: "Réorganisation des processus",
        description:
          "Analyse des processus existants, identification des points de rupture et redéfinition des modes opératoires afin de fluidifier les activités et réduire les dysfonctionnements.",
      },
      {
        titre: "Pilotage du Delivery",
        description:
          "Mise en place d'une gouvernance opérationnelle permettant de suivre l'activité, les engagements de services et la qualité de production.",
      },
      {
        titre: "Performance & Data",
        description:
          "Déploiement de PON (Processus Opérationnels Normalisés) permettant de standardiser les activités et de mesurer la performance. Centralisation des données opérationnelles et construction de tableaux de bord dédiés pour disposer d'une vision consolidée de l'activité et faciliter la prise de décision.",
      },
      {
        titre: "Gouvernance & Change",
        description:
          "Mise en place d'un dispositif de gouvernance des changements et des mises en production afin de sécuriser les évolutions du Centre de Services.",
      },
      {
        titre: "Coordination des équipes",
        description:
          "Coordination des équipes Build, Run et TMA, avec clarification des interfaces et des responsabilités entre les différents acteurs.",
      },
      {
        titre: "Pilotage économique",
        description:
          "Analyse des contrats, optimisation des ressources et identification des leviers d'amélioration de la performance économique du dispositif.",
      },
    ],
    resultatsIntro:
      "L'intervention de Cycle Consulting a permis de transformer progressivement le Centre de Services en une organisation plus structurée, plus transparente et davantage orientée performance.",
    resultats: [
      {
        titre: "Gouvernance opérationnelle",
        description:
          "Mise en place d'une gouvernance structurée permettant un pilotage régulier de l'activité, des incidents, des flux et des engagements.",
      },
      {
        titre: "Standardisation des pratiques",
        description:
          "Déploiement de standards inspirés des bonnes pratiques ITIL et Agile, permettant d'harmoniser les méthodes de travail et de renforcer la maîtrise opérationnelle.",
      },
      {
        titre: "Pilotage par la donnée",
        description:
          "Industrialisation du reporting et création de tableaux de bord permettant de disposer d'une vision consolidée de la performance et d'identifier rapidement les axes d'amélioration.",
      },
      {
        titre: "Amélioration de la qualité de service",
        description:
          "Renforcement du suivi des engagements et amélioration de la visibilité client sur l'activité du Centre de Services.",
      },
      {
        titre: "Préparation à la montée en charge",
        description:
          "L'organisation mise en place a permis de créer les conditions nécessaires à une augmentation maîtrisée des volumes, tout en maintenant un niveau de qualité de service adapté aux exigences du client.",
      },
    ],
    citation: {
      texte:
        "Notre approche ne consiste pas uniquement à corriger les dysfonctionnements. Elle vise à construire un modèle opérationnel capable de produire durablement de la performance.",
    },
    conclusion:
      "Cycle Consulting accompagne les organisations dans la transformation de leurs opérations IT, en combinant expertise métier, gouvernance, industrialisation et pilotage de la performance.",
  },
  {
    slug: "pilotage-service-delivery-retail",
    href: "/cas-clients/pilotage-service-delivery-retail",
    navLabel: "Pilotage et redressement d'un Service Delivery",
    secteur: "Retail",
    image: "/images/cas-clients/pilotage-service-delivery-retail.webp",
    imageAlt: "Pictogramme d'un chariot de course associe a une fleche de croissance, secteur retail",
    expertise: "Service Delivery Management",
    profilMobilise: "Account Delivery Manager",
    enjeuxTags: ["Qualité de service", "Satisfaction client", "SLA / KPI", "Transformation opérationnelle"],
    visible: true,
    metaTitle: "Redressement d'un Service Delivery Retail : cas client | Cycle Consulting",
    metaDescription:
      "Comment Cycle Consulting a redressé la qualité de service et restauré la satisfaction client d'un dispositif Service Delivery Retail.",
    resume:
      "Redressement de la performance d'un Service Delivery et retour à 98–100 % de qualité de service après une période de forte insatisfaction client.",
    resumeDefi:
      "Un déménagement avait fortement dégradé la qualité de service et la satisfaction des utilisateurs.",
    resumeSolution:
      "Diagnostic, reprise du pilotage SLA/KPI et industrialisation du Service Delivery : retour à 98–100 % de qualité de service.",
    contexte: [
      "À la suite d'un déménagement ayant fortement perturbé les opérations, le dispositif de services IT de notre client a connu une dégradation significative de la qualité de service et une forte insatisfaction des utilisateurs et des parties prenantes.",
      "Cette situation nécessitait une intervention structurée afin d'identifier les causes des dysfonctionnements, de rétablir la maîtrise opérationnelle et de restaurer durablement la confiance du client.",
    ],
    intervention: [
      {
        titre: "Diagnostic et analyse des irritants",
        description:
          "Identification des principaux facteurs de dégradation de la qualité de service et analyse des incidents récurrents afin de distinguer les problématiques ponctuelles des causes structurelles.",
      },
      {
        titre: "Accompagnement managérial",
        description:
          "Accompagnement des équipes et des managers dans la montée en compétences sur les pratiques de Service Delivery, le pilotage de la performance et l'amélioration continue.",
      },
      {
        titre: "Pilotage des projets et évolutions",
        description:
          "Planification et coordination des projets et évolutions applicatives, avec une attention particulière portée au respect des engagements QCD : Qualité, Coûts et Délais.",
      },
      {
        titre: "Industrialisation du Service Delivery",
        description:
          "Contribution à l'industrialisation de l'IT Factory à travers la standardisation des pratiques, l'amélioration des processus et la structuration des livrables.",
      },
    ],
    actions: [
      {
        titre: "Pilotage de la performance",
        description:
          "Mise en place et pilotage des SLA, KPI et KSI, avec suivi régulier des indicateurs et définition de plans d'actions permettant de traiter les écarts de performance.",
      },
      {
        titre: "Gestion des changements",
        description:
          "Sécurisation des changements et des mises en production afin de limiter les risques de régression et d'assurer une meilleure coordination entre les différents acteurs.",
      },
      {
        titre: "Coordination Build & Run",
        description:
          "Renforcement de la collaboration entre les équipes de développement, TMA, support applicatif et exploitation afin de fluidifier les passages entre les activités Build et Run.",
      },
      {
        titre: "Reprise du pilotage Service Delivery",
        description:
          "Mise en place d'une gouvernance opérationnelle permettant de reprendre le contrôle de l'activité, de sécuriser les engagements et d'améliorer la visibilité du client sur la performance du dispositif.",
      },
    ],
    chiffresCles: [{ valeur: "98–100 %", libelle: "de qualité de service maintenue" }],
    resultatsIntro:
      "L'intervention de Cycle Consulting a permis de rétablir progressivement la maîtrise du Service Delivery et de renforcer durablement la confiance du client.",
    resultats: [
      {
        titre: "98 à 100 % de qualité de service",
        description: "Mise sous contrôle de la performance et maintien d'un niveau de qualité de service compris entre 98 % et 100 %.",
      },
      {
        titre: "Pilotage renforcé des engagements",
        description:
          "Structuration du suivi des SLA, KPI et KSI, permettant une meilleure anticipation des dérives et une prise de décision plus rapide.",
      },
      {
        titre: "Réduction des incidents récurrents",
        description:
          "Analyse des incidents majeurs et récurrents, identification des causes racines et déploiement de plans d'amélioration continue et d'actions correctives.",
      },
      {
        titre: "Une gouvernance plus mature",
        description:
          "Renforcement des interactions entre les équipes Build, Run, TMA et Support, permettant une meilleure fluidité opérationnelle et une responsabilisation accrue des différents acteurs.",
      },
      {
        titre: "Des équipes accompagnées et responsabilisées",
        description:
          "Développement des compétences Service Delivery et accompagnement des équipes managériales afin d'ancrer durablement les nouvelles pratiques.",
      },
    ],
    citation: {
      texte:
        "Restaurer la qualité de service ne consiste pas uniquement à résoudre les incidents. Il s'agit de comprendre les causes, reprendre le contrôle du Delivery et installer une dynamique de performance durable.",
    },
    conclusion:
      "À travers son expertise en delivery de services, Cycle Consulting a permis au client de passer d'une situation de forte insatisfaction à un dispositif piloté, mesuré et orienté amélioration continue.",
  },
  {
    slug: "migration-it-internationale-banque-assurance",
    href: "/cas-clients/migration-it-internationale-banque-assurance",
    navLabel: "Migration et convergence IT à l'international",
    secteur: "Banque & Assurances",
    image: "/images/cas-clients/migration-it-internationale-banque-assurance.webp",
    imageAlt: "Pictogramme d'un bouclier abritant un reseau mondial, migration IT securisee a l'international",
    environnement: "International • Multi-pays • Réglementé",
    expertise: "Transformation IT & Program Management",
    enjeuxTags: ["Convergence IT", "Standardisation", "Migration", "Gouvernance", "Performance"],
    visible: true,
    metaTitle: "Migration IT internationale : cas client Banque & Assurances | Cycle Consulting",
    metaDescription:
      "Comment Cycle Consulting a piloté la convergence des infrastructures IT de filiales internationales vers les standards Groupe, en environnement bancaire réglementé.",
    resume:
      "Pilotage d'un programme de convergence et migration IT multi-pays, dans un environnement bancaire fortement réglementé.",
    resumeDefi:
      "Harmoniser des infrastructures IT hétérogènes entre filiales internationales, dans un environnement bancaire réglementé.",
    resumeSolution:
      "Pilotage du programme de convergence, gouvernance multi-pays et migrations maîtrisées vers les standards Groupe.",
    contexte: [
      "Dans le cadre de sa stratégie de transformation et de rationalisation de son système d'information, notre client souhaitait harmoniser les infrastructures IT de ses différentes filiales avec les standards définis au niveau du Groupe en France.",
      "Cette transformation impliquait la migration progressive d'environnements hétérogènes vers des infrastructures répondant à des standards communs, tout en maintenant la continuité des services et en respectant les contraintes propres à un environnement bancaire fortement réglementé.",
      "La dimension internationale du programme ajoutait une complexité importante : coordination de plusieurs pays, équipes locales, parties prenantes Groupe et fournisseurs, avec des niveaux de maturité et des contraintes opérationnelles différents.",
      "Cycle Consulting est intervenu dans le pilotage de ce programme de transformation afin d'assurer la convergence des infrastructures, la coordination internationale et la maîtrise de la performance.",
    ],
    intervention: [
      {
        titre: "Pilotage du programme de transformation",
        description:
          "Mise en place d'un pilotage structuré du programme de migration et de convergence des infrastructures, avec suivi des objectifs, des jalons et des dépendances entre les différents chantiers.",
      },
      {
        titre: "Gouvernance internationale",
        description:
          "Coordination des équipes Groupe, filiales et partenaires dans un environnement multi-pays et multi-équipes. Mise en place d'une gouvernance permettant d'assurer une vision consolidée de l'avancement et de faciliter la prise de décision.",
      },
      {
        titre: "Gestion des roadmaps",
        description:
          "Construction et suivi des roadmaps de transformation, permettant de planifier les migrations, prioriser les actions et maîtriser les interdépendances entre les différents projets.",
      },
      {
        titre: "Pilotage Agile",
        description:
          "Suivi des activités au travers des sprints, accompagnement des équipes et consolidation de l'avancement des différents chantiers, apportant davantage de visibilité et de réactivité dans l'exécution du programme.",
      },
      {
        titre: "Performance & Data",
        description:
          "Construction et suivi d'indicateurs de performance permettant de mesurer l'avancement des transformations, d'identifier les points de vigilance et de piloter les plans d'amélioration.",
      },
      {
        titre: "Accompagnement des migrations ITSM",
        description:
          "Accompagnement des équipes locales dans les transformations liées à la migration et à l'harmonisation des pratiques IT Service Management, avec pour objectif d'aligner les processus locaux sur les standards du Groupe.",
      },
      {
        titre: "Gestion des contraintes réglementaires",
        description:
          "Pilotage des activités dans un environnement bancaire soumis à des exigences fortes en matière de gouvernance, sécurité, traçabilité et continuité de service.",
      },
    ],
    resultatsIntro:
      "L'intervention de Cycle Consulting a contribué à sécuriser la transformation des infrastructures et à accélérer leur convergence vers les standards du Groupe.",
    resultats: [
      {
        titre: "Harmonisation des infrastructures",
        description:
          "Convergence progressive des environnements des filiales vers les standards techniques et opérationnels du Groupe, permettant de réduire l'hétérogénéité des infrastructures.",
      },
      {
        titre: "Une gouvernance internationale renforcée",
        description:
          "Mise en place d'un cadre de pilotage commun permettant de disposer d'une vision consolidée des activités et de mieux coordonner les équipes réparties sur plusieurs pays.",
      },
      {
        titre: "Des migrations mieux maîtrisées",
        description:
          "Accompagnement des équipes dans les phases de migration et d'évolution des services IT, avec une attention particulière portée à la continuité et à la qualité de service.",
      },
      {
        titre: "Standardisation des pratiques ITSM",
        description:
          "Accompagnement des filiales dans l'alignement de leurs pratiques ITSM avec les standards du Groupe, favorisant une plus grande homogénéité des processus et des modes de fonctionnement.",
      },
      {
        titre: "Pilotage par la donnée",
        description:
          "Déploiement d'indicateurs permettant d'objectiver la performance, de détecter les écarts et de faciliter la prise de décision au niveau du programme.",
      },
    ],
    citation: {
      texte:
        "Harmoniser un système d'information international ne consiste pas uniquement à déployer des standards. Il s'agit de créer un modèle commun capable de s'adapter aux réalités locales tout en garantissant une gouvernance et une qualité de service homogènes.",
    },
    conclusion:
      "À travers son expertise en Program Management et Transformation IT, Cycle Consulting accompagne les organisations internationales dans leurs programmes de convergence, de migration et de transformation, en conciliant performance, maîtrise des risques et exigences réglementaires.",
  },
  {
    slug: "support-n3-b2b-restauration-rapide",
    href: "/cas-clients/support-n3-b2b-restauration-rapide",
    navLabel: "Structuration d'un Support N3 B2B",
    secteur: "QSR • Restauration rapide",
    image: "/images/cas-clients/support-n3-b2b-restauration-rapide.webp",
    imageAlt: "Pictogramme d'une bulle de conversation contenant un trace de monitoring, support N3 B2B",
    environnement: "Grands comptes • Support N3 • HO/HNO • Multi-niveaux",
    expertise: "IT Service Management & Support B2B",
    enjeuxTags: ["Continuité de service", "Expertise", "MCO", "Performance", "Montée en compétences"],
    visible: true,
    metaTitle: "Structuration d'un Support N3 B2B : cas client QSR | Cycle Consulting",
    metaDescription:
      "Comment Cycle Consulting a structuré et professionnalisé un dispositif de Support N3 B2B pour des grands comptes du secteur de la restauration rapide.",
    resume:
      "Structuration, pilotage et professionnalisation d'un dispositif de Support N3 B2B pour des grands comptes, dans un secteur où la continuité de service est critique.",
    resumeDefi:
      "Garantir la continuité de service et la réactivité du support IT auprès de grands comptes de la restauration rapide.",
    resumeSolution:
      "Structuration d'une organisation Support N1 → N3 multi-niveaux et professionnalisation des équipes.",
    contexte: [
      "Dans un environnement de Quick Service Restaurant (QSR) où la disponibilité des équipements et des applications constitue un enjeu directement lié à la continuité des opérations, notre client devait garantir un niveau élevé de disponibilité et de réactivité de ses services IT auprès de ses grands comptes.",
      "Le dispositif de support nécessitait une organisation capable de prendre en charge les incidents complexes, d'accompagner les techniciens lors des interventions sur site et de sécuriser l'intégration de nouveaux équipements et logiciels.",
      "Cycle Consulting est intervenu afin de structurer, piloter et professionnaliser le dispositif de Support N3 B2B, tout en renforçant la qualité de service et la capacité d'évolution de l'organisation.",
    ],
    intervention: [
      {
        titre: "Management des équipes",
        description:
          "Management et accompagnement des équipes Support et Expertise, avec une attention particulière portée à la montée en compétences, à l'autonomie et à la professionnalisation des collaborateurs.",
      },
      {
        titre: "Maintien en conditions opérationnelles",
        description:
          "Pilotage du MCO des infrastructures, applications et solutions logicielles clients, avec mise en place des dispositifs nécessaires au maintien de la disponibilité et de la performance des services.",
      },
      {
        titre: "Support aux interventions terrain",
        description:
          "Accompagnement des techniciens lors des interventions sur site et mise à disposition d'une expertise N3 permettant de sécuriser le diagnostic et la résolution des incidents complexes.",
      },
      {
        titre: "Pilotage de la performance",
        description:
          "Définition, suivi et analyse des indicateurs de qualité de service permettant de mesurer la performance du dispositif et d'identifier les axes d'amélioration.",
      },
    ],
    actions: [
      {
        titre: "Direction du Support N3 B2B",
        description:
          "Pilotage du dispositif de support technique dédié aux grands comptes, avec responsabilité de la performance opérationnelle, de la qualité de service et de la continuité des activités.",
      },
      {
        titre: "Structuration de l'organisation Support",
        description:
          "Mise en place d'une organisation structurée autour des différents niveaux d'expertise (N1 → N2 → N3 / Experts → Incident Manager → Pilote d'Activité), avec clarification des rôles, responsabilités et interfaces afin d'améliorer la fluidité du traitement des incidents et l'escalade des problématiques complexes.",
      },
      {
        titre: "Industrialisation des nouveaux équipements",
        description:
          "Amélioration continue des processus d'intégration des nouveaux équipements et solutions, afin de faciliter leur déploiement et leur prise en charge par les équipes de support.",
      },
      {
        titre: "Gestion opérationnelle HO / HNO",
        description:
          "Mise en place et gestion des plannings Heures Ouvrées / Heures Non Ouvrées, garantissant la couverture opérationnelle nécessaire aux exigences des grands comptes.",
      },
    ],
    resultatsIntro:
      "L'intervention de Cycle Consulting a permis de faire évoluer le dispositif Support vers une organisation plus structurée, plus autonome et davantage orientée performance.",
    resultats: [
      {
        titre: "Une organisation Support structurée",
        description:
          "Déploiement d'une organisation multi-niveaux permettant de mieux répartir les responsabilités entre N1, N2, N3, Experts, Incident Management et Pilotage d'Activité.",
      },
      {
        titre: "Une capacité d'expertise renforcée",
        description:
          "Renforcement du support N3 et amélioration de l'accompagnement des techniciens terrain dans le traitement des incidents complexes.",
      },
      {
        titre: "Une meilleure maîtrise du MCO",
        description: "Structuration du maintien en conditions opérationnelles des solutions logicielles et des environnements clients.",
      },
      {
        titre: "Une couverture opérationnelle sécurisée",
        description:
          "Création et gestion des dispositifs de planification HO/HNO, permettant d'assurer la continuité du support en fonction des engagements clients.",
      },
      {
        titre: "Des équipes professionnalisées",
        description:
          "Recrutement, intégration et accompagnement des collaborateurs, avec mise en place d'une démarche de montée en compétences et de capitalisation des connaissances.",
      },
      {
        titre: "Un pilotage contractuel renforcé",
        description:
          "Participation à la définition et à la rédaction des contrats de maintenance, avec prise en compte des exigences opérationnelles, des niveaux de service et des engagements associés.",
      },
    ],
    citation: {
      texte:
        "Un support N3 performant ne se limite pas à résoudre les incidents complexes. Il doit anticiper, capitaliser et permettre à l'ensemble de la chaîne Support de gagner en autonomie et en efficacité.",
    },
    conclusion:
      "Cycle Consulting accompagne les organisations dans la structuration, le pilotage et la transformation de leurs dispositifs de support IT, en combinant expertise technique, management des équipes et culture de l'amélioration continue.",
  },
  {
    slug: "pilotage-service-delivery-grand-compte-it",
    href: "/cas-clients/pilotage-service-delivery-grand-compte-it",
    navLabel: "Pilotage Service Delivery Manager sur un grand compte IT",
    secteur: "Ingénierie IT",
    image: "/images/cas-clients/pilotage-service-delivery-grand-compte-it.webp",
    imageAlt: "Pictogramme d'une baie de serveurs au centre d'un maillage de noeuds, pilotage d'un grand compte IT",
    environnement: "Grand compte • Infogérance / Service Managé • Écosystème Microsoft",
    expertise: "Service Delivery Management",
    enjeuxTags: [
      "Migration & déploiement d'infrastructure",
      "Support IT",
      "Infogérance / Service managé",
      "Relation DSI / RSSI",
      "Partenariat Microsoft",
    ],
    visible: true,
    metaTitle: "Pilotage Service Delivery sur un grand compte IT : cas client | Cycle Consulting",
    metaDescription:
      "Comment un Service Delivery Manager Cycle Consulting pilote un dispositif IT complexe sur un grand compte, de l'infogérance à la relation DSI/RSSI.",
    resume:
      "Pilotage d'un dispositif de Service Delivery sur un grand compte, de la migration d'infrastructure à la relation DSI/RSSI.",
    resumeDefi:
      "Piloter un dispositif IT complexe sur un grand compte : infrastructure, support, infogérance et relation DSI/RSSI.",
    resumeSolution:
      "Pilotage SLA/KPI, gouvernance des comités et structuration des centres de services, avec méthodologies ITIL et Agile.",
    contexte: [
      "Intervention d'un Service Delivery Manager Cycle Consulting sur un grand compte, couvrant la migration et le déploiement d'infrastructure, la création et la gestion du support IT, ainsi que le pilotage de l'infogérance et du service managé, en lien direct avec la DSI et le RSSI, dans le cadre d'une alliance partenaire Microsoft.",
    ],
    intervention: [
      { titre: "Pilotage de services IT pour des grands comptes" },
      { titre: "Gestion des SLA, KPI et plan d'améliorations" },
      { titre: "Coordination des équipes techniques et prestataires" },
      { titre: "Animation des comités de pilotage" },
      { titre: "Gestion budgétaire et suivi des engagements contractuels" },
      { titre: "Collaboration permanente avec le DSI" },
      { titre: "Coordination transversale inter-service" },
      { titre: "Pilotage des UO (Ingénieurs, Administrateurs, Techniciens informatiques, Chefs de projets, Développeurs)" },
      { titre: "Rédaction de PV normatifs" },
      { titre: "Recrutement et intégration des collaborateurs" },
    ],
    resultats: [
      { titre: "Formation aux outils Office 365" },
      { titre: "Structuration des centres de services" },
      { titre: "Déploiement de méthodologies ITIL et Agile" },
      { titre: "Mise en place de cellule Build & Run" },
      { titre: "Accompagnement des transformations IT majeures" },
      { titre: "Accompagnement aux incentives Microsoft" },
    ],
    conclusion:
      "Ce mandat illustre la capacité de Cycle Consulting à mettre à disposition des profils Service Delivery Manager expérimentés, capables de piloter des dispositifs IT complexes sur des grands comptes, de la gouvernance opérationnelle à la relation DSI/RSSI.",
  },
];

export function getCasClientBySlug(slug: string): CasClient | undefined {
  return casClients.find((c) => c.slug === slug);
}

/** Other visible case studies, for cross-linking at the bottom of a case study page. */
export function getAutresCasClients(slug: string, limit = 3): CasClient[] {
  return casClients.filter((c) => c.visible && c.slug !== slug).slice(0, limit);
}
