import { createFileRoute } from "@tanstack/react-router";
import { CoachPhoneFrame } from "@/components/coach/coach-phone-frame";
import { coachClients } from "@/lib/mock-data-extra";
import { Search, Plus, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/coach/clients")({ component: ClientsPage });

const filters = ["All", "On-track", "At-risk", "New"];

function ClientsPage() {
  const [active, setActive] = useState("All");
  return (
    <CoachPhoneFrame title="Clients">
      <div className="space-y-3 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search clients…" className="h-10 w-full rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none focus:border-amber/50" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${active === f ? "bg-amber/15 text-amber" : "border border-border text-muted-foreground"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber to-rose py-2.5 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--amber)]">
          <Plus className="size-4" /> Invite Client
        </button>

        <div className="space-y-2.5">
          {coachClients.map((c) => (
            <div key={c.id} className="glass-card p-3.5">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">{c.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-sm font-bold">{c.name}</div>
                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${c.status === "on-track" ? "bg-emerald/15 text-emerald" : "bg-rose/15 text-rose"}`}>{c.status}</span>
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">{c.plan}</div>
                </div>
                <button className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground"><MessageSquare className="size-4" /></button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-gradient-to-r from-amber to-teal" style={{ width: `${c.progress}%` }} />
                </div>
                <span className="font-mono text-[10px]">{c.progress}%</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>🔥 {c.streak}d streak</span>
                <span>Next: <span className="font-semibold text-foreground">{c.next}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoachPhoneFrame>
  );
}
