import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Slogan from "@/components/ui/Slogan";
import DonutChart from "@/components/ui/DonutChart";
import InternationalHighlight from "@/components/ui/InternationalHighlight";
import BoucleVertueuse from "@/components/ui/BoucleVertueuse";
import { repartitionPractices, repartitionGenre } from "@/data/repartitions";

// Brand gradient, light variant — see Slogan.tsx — for accents on the dark
// "chiffres" section.
const GRADIENT_LIGHT = "bg-gradient-to-r from-[#f77bf0] via-[#6f8cf5] to-[#7ef0ff] bg-clip-text text-transparent";
// Brand gradient, dark variant — for eyebrows and title accents on this
// page's light sections (and the dark hero, per the logo's own treatment).
const GRADIENT_DARK = "bg-gradient-to-r from-[#fa11f7] via-[#132bdd] to-[#0bceff] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "À propos de Cycle Consulting — Cycle Consulting",
  description:
    "Découvrez Cycle Consulting, société de conseil et de services IT : notre histoire, notre vision internationale, nos valeurs et nos atouts.",
};

const CYCLE_VERTUEUX = [
  "Identifier les talents",
  "Comprendre leur potentiel",
  "Foisonner leur potentiel",
  "Éprouver leur potentiel",
  "Accompagner les profils dans leurs missions",
  "Créer de la valeur chez nos clients",
  "Valoriser le foisonnement du résultat",
];

const COMPETENCE_A_LA_VALEUR = [
  "Comprendre le contexte.",
  "Identifier les irritants.",
  "Mesurer les enjeux.",
  "Proposer la bonne expertise.",
  "Accompagner la transformation.",
  "Mesurer les résultats.",
  "Et construire une relation durable.",
];

const ENGAGEMENTS_CLIENTS = [
  "La complexité en simplicité.",
  "Les données en décisions.",
  "Les incidents en amélioration.",
  "Les compétences en performance.",
  "Les projets en résultats.",
  "Les talents en réussite.",
];

const VALEURS = [
  {
    nom: "Justice",
    description: "Nous croyons à l'équité dans les relations professionnelles et à la nécessité de donner à chacun une véritable chance de démontrer sa valeur.",
  },
  {
    nom: "Justesse",
    description: "Chaque décision doit être prise avec discernement, en tenant compte des personnes, des contextes et des réalités opérationnelles.",
  },
  {
    nom: "Respect",
    description: "Le respect des collaborateurs, des clients, des engagements et du travail accompli constitue le socle de notre fonctionnement.",
  },
  {
    nom: "Proximité",
    description: "Nous privilégions des relations humaines directes, accessibles et durables, aussi bien avec nos collaborateurs qu'avec nos clients.",
  },
  {
    nom: "Exigence",
    description: "La bienveillance n'exclut pas l'exigence. Nous croyons au travail bien fait, à la responsabilité et à la recherche permanente de progrès.",
  },
  {
    nom: "Transmission",
    description: "La connaissance n'a de valeur que lorsqu'elle est partagée. Nous encourageons la formation, le mentoring, la transmission des savoirs et la montée en compétences.",
  },
  {
    nom: "Performance",
    description: "Notre engagement humain doit se traduire par des résultats concrets pour nos clients et nos collaborateurs.",
  },
];

const CULTURE_INTERNATIONALE = [
  "La diversité des parcours et des expériences",
  "La diversité culturelle",
  "Le partage des pratiques professionnelles internationales",
  "La transmission des savoir-faire entre les équipes",
  "La collaboration entre collaborateurs de différents pays",
  "L'ouverture à de nouvelles méthodes de travail",
  "Le développement des compétences dans des environnements internationaux",
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow={<span className={GRADIENT_LIGHT}>L&apos;entreprise</span>}
        title="À propos de Cycle Consulting"
        description={
          <>
            <Slogan variant="light" />
            <span className="mt-3 block">
              Transformer la complexité IT en performance. Révéler les talents qui la rendent possible.
            </span>
          </>
        }
        image="/images/a-propos/hero.jpg"
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Notre histoire" title="Qui sommes-nous ?" />
        <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <p>
            L&apos;informatique est devenue indispensable à la performance des entreprises. Pourtant, pour de
            nombreuses organisations dont l&apos;IT n&apos;est pas le cœur de métier, elle reste complexe, difficile
            à piloter et parfois éloignée des réalités opérationnelles.
          </p>
          <p>
            CYCLE CONSULTING est née de cette conviction : l&apos;IT doit avant tout être un levier de performance,
            de simplicité et de confiance.
          </p>
          <p>
            Créée sur la base d&apos;une expertise et d&apos;une expérience développées depuis plusieurs années,
            CYCLE CONSULTING est une ESN et société de conseil qui accompagne ses clients dans la transformation, le
            pilotage et l&apos;exploitation de leurs environnements numériques.
          </p>
          <p className="font-semibold text-anthracite">
            Notre ambition est simple : rendre la complexité IT compréhensible, maîtrisable et créatrice de valeur.
          </p>
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Une vision différente de <span className={GRADIENT_LIGHT}>l&apos;ESN</span>
          </h2>

          <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4 text-sm leading-relaxed text-white/80">
              <p>
                CYCLE CONSULTING est née d&apos;un constat construit au fil de nombreuses années d&apos;expérience
                dans le monde des ESN.
              </p>
              <p>
                La réussite d&apos;une prestation ne dépend pas uniquement de la technologie, des processus ou des
                compétences mises à disposition. Elle dépend avant tout de{" "}
                <span className="font-semibold text-white">
                  l&apos;alchimie entre les femmes, les hommes, les compétences, les organisations et les objectifs
                  du client
                </span>
                . C&apos;est cette alchimie que nous avons choisi de placer au cœur de notre modèle.
              </p>
              <p>
                Cette complémentarité nous permet d&apos;appréhender les problématiques IT dans leur globalité et de
                proposer à nos clients une vision plus simple, plus cohérente et plus opérationnelle de leur
                environnement numérique.
              </p>

              <h3 className="pt-2 text-base font-semibold text-white">Une ambition internationale</h3>
              <p>
                CYCLE CONSULTING porte une forte appétence de développement à l&apos;international. Notre ancrage et
                notre développement s&apos;inscrivent autour de la France et de l&apos;Europe, notre vision est
                résolument internationale.
              </p>
              <p>
                Aujourd&apos;hui, CYCLE CONSULTING exerce{" "}
                <span className="font-semibold text-white">en Amérique du Nord et en Afrique</span>, et souhaite
                poursuivre activement cette dynamique afin de développer son empreinte auprès de clients
                internationaux.
              </p>
              <p>
                Cette ouverture internationale répond à une conviction :{" "}
                <span className="font-semibold text-white">
                  la diversité des cultures, des expériences et des façons de travailler constitue une véritable
                  source de performance
                </span>
                . Travailler avec des équipes, des clients et des partenaires issus de différents environnements
                culturels permet de confronter les pratiques, de remettre en question nos certitudes et
                d&apos;enrichir nos méthodes.
              </p>
              <p>
                Notre ambition est donc de construire progressivement une organisation dans laquelle les différences
                culturelles deviennent une force collective.
              </p>

              <h3 className="pt-2 text-base font-semibold text-white">Une ambition : construire un CYCLE international</h3>
              <p>Notre développement international s&apos;inscrit dans la même philosophie que notre modèle humain.</p>
              <p>
                <span className="font-semibold text-white">Apprendre</span> de nouvelles cultures et de nouvelles
                pratiques.
                <br />
                <span className="font-semibold text-white">Comprendre</span> les différentes réalités de nos clients
                et de leurs marchés.
                <br />
                <span className="font-semibold text-white">Entreprendre</span> ensemble pour construire des
                solutions adaptées à chaque environnement.
              </p>
              <p>
                Notre ambition est de faire de CYCLE CONSULTING une entreprise{" "}
                <span className="font-semibold text-white">
                  française dans son ADN, internationale dans sa vision et diverse dans sa culture
                </span>
                .
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <h3 className={`text-center text-sm font-semibold uppercase tracking-wide ${GRADIENT_LIGHT}`}>
                Dimension internationale
              </h3>
              <div className="mt-6">
                <InternationalHighlight />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="nos-valeurs-et-engagements" className="mx-auto max-w-4xl scroll-mt-18 px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nos valeurs"
          title={
            <>
              Nos <span className={GRADIENT_DARK}>valeurs</span> et <span className={GRADIENT_DARK}>engagements</span>
            </>
          }
          description="Les principes qui guident Cycle Consulting au quotidien, dans ses missions comme dans ses relations clients."
        />

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-anthracite-soft">
          <h3 className="text-lg font-semibold text-anthracite">
            Notre conviction : la performance commence par les personnes
          </h3>
          <p>
            Chez CYCLE CONSULTING, nous sommes convaincus qu&apos;une entreprise performante commence par des
            collaborateurs qui se sentent{" "}
            <span className="font-semibold text-anthracite">reconnus, considérés et responsabilisés</span>.
          </p>
          <p>
            Notre modèle repose donc sur une relation de proximité avec nos collaborateurs. Nous cherchons à
            comprendre leurs parcours, leurs aspirations, leurs compétences et surtout leur potentiel.
          </p>
          <p>
            Parce qu&apos;un CV ne résume jamais une personne. Parce qu&apos;une expérience passée ne définit pas
            nécessairement son potentiel futur. Parce que certains talents n&apos;ont simplement pas encore trouvé
            l&apos;environnement dans lequel ils peuvent pleinement s&apos;exprimer.
          </p>
          <p className="font-semibold text-anthracite">CYCLE CONSULTING veut leur donner cet environnement.</p>
          <p>
            Nous souhaitons offrir aux nouveaux talents la possibilité de prendre des responsabilités,
            d&apos;apprendre, de progresser et de démontrer leur valeur. Nous souhaitons également revaloriser des
            profils expérimentés ou atypiques qui n&apos;ont pas toujours été reconnus à leur juste valeur.
          </p>
          <p>Notre rôle est de créer les conditions permettant à chacun de retrouver confiance, responsabilité et ambition.</p>

          <h3 className="pt-4 text-lg font-semibold text-anthracite">La confiance comme moteur de performance</h3>
          <p>Nous ne considérons pas la rémunération comme l&apos;unique levier de reconnaissance.</p>
          <p>
            Un collaborateur qui se sent reconnu est plus à même de prendre des initiatives, de porter ses
            responsabilités et de s&apos;engager pleinement auprès de son client.
          </p>
          <p>
            Chez CYCLE CONSULTING, nous sommes convaincus que notre proximité avec nos collaborateurs se reflète
            directement dans la qualité de notre relation client. Un consultant qui comprend les valeurs de CYCLE
            CONSULTING devient naturellement un ambassadeur de ces valeurs chez le client.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-anthracite">Une ESN qui souhaite aller au-delà du modèle traditionnel</h3>
          <div className="mt-6 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="space-y-4 text-sm leading-relaxed text-anthracite-soft">
                <p>
                  Nous ne souhaitons pas construire une organisation dans laquelle les collaborateurs sont considérés
                  comme de simples ressources. Notre ambition est de construire une communauté de professionnels
                  capables de grandir avec CYCLE CONSULTING et de faire grandir leurs clients et se définit par ce
                  CYCLE vertueux :
                </p>
                <p>C&apos;est ce que nous appelons le Cycle CYCLE CONSULTING.</p>
              </div>

              <h3 className="mt-10 text-lg font-semibold text-anthracite">De la compétence à la valeur</h3>
              <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">
                Notre approche commerciale repose également sur cette philosophie. Nous ne cherchons pas simplement à
                proposer un profil disponible. Nous cherchons à comprendre le problème que notre client souhaite
                résoudre.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">
                Nos équipes commerciales sont donc volontairement proches de leurs clients et engagées dans une
                logique de résultat.
              </p>
              <ol className="mt-6 space-y-2">
                {COMPETENCE_A_LA_VALEUR.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-anthracite-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-alt text-[11px] font-bold text-anthracite">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm leading-relaxed text-anthracite-soft">
                Notre objectif n&apos;est pas de vendre des journées-hommes, notre objectif est de créer de la
                valeur.
              </p>
            </div>
            <div className="flex justify-center lg:sticky lg:top-24">
              <BoucleVertueuse steps={CYCLE_VERTUEUX} compact />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-anthracite">Notre engagement auprès de nos clients</h3>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">
            Nous savons que pour nos clients, l&apos;informatique n&apos;est pas toujours le cœur de métier. Notre
            responsabilité est donc de simplifier leur quotidien. Nous cherchons à transformer :
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ENGAGEMENTS_CLIENTS.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border-subtle bg-surface px-4 py-3 text-sm font-semibold text-anthracite"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-anthracite">Nos valeurs</h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALEURS.map((valeur) => (
              <div key={valeur.nom} className="rounded-xl border border-border-subtle bg-surface p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-anthracite">{valeur.nom}</p>
                <p className="mt-2 text-xs leading-relaxed text-anthracite-mist">{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className={`text-center text-sm font-semibold uppercase tracking-wide ${GRADIENT_LIGHT}`}>
                Nos effectifs par pôle d&apos;expertise
              </h3>
              <div className="mt-6">
                <DonutChart
                  data={repartitionPractices}
                  ariaLabel="Répartition des effectifs par pôle d'expertise : Service Managé 31%, Infogérance 26%, Business et Stratégie 22%, Centre Logistique 14%, Formations 7%"
                />
              </div>
            </div>
            <div>
              <h3 className={`text-center text-sm font-semibold uppercase tracking-wide ${GRADIENT_LIGHT}`}>
                Parité au sein de nos équipes
              </h3>
              <div className="mt-6">
                <DonutChart
                  data={repartitionGenre}
                  ariaLabel="Répartition Hommes / Femmes des effectifs : Hommes 54%, Femmes 46%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="nos-atouts-et-differences" className="scroll-mt-18 bg-surface-alt">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Nos atouts"
            title={
              <>
                Nos <span className={GRADIENT_DARK}>atouts</span> et <span className={GRADIENT_DARK}>différences</span>
              </>
            }
            description="Ce qui distingue Cycle Consulting dans l'accompagnement de ses clients et la réalisation de ses missions."
          />

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-anthracite">Une culture internationale, une richesse collective</h3>
            <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">
              Pour CYCLE CONSULTING, l&apos;international ne se résume pas à intervenir dans plusieurs pays. Il
              s&apos;agit également de développer une culture de travail ouverte sur le monde, capable de réunir des
              profils, des expériences et des approches différentes autour d&apos;un même objectif : créer de la
              valeur pour nos clients et permettre à nos collaborateurs de progresser. Nous souhaitons ainsi
              favoriser :
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CULTURE_INTERNATIONALE.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-anthracite-soft">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#fa11f7] to-[#0bceff]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-anthracite-soft">
              Cette diversité vient directement enrichir notre modèle. Nous ne cherchons pas à uniformiser les
              talents. Nous cherchons à faire de leurs différences une force.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-anthracite">Notre vision du parcours professionnel</h3>
            <div className="mt-2 space-y-4 text-sm leading-relaxed text-anthracite-soft">
              <p>Chez CYCLE CONSULTING, nous accompagnons nos collaborateurs sur la durée.</p>
              <p>
                Un parcours professionnel n&apos;est pas une succession de missions. C&apos;est une construction. Il
                peut comporter des réussites, des difficultés, des changements de trajectoire, des remises en
                question et de nouvelles opportunités.
              </p>
              <p>Notre responsabilité est d&apos;accompagner ces différentes étapes avec justice, justesse et proximité.</p>

              <h4 className="pt-2 text-base font-semibold text-anthracite">CYCLE CONSULTING, un centre de revalorisation des talents</h4>
              <p>Cette ambition constitue l&apos;une des convictions fondatrices de CYCLE CONSULTING.</p>
              <p>Nous ne voulons pas seulement recruter des compétences. Nous voulons révéler des potentiels.</p>
              <p>
                Certains collaborateurs ont besoin d&apos;une première opportunité. D&apos;autres ont besoin
                qu&apos;on leur fasse à nouveau confiance. Certains possèdent une expertise qui n&apos;a pas été
                suffisamment reconnue. D&apos;autres disposent d&apos;un potentiel qui n&apos;a simplement jamais
                trouvé le bon environnement pour s&apos;exprimer.
              </p>
              <p className="font-semibold text-anthracite">CYCLE CONSULTING souhaite être cet environnement.</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-lg font-semibold text-anthracite">Apprendre. Comprendre. Entreprendre.</h3>
            <p className="mt-2 text-sm leading-relaxed text-anthracite-soft">Notre signature résume notre philosophie.</p>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-anthracite-soft">
              <p>
                <span className="font-bold text-anthracite">APPRENDRE</span>
                <br />
                Parce que les technologies, les organisations et les métiers évoluent en permanence.
              </p>
              <p>
                <span className="font-bold text-anthracite">COMPRENDRE</span>
                <br />
                Parce qu&apos;une bonne solution commence toujours par une bonne compréhension du problème.
              </p>
              <p>
                <span className="font-bold text-anthracite">ENTREPRENDRE</span>
                <br />
                Parce que comprendre ne suffit pas. La valeur naît lorsque les idées deviennent des actions et les
                actions deviennent des résultats.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-chiffres-section">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Une ESN <span className={GRADIENT_LIGHT}>différente par conviction</span>
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/80">
            <p>
              Nous accompagnons nos clients dans leurs transformations IT avec une approche combinant expertise,
              proximité, exigence et culture du résultat. Nous accompagnons nos collaborateurs avec la même
              exigence de justice, de justesse, de respect et de progression.
            </p>
            <p>Parce que nous sommes convaincus que les deux sont indissociables :</p>
            <p>
              Des collaborateurs considérés et responsabilisés construisent de meilleures relations avec leurs
              clients. Des clients satisfaits offrent à nos collaborateurs les meilleures opportunités de
              progresser.
            </p>
            <p>C&apos;est ce cercle vertueux qui constitue CYCLE CONSULTING.</p>
          </div>
          <p className="mt-8 text-lg font-semibold text-white">
            <Slogan variant="light" />
          </p>
          <Link
            href="/contact"
            className="cta-primary mt-8 inline-block w-full rounded-md px-6 py-3 text-center text-sm font-bold sm:w-auto"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
