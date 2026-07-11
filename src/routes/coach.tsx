import { createFileRoute } from "@tanstack/react-router";
import { CoachShell } from "@/components/coach/coach-shell";
import { Tilt3D } from "@/components/admin/tilt-3d";
import { CountUp } from "@/components/admin/count-up";
import { coachStats, coachRevenue, coachSessions, coachClients } from "@/lib/mock-data-extra";
import { DollarSign, Users, Calendar, Star, Sparkles } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "motion/react";

export const Route = createFileRoute("/coach")({ component: CoachDashboard });

const iconMap = { revenue: DollarSign, clients: Users, sessions: Calendar, rating: Star } as const;
const toneMap = {
  teal: "bg-teal/15 text-teal shadow-[0_0_24px_-8px_var(--teal-glow)]",
  violet: "bg-violet/15 text-violet shadow-[0_0_24px_-8px_var(--violet)]",
  emerald: "bg-emerald/15 text-emerald shadow-[0_0_24px_-8px_var(--emerald)]",
  amber: "bg-amber/15 text-amber shadow-[0_0_24px_-8px_var(--amber)]",
} as const;

function CoachDashboard() {
  return (
    <CoachShell title="Dashboard">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coachStats.map((k, i) => {
            const Icon = iconMap[k.id as keyof typeof iconMap];
            return (
              <motion.div key={k.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Tilt3D>
                  <div className="glass-card p-6">
                    <div className="flex items-start justify-between">
                      <div className={`grid size-11 place-items-center rounded-xl ${toneMap[k.tone]}`}><Icon className="size-5" /></div>
                      <span className="rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald">{k.delta}</span>
                    </div>
                    <div className="mt-6 text-3xl font-bold">
                      <CountUp value={k.value} format={(v) => k.id === "revenue" ? `$${(v / 1000).toFixed(1)}K` : k.id === "rating" ? v.toFixed(1) : Math.round(v).toString()} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{k.label}</div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="glass-card p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Weekly Revenue</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Last 8 weeks</div>
              </div>
              <span className="rounded-full bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">+38% MoM</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={coachRevenue}>
                <defs><linearGradient id="revG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--amber)" stopOpacity={0.55} /><stop offset="100%" stopColor="var(--amber)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" /><YAxis />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="value" stroke="var(--amber)" fill="url(#revG)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-amber" /> AI Insights</div>
            <ul className="space-y-3 text-sm">
              <li className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="text-xs font-semibold text-amber">Retention risk</div>
                <div className="mt-1 text-muted-foreground">Rhea Patel missed 2 sessions. Suggest a check-in.</div>
              </li>
              <li className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="text-xs font-semibold text-emerald">Growth opportunity</div>
                <div className="mt-1 text-muted-foreground">4 leads viewed your profile this week — reply within 2h converts 3×.</div>
              </li>
              <li className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="text-xs font-semibold text-teal">Program tip</div>
                <div className="mt-1 text-muted-foreground">Marcus is plateauing — try deload week or intensity swap.</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-6">
            <div className="mb-4 text-sm font-semibold">Upcoming Sessions</div>
            <div className="space-y-2.5">
              {coachSessions.slice(0, 4).map((s) => (
                <div key={s.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface/40 p-3">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber/30 to-rose/20 text-xs font-bold">{s.client.split(" ").map(w => w[0]).join("")}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{s.client}</div>
                    <div className="truncate text-xs text-muted-foreground">{s.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold">{s.time}</div>
                    <div className={`text-[10px] font-semibold ${s.mode === "in-person" ? "text-teal" : "text-violet"}`}>{s.mode}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 text-sm font-semibold">Top Clients</div>
            <div className="space-y-3">
              {coachClients.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">{c.avatar}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">{c.name}</div>
                      <div className="text-xs font-mono text-muted-foreground">🔥 {c.streak}d</div>
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
      </div>
    </CoachShell>
  );
}
