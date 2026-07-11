import { Link, useRouterState } from "@tanstack/react-router";
import { Crown, Building, CreditCard, ScrollText, Flag, Server, Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { RoleSwitcher } from "@/components/admin/role-switcher";

const nav = [
  { to: "/super", label: "Command Center", icon: Crown },
  { to: "/super/tenants", label: "Tenants", icon: Building },
  { to: "/super/billing", label: "Billing", icon: CreditCard },
  { to: "/super/audit", label: "Audit Log", icon: ScrollText },
  { to: "/super/features", label: "Feature Flags", icon: Flag },
  { to: "/super/system", label: "System Health", icon: Server },
] as const;

export function SuperShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb animate-float top-[-10%] left-[20%] h-[30rem] w-[30rem] bg-violet/25" />
        <div className="ambient-orb animate-float top-[50%] right-[-8%] h-96 w-96 bg-teal/15" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="relative flex min-h-screen w-full">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col">
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violet to-teal shadow-[0_8px_24px_-8px_var(--violet)] animate-pulse-glow">
              <Crown className="size-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">FitForge AI</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-violet">Super Admin</div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {nav.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    active ? "bg-gradient-to-r from-violet/20 to-transparent text-violet" : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="super-nav-active"
                      className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-violet shadow-[0_0_12px_var(--violet)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-2.5">
              <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet to-rose text-xs font-bold text-primary-foreground">MR</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold">Marcus Rhodes</div>
                <div className="truncate font-mono text-[10px] uppercase tracking-widest text-violet">Root · Owner</div>
              </div>
              <span className="size-2 rounded-full bg-violet shadow-[0_0_8px_var(--violet)]" />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-xl lg:px-8">
            <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
            <div className="ml-auto flex items-center gap-3">
              <RoleSwitcher />
              <div className="relative hidden max-w-xs md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input type="search" placeholder="Search tenants…" className="h-9 w-56 rounded-full border border-border bg-surface/60 pl-9 pr-4 text-sm outline-none focus:border-violet/50" />
              </div>
              <button className="relative grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-foreground">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-violet shadow-[0_0_6px_var(--violet)]" />
              </button>
            </div>
          </header>
          <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
