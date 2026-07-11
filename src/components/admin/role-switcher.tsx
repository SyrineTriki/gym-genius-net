import { Link, useRouterState } from "@tanstack/react-router";
import { Shield, Crown, Dumbbell, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  { to: "/", label: "Admin", icon: Shield, active: "bg-teal/15 text-teal shadow-[0_0_16px_-4px_var(--teal-glow)]" },
  { to: "/super", label: "Super", icon: Crown, active: "bg-violet/15 text-violet shadow-[0_0_16px_-4px_var(--violet)]" },
  { to: "/coach", label: "Coach", icon: Dumbbell, active: "bg-amber/15 text-amber shadow-[0_0_16px_-4px_var(--amber)]" },
  { to: "/app", label: "Athlete", icon: Smartphone, active: "bg-emerald/15 text-emerald shadow-[0_0_16px_-4px_var(--emerald)]" },
] as const;

export function RoleSwitcher() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
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
  );
}
