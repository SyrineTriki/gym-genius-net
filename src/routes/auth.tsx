import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Dumbbell, Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : "",
  }),
  component: AuthPage,
});

function sanitizeNext(next: string): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

function AuthPage() {
  const { next } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dest = sanitizeNext(next);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: dest });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: dest });
    });
    return () => sub.subscription.unsubscribe();
  }, [dest, navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(dest)}` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/auth?next=${encodeURIComponent(dest)}`,
    });
    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb animate-float top-[10%] left-[10%] h-[26rem] w-[26rem] bg-teal/20" />
        <div className="ambient-orb animate-float top-[60%] right-[5%] h-96 w-96 bg-violet/20" style={{ animationDelay: "-5s" }} />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="glass-card w-full p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet shadow-[0_0_24px_-6px_var(--teal-glow)]">
              <Dumbbell className="size-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">FitForge <span className="text-teal">AI</span></h1>
              <p className="text-xs text-muted-foreground">{mode === "signin" ? "Sign in to continue" : "Create your account"}</p>
            </div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/[0.03] disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="size-4"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3-3C17.2 1.8 14.8 1 12 1 7.4 1 3.4 3.6 1.5 7.4l3.5 2.7C6 7.3 8.7 5 12 5z"/><path fill="#34A853" d="M23 12c0-.8-.1-1.5-.2-2.2H12v4.5h6.2c-.3 1.4-1.1 2.6-2.4 3.4l3.7 2.9c2.1-2 3.5-5 3.5-8.6z"/><path fill="#4A90E2" d="M5 14.3c-.3-.8-.5-1.7-.5-2.6s.2-1.8.5-2.6L1.5 6.4C.5 8.1 0 10 0 12s.5 3.9 1.5 5.6L5 14.3z"/><path fill="#FBBC05" d="M12 23c3.2 0 5.9-1 7.9-2.8l-3.7-2.9c-1 .7-2.4 1.2-4.2 1.2-3.3 0-6-2.2-7-5.2L1.5 15.9C3.4 20.1 7.4 23 12 23z"/></svg>
            Continue with Google
          </button>

          <div className="relative my-4 text-center">
            <span className="relative z-10 bg-background px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">or email</span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm outline-none focus:border-teal/50"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm outline-none focus:border-teal/50"
            />
            {error && <p className="rounded-lg bg-rose/10 px-3 py-2 text-xs text-rose">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-teal to-violet text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--teal-glow)] disabled:opacity-50"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
