import { createFileRoute, Link } from "@tanstack/react-router";
import { CoachPhoneFrame } from "@/components/coach/coach-phone-frame";
import { CountUp } from "@/components/admin/count-up";
import { coachStats, coachRevenue, coachSessions, coachClients } from "@/lib/mock-data-extra";
import { DollarSign, Users, Calendar, Star, Sparkles, ChevronRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/coach")({ component: CoachDashboard });

const iconMap = { revenue: DollarSign, clients: Users, sessions: Calendar, rating: Star } as const;
const toneMap = {
  teal: "bg-teal/15 text-teal",
  violet: "bg-violet/15 text-violet",
  emerald: "bg-emerald/15 text-emerald",
  amber: "bg-amber/15 text-amber",
} as const;

function CoachDashboard() {
  return (
    <CoachPhoneFrame>
      <div className="space-y-4 p-4">
        <div>
          <div className="text-xs text-muted-foreground">Good morning</div>
          <div className="text-2xl font-bold tracking-tight">Elena <span className="text-amber">💪</span></div>
          <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-amber">NASM-CPT · 4.9★</div>
        </div>

        {/* Revenue hero */}
        <div className="glass-card relative overflow-hidden p-5">
          <div aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full bg-amber/30 blur-3xl" />
          <div className="relative">
            <div className="text-xs text-muted-foreground">This month</div>
            <div className="mt-1 text-3xl font-bold gradient-text">$<CountUp value={12400} format={(v) => (v / 1000).toFixed(1) + "K"} /></div>
            <div className="mt-0.5 text-xs text-emerald">+22% vs last month</div>
            <div className="mt-3 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={coachRevenue}>
                  <defs><linearGradient id="rH" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--amber)" stopOpacity={0.6} /><stop offset="100%" stopColor="var(--amber)" stopOpacity={0} /></linearGradient></defs>
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11 }} />
                  <Area type="monotone" dataKey="value" stroke="var(--amber)" fill="url(#rH)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 gap-3">
          {coachStats.slice(1).map((k) => {
            const Icon = iconMap[k.id as keyof typeof iconMap];
            return (
              <div key={k.id} className="glass-card p-3">
                <div className={`grid size-8 place-items-center rounded-lg ${toneMap[k.tone]}`}><Icon className="size-4" /></div>
                <div className="mt-2 text-xl font-bold">{k.display}</div>
                <div className="text-[10px] text-muted-foreground">{k.label}</div>
                <div className="mt-0.5 text-[10px] font-semibold text-emerald">{k.delta}</div>
              </div>
            );
          })}
        </div>

        {/* Next session */}
        <Link to="/coach/sessions" className="glass-card block p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-widest text-amber">Next session</div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">SL</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold">{coachSessions[0].client}</div>
              <div className="truncate text-xs text-muted-foreground">{coachSessions[0].type}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-amber">{coachSessions[0].time.replace("Today ", "")}</div>
              <div className="text-[10px] text-muted-foreground">{coachSessions[0].duration}min</div>
            </div>
          </div>
        </Link>

        {/* AI insights */}
        <div className="glass-card p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-amber" /> AI Insights</div>
          <ul className="space-y-2 text-xs">
            <li className="rounded-lg border border-border bg-surface/40 p-2.5">
              <div className="font-semibold text-amber">Retention risk</div>
              <div className="mt-0.5 text-muted-foreground">Rhea Patel missed 2 sessions.</div>
            </li>
            <li className="rounded-lg border border-border bg-surface/40 p-2.5">
              <div className="font-semibold text-emerald">Growth</div>
              <div className="mt-0.5 text-muted-foreground">4 leads viewed your profile.</div>
            </li>
          </ul>
        </div>

        {/* Top clients */}
        <div className="glass-card p-4">
          <div className="mb-3 text-sm font-semibold">Top Clients</div>
          <div className="space-y-3">
            {coachClients.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-[10px] font-bold">{c.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="truncate text-xs font-semibold">{c.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">🔥{c.streak}d</div>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber to-teal" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CoachPhoneFrame>
  );
}
