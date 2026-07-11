import { createFileRoute } from "@tanstack/react-router";
import { CoachShell } from "@/components/coach/coach-shell";
import { coachClients } from "@/lib/mock-data-extra";
import { Search, Plus, MessageSquare, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/coach/clients")({ component: ClientsPage });

function ClientsPage() {
  return (
    <CoachShell title="Clients">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="glass-card p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search clients…" className="h-10 w-full rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none focus:border-amber/50" />
            </div>
            {["All 38", "On-track 32", "At-risk 4", "New 2"].map((f, i) => (
              <button key={f} className={`rounded-full px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-amber/15 text-amber" : "border border-border text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
            <button className="ml-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber to-rose px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--amber)]"><Plus className="size-4" /> Invite Client</button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/40 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3">Client</th><th className="px-5 py-3">Plan</th><th className="px-5 py-3">Progress</th><th className="px-5 py-3">Streak</th><th className="px-5 py-3">Next</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {coachClients.map((c) => (
                <tr key={c.id} className="border-b border-border/40 hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">{c.avatar}</div>
                      <div className="font-semibold">{c.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">{c.plan}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-amber to-teal" style={{ width: `${c.progress}%` }} />
                      </div>
                      <span className="font-mono text-xs">{c.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs">🔥 {c.streak}d</td>
                  <td className="px-5 py-4 text-xs">{c.next}</td>
                  <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${c.status === "on-track" ? "bg-emerald/15 text-emerald" : "bg-rose/15 text-rose"}`}>{c.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground"><MessageSquare className="size-4" /></button>
                      <button className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground"><MoreHorizontal className="size-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CoachShell>
  );
}
