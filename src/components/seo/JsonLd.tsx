/**
 * Injecte un bloc de donnees structurees JSON-LD.
 * `<script>` natif (les donnees structurees ne sont pas du code executable).
 * `<` est echappe pour prevenir toute injection via les chaines serialisees.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
