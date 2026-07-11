import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { athleteStats, todayWorkout } from "@/lib/mock-data-extra";
import { Flame, Play, Zap, Droplet, Beef } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({ component: AthleteHome });

function AthleteHome() {
  const s = athleteStats;
  return (
    <PhoneFrame>
      <div className="space-y-4 p-4">
        {/* Greeting */}
        <div>
          <div className="text-xs text-muted-foreground">Good morning</div>
          <div className="text-2xl font-bold tracking-tight">Alex <span className="text-teal">👊</span></div>
        </div>

        {/* Streak hero */}
        <div className="glass-card relative overflow-hidden p-5">
          <div aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full bg-teal/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-teal to-violet shadow-[0_0_24px_-6px_var(--teal-glow)] animate-pulse-glow">
              <Flame className="size-7 text-primary-foreground" />
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">{s.streak}-day streak</div>
              <div className="text-xs text-muted-foreground">Longest ever · keep it burning</div>
            </div>
          </div>
        </div>

        {/* Today workout CTA */}
        <Link to="/app/workout" className="glass-card block p-4 transition-transform hover:scale-[1.02]">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-widest text-teal">Today · 62 min</div>
            <div className="grid size-9 place-items-center rounded-full bg-teal text-primary-foreground shadow-[0_0_16px_-2px_var(--teal-glow)]"><Play className="size-4 fill-current" /></div>
          </div>
          <div className="text-lg font-bold">{todayWorkout.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{todayWorkout.exercises.length} exercises · Push emphasis</div>
        </Link>

        {/* Rings */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Calories", value: s.calories, goal: s.calorieGoal, unit: "kcal", tone: "teal", icon: Zap },
            { label: "Protein", value: s.protein, goal: s.proteinGoal, unit: "g", tone: "violet", icon: Beef },
            { label: "Water", value: s.water, goal: s.waterGoal, unit: "L", tone: "emerald", icon: Droplet },
          ].map((r) => {
            const pct = Math.min(100, Math.round((r.value / r.goal) * 100));
            const Icon = r.icon;
            return (
              <div key={r.label} className="glass-card p-3 text-center">
                <div className="relative mx-auto size-16">
                  <svg viewBox="0 0 40 40" className="size-full -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="var(--surface-2)" strokeWidth="4" />
                    <circle cx="20" cy="20" r="16" fill="none" stroke={`var(--${r.tone})`} strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(pct / 100) * 100.5} 100.5`} className="drop-shadow-[0_0_6px_currentColor]" style={{ color: `var(--${r.tone})` }} />
                  </svg>
                  <Icon className={`absolute inset-0 m-auto size-4 text-${r.tone}`} />
                </div>
                <div className="mt-1 text-[11px] font-bold">{r.value}<span className="text-muted-foreground">/{r.goal}{r.unit}</span></div>
                <div className="text-[10px] text-muted-foreground">{r.label}</div>
              </div>
            );
          })}
        </div>

        {/* Weekly goal */}
        <div className="glass-card p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold">Weekly workouts</span>
            <span className="font-mono text-muted-foreground">{s.weeklyWorkouts}/{s.weeklyGoal}</span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: s.weeklyGoal }).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i < s.weeklyWorkouts ? "bg-gradient-to-r from-teal to-violet shadow-[0_0_8px_-2px_var(--teal-glow)]" : "bg-surface-2"}`} />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/app/scanner" className="glass-card p-3 text-xs font-semibold">📸 Scan food</Link>
          <Link to="/app/ai-coach" className="glass-card p-3 text-xs font-semibold">✨ Ask AI coach</Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
