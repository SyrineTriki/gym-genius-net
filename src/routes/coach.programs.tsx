import { createFileRoute } from "@tanstack/react-router";
import { CoachPhoneFrame } from "@/components/coach/coach-phone-frame";
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

const toneBg: Record<string, string> = {
  amber: "bg-amber/15 text-amber",
  teal: "bg-teal/15 text-teal",
  violet: "bg-violet/15 text-violet",
  emerald: "bg-emerald/15 text-emerald",
  rose: "bg-rose/15 text-rose",
};

function ProgramsPage() {
  return (
    <CoachPhoneFrame title="Programs">
      <div className="space-y-4 p-4">
        <p className="text-xs text-muted-foreground">Reusable training blocks assigned to clients.</p>

        {/* AI Program Builder */}
        <div className="glass-card relative overflow-hidden p-4">
          <div aria-hidden className="absolute -right-10 -top-10 size-36 rounded-full bg-amber/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-amber to-rose shadow-[0_0_20px_-6px_var(--amber)]"><Sparkles className="size-5 text-primary-foreground" /></div>
              <div>
                <div className="text-sm font-bold">AI Program Builder</div>
                <div className="text-[11px] text-muted-foreground">Describe goal & level</div>
              </div>
            </div>
            <textarea placeholder="e.g. Intermediate, 4x/wk, dumbbells only, cut 10 weeks…" rows={3} className="mt-3 w-full resize-none rounded-lg border border-border bg-surface/60 p-3 text-xs outline-none focus:border-amber/50" />
            <button className="mt-2 w-full rounded-lg bg-gradient-to-r from-amber to-rose py-2 text-xs font-bold text-primary-foreground">Generate Program</button>
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface/40 py-2.5 text-xs font-bold">
          <Plus className="size-4" /> New Program
        </button>

        <div className="space-y-2.5">
          {programs.map((p) => (
            <div key={p.id} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div className={`grid size-9 place-items-center rounded-lg ${toneBg[p.tone]}`}><Dumbbell className="size-4" /></div>
                <button className="text-muted-foreground"><MoreHorizontal className="size-4" /></button>
              </div>
              <div className="mt-3 text-sm font-bold">{p.name}</div>
              <div className="text-[11px] text-muted-foreground">{p.level}</div>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-muted-foreground"><Timer className="size-3" />{p.weeks} weeks</span>
                <span className="font-mono font-bold">{p.assigned} assigned</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-lg border border-border bg-surface/40 py-1.5 text-[11px] font-semibold">Edit</button>
                <button className="grid size-8 place-items-center rounded-lg border border-border bg-surface/40"><Copy className="size-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoachPhoneFrame>
  );
}
