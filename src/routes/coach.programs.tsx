import { createFileRoute } from "@tanstack/react-router";
import { CoachShell } from "@/components/coach/coach-shell";
import { Plus, Copy, MoreHorizontal, Sparkles, Dumbbell, Timer } from "lucide-react";

export const Route = createFileRoute("/coach/programs")({ component: ProgramsPage });

const programs = [
  { id: "P1", name: "Push · Pull · Legs (Elite)", weeks: 8, assigned: 14, level: "Advanced", tone: "amber" },
  { id: "P2", name: "Beginner Full Body", weeks: 6, assigned: 22, level: "Beginner", tone: "teal" },
  { id: "P3", name: "Powerlifting Peak", weeks: 12, assigned: 6, level: "Elite", tone: "violet" },
  { id: "P4", name: "Hypertrophy Split 5-day", weeks: 10, assigned: 18, level: "Intermediate", tone: "emerald" },
  { id: "P5", name: "Conditioning Circuit", weeks: 4, assigned: 9, level: "All levels", tone: "rose" },
  { id: "P6", name: "Cut Phase — 8 Weeks", weeks: 8, assigned: 11, level: "Intermediate", tone: "amber" },
];

function ProgramsPage() {
  return (
    <CoachShell title="Programs">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Reusable training blocks assigned to clients.</p>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber to-rose px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--amber)]"><Plus className="size-4" /> New Program</button>
        </div>

        {/* AI Program Builder stub */}
        <div className="glass-card relative overflow-hidden p-6">
          <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-amber/20 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-amber to-rose shadow-[0_0_24px_-6px_var(--amber)]"><Sparkles className="size-6 text-primary-foreground" /></div>
            <div className="flex-1">
              <div className="text-lg font-bold">AI Program Builder</div>
              <div className="mt-1 text-sm text-muted-foreground">Describe the goal, level, and equipment — get a full periodized plan.</div>
              <div className="mt-4 flex gap-2">
                <input placeholder="e.g. Intermediate lifter, 4x/wk, dumbbells only, cut phase 10 weeks…" className="h-11 flex-1 rounded-lg border border-border bg-surface/60 px-4 text-sm outline-none focus:border-amber/50" />
                <button className="rounded-lg bg-gradient-to-r from-amber to-rose px-5 text-xs font-bold text-primary-foreground">Generate</button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div key={p.id} className="glass-card group relative overflow-hidden p-5 transition-all hover:shadow-[0_20px_60px_-20px_var(--amber)]">
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-${p.tone}/40 via-transparent to-transparent`} />
              <div className="flex items-start justify-between">
                <div className={`grid size-10 place-items-center rounded-lg bg-${p.tone}/15 text-${p.tone}`}><Dumbbell className="size-4" /></div>
                <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="size-4" /></button>
              </div>
              <div className="mt-4 text-base font-bold">{p.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.level}</div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground"><Timer className="size-3" />{p.weeks} weeks</span>
                <span className="font-mono font-bold">{p.assigned} assigned</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg border border-border bg-surface/40 py-2 text-xs font-semibold">Edit</button>
                <button className="flex items-center gap-1 rounded-lg border border-border bg-surface/40 px-3 py-2 text-xs font-semibold"><Copy className="size-3" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoachShell>
  );
}
