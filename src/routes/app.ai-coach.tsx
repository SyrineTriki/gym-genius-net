import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { aiChatMessages } from "@/lib/mock-data-extra";
import { Send, Sparkles, Mic } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/ai-coach")({ component: AiCoachPage });

const suggestions = ["My shoulder is tight", "Suggest a leg day", "Am I eating enough protein?", "Deload week?"];

function AiCoachPage() {
  const [msgs, setMsgs] = useState(aiChatMessages);
  const [draft, setDraft] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }, { role: "assistant", text: "Great question — let me analyze your last 7 days of training and nutrition data…" }]);
    setDraft("");
  }

  return (
    <PhoneFrame title="AI Coach" hideBottomBar>
      <div className="flex h-full flex-col">
        <div className="border-b border-border bg-gradient-to-r from-teal/10 to-violet/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-teal to-violet shadow-[0_0_16px_-2px_var(--teal-glow)] animate-pulse-glow">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold">Forge AI</div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald"><span className="size-1.5 rounded-full bg-emerald shadow-[0_0_6px_var(--emerald)]" />Online · GPT-4</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-auto p-4">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && <div className="mr-2 grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-violet"><Sparkles className="size-3.5 text-primary-foreground" /></div>}
              <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs ${m.role === "user" ? "bg-gradient-to-br from-teal to-violet text-primary-foreground shadow-[0_8px_20px_-6px_var(--teal-glow)]" : "border border-border bg-surface/60"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="shrink-0 rounded-full border border-teal/30 bg-teal/5 px-3 py-1 text-[10px] font-semibold text-teal hover:bg-teal/10">{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-3 py-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(draft)}
              placeholder="Ask anything about your training…"
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
            <button className="text-muted-foreground"><Mic className="size-4" /></button>
            <button onClick={() => send(draft)} className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet text-primary-foreground shadow-[0_6px_20px_-6px_var(--teal-glow)]"><Send className="size-3.5" /></button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
