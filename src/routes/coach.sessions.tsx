import { createFileRoute } from "@tanstack/react-router";
import { CoachPhoneFrame } from "@/components/coach/coach-phone-frame";
import { coachSessions } from "@/lib/mock-data-extra";
import { Video, MapPin, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/coach/sessions")({ component: SessionsPage });

const weekDays = [
  { d: "Mon", n: 12, count: 2 },
  { d: "Tue", n: 13, count: 1 },
  { d: "Wed", n: 14, count: 1 },
  { d: "Thu", n: 15, count: 0 },
  { d: "Fri", n: 16, count: 1 },
  { d: "Sat", n: 17, count: 0 },
  { d: "Sun", n: 18, count: 0 },
];

function SessionsPage() {
  const [day, setDay] = useState(0);
  return (
    <CoachPhoneFrame title="Sessions">
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <button className="grid size-8 place-items-center rounded-lg border border-border"><ChevronLeft className="size-4" /></button>
          <div className="text-xs font-semibold">Jul 12 — Jul 18</div>
          <button className="grid size-8 place-items-center rounded-lg border border-border"><ChevronRight className="size-4" /></button>
        </div>

        <div className="flex gap-1.5">
          {weekDays.map((w, i) => (
            <button
              key={w.d}
              onClick={() => setDay(i)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-2.5 transition-all ${day === i ? "bg-gradient-to-b from-amber to-rose text-primary-foreground shadow-[0_8px_20px_-8px_var(--amber)]" : "border border-border bg-surface/40 text-muted-foreground"}`}
            >
              <span className="font-mono text-[9px] uppercase tracking-widest">{w.d}</span>
              <span className="text-sm font-bold">{w.n}</span>
              {w.count > 0 && <span className={`size-1 rounded-full ${day === i ? "bg-primary-foreground" : "bg-amber"}`} />}
            </button>
          ))}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber to-rose py-2.5 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--amber)]">
          <Plus className="size-4" /> New Session
        </button>

        <div className="space-y-2.5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Timeline</div>
          {coachSessions.map((s) => (
            <div key={s.id} className="glass-card p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-[10px] font-bold">{s.client.split(" ").map(w => w[0]).join("")}</div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{s.client}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{s.type}</div>
                    </div>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${s.mode === "in-person" ? "bg-teal/15 text-teal" : "bg-violet/15 text-violet"}`}>
                  {s.mode === "in-person" ? <MapPin className="mr-1 inline size-2.5" /> : <Video className="mr-1 inline size-2.5" />}{s.mode}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 border-t border-border/40 pt-2.5 text-[11px]">
                <span className="flex items-center gap-1 text-amber"><Clock className="size-3" />{s.time}</span>
                <span className="text-muted-foreground">· {s.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoachPhoneFrame>
  );
}
