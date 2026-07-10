import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { Tilt3D } from "@/components/admin/tilt-3d";
import { CountUp } from "@/components/admin/count-up";
import { kpis, growthData, pendingActions, membershipMix, engagementData } from "@/lib/mock-data";
import {
  Users,
  UserCheck,
  Building2,
  DollarSign,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Bar,
  BarChart,
} from "recharts";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: OverviewPage,
});

const iconMap = {
  users: Users,
  coach: UserCheck,
  gym: Building2,
  revenue: DollarSign,
  warn: AlertTriangle,
  chat: MessageSquare,
} as const;

const toneMap = {
  teal: { text: "text-teal", ring: "from-teal/25", icon: "bg-teal/15 text-teal", glow: "shadow-[0_0_24px_-8px_var(--teal-glow)]" },
  violet: { text: "text-violet", ring: "from-violet/25", icon: "bg-violet/15 text-violet", glow: "shadow-[0_0_24px_-8px_var(--violet)]" },
  emerald: { text: "text-emerald", ring: "from-emerald/25", icon: "bg-emerald/15 text-emerald", glow: "shadow-[0_0_24px_-8px_var(--emerald)]" },
  amber: { text: "text-amber", ring: "from-amber/25", icon: "bg-amber/15 text-amber", glow: "shadow-[0_0_24px_-8px_var(--amber)]" },
  rose: { text: "text-rose", ring: "from-rose/25", icon: "bg-rose/15 text-rose", glow: "shadow-[0_0_24px_-8px_var(--rose)]" },
} as const;

function OverviewPage() {
  return (
    <AdminShell title="Overview">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* KPI grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((k, i) => {
            const Icon = iconMap[k.icon as keyof typeof iconMap];
            const tone = toneMap[k.tone];
            const TrendIcon = k.trend === "down" ? TrendingDown : TrendingUp;
            return (
              <motion.div
                key={k.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Tilt3D>
                  <div className="glass-card group relative overflow-hidden p-6">
                    <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tone.ring} via-transparent to-transparent`} />
                    <div className="flex items-start justify-between">
                      <div className={`grid size-11 place-items-center rounded-xl ${tone.icon} ${tone.glow}`}>
                        <Icon className="size-5" strokeWidth={2.2} />
                      </div>
                      <div
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          k.trend === "down" ? "bg-rose/10 text-rose" : k.trend === "flat" ? "bg-amber/10 text-amber" : "bg-emerald/10 text-emerald"
                        }`}
                      >
                        <TrendIcon className="size-3" />
                        {k.delta}
                      </div>
                    </div>
                    <div className="mt-6">
                      <div className="text-3xl font-bold tracking-tight">
                        <CountUp
                          value={k.value}
                          format={(v) =>
                            k.id === "revenue"
                              ? `$${Math.round(v / 1000)}K`
                              : Math.round(v).toLocaleString()
                          }
                        />
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{k.label}</div>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>

        {/* Chart + Pending */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-2 glass-card overflow-hidden p-6"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold">Platform Growth</h2>
                <p className="text-xs text-muted-foreground">User acquisition · last 6 months</p>
              </div>
              <div className="flex gap-1 rounded-full border border-border bg-surface/60 p-1 text-[11px] font-semibold">
                <button className="rounded-full bg-teal/15 px-3 py-1 text-teal">6M</button>
                <button className="rounded-full px-3 py-1 text-muted-foreground">1Y</button>
                <button className="rounded-full px-3 py-1 text-muted-foreground">All</button>
              </div>
            </div>
            <div className="h-72 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-teal)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--color-teal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={48} />
                  <Tooltip
                    cursor={{ stroke: "var(--color-teal)", strokeOpacity: 0.3 }}
                    contentStyle={{
                      background: "oklch(0.22 0.028 240)",
                      border: "1px solid oklch(0.3 0.03 235 / 0.6)",
                      borderRadius: 12,
                      boxShadow: "0 12px 40px -12px oklch(0 0 0 / 0.6)",
                    }}
                    labelStyle={{ color: "oklch(0.9 0.01 220)", fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="var(--color-teal)"
                    strokeWidth={2.5}
                    fill="url(#tealGrad)"
                    dot={{ fill: "var(--color-teal)", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "var(--color-background)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass-card p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-bold">Pending Actions</h2>
              <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber">
                {pendingActions.reduce((s, a) => s + a.count, 0)} open
              </span>
            </div>
            <ul className="space-y-2.5">
              {pendingActions.map((a) => {
                const tone = toneMap[a.tone];
                return (
                  <li
                    key={a.id}
                    className="group flex cursor-pointer items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3 transition-all hover:border-teal/40 hover:bg-surface"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid size-8 place-items-center rounded-lg ${tone.icon}`}>
                        <UserCheck className="size-3.5" />
                      </span>
                      <span className="text-sm font-medium">{a.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${tone.icon}`}>{a.count}</span>
                      <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Second row: engagement + membership mix + AI card */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="glass-card p-6"
          >
            <h2 className="text-base font-bold">24h Engagement</h2>
            <p className="mb-4 text-xs text-muted-foreground">Active athletes right now</p>
            <div className="h-48 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} interval={5} fontSize={10} />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "oklch(1 0 0 / 0.03)" }}
                    contentStyle={{
                      background: "oklch(0.22 0.028 240)",
                      border: "1px solid oklch(0.3 0.03 235 / 0.6)",
                      borderRadius: 12,
                    }}
                  />
                  <Bar dataKey="active" radius={[4, 4, 0, 0]}>
                    {engagementData.map((_, i) => (
                      <Cell key={i} fill={i === 14 ? "var(--color-teal)" : "oklch(0.3 0.05 200 / 0.7)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="glass-card p-6"
          >
            <h2 className="text-base font-bold">Membership Mix</h2>
            <p className="mb-4 text-xs text-muted-foreground">Distribution across tiers</p>
            <div className="flex items-center gap-4">
              <div className="h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={membershipMix}
                      dataKey="value"
                      innerRadius={44}
                      outerRadius={72}
                      paddingAngle={4}
                      stroke="var(--color-background)"
                      strokeWidth={2}
                    >
                      {membershipMix.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="flex-1 space-y-2">
                {membershipMix.map((m) => (
                  <li key={m.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm" style={{ background: m.fill }} />
                      <span className="font-medium">{m.name}</span>
                    </span>
                    <span className="font-mono text-muted-foreground">{m.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Tilt3D>
              <div className="glass-card relative overflow-hidden p-6">
                <div className="absolute -right-8 -top-8 size-40 rounded-full bg-teal/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-violet/20 blur-3xl" />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-teal to-violet animate-pulse-glow">
                      <Sparkles className="size-4 text-primary-foreground" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-teal">AI Insight</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    Coach demand up <span className="font-bold text-teal">34%</span> in Brooklyn & Chicago. Consider
                    fast-tracking <span className="font-bold text-foreground">4 pending verifications</span> to meet
                    weekend demand.
                  </p>
                  <button className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.03]">
                    Review Queue
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </div>
    </AdminShell>
  );
}
