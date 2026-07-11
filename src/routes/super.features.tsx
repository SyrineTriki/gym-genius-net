import { createFileRoute } from "@tanstack/react-router";
import { SuperShell } from "@/components/super/super-shell";
import { featureFlags } from "@/lib/mock-data-extra";
import { useState } from "react";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/super/features")({ component: FlagsPage });

function FlagsPage() {
  const [flags, setFlags] = useState(featureFlags);
  return (
    <SuperShell title="Feature Flags">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Progressive rollouts, kill switches, and staged releases.</p>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet to-teal px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--violet)]"><Plus className="size-4" /> New Flag</button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {flags.map((f) => (
            <div key={f.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-teal">{f.key}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${f.env === "prod" ? "bg-emerald/15 text-emerald" : f.env === "staging" ? "bg-amber/15 text-amber" : "bg-violet/15 text-violet"}`}>{f.env}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </div>
                <button
                  onClick={() => setFlags((all) => all.map((x) => x.id === f.id ? { ...x, enabled: !x.enabled } : x))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${f.enabled ? "bg-teal shadow-[0_0_16px_-2px_var(--teal-glow)]" : "bg-surface-2"}`}
                >
                  <span className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${f.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Rollout</span>
                  <span className="font-mono font-bold">{f.rollout}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full rounded-full bg-gradient-to-r from-teal to-violet" style={{ width: `${f.rollout}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SuperShell>
  );
}
