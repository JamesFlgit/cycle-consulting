export type ArticleBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-[#132bdd]" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="currentColor" opacity={0.12} />
      <path d="m6 10.2 2.6 2.6L14.2 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlockList({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h3":
            return (
              <h3
                key={index}
                className="mt-8 border-t border-border-subtle pt-6 text-lg font-semibold text-anthracite first:mt-0 first:border-0 first:pt-0"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="mt-4 text-sm leading-relaxed text-anthracite-soft">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={index} className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-anthracite-soft">
                    <CheckMark />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  const intro: ArticleBlock[] = [];
  const sections: { heading: string; blocks: ArticleBlock[] }[] = [];

  for (const block of blocks) {
    if (block.type === "lead" || (block.type === "p" && sections.length === 0)) {
      intro.push(block);
    } else if (block.type === "h2") {
      sections.push({ heading: block.text, blocks: [] });
    } else {
      sections[sections.length - 1]?.blocks.push(block);
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        {intro.map((block, index) =>
          block.type === "lead" ? (
            <p key={index} className="text-lg leading-relaxed font-medium text-anthracite sm:text-xl">
              {block.text}
            </p>
          ) : block.type === "p" ? (
            <p key={index} className="text-sm leading-relaxed text-anthracite-soft sm:text-base">
              {block.text}
            </p>
          ) : null
        )}
      </div>

      <div className="mt-10 space-y-5 sm:mt-14 sm:space-y-6">
        {sections.map((section, index) => (
          <section
            key={index}
            className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-7 w-1.5 shrink-0 rounded-full bg-linear-to-b from-[#fa11f7] via-[#132bdd] to-[#0bceff] sm:h-8" />
              <h2 className="text-lg font-bold text-anthracite sm:text-xl lg:text-2xl">{section.heading}</h2>
            </div>
            <div className="mt-2 pl-4.5">
              <BlockList blocks={section.blocks} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
