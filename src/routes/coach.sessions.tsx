import { createFileRoute } from "@tanstack/react-router";
import { CoachShell } from "@/components/coach/coach-shell";
import { coachSessions } from "@/lib/mock-data-extra";
import { Video, MapPin, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/coach/sessions")({ component: SessionsPage });

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 12 }, (_, i) => `${6 + i}:00`);

// Fake week schedule
const schedule = [
  { day: 0, hour: 3, session: coachSessions[2] }, // Tue 9am Marcus (tomorrow)
  { day: 0, hour: 11, session: coachSessions[0] }, // Mon 17 Sofia
  { day: 0, hour: 13, session: coachSessions[1] }, // Mon 19 Amara
  { day: 2, hour: 2, session: coachSessions[4] }, // Wed 8 Kai
  { day: 4, hour: 0, session: coachSessions[3] }, // Fri 6:30 Diego
];

function SessionsPage() {
  return (
    <CoachShell title="Sessions">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="grid size-9 place-items-center rounded-lg border border-border bg-surface/60"><ChevronLeft className="size-4" /></button>
            <div className="text-sm font-semibold">Jul 12 — Jul 18, 2026</div>
            <button className="grid size-9 place-items-center rounded-lg border border-border bg-surface/60"><ChevronRight className="size-4" /></button>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber to-rose px-4 py-2 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--amber)]"><Plus className="size-4" /> New Session</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass-card overflow-hidden p-4">
            <div className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] gap-1 text-xs">
              <div />
              {weekDays.map((d) => <div key={d} className="rounded-lg bg-surface/40 px-2 py-2 text-center font-mono uppercase tracking-widest text-muted-foreground">{d}</div>)}
              {hours.map((h, hi) => (
                <div key={h} className="contents">
                  <div key={h} className="py-2 text-right pr-2 font-mono text-[10px] text-muted-foreground">{h}</div>
                  {weekDays.map((_, di) => {
                    const slot = schedule.find((s) => s.day === di && s.hour === hi);
                    return (
                      <div key={`${di}-${hi}`} className="min-h-[52px] rounded-lg border border-border/50 bg-surface/20 p-1">
                        {slot && (
                          <div className="h-full rounded-md border border-amber/40 bg-amber/10 p-1.5 text-[10px]">
                            <div className="font-bold text-amber">{slot.session.client}</div>
                            <div className="truncate text-muted-foreground">{slot.session.type}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">Upcoming</div>
            {coachSessions.map((s) => (
              <div key={s.id} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">{s.client}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.mode === "in-person" ? "bg-teal/15 text-teal" : "bg-violet/15 text-violet"}`}>
                    {s.mode === "in-person" ? <MapPin className="mr-1 inline size-2.5" /> : <Video className="mr-1 inline size-2.5" />}{s.mode}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.type}</div>
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-amber"><Clock className="size-3" />{s.time}</span>
                  <span className="text-muted-foreground">{s.duration} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CoachShell>
  );
}
