/**
 * Initialise `dataLayer` + Consent Mode v2 avec toutes les autorisations sur
 * "denied", AVANT tout chargement de script Google. Rendu comme `<script>` natif
 * en tete de `<body>` pour s'executer des l'analyse du document, avant l'hydratation.
 *
 * Aucun appel reseau ici : on ne fait que poser les valeurs par defaut. Les
 * scripts GA4 / GTM ne sont injectes qu'apres accord (voir `Analytics`).
 */
const INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('js', new Date());
`;

export default function ConsentDefaults() {
  return <script id="consent-mode-defaults" dangerouslySetInnerHTML={{ __html: INIT }} />;
}
