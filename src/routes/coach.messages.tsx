import { createFileRoute } from "@tanstack/react-router";
import { CoachShell } from "@/components/coach/coach-shell";
import { coachMessages } from "@/lib/mock-data-extra";
import { Search, Send, Paperclip, Smile } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/coach/messages")({ component: MessagesPage });

const thread = [
  { from: "them", text: "Hey Elena! Can we move tomorrow's session to 6pm instead of 5:30?", time: "10:14" },
  { from: "me", text: "Yes 6pm works — I'll update the calendar. How's your shoulder feeling after last week's shift in program?", time: "10:16" },
  { from: "them", text: "Way better. Landmine press was the fix 🙏", time: "10:22" },
  { from: "them", text: "Also — hit a small PR on incline DB 32kg×8", time: "10:23" },
  { from: "me", text: "Huge. That's exactly what we were pushing for. Keep the tempo controlled on the eccentric.", time: "10:25" },
];

function MessagesPage() {
  const [active, setActive] = useState("M1");
  const [draft, setDraft] = useState("");
  return (
    <CoachShell title="Messages">
      <div className="mx-auto grid h-[calc(100vh-8rem)] max-w-[1600px] grid-cols-[320px_1fr] gap-4 overflow-hidden">
        <div className="glass-card flex flex-col overflow-hidden">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search…" className="h-9 w-full rounded-lg border border-border bg-surface/60 pl-9 text-sm outline-none focus:border-amber/50" />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {coachMessages.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`flex w-full items-center gap-3 border-b border-border/40 p-4 text-left transition-colors ${active === m.id ? "bg-amber/5" : "hover:bg-white/[0.02]"}`}
              >
                <div className="relative">
                  <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">{m.avatar}</div>
                  {m.unread && <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-amber shadow-[0_0_8px_var(--amber)]" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className={`truncate text-sm ${m.unread ? "font-bold" : "font-semibold"}`}>{m.from}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{m.time}</div>
                  </div>
                  <div className={`truncate text-xs ${m.unread ? "text-foreground" : "text-muted-foreground"}`}>{m.preview}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">SL</div>
            <div className="flex-1">
              <div className="text-sm font-bold">Sofia Lin</div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald"><span className="size-1.5 rounded-full bg-emerald shadow-[0_0_6px_var(--emerald)]" />Online</div>
            </div>
            <span className="rounded-full bg-teal/15 px-3 py-1 text-[11px] font-semibold text-teal">Pro Client</span>
          </div>

          <div className="flex-1 space-y-4 overflow-auto p-6">
            {thread.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "bg-gradient-to-br from-amber to-rose text-primary-foreground shadow-[0_8px_24px_-8px_var(--amber)]" : "border border-border bg-surface/40"}`}>
                  {m.text}
                  <div className={`mt-1 text-[10px] font-mono ${m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-3 py-2">
              <button className="text-muted-foreground hover:text-foreground"><Paperclip className="size-4" /></button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Message Sofia…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="text-muted-foreground hover:text-foreground"><Smile className="size-4" /></button>
              <button className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-amber to-rose text-primary-foreground shadow-[0_6px_20px_-6px_var(--amber)]"><Send className="size-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </CoachShell>
  );
}
