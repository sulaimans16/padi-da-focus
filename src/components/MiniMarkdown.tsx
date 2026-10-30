import { Fragment, type ReactNode } from "react";

/** Inline **bold** and [label](/in-app/path) links; anything else stays plain text. */
function inline(text: string, go: (href: string) => void, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${key}-${i++}`}>{m[1]}</strong>);
    else {
      const href = m[3]!;
      // Only same-app paths become links (no outside sites from the chat).
      if (href.startsWith("/") && !href.startsWith("//"))
        out.push(
          <a
            key={`${key}-${i++}`}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              go(href);
            }}
            className="font-semibold text-primary underline underline-offset-2"
          >
            {m[2]}
          </a>,
        );
      else out.push(m[2]);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Light markdown: paragraphs, '-' bullets, bold, optional headings and in-app links. */
export function MiniMarkdown({
  text,
  go,
  headings = false,
}: {
  text: string;
  go: (href: string) => void;
  /** Render "## " lines as headings (notes); otherwise they read as plain text (AI answers). */
  headings?: boolean;
}) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    const items = list;
    list = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-1 pl-4">
        {items.map((it, i) => (
          <li key={i}>{inline(it, go, `li-${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
  };
  text.split("\n").forEach((raw, i) => {
    const line = raw.trim();
    const bullet = /^([-*•]|\d+[.)])\s+(.*)$/.exec(line);
    if (bullet) list.push(bullet[2]!);
    else {
      flush();
      const heading = /^#{1,3}\s+(.*)$/.exec(line);
      if (heading && headings)
        blocks.push(
          <p key={`h-${i}`} className="font-display text-base font-bold">
            {inline(heading[1]!, go, `h-${i}`)}
          </p>,
        );
      else if (line)
        blocks.push(<p key={`p-${i}`}>{inline(line.replace(/^#+\s*/, ""), go, `p-${i}`)}</p>);
    }
  });
  flush();
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => (
        <Fragment key={i}>{b}</Fragment>
      ))}
    </div>
  );
}
