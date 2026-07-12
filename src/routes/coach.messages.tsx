import { createFileRoute } from "@tanstack/react-router";
import { CoachPhoneFrame } from "@/components/coach/coach-phone-frame";
import { coachMessages } from "@/lib/mock-data-extra";
import { Search, Send, Paperclip, Smile, ChevronLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/coach/messages")({ component: MessagesPage });

const thread = [
  { from: "them", text: "Hey Elena! Can we move tomorrow's session to 6pm instead of 5:30?", time: "10:14" },
  { from: "me", text: "Yes 6pm works — I'll update the calendar. How's your shoulder feeling?", time: "10:16" },
  { from: "them", text: "Way better. Landmine press was the fix 🙏", time: "10:22" },
  { from: "them", text: "Also — hit a small PR on incline DB 32kg×8", time: "10:23" },
  { from: "me", text: "Huge. That's exactly what we were pushing for.", time: "10:25" },
];

function MessagesPage() {
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  if (openThread) {
    return (
      <CoachPhoneFrame hideBottomBar>
        <div className="flex h-[640px] flex-col">
          <div className="flex items-center gap-3 border-b border-border bg-surface/40 p-3">
            <button onClick={() => setOpenThread(null)} className="grid size-8 place-items-center rounded-lg text-muted-foreground"><ChevronLeft className="size-4" /></button>
            <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-[10px] font-bold">SL</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold">Sofia Lin</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald"><span className="size-1.5 rounded-full bg-emerald shadow-[0_0_6px_var(--emerald)]" />Online</div>
            </div>
            <span className="rounded-full bg-teal/15 px-2 py-0.5 text-[9px] font-semibold text-teal">Pro</span>
          </div>

          <div className="flex-1 space-y-3 overflow-auto p-4">
            {thread.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs ${m.from === "me" ? "bg-gradient-to-br from-amber to-rose text-primary-foreground shadow-[0_8px_20px_-8px_var(--amber)]" : "border border-border bg-surface/40"}`}>
                  {m.text}
                  <div className={`mt-0.5 font-mono text-[9px] ${m.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5">
              <button className="text-muted-foreground"><Paperclip className="size-4" /></button>
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message…" className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground" />
              <button className="text-muted-foreground"><Smile className="size-4" /></button>
              <button className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-amber to-rose text-primary-foreground"><Send className="size-3.5" /></button>
            </div>
          </div>
        </div>
      </CoachPhoneFrame>
    );
  }

  return (
    <CoachPhoneFrame title="Messages">
      <div className="space-y-3 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search conversations…" className="h-10 w-full rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none focus:border-amber/50" />
        </div>

        <div className="glass-card overflow-hidden">
          {coachMessages.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setOpenThread(m.id)}
              className={`flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.02] ${i < coachMessages.length - 1 ? "border-b border-border/40" : ""}`}
            >
              <div className="relative shrink-0">
                <div className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-amber to-teal text-xs font-bold">{m.avatar}</div>
                {m.unread && <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-amber shadow-[0_0_8px_var(--amber)]" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className={`truncate text-sm ${m.unread ? "font-bold" : "font-semibold"}`}>{m.from}</div>
                  <div className="shrink-0 font-mono text-[10px] text-muted-foreground">{m.time}</div>
                </div>
                <div className={`truncate text-[11px] ${m.unread ? "text-foreground" : "text-muted-foreground"}`}>{m.preview}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </CoachPhoneFrame>
  );
}
