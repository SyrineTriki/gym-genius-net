import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, CalendarDays, ClipboardList, MessageSquare, Dumbbell, Bell } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { RoleSwitcher } from "@/components/admin/role-switcher";

const nav = [
  { to: "/coach", label: "Dashboard", icon: LayoutDashboard },
  { to: "/coach/clients", label: "Clients", icon: Users },
  { to: "/coach/sessions", label: "Sessions", icon: CalendarDays },
  { to: "/coach/programs", label: "Programs", icon: ClipboardList },
  { to: "/coach/messages", label: "Messages", icon: MessageSquare },
] as const;

export function CoachShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb animate-float top-[-5%] right-[-5%] h-[28rem] w-[28rem] bg-amber/20" />
        <div className="ambient-orb animate-float top-[60%] left-[-8%] h-96 w-96 bg-teal/15" style={{ animationDelay: "-6s" }} />
      </div>
      <div className="relative flex min-h-screen w-full">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl md:flex md:flex-col">
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-amber to-rose shadow-[0_8px_24px_-8px_var(--amber)] animate-pulse-glow">
              <Dumbbell className="size-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">FitForge Coach</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-amber">Trainer Console</div>
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
                    active ? "bg-gradient-to-r from-amber/20 to-transparent text-amber" : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="coach-nav-active"
                      className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-amber shadow-[0_0_12px_var(--amber)]"
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
              <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold text-primary-foreground">EK</div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold">Elena Kostas</div>
                <div className="truncate font-mono text-[10px] uppercase tracking-widest text-amber">NASM-CPT · 4.9★</div>
              </div>
              <span className="size-2 rounded-full bg-emerald shadow-[0_0_8px_var(--emerald)]" />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-xl lg:px-8">
            <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
            <div className="ml-auto flex items-center gap-3">
              <RoleSwitcher />
              <button className="relative grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-foreground">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-amber shadow-[0_0_6px_var(--amber)]" />
              </button>
            </div>
          </header>
          <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
