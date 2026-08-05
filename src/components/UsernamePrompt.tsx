import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const SKIP_KEY = "padida.username-prompt.skipped";

/**
 * Asks a freshly signed-up user for the username we greet them with ("Dr. {username}").
 * Shows only when the signed-in user has no username saved on their profile yet.
 */
export function UsernamePrompt() {
  const { user, displayName, profileLoaded, refreshProfile } = useAuth();
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skipped, setSkipped] = useState(true);

  useEffect(() => {
    setSkipped(
      typeof window !== "undefined" && window.localStorage.getItem(SKIP_KEY) === "1",
    );
  }, []);

  const needsName = Boolean(user) && profileLoaded && !displayName.trim() && !skipped;
  if (!needsName) return null;

  const save = async () => {
    const username = value.trim();
    if (!username || !user) return;
    setBusy(true);
    setError(null);
    const { error: err } = await supabase
      .from("profiles")
      .upsert({ id: user.id, display_name: username }, { onConflict: "id" });
    setBusy(false);
    if (err) {
      setError("Could not save that. Try again.");
      return;
    }
    await refreshProfile();
  };

  const skip = () => {
    window.localStorage.setItem(SKIP_KEY, "1");
    setSkipped(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="card-surface w-full max-w-sm p-5">
        <p className="label-eyebrow">One quick thing</p>
        <h2 className="mt-1 text-2xl">What should we call you?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll greet you as <span className="font-semibold text-foreground">
            Dr. {value.trim() || "…"}
          </span> across the app.
        </p>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void save();
          }}
          autoFocus
          placeholder="Username, e.g. Rahul"
          maxLength={40}
          className="mt-4 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
        />
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => void save()}
            disabled={busy || !value.trim()}
            className="btn-base btn-primary flex-1 text-sm disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save"}
          </button>
          <button onClick={skip} className="btn-base btn-ghost text-sm">
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
