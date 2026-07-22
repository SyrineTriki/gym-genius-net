import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dumbbell, Loader2 } from "lucide-react";

type AuthorizationDetails = {
  client?: { name?: string; logo_uri?: string; redirect_uris?: string[] } | null;
  scope?: string;
  redirect_url?: string;
  redirect_to?: string;
} | null;

type AuthOAuth = {
  getAuthorizationDetails: (id: string) => Promise<{ data: AuthorizationDetails; error: Error | null }>;
  approveAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: Error | null }>;
  denyAuthorization: (id: string) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: Error | null }>;
};

function authOAuth(): AuthOAuth {
  return (supabase.auth as unknown as { oauth: AuthOAuth }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  beforeLoad: async ({ search, location }) => {
    if (!search.authorization_id) throw new Error("Missing authorization_id");
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      const next = location.pathname + location.searchStr;
      throw redirect({ to: "/auth", search: { next } });
    }
  },
  loader: async ({ location }) => {
    const authorizationId = new URLSearchParams(location.search).get("authorization_id")!;
    const { data, error } = await authOAuth().getAuthorizationDetails(authorizationId);
    if (error) throw error;
    const immediate = data?.redirect_url ?? data?.redirect_to;
    if (immediate && !data?.client) throw redirect({ href: immediate });
    return data;
  },
  component: Consent,
  errorComponent: ({ error }) => (
    <main className="mx-auto max-w-md p-8 text-center">
      <h1 className="text-lg font-bold">Authorization error</h1>
      <p className="mt-2 text-sm text-muted-foreground">{String((error as Error)?.message ?? error)}</p>
    </main>
  ),
});

function Consent() {
  const details = Route.useLoaderData();
  const { authorization_id } = Route.useSearch();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const { data, error } = approve
      ? await authOAuth().approveAuthorization(authorization_id)
      : await authOAuth().denyAuthorization(authorization_id);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  const clientName = details?.client?.name ?? "an app";
  const scope = details?.scope ?? "";

  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb animate-float top-[10%] left-[10%] h-[26rem] w-[26rem] bg-teal/20" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="glass-card w-full p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet">
              <Dumbbell className="size-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Connect {clientName}</h1>
              <p className="text-xs text-muted-foreground">to your FitForge AI account</p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-surface/40 p-4 text-sm">
            <p>
              <span className="font-semibold">{clientName}</span> will be able to call FitForge AI tools while acting as you.
            </p>
            <p className="text-xs text-muted-foreground">
              It can read your profile, list and log workouts, browse town food prices, and generate meal suggestions on your behalf. Your app data stays under FitForge's row-level security.
            </p>
            {scope && (
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Requested scopes: {scope}</p>
            )}
          </div>

          {error && <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-xs text-rose">{error}</p>}

          <div className="mt-6 flex gap-2">
            <button
              disabled={busy}
              onClick={() => decide(false)}
              className="flex h-10 flex-1 items-center justify-center rounded-lg border border-border bg-surface/60 text-sm font-semibold disabled:opacity-50"
            >
              Deny
            </button>
            <button
              disabled={busy}
              onClick={() => decide(true)}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-teal to-violet text-sm font-bold text-primary-foreground disabled:opacity-50"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
