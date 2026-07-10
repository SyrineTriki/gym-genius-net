import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { regionData, growthData } from "@/lib/mock-data";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Activity, Server, Cpu, Shield } from "lucide-react";
import { Tilt3D } from "@/components/admin/tilt-3d";
import { CountUp } from "@/components/admin/count-up";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

const radarData = [
  { metric: "Retention", A: 92 },
  { metric: "Engagement", A: 78 },
  { metric: "Revenue", A: 84 },
  { metric: "AI Accuracy", A: 96 },
  { metric: "Uptime", A: 99 },
  { metric: "Support", A: 71 },
];

const revenueSeries = growthData.map((g) => ({ ...g, previous: Math.round(g.revenue * 0.7) }));

function AnalyticsPage() {
  return (
    <AdminShell title="Analytics">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* System health strip */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "API Uptime", value: 99.98, suffix: "%", icon: Server, tone: "emerald" },
            { label: "Avg Latency", value: 142, suffix: "ms", icon: Activity, tone: "teal" },
            { label: "AI Inference", value: 84, suffix: "ms", icon: Cpu, tone: "violet" },
            { label: "Threats Blocked", value: 2841, suffix: "", icon: Shield, tone: "amber" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Tilt3D>
                  <div className="glass-card flex items-center gap-4 p-5">
                    <div className={`grid size-11 place-items-center rounded-xl bg-${s.tone}/15 text-${s.tone}`}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        <CountUp value={s.value} format={(v) => (s.value % 1 !== 0 ? v.toFixed(2) : Math.round(v).toLocaleString())} />
                        <span className="ml-0.5 text-xs text-muted-foreground">{s.suffix}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Revenue comparison */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold">Revenue vs previous period</h2>
                <p className="text-xs text-muted-foreground">MRR growth over 6 months</p>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <Dot color="var(--color-teal)" label="Current" />
                <Dot color="oklch(0.5 0.02 240)" label="Previous" />
              </div>
            </div>
            <div className="h-72 -mx-2">
              <ResponsiveContainer>
                <AreaChart data={revenueSeries} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rev1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-teal)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-teal)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rev2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.5 0.02 240)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.5 0.02 240)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={56} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.22 0.028 240)",
                      border: "1px solid oklch(0.3 0.03 235 / 0.6)",
                      borderRadius: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="previous" stroke="oklch(0.5 0.02 240)" strokeWidth={2} fill="url(#rev2)" />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-teal)" strokeWidth={2.5} fill="url(#rev1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="text-base font-bold">Platform Health</h2>
            <p className="mb-4 text-xs text-muted-foreground">6-axis performance snapshot</p>
            <div className="h-72">
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.3 0.03 235 / 0.4)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.68 0.03 230)", fontSize: 10 }} />
                  <Radar dataKey="A" stroke="var(--color-teal)" strokeWidth={2} fill="var(--color-teal)" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Regional breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <h2 className="text-base font-bold">Regional Breakdown</h2>
            <p className="mb-4 text-xs text-muted-foreground">Users & revenue by region</p>
            <div className="h-72 -mx-2">
              <ResponsiveContainer>
                <BarChart data={regionData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="region" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="l" tickLine={false} axisLine={false} width={56} />
                  <YAxis yAxisId="r" orientation="right" tickLine={false} axisLine={false} width={56} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.22 0.028 240)",
                      border: "1px solid oklch(0.3 0.03 235 / 0.6)",
                      borderRadius: 12,
                    }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="l" dataKey="users" fill="var(--color-teal)" radius={[6, 6, 0, 0]} />
                  <Bar yAxisId="r" dataKey="revenue" fill="var(--color-violet)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Security events */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold">Security Events</h2>
              <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald">
                Nominal
              </span>
            </div>
            <ul className="space-y-3">
              {[
                { level: "info", msg: "OAuth token rotated", time: "12s", tone: "text-teal" },
                { level: "warn", msg: "Rate limit hit — coach API", time: "4m", tone: "text-amber" },
                { level: "info", msg: "AI model v2.4 deployed", time: "1h", tone: "text-teal" },
                { level: "high", msg: "Failed login burst blocked", time: "2h", tone: "text-rose" },
                { level: "info", msg: "Backup completed 12.4 GB", time: "5h", tone: "text-emerald" },
              ].map((e, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs">
                  <span className={`mt-1 size-1.5 shrink-0 rounded-full ${
                    e.level === "high" ? "bg-rose shadow-[0_0_8px_var(--rose)]" :
                    e.level === "warn" ? "bg-amber" : "bg-teal"
                  }`} />
                  <span className="flex-1">{e.msg}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{e.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Live requests strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Live API Traffic</h2>
              <p className="text-xs text-muted-foreground">Requests / second, last 6 minutes</p>
            </div>
            <span className="flex items-center gap-2 text-xs text-emerald">
              <span className="size-1.5 rounded-full bg-emerald animate-pulse-glow" /> live
            </span>
          </div>
          <div className="h-40 -mx-2">
            <ResponsiveContainer>
              <LineChart data={Array.from({ length: 60 }, (_, i) => ({ t: i, v: 800 + Math.sin(i / 4) * 200 + Math.random() * 100 }))}>
                <XAxis hide dataKey="t" />
                <YAxis hide />
                <Line type="monotone" dataKey="v" stroke="var(--color-teal)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </AdminShell>
  );
}

function Dot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
