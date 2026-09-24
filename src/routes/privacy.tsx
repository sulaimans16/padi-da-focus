import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { BrandMark } from "@/components/BrandMark";

export const Route = createFileRoute("/privacy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Privacy Policy — PG Prep by Learners Studio" },
      {
        name: "description",
        content:
          "How PG Prep by Learners Studio collects, uses and protects your data — accounts, study progress, payments and analytics.",
      },
      { property: "og:title", content: "Privacy Policy — PG Prep" },
      {
        property: "og:description",
        content: "How PG Prep collects, uses and protects your data.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { rel: "canonical", href: "https://pg-pre.learners-studio.com/privacy" },
    ],
  }),
  component: Privacy,
});

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Who we are",
    body: [
      "PG Prep is a NEET PG preparation app operated by Learners Studio (\u201cwe\u201d, \u201cus\u201d). This policy explains what information we collect when you use pg-pre.learners-studio.com and the PG Prep Android app, and how we use it.",
      "If you have questions about this policy, contact us at support@learners-studio.com.",
    ],
  },
  {
    title: "Information we collect",
    body: [
      "Account details — when you sign in with email or Google, we store your email address, display name and username.",
      "Study activity — question attempts, accuracy, bookmarks, mock test and daily challenge results, focus session logs and streaks. This powers your analytics, weak-spot analysis and progress tracking.",
      "Payment information — when you upgrade to Pro, payment is processed by our payment provider. We never see or store your full card, UPI or bank details; we only receive a payment confirmation and plan status.",
      "Usage analytics — pages visited, device type, approximate country and session duration, used to improve the app.",
    ],
  },
  {
    title: "What we do not collect",
    body: [
      "Focus Lock works entirely on your device. We do not access your camera, record video, or upload any media from your study sessions.",
      "We do not sell your personal data to anyone, and we do not show third-party advertising.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "To run your account and sync your progress across devices.",
      "To generate your analytics, weak-spot reports and daily challenges.",
      "To process payments and manage your subscription.",
      "To improve question quality, features and performance, and to keep the service secure.",
    ],
  },
  {
    title: "AI features",
    body: [
      "When you use the AI study tutor or AI-generated questions, your prompts are sent to our AI providers solely to produce an answer. We do not use your study data to train third-party models.",
    ],
  },
  {
    title: "Data storage and security",
    body: [
      "Your data is stored on secure cloud infrastructure with encryption in transit and at rest. Access to your study data is restricted to your own account through row-level security rules.",
      "Some preferences (theme, splash state, guest progress) are stored locally on your device and never leave it.",
    ],
  },
  {
    title: "Data retention and deletion",
    body: [
      "We keep your account data while your account is active. You can request deletion of your account and all associated data at any time by emailing support@learners-studio.com — we will remove it within 30 days, except where we must keep records for legal or payment-audit reasons.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "We rely on a small number of providers to operate: cloud hosting and database, Google sign-in, a payment processor for Pro subscriptions, and AI providers for tutor features. Each processes only the data needed to provide its service.",
      "Our Papers page links to external sites such as Collegedunia; their own privacy policies apply there.",
    ],
  },
  {
    title: "Children",
    body: [
      "PG Prep is intended for medical graduates preparing for NEET PG and is not directed at children under 13. We do not knowingly collect data from children.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The latest version will always be on this page with the date below; significant changes will be announced in the app.",
    ],
  },
];

function Privacy() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <Reveal>
        <div className="flex items-center gap-3">
          <BrandMark className="h-11 w-11" />
          <div>
            <p className="label-eyebrow">PG Prep by Learners Studio</p>
            <h1 className="text-3xl leading-tight sm:text-4xl">
              <span className="text-gradient">Privacy Policy</span>
            </h1>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: 24 September 2026
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-8">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={Math.min(i * 0.04, 0.3)}>
            <section>
              <h2 className="text-lg font-semibold">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-2 flex flex-col gap-2">
                {s.body.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex items-center justify-between rounded-[2rem] bg-white/5 px-6 py-5 ring-1 ring-inset ring-glass-line">
          <p className="text-sm text-muted-foreground">
            Questions? Email{" "}
            <a
              href="mailto:support@learners-studio.com"
              className="font-semibold text-primary transition-colors hover:text-accent"
            >
              support@learners-studio.com
            </a>
          </p>
          <Link
            to="/"
            className="shrink-0 text-xs font-semibold text-primary transition-colors hover:text-accent"
          >
            Back to app →
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
