import { Link, useRouterState } from "@tanstack/react-router";
import { RoleSwitcher } from "@/components/admin/role-switcher";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Apple,
  BarChart3,
  Bell,
  Search,
  Settings,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/users", label: "Users", icon: Users },
  { to: "/coaches", label: "Coaches", icon: UserCheck },
  { to: "/gyms", label: "Gyms", icon: Building2 },
  { to: "/food", label: "Food Database", icon: Apple },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
] as const;

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen">
      {/* Ambient 3D orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb animate-float top-[-10%] left-[-5%] h-96 w-96 bg-teal/20" />
        <div className="ambient-orb animate-float top-[40%] right-[-8%] h-[28rem] w-[28rem] bg-violet/20" style={{ animationDelay: "-4s" }} />
        <div className="ambient-orb top-[80%] left-[30%] h-72 w-72 bg-amber/10 animate-float" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="relative flex min-h-screen w-full">
        <Sidebar pathname={pathname} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar title={title} />
          <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="relative grid size-11 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet shadow-[0_8px_24px_-8px_var(--teal-glow)] animate-pulse-glow">
          <Zap className="size-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold tracking-tight">FitForge AI</div>
          <div className="truncate font-mono text-[10px] uppercase tracking-widest text-teal">Admin Panel</div>
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
                active
                  ? "bg-gradient-to-r from-teal/15 to-transparent text-teal"
                  : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-teal shadow-[0_0_12px_var(--teal-glow)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-2.5">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-violet text-xs font-bold text-primary-foreground">
            AJ
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold">Alex Johnson</div>
            <div className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Super Admin
            </div>
          </div>
          <span className="size-2 shrink-0 rounded-full bg-emerald shadow-[0_0_8px_var(--emerald)]" />
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-xl lg:px-8">
      <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
      <div className="ml-auto"><RoleSwitcher /></div>

      <div className="relative ml-auto hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search users, gyms, foods…"
          className="h-9 w-full rounded-full border border-border bg-surface/60 pl-9 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-teal/50 focus:bg-surface focus:shadow-[0_0_0_4px_oklch(0.82_0.14_180_/_0.1)]"
        />
      </div>

      <button className="relative grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground">
        <Bell className="size-4" />
        <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-teal shadow-[0_0_6px_var(--teal-glow)]" />
      </button>
      <button className="grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground transition-colors hover:text-foreground">
        <Settings className="size-4" />
      </button>
    </header>
  );
}
