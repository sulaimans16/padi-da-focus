import type { Question } from "./questions";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function buildPaperHtml(
  title: string,
  questions: Question[],
  withAnswers: boolean,
): string {
  const body = questions
    .map(
      (q, i) => `
    <article class="q">
      <p class="stem"><b>Q${i + 1}.</b> ${esc(q.stem)}</p>
      ${q.imageUrl ? `<img class="fig" src="${esc(q.imageUrl)}" alt="Figure for question ${i + 1}"/>` : ""}
      <ol class="opts">
        ${q.options.map((o) => `<li>${esc(o.text)}</li>`).join("")}
      </ol>
      <p class="meta">${esc(q.subject)} · ${esc(q.topic)}${q.pyqYear ? ` · NEET PG ${q.pyqYear}` : ""}</p>
      ${
        withAnswers
          ? `<p class="ans"><b>Answer:</b> ${esc(
              q.options.find((o) => o.id === q.correctOptionId)?.text ?? q.correctOptionId,
            )}<br/><b>Why:</b> ${esc(q.oneLiner || q.explanation)}</p>`
          : ""
      }
    </article>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<title>${esc(title)}</title>
<style>
  body{font-family:Georgia,'Times New Roman',serif;max-width:760px;margin:32px auto;padding:0 20px;color:#111;line-height:1.55}
  h1{font-size:22px;margin-bottom:2px}
  .sub{color:#555;font-size:13px;margin-top:0}
  .q{page-break-inside:avoid;border-top:1px solid #ddd;padding:14px 0}
  .stem{margin:0 0 8px}
  .fig{display:block;max-width:100%;max-height:320px;margin:6px 0 10px;border:1px solid #ddd}
  .opts{margin:0 0 6px 18px;padding:0}
  .opts li{margin:2px 0}
  .meta{font-size:11px;color:#777;margin:4px 0 0;text-transform:uppercase;letter-spacing:.04em}
  .ans{background:#f4f7f5;border-left:3px solid #2f6f5b;padding:8px 10px;font-size:13px;margin:8px 0 0}
  @media print{body{margin:0}}
</style></head>
<body>
  <h1>${esc(title)}</h1>
  <p class="sub">PG Prep · ${questions.length} questions${withAnswers ? " · with answer key" : ""} · generated ${new Date().toLocaleDateString()}</p>
  ${body}
</body></html>`;
}

export function downloadHtml(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function printHtml(html: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(html);
  w.document.close();
  w.focus();
  w.print();
}

export const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
