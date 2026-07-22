import { Link, useRouterState } from "@tanstack/react-router";
import { Shield, Crown, Dumbbell, Smartphone, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const roles = [
  { to: "/", label: "Admin", icon: Shield, active: "bg-teal/15 text-teal shadow-[0_0_16px_-4px_var(--teal-glow)]" },
  { to: "/super", label: "Super", icon: Crown, active: "bg-violet/15 text-violet shadow-[0_0_16px_-4px_var(--violet)]" },
  { to: "/coach", label: "Coach", icon: Dumbbell, active: "bg-amber/15 text-amber shadow-[0_0_16px_-4px_var(--amber)]" },
  { to: "/app", label: "Athlete", icon: Smartphone, active: "bg-emerald/15 text-emerald shadow-[0_0_16px_-4px_var(--emerald)]" },
] as const;

export function RoleSwitcher() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-xl">
        {roles.map((r) => {
          const isActive =
            (r.to === "/" && pathname === "/") ||
            (r.to === "/" && !pathname.startsWith("/super") && !pathname.startsWith("/coach") && !pathname.startsWith("/app") && ["/users","/coaches","/gyms","/food","/analytics"].includes(pathname)) ||
            (r.to !== "/" && pathname.startsWith(r.to));
          const Icon = r.icon;
          return (
            <Link
              key={r.to}
              to={r.to}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                isActive ? r.active : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" />
              <span className="hidden sm:inline">{r.label}</span>
            </Link>
          );
        })}
      </div>
      {user ? (
        <button
          onClick={signOut}
          title={user.email ?? "Signed in"}
          className="flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 text-xs font-semibold text-teal transition-colors hover:bg-teal/15"
        >
          <UserIcon className="size-3.5" />
          <span className="hidden md:inline max-w-[10rem] truncate">{user.email}</span>
          <LogOut className="size-3.5 opacity-60" />
        </button>
      ) : (
        <Link
          to="/auth"
          className="flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogIn className="size-3.5" />
          <span className="hidden sm:inline">Sign in</span>
        </Link>
      )}
    </div>
  );
}
