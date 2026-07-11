import { createFileRoute } from "@tanstack/react-router";
import { SuperShell } from "@/components/super/super-shell";
import { systemServices } from "@/lib/mock-data-extra";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity, Cpu, HardDrive, Zap } from "lucide-react";

export const Route = createFileRoute("/super/system")({ component: SystemPage });

const latencyData = Array.from({ length: 24 }, (_, i) => ({ t: `${i}h`, api: 40 + Math.round(Math.sin(i / 3) * 12 + Math.random() * 8), ai: 350 + Math.round(Math.cos(i / 4) * 60 + Math.random() * 40) }));

function SystemPage() {
  return (
    <SuperShell title="System Health">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "CPU", value: "42%", icon: Cpu, tone: "teal" },
            { label: "Memory", value: "68%", icon: HardDrive, tone: "violet" },
            { label: "Requests/s", value: "1,842", icon: Zap, tone: "amber" },
            { label: "P99 Latency", value: "128ms", icon: Activity, tone: "emerald" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass-card p-5">
                <div className="flex items-center gap-3">
                  <div className={`grid size-10 place-items-center rounded-xl bg-${s.tone}/15 text-${s.tone}`}><Icon className="size-4" /></div>
                  <div>
                    <div className="text-xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-6">
          <div className="mb-4 text-sm font-semibold">Latency (24h)</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" /><YAxis />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="api" stroke="var(--teal)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ai" stroke="var(--violet)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <div className="mb-4 text-sm font-semibold">Services</div>
          <div className="space-y-2">
            {systemServices.map((s) => (
              <div key={s.name} className="grid grid-cols-[1fr_100px_100px_120px] items-center gap-4 rounded-lg border border-border bg-surface/40 p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <span className={`size-2 rounded-full ${s.status === "operational" ? "bg-emerald shadow-[0_0_8px_var(--emerald)]" : "bg-amber shadow-[0_0_8px_var(--amber)]"}`} />
                  {s.name}
                </div>
                <div className="font-mono text-xs text-muted-foreground">{s.latency}ms</div>
                <div className="font-mono text-xs text-muted-foreground">{s.uptime}%</div>
                <span className={`justify-self-end rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${s.status === "operational" ? "bg-emerald/15 text-emerald" : "bg-amber/15 text-amber"}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SuperShell>
  );
}
