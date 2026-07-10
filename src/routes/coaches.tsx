import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { coachApplications } from "@/lib/mock-data";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Check, X, Clock, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Tilt3D } from "@/components/admin/tilt-3d";

export const Route = createFileRoute("/coaches")({
  component: CoachesPage,
});

function CoachesPage() {
  const [apps, setApps] = useState(coachApplications);
  const [selected, setSelected] = useState<string | null>(coachApplications[0]?.id ?? null);

  const current = apps.find((a) => a.id === selected);

  return (
    <AdminShell title="Coach Verification">
      <Toaster theme="dark" position="bottom-right" />
      <div className="mx-auto grid max-w-[1600px] gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        {/* Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold">Verification Queue</h2>
              <p className="text-xs text-muted-foreground">{apps.length} pending applications</p>
            </div>
            <div className="flex gap-1 rounded-full border border-border bg-surface/60 p-1 text-xs font-semibold">
              <button className="rounded-full bg-teal/15 px-3 py-1 text-teal">Newest</button>
              <button className="rounded-full px-3 py-1 text-muted-foreground">Highest Score</button>
            </div>
          </div>

          <AnimatePresence>
            {apps.map((a, i) => {
              const active = a.id === selected;
              return (
                <motion.button
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(a.id)}
                  className={`glass-card group flex w-full items-center gap-4 p-4 text-left transition-all ${
                    active ? "ring-1 ring-teal/40 shadow-[0_0_32px_-8px_var(--teal-glow)]" : "hover:ring-1 hover:ring-border"
                  }`}
                >
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet text-sm font-bold text-primary-foreground">
                    {a.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold">{a.name}</span>
                      <span className="rounded bg-violet/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-violet">
                        {a.cert}
                      </span>
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                      {a.specialty} · {a.years} yrs
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <ScoreRing score={a.score} />
                    <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <Clock className="size-3" />
                      {a.submitted}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Detail card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {current ? (
            <Tilt3D intensity={4}>
              <div className="glass-card relative overflow-hidden p-6">
                <div className="absolute -right-16 -top-16 size-52 rounded-full bg-teal/25 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-violet/25 blur-3xl" />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div className="grid size-20 place-items-center rounded-2xl bg-gradient-to-br from-teal to-violet text-2xl font-bold text-primary-foreground shadow-[0_12px_32px_-8px_var(--teal-glow)]">
                      {current.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold">{current.name}</h3>
                      <p className="text-sm text-muted-foreground">{current.specialty}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge icon={<Award className="size-3" />}>{current.cert}</Badge>
                        <Badge icon={<Star className="size-3" />}>{current.years} yrs</Badge>
                        <Badge icon={<ShieldCheck className="size-3" />} tone="emerald">
                          ID Verified
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "AI Score", value: current.score, suffix: "/100", tone: "text-teal" },
                      { label: "Experience", value: current.years, suffix: "yrs", tone: "text-violet" },
                      { label: "Response", value: 24, suffix: "min", tone: "text-emerald" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-border/60 bg-surface/40 p-3">
                        <div className={`text-xl font-bold ${s.tone}`}>
                          {s.value}
                          <span className="ml-0.5 text-[10px] text-muted-foreground">{s.suffix}</span>
                        </div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Credentials submitted
                    </div>
                    <ul className="space-y-2">
                      {[
                        `${current.cert} certification (PDF)`,
                        "Government-issued ID",
                        "CPR / First Aid current",
                        "Insurance policy",
                      ].map((c) => (
                        <li key={c} className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface/40 p-2.5 text-xs">
                          <Check className="size-3.5 text-emerald" />
                          <span className="flex-1">{c}</span>
                          <button className="font-mono text-[10px] text-teal hover:underline">VIEW</button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 rounded-xl border border-teal/30 bg-teal/[0.04] p-4">
                    <div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-teal">
                      <TrendingUp className="size-3" /> AI recommendation
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/90">
                      {current.score >= 85
                        ? "Strong candidate — credentials and experience exceed 92% of approved coaches."
                        : "Mixed signals — request additional references before approving."}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => {
                        setApps((a) => a.filter((x) => x.id !== current.id));
                        toast.error(`Rejected ${current.name}`);
                      }}
                      className="flex-1 rounded-full border border-rose/30 bg-rose/10 py-2.5 text-sm font-bold text-rose transition-all hover:scale-[1.02] hover:bg-rose/20"
                    >
                      <X className="mr-1 inline size-4" /> Reject
                    </button>
                    <button
                      onClick={() => {
                        setApps((a) => a.filter((x) => x.id !== current.id));
                        toast.success(`${current.name} approved as coach`);
                      }}
                      className="flex-1 rounded-full bg-gradient-to-r from-teal to-emerald py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--teal-glow)] transition-transform hover:scale-[1.02]"
                    >
                      <Check className="mr-1 inline size-4" /> Approve
                    </button>
                  </div>
                </div>
              </div>
            </Tilt3D>
          ) : (
            <div className="glass-card p-12 text-center text-sm text-muted-foreground">
              Queue empty — nice work.
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

function Badge({ children, icon, tone = "teal" }: { children: React.ReactNode; icon?: React.ReactNode; tone?: "teal" | "emerald" }) {
  const tones = { teal: "bg-teal/15 text-teal", emerald: "bg-emerald/15 text-emerald" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${tones[tone]}`}>
      {icon}
      {children}
    </span>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 85 ? "var(--color-emerald)" : score >= 70 ? "var(--color-teal)" : "var(--color-amber)";
  return (
    <div className="relative grid size-10 place-items-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" stroke="oklch(0.3 0.03 235 / 0.4)" strokeWidth="3" fill="none" />
        <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="3" fill="none" strokeDasharray={`${(score / 100) * 100.5} 100.5`} strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[10px] font-bold" style={{ color }}>{score}</span>
    </div>
  );
}
