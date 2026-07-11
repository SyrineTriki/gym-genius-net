import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Dumbbell, Camera, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RoleSwitcher } from "@/components/admin/role-switcher";

const tabs = [
  { to: "/app", label: "Home", icon: Home },
  { to: "/app/workout", label: "Train", icon: Dumbbell },
  { to: "/app/scanner", label: "Scan", icon: Camera },
  { to: "/app/ai-coach", label: "AI", icon: Sparkles },
  { to: "/app/profile", label: "Me", icon: User },
] as const;

const sideLinks = [
  { to: "/app", label: "Home" },
  { to: "/app/workout", label: "Today's Workout" },
  { to: "/app/scanner", label: "Food Scanner" },
  { to: "/app/nutrition", label: "Nutrition" },
  { to: "/app/budget", label: "Budget Optimizer" },
  { to: "/app/progress", label: "Progress" },
  { to: "/app/ai-coach", label: "AI Coach" },
  { to: "/app/achievements", label: "Achievements" },
  { to: "/app/marketplace", label: "Marketplace" },
  { to: "/app/profile", label: "Profile" },
] as const;

export function PhoneFrame({ title, children, hideBottomBar = false }: { title?: string; children: ReactNode; hideBottomBar?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="ambient-orb animate-float top-[10%] left-[10%] h-[26rem] w-[26rem] bg-emerald/15" />
        <div className="ambient-orb animate-float top-[50%] right-[5%] h-96 w-96 bg-teal/20" style={{ animationDelay: "-5s" }} />
        <div className="ambient-orb animate-float top-[80%] left-[40%] h-72 w-72 bg-violet/15" style={{ animationDelay: "-9s" }} />
      </div>

      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/70 px-4 backdrop-blur-xl">
        <div className="text-sm font-bold tracking-tight">FitForge <span className="text-teal">Athlete</span></div>
        <div className="ml-auto"><RoleSwitcher /></div>
      </header>

      <div className="relative mx-auto flex max-w-6xl gap-6 px-4 py-8 lg:gap-8">
        {/* Left rail — page index */}
        <aside className="sticky top-24 hidden h-fit w-52 shrink-0 lg:block">
          <div className="glass-card p-3">
            <div className="px-2 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">App Screens</div>
            <div className="space-y-0.5">
              {sideLinks.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-xs font-medium transition-all",
                      active ? "bg-teal/15 text-teal shadow-[0_0_16px_-6px_var(--teal-glow)]" : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Phone frame */}
        <div className="mx-auto flex-1">
          <div className="relative mx-auto w-full max-w-[400px]">
            {/* Frame outer */}
            <div className="relative rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-3 shadow-[0_40px_120px_-30px_oklch(0_0_0_/0.9),0_0_60px_-20px_var(--teal-glow)]">
              {/* Screen */}
              <div className="relative overflow-hidden rounded-[2.4rem] bg-background">
                {/* Status bar */}
                <div className="flex items-center justify-between bg-black/30 px-6 py-2 text-[11px] font-semibold">
                  <span>9:41</span>
                  <span className="font-mono text-[10px] tracking-widest text-teal">FITFORGE</span>
                  <span className="flex items-center gap-1">
                    <span className="h-2.5 w-4 rounded-sm border border-white/60" />
                  </span>
                </div>
                {title && (
                  <div className="border-b border-border/60 px-5 py-3">
                    <h2 className="text-lg font-bold tracking-tight">{title}</h2>
                  </div>
                )}
                <div className={cn("relative min-h-[640px] overflow-hidden", !hideBottomBar && "pb-20")}>
                  {children}
                  {!hideBottomBar && (
                    <nav className="absolute inset-x-3 bottom-3 flex items-center justify-around rounded-2xl border border-white/10 bg-surface/80 px-2 py-2 backdrop-blur-xl shadow-[0_10px_40px_-10px_oklch(0_0_0_/0.6)]">
                      {tabs.map((t) => {
                        const active = pathname === t.to;
                        const Icon = t.icon;
                        return (
                          <Link
                            key={t.to}
                            to={t.to}
                            className={cn(
                              "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-semibold transition-all",
                              active ? "bg-teal/15 text-teal" : "text-muted-foreground",
                            )}
                          >
                            <Icon className="size-4" />
                            {t.label}
                          </Link>
                        );
                      })}
                    </nav>
                  )}
                </div>
              </div>
              {/* Notch */}
              <div className="pointer-events-none absolute left-1/2 top-3 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
