import { createFileRoute } from "@tanstack/react-router";
import { SuperShell } from "@/components/super/super-shell";
import { Tilt3D } from "@/components/admin/tilt-3d";
import { CountUp } from "@/components/admin/count-up";
import { superKpis, tenants, systemServices, auditEvents } from "@/lib/mock-data-extra";
import { motion } from "motion/react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, Building, DollarSign, Flag, ShieldAlert, Sparkles } from "lucide-react";

export const Route = createFileRoute("/super")({ component: SuperOverview });

const iconMap = { tenants: Building, mrr: DollarSign, uptime: Activity, flags: Flag } as const;
const toneMap = {
  teal: "bg-teal/15 text-teal shadow-[0_0_24px_-8px_var(--teal-glow)]",
  violet: "bg-violet/15 text-violet shadow-[0_0_24px_-8px_var(--violet)]",
  emerald: "bg-emerald/15 text-emerald shadow-[0_0_24px_-8px_var(--emerald)]",
  amber: "bg-amber/15 text-amber shadow-[0_0_24px_-8px_var(--amber)]",
} as const;

const growthSeries = Array.from({ length: 12 }, (_, i) => ({
  m: `M${i + 1}`, tenants: 40 + i * 8 + Math.round(Math.sin(i) * 6), mrr: 60000 + i * 12000 + Math.round(Math.cos(i) * 5000),
}));

function SuperOverview() {
  return (
    <SuperShell title="Command Center">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {superKpis.map((k, i) => {
            const Icon = iconMap[k.id as keyof typeof iconMap];
            return (
              <motion.div key={k.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Tilt3D>
                  <div className="glass-card p-6">
                    <div className="flex items-start justify-between">
                      <div className={`grid size-11 place-items-center rounded-xl ${toneMap[k.tone]}`}>
                        <Icon className="size-5" strokeWidth={2.2} />
                      </div>
                      <span className="rounded-full bg-emerald/10 px-2.5 py-1 text-[11px] font-semibold text-emerald">{k.delta}</span>
                    </div>
                    <div className="mt-6 text-3xl font-bold tracking-tight">
                      <CountUp value={k.value} format={(v) => k.id === "mrr" ? `$${Math.round(v / 1000)}K` : k.id === "uptime" ? `${v.toFixed(2)}%` : Math.round(v).toLocaleString()} />
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
                <div className="text-sm font-semibold">Platform Growth</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Tenants vs MRR · 12mo</div>
              </div>
              <span className="rounded-full bg-violet/10 px-3 py-1 text-xs font-semibold text-violet">Trending +42%</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={growthSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--violet)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--violet)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--teal)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--teal)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" /><YAxis />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="tenants" stroke="var(--violet)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="mrr" stroke="var(--teal)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Sparkles className="size-4 text-violet" /> Ops Highlights</div>
            <ul className="space-y-3 text-sm">
              {[
                { t: "MRR growth outpacing plan by 22%", tone: "emerald" },
                { t: "AI Inference latency down 18% vs last week", tone: "teal" },
                { t: "3 tenants approaching seat limits", tone: "amber" },
                { t: "1 critical: failed auth spike detected", tone: "rose" },
              ].map((x, i) => (
                <li key={i} className="flex gap-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full bg-${x.tone} shadow-[0_0_8px_var(--${x.tone})]`} />
                  <span className="text-muted-foreground">{x.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-semibold">Top Tenants</div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">by MRR</span>
            </div>
            <div className="space-y-3">
              {tenants.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-3">
                  <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-violet/30 to-teal/20 text-xs font-bold">{t.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.plan} · {t.gyms} gyms</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">${(t.mrr / 1000).toFixed(1)}K</div>
                    <div className={`text-[11px] font-semibold ${t.status === "healthy" ? "text-emerald" : t.status === "warning" ? "text-amber" : "text-rose"}`}>{t.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><ShieldAlert className="size-4 text-rose" /> Recent Audit Events</div>
            <div className="space-y-2.5">
              {auditEvents.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface/40 p-2.5 text-xs">
                  <span className={`size-2 rounded-full ${e.severity === "critical" ? "bg-rose shadow-[0_0_8px_var(--rose)]" : e.severity === "warn" ? "bg-amber" : "bg-teal"}`} />
                  <span className="font-mono text-[10px] text-muted-foreground">{e.time}</span>
                  <span className="font-semibold">{e.action}</span>
                  <span className="ml-auto truncate text-muted-foreground">{e.target}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">System Health</div>
            <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">All systems mostly operational</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {systemServices.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-surface/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <span className={`size-2 rounded-full ${s.status === "operational" ? "bg-emerald shadow-[0_0_8px_var(--emerald)]" : "bg-amber shadow-[0_0_8px_var(--amber)]"}`} />
                </div>
                <div className="mt-3 flex items-baseline gap-4 text-xs text-muted-foreground">
                  <span><span className="font-mono text-foreground">{s.latency}ms</span> latency</span>
                  <span><span className="font-mono text-foreground">{s.uptime}%</span> uptime</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SuperShell>
  );
}
