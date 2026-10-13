import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Icon } from "@/components/Primitives";
import { useTrack } from "@/hooks/useTrack";
import { inviteUrl } from "@/lib/share-card";
import { REFERRAL_DAYS, cachedUsername, fetchMyReferrals } from "@/lib/social";
import { cn } from "@/lib/utils";

/** "Refer a friend, you both get 7 days of Pro" with the invite link and progress. */
export function ReferralCard({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const track = useTrack();
  const refs = useQuery({ queryKey: ["my-referrals"], queryFn: fetchMyReferrals });
  const [copied, setCopied] = useState(false);
  const username = cachedUsername();
  const link = inviteUrl(track.slug);
  const r = refs.data;

  return (
    <section className={cn("card-pop p-5", className)} aria-label="Refer friends">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-xp/15 text-xp">
          <Icon name="redeem" filled className="text-[24px]" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold">
            Invite friends, get {REFERRAL_DAYS} days of Pro each
          </h2>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            When someone new joins with your link and answers their first 10 questions, you both
            unlock {REFERRAL_DAYS} days of Pro. Stacks up to 90 days.
          </p>
        </div>
      </div>

      {r ? (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Joined", value: r.invited },
            { label: "Qualified", value: r.qualified },
            { label: "Pro days", value: r.days_earned },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface-2/50 px-2 py-2">
              <p className="font-display text-xl font-bold tabular-nums">{s.value}</p>
              <p className="label-eyebrow">{s.label}</p>
            </div>
          ))}
        </div>
      ) : null}
      {r?.pending.length && !compact ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Almost there: {r.pending.slice(0, 4).join(", ")}
          {r.pending.length > 4 ? ` +${r.pending.length - 4}` : ""} still need 10 answers.
        </p>
      ) : null}

      {username ? (
        <div className="mt-4 flex gap-2">
          <p className="min-w-0 flex-1 truncate rounded-xl border-2 border-glass-line bg-surface-2/40 px-3 py-2 font-mono text-xs">
            {link}
          </p>
          <button
            type="button"
            className="btn-base btn-primary h-10 px-4 text-sm"
            onClick={() => {
              const text = `Join me on ${track.brand.a} ${track.brand.b}: we both get ${REFERRAL_DAYS} days of Pro. ${link}`;
              const done = () => {
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              };
              if (navigator.share) void navigator.share({ text, url: link }).catch(() => undefined);
              else void navigator.clipboard?.writeText(text).then(done);
            }}
          >
            <Icon name={copied ? "check" : "ios_share"} className="text-[18px]" />
            {copied ? "Copied" : "Invite"}
          </button>
        </div>
      ) : (
        <Link
          to="/$track/friends"
          params={{ track: track.slug }}
          className="btn-base btn-ghost mt-4 h-10 w-full text-sm"
        >
          Pick a @username to get your invite link
        </Link>
      )}
    </section>
  );
}
