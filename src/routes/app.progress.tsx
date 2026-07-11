import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { weightHistory } from "@/lib/mock-data-extra";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts";
import { TrendingDown, Target, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/progress")({ component: ProgressPage });

function ProgressPage() {
  const current = weightHistory[5].w;
  const target = 74;
  const eta = "8 weeks";

  return (
    <PhoneFrame title="Progress">
      <div className="space-y-4 p-4">
        <div className="glass-card relative overflow-hidden p-4">
          <div aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full bg-violet/25 blur-3xl" />
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-violet to-teal shadow-[0_0_20px_-4px_var(--violet)]"><TrendingDown className="size-6 text-primary-foreground" /></div>
            <div>
              <div className="text-3xl font-bold gradient-text">{current}<span className="text-lg text-muted-foreground">kg</span></div>
              <div className="text-xs text-emerald">−2.8kg last 35 days</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-bold">Weight trajectory</div>
            <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-violet"><Sparkles className="size-3" /> AI predicted</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weightHistory}>
              <XAxis dataKey="day" tick={{ fontSize: 9 }} />
              <YAxis domain={[75, 82]} tick={{ fontSize: 9 }} />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 11 }} />
              <ReferenceLine y={target} stroke="var(--emerald)" strokeDasharray="3 3" label={{ value: `Goal ${target}kg`, fill: "var(--emerald)", fontSize: 9, position: "insideTopRight" }} />
              <Line type="monotone" dataKey="w" stroke="var(--teal)" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey={(d: any) => d.predicted ? d.w : null} stroke="var(--violet)" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald/15 text-emerald"><Target className="size-5" /></div>
            <div>
              <div className="text-sm font-bold">On track for {target}kg</div>
              <div className="mt-1 text-xs text-muted-foreground">Based on your last 5 weeks of adherence, you'll hit target in <span className="font-bold text-emerald">{eta}</span>. Keep protein at 190g and calories in the current deficit range.</div>
            </div>
          </div>
        </div>

        {/* Body metrics */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Body fat", value: "16.2%", delta: "-1.4%", tone: "teal" },
            { label: "Muscle mass", value: "62.1kg", delta: "+0.6kg", tone: "violet" },
            { label: "Waist", value: "78cm", delta: "-2cm", tone: "emerald" },
            { label: "Resting HR", value: "58 bpm", delta: "-4", tone: "amber" },
          ].map((m) => (
            <div key={m.label} className="glass-card p-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{m.label}</div>
              <div className="mt-1 text-lg font-bold">{m.value}</div>
              <div className={`text-[10px] font-semibold text-${m.tone}`}>{m.delta} · 30d</div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
