import { createFileRoute } from "@tanstack/react-router";
import { SuperShell } from "@/components/super/super-shell";
import { auditEvents } from "@/lib/mock-data-extra";
import { Search, Download, Filter } from "lucide-react";

export const Route = createFileRoute("/super/audit")({ component: AuditPage });

const extended = [
  ...auditEvents,
  { id: "A7", actor: "riley@fitforge.app", action: "user.deleted", target: "U-10902 Sasha Vane", severity: "warn" as const, time: "2d ago" },
  { id: "A8", actor: "system", action: "migration.applied", target: "20260701_add_flags", severity: "info" as const, time: "3d ago" },
  { id: "A9", actor: "elena@coach.io", action: "session.exported", target: "clients_report.csv", severity: "info" as const, time: "3d ago" },
  { id: "A10", actor: "unknown", action: "auth.failed", target: "root@fitforge.app", severity: "critical" as const, time: "4d ago" },
];

function AuditPage() {
  return (
    <SuperShell title="Audit Log">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="glass-card p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search actor, action, target…" className="h-10 w-full rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none focus:border-violet/50" />
            </div>
            {["All", "Critical", "Warn", "Info"].map((f, i) => (
              <button key={f} className={`rounded-full px-4 py-2 text-xs font-semibold ${i === 0 ? "bg-violet/15 text-violet" : "border border-border text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
            <button className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2 text-xs font-semibold"><Filter className="size-3.5" />Filters</button>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-4 py-2 text-xs font-semibold"><Download className="size-3.5" />Export</button>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-border">
            {extended.map((e) => (
              <div key={e.id} className="grid grid-cols-[16px_120px_1fr_1fr_100px] items-center gap-4 px-5 py-4 text-sm transition-colors hover:bg-white/[0.02]">
                <span className={`size-2 rounded-full ${e.severity === "critical" ? "bg-rose shadow-[0_0_10px_var(--rose)]" : e.severity === "warn" ? "bg-amber shadow-[0_0_8px_var(--amber)]" : "bg-teal"}`} />
                <span className="font-mono text-[11px] text-muted-foreground">{e.time}</span>
                <div>
                  <div className="font-semibold">{e.action}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{e.actor}</div>
                </div>
                <div className="truncate text-muted-foreground">{e.target}</div>
                <span className={`justify-self-end rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${e.severity === "critical" ? "bg-rose/15 text-rose" : e.severity === "warn" ? "bg-amber/15 text-amber" : "bg-teal/15 text-teal"}`}>{e.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SuperShell>
  );
}
