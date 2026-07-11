import { createFileRoute } from "@tanstack/react-router";
import { SuperShell } from "@/components/super/super-shell";
import { tenants } from "@/lib/mock-data-extra";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CreditCard, TrendingUp, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/super/billing")({ component: BillingPage });

const invoices = [
  { id: "INV-2401", tenant: "IronPulse Group", amount: 48000, status: "paid", date: "2026-07-01" },
  { id: "INV-2402", tenant: "Metro Fitness Co", amount: 21800, status: "paid", date: "2026-07-01" },
  { id: "INV-2403", tenant: "Olympia Chain", amount: 62400, status: "overdue", date: "2026-06-15" },
  { id: "INV-2404", tenant: "Harbor Fit Studio", amount: 1800, status: "pending", date: "2026-07-08" },
  { id: "INV-2405", tenant: "Peak Performance", amount: 14200, status: "paid", date: "2026-07-01" },
  { id: "INV-2406", tenant: "Northside Iron", amount: 900, status: "failed", date: "2026-07-03" },
];

const trend = Array.from({ length: 6 }, (_, i) => ({ m: ["Feb","Mar","Apr","May","Jun","Jul"][i], mrr: 118000 + i * 12000 + Math.round(Math.sin(i)*3000), churn: 4000 - i * 400 }));

function BillingPage() {
  return (
    <SuperShell title="Billing & Revenue">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "MRR", value: "$184.2K", delta: "+18%", icon: TrendingUp, tone: "emerald" },
            { label: "Outstanding", value: "$63.3K", delta: "2 overdue", icon: AlertCircle, tone: "amber" },
            { label: "Failed Charges", value: "$900", delta: "1 tenant", icon: CreditCard, tone: "rose" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div className={`grid size-11 place-items-center rounded-xl bg-${s.tone}/15 text-${s.tone} shadow-[0_0_24px_-8px_var(--${s.tone})]`}><Icon className="size-5" /></div>
                  <span className={`rounded-full bg-${s.tone}/10 px-2.5 py-1 text-[11px] font-semibold text-${s.tone}`}>{s.delta}</span>
                </div>
                <div className="mt-6 text-3xl font-bold">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-6">
          <div className="mb-4 text-sm font-semibold">Revenue vs Churn</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="m" /><YAxis />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="mrr" fill="var(--teal)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="churn" fill="var(--rose)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="border-b border-border p-5 text-sm font-semibold">Recent Invoices</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/40 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3">Invoice</th><th className="px-5 py-3">Tenant</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id} className="border-b border-border/40 hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-mono text-xs">{i.id}</td>
                  <td className="px-5 py-4 font-semibold">{i.tenant}</td>
                  <td className="px-5 py-4 font-bold">${i.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{i.date}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${i.status === "paid" ? "bg-emerald/15 text-emerald" : i.status === "overdue" ? "bg-amber/15 text-amber" : i.status === "failed" ? "bg-rose/15 text-rose" : "bg-teal/15 text-teal"}`}>{i.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperShell>
  );
}
