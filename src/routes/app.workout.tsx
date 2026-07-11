import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { todayWorkout } from "@/lib/mock-data-extra";
import { Play, Timer, ChevronRight, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/workout")({ component: WorkoutPage });

function WorkoutPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const completed = Object.values(done).filter(Boolean).length;
  return (
    <PhoneFrame title="Today's Workout">
      <div className="space-y-4 p-4">
        <div className="glass-card relative overflow-hidden p-4">
          <div aria-hidden className="absolute -right-6 -top-6 size-32 rounded-full bg-teal/25 blur-3xl" />
          <div className="text-xs font-mono uppercase tracking-widest text-teal">Push · Hypertrophy</div>
          <div className="mt-1 text-lg font-bold">{todayWorkout.name}</div>
          <div className="mt-3 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground"><Timer className="size-3.5" />{todayWorkout.duration}</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono font-bold text-teal">{completed}/{todayWorkout.exercises.length} done</span>
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-violet py-3 text-sm font-bold text-primary-foreground shadow-[0_10px_30px_-8px_var(--teal-glow)]"><Play className="size-4 fill-current" /> Start workout</button>
        </div>

        <div className="space-y-2">
          {todayWorkout.exercises.map((ex, i) => {
            const isDone = done[ex.name];
            return (
              <button
                key={ex.name}
                onClick={() => setDone((d) => ({ ...d, [ex.name]: !d[ex.name] }))}
                className={`glass-card flex w-full items-center gap-3 p-4 text-left transition-all ${isDone ? "opacity-60" : ""}`}
              >
                <div className={`grid size-10 shrink-0 place-items-center rounded-xl font-bold ${isDone ? "bg-emerald text-primary-foreground" : "bg-surface-2 text-muted-foreground"}`}>
                  {isDone ? <Check className="size-5" /> : i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold ${isDone ? "line-through" : ""}`}>{ex.name}</div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="font-mono">{ex.sets}</span>
                    <span>·</span>
                    <span className="font-mono text-teal">{ex.weight}</span>
                    <span>·</span>
                    <span>RPE {ex.rpe}</span>
                  </div>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <div className="glass-card p-4">
          <div className="text-xs font-semibold">Coach note</div>
          <div className="mt-1 text-xs text-muted-foreground">"Focus on paused reps on bench today — 1s at chest, controlled ascent. Progressive overload target: +2kg."</div>
        </div>
      </div>
    </PhoneFrame>
  );
}
