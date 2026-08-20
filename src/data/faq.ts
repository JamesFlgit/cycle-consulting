export type FaqItem = {
  question: string;
  reponse: string;
  /** Featured in the short FAQ preview on the homepage. */
  highlight?: boolean;
};

export type FaqTheme = {
  theme: string;
  items: FaqItem[];
};

/**
 * Question 13 of the source FAQ ("CYCLE CONSULTING peut-il créer, maintenir et
 * faire évoluer mon site web...") is intentionally omitted — website
 * creation/SEO is out of scope for this FAQ per the client's request.
 */
export const faqThemes: FaqTheme[] = [
  {
    theme: "Apprendre à se connaître",
    items: [
      {
        question: "Qu'est-ce que CYCLE CONSULTING ?",
        highlight: true,
        reponse: `CYCLE CONSULTING est une ESN et société de conseil spécialisée dans la transformation, la performance et l'exploitation des services numériques.

Nous accompagnons les entreprises sur l'ensemble de la chaîne de valeur IT : conseil Business & Stratégie, transformation et gouvernance des opérations, infogérance, services managés, support de proximité, logistique IT et formation.

Notre approche repose sur trois principes : Apprendre. Comprendre. Entreprendre.

Nous ne nous limitons pas à apporter des compétences. Nous cherchons à comprendre les enjeux de nos clients, à construire des réponses adaptées et à nous engager sur la réussite des transformations.`,
      },
      {
        question: "Quels types de clients accompagnez-vous ?",
        reponse: `Nous intervenons auprès de PME, ETI et grands comptes, notamment dans des environnements où la continuité de service, la performance opérationnelle et la transformation des systèmes d'information constituent des enjeux majeurs.

Nos consultants peuvent intervenir dans des secteurs tels que :
• Industrie
• Banque & Assurance
• Retail
• QSR
• Services
• Télécommunications
• Transport
• Secteur public

Notre organisation nous permet également d'intervenir dans des environnements internationaux et multi-pays.`,
      },
      {
        question: "Sur quels sujets vos consultants interviennent-ils ?",
        reponse: `Nos consultants interviennent sur des problématiques de transformation, gouvernance et performance IT, notamment :
• Transformation des organisations
• Program Management
• Service Delivery Management
• Direction des opérations
• Pilotage de centres de services
• IT Service Management
• Transformation et industrialisation des processus
• Gouvernance IT
• Management de transition
• Amélioration continue
• Pilotage de la performance

Nos profils vont du Chef de Projet au Directeur des Opérations, en passant notamment par les Service Delivery Managers, Delivery Managers et responsables de production.`,
      },
    ],
  },
  {
    theme: "Comprendre & co-structurer",
    items: [
      {
        question: "Quelle différence entre vos consultants en infogérance et vos Services Managés ?",
        highlight: true,
        reponse: `C'est une distinction importante chez CYCLE CONSULTING.

Les Services Managés répondent principalement à un besoin de prise en charge opérationnelle : support utilisateur, proximité, logistique, exploitation ou maintien en conditions opérationnelles.

Nos consultants en infogérance interviennent quant à eux sur des problématiques de pilotage, gouvernance, transformation et performance. Ils peuvent notamment prendre en charge un contrat d'infogérance, un centre de services, une production IT, un programme de transformation ou une organisation complexe.

En résumé :
Services Managés → nous opérons.
Conseil & Infogérance → nous pilotons et transformons.`,
      },
      {
        question: "Comment garantissez-vous la qualité de vos consultants ?",
        reponse: `Nous privilégions des profils disposant d'une expérience opérationnelle significative, capables d'intervenir dans des environnements complexes et à forts enjeux.

Au-delà des compétences techniques, nous évaluons notamment :
• l'expérience terrain
• la capacité à piloter
• les compétences managériales
• la capacité d'analyse
• l'aptitude à communiquer avec des interlocuteurs métiers et IT
• la culture du résultat
• la capacité à accompagner le changement`,
      },
      {
        question: "Que comprennent vos Services Managés ?",
        highlight: true,
        reponse: `Nos Services Managés peuvent couvrir notamment :
• Support de proximité OSS
• Support N1/N2
• Assistance utilisateurs
• Déploiement et renouvellement de postes
• Maintenance des équipements
• Gestion de parc
• Support VIP
• Gestion des incidents et demandes
• Support des environnements Microsoft
• Accompagnement des projets de transformation

Les dispositifs sont dimensionnés selon les volumes, les horaires, les SLA et les exigences propres à chaque client.`,
      },
      {
        question: "Pouvez-vous intervenir directement sur les sites de nos clients ?",
        reponse: `Oui.

Nos équipes peuvent être intégrées directement dans les environnements de nos clients, en France comme à l'international selon les besoins du projet.

Cette proximité permet d'assurer une meilleure connaissance des environnements, des utilisateurs et des enjeux opérationnels.`,
      },
      {
        question: "CYCLE CONSULTING dispose-t-il de son propre centre de services logistiques ?",
        reponse: `Oui.

CYCLE CONSULTING dispose de son propre Centre de Services Logistiques, permettant de prendre en charge une partie importante du cycle de vie des équipements IT.

Notre dispositif couvre notamment :
• Réception
• Stockage
• Préparation
• Intégration
• Expédition
• Déploiement
• Retour
• SAV
• Reconditionnement
• Gestion de fin de vie`,
      },
      {
        question: "Pouvez-vous gérer des déploiements nationaux et internationaux ?",
        reponse: `Oui.

Notre organisation logistique permet de préparer et d'expédier des équipements sur des périmètres nationaux et internationaux.

Nous pouvons accompagner des projets de renouvellement de parc, de migration, d'ouverture de sites, de déménagement ou de déploiement massif.`,
      },
      {
        question: "Pouvez-vous intégrer les images et logiciels de nos clients ?",
        reponse: `Oui.

Notre Centre de Services Logistiques permet d'industrialiser la préparation des équipements avant leur déploiement. Nous pouvons notamment réaliser :
• intégration des images clients
• installation des systèmes
• intégration des logiciels
• configuration des équipements
• personnalisation des postes
• contrôles qualité
• préparation des kits utilisateurs

L'objectif est de fournir un équipement prêt à l'emploi, limitant ainsi les interventions nécessaires sur site.`,
      },
      {
        question: "Que faites-vous des équipements informatiques en fin de vie ?",
        reponse: `CYCLE CONSULTING s'appuie sur un partenaire spécialisé dans le traitement et la valorisation des équipements électriques et électroniques en fin de vie.

Les équipements peuvent être triés, valorisés, reconditionnés ou orientés vers une filière de traitement adaptée.

Les opérations de destruction font l'objet d'une traçabilité et de justificatifs de destruction, permettant au client de disposer d'une preuve documentaire du traitement de ses équipements.`,
      },
      {
        question: "Quelles formations propose CYCLE CONSULTING ?",
        reponse: `Notre offre de formation accompagne les collaborateurs dans le développement de leurs compétences numériques, managériales et méthodologiques. Elle couvre notamment :

Microsoft Office
• Word
• Excel
• PowerPoint
• Power BI

Management
• Leadership
• Management d'équipe
• Communication
• Conduite du changement
• Performance collective

IT Service Management
• ITIL® et bonnes pratiques de gestion des services IT

Gestion de projet
• PRINCE2®
• Gouvernance
• Pilotage des risques
• Gestion des délais et des coûts

Les formations peuvent être adaptées au niveau des participants et aux objectifs de l'entreprise.`,
      },
      {
        question: "Comment se déroule le démarrage d'une mission ?",
        highlight: true,
        reponse: `Nous privilégions une démarche en plusieurs étapes :

1. Comprendre — analyse de votre environnement, de vos enjeux et de vos objectifs.
2. Diagnostiquer — identification des points de friction, risques et opportunités d'amélioration.
3. Construire — définition d'une organisation, d'une gouvernance ou d'un dispositif adapté.
4. Entreprendre — mise en œuvre opérationnelle des actions définies.
5. Mesurer — suivi des KPI, SLA et résultats obtenus.
6. Améliorer — mise en place d'une démarche d'amélioration continue.

Cette démarche traduit directement notre signature : Apprendre. Comprendre. Entreprendre.`,
      },
      {
        question: "CYCLE CONSULTING propose-t-il uniquement des consultants en régie ?",
        reponse: `Non.

Nous pouvons intervenir selon différents modèles :
• Assistance technique
• Conseil
• Management de transition
• Pilotage de projet
• Service managé
• Centre de services
• Prestations logistiques
• Formation
• Dispositifs hybrides combinant plusieurs expertises

Le modèle est défini en fonction du niveau de responsabilité que le client souhaite confier à CYCLE CONSULTING.`,
      },
    ],
  },
  {
    theme: "Entreprendre ensemble",
    items: [
      {
        question: "Comment mesurez-vous la réussite d'une mission ?",
        reponse: `Nous privilégions une approche orientée résultats. Selon les missions, nous pouvons suivre :
• SLA
• KPI
• KSI
• qualité de service
• satisfaction utilisateur
• productivité
• coûts
• délais
• disponibilité
• backlog
• incidents récurrents
• performance opérationnelle

Notre objectif est de rendre la valeur créée mesurable et visible.`,
      },
      {
        question: "Quelle est votre différence par rapport à une ESN traditionnelle ?",
        highlight: true,
        reponse: `Notre positionnement repose sur une conviction simple : la valeur d'une ESN ne réside pas uniquement dans les compétences qu'elle met à disposition, mais dans sa capacité à produire des résultats.

CYCLE CONSULTING associe :
• Expertise — des consultants expérimentés
• Proximité — des équipes accessibles et proches des enjeux clients
• Engagement — une implication dans la réussite des missions
• Performance — des objectifs et indicateurs mesurables
• Transformation — une capacité à faire évoluer durablement les organisations`,
      },
      {
        question: "Comment CYCLE CONSULTING accompagne-t-il l'amélioration continue ?",
        reponse: `L'amélioration continue est intégrée à nos dispositifs.

Nous analysons régulièrement les données de performance, les incidents, les irritants utilisateurs et les écarts aux engagements afin d'identifier des actions correctives et préventives.

Notre objectif n'est pas simplement de maintenir un niveau de service, mais de faire progresser continuellement la performance.`,
      },
      {
        question: "Comment obtenir une présentation de CYCLE CONSULTING ?",
        reponse: `Notre équipe peut vous présenter nos expertises, nos références et les différents modèles d'accompagnement disponibles.

Contactez-nous pour échanger sur votre besoin.`,
      },
      {
        question: "Pouvez-vous répondre à un besoin urgent ?",
        highlight: true,
        reponse: `Oui. Notre organisation nous permet de mobiliser rapidement des profils adaptés à des situations de renfort, de transformation, de management de transition ou de redressement opérationnel.`,
      },
      {
        question: "Pouvez-vous construire une offre sur mesure ?",
        reponse: `Oui. Nous privilégions une approche adaptée au contexte du client plutôt qu'un catalogue de prestations standardisé.`,
      },
    ],
  },
];
