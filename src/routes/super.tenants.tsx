import { createFileRoute } from "@tanstack/react-router";
import { SuperShell } from "@/components/super/super-shell";
import { tenants } from "@/lib/mock-data-extra";
import { Search, Plus, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/super/tenants")({ component: TenantsPage });

function TenantsPage() {
  return (
    <SuperShell title="Tenants">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="glass-card p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search tenants…" className="h-10 w-full rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none focus:border-violet/50" />
            </div>
            {["All", "Enterprise", "Growth", "Starter"].map((f, i) => (
              <button key={f} className={`rounded-full px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-violet/15 text-violet" : "border border-border text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
            <button className="ml-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet to-teal px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--violet)]">
              <Plus className="size-4" /> Onboard Tenant
            </button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/40 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3">Tenant</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Gyms</th>
                <th className="px-5 py-3">MRR</th>
                <th className="px-5 py-3">Health</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {tenants.map((t) => (
                <tr key={t.id} className="border-b border-border/40 transition-colors hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-violet/30 to-teal/20 text-xs font-bold">{t.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{t.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.plan === "Enterprise" ? "bg-violet/15 text-violet" : t.plan === "Growth" ? "bg-teal/15 text-teal" : "bg-amber/15 text-amber"}`}>{t.plan}</span></td>
                  <td className="px-5 py-4 font-mono">{t.gyms}</td>
                  <td className="px-5 py-4 font-bold">${(t.mrr / 1000).toFixed(1)}K</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-2">
                        <div className={`h-full rounded-full ${t.health > 90 ? "bg-emerald" : t.health > 75 ? "bg-amber" : "bg-rose"}`} style={{ width: `${t.health}%` }} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{t.health}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${t.status === "healthy" ? "text-emerald" : t.status === "warning" ? "text-amber" : "text-rose"}`}><span className={`size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]`} />{t.status}</span></td>
                  <td className="px-5 py-4"><button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperShell>
  );
}
