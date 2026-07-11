import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { budgetMeals } from "@/lib/mock-data-extra";
import { Sparkles, DollarSign } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/budget")({ component: BudgetPage });

function BudgetPage() {
  const [budget, setBudget] = useState(15);
  const [goal, setGoal] = useState("cutting");
  const [calGoal, setCalGoal] = useState(2200);

  const totalCost = budgetMeals.reduce((a, b) => a + b.cost, 0);
  const totalCal = budgetMeals.reduce((a, b) => a + b.cal, 0);
  const totalP = budgetMeals.reduce((a, b) => a + b.protein, 0);

  return (
    <PhoneFrame title="Budget Optimizer">
      <div className="space-y-4 p-4">
        <div className="glass-card p-4">
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold"><Sparkles className="size-3.5 text-teal" /> Generate cheapest plan</div>

          <label className="mb-3 block">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Daily budget</span>
              <span className="font-mono font-bold text-teal">${budget}</span>
            </div>
            <input type="range" min={8} max={40} value={budget} onChange={(e) => setBudget(+e.target.value)} className="w-full accent-teal" />
          </label>

          <label className="mb-3 block">
            <div className="mb-1.5 text-xs text-muted-foreground">Goal</div>
            <div className="grid grid-cols-3 gap-1.5">
              {["cutting", "maintain", "bulking"].map((g) => (
                <button key={g} onClick={() => setGoal(g)} className={`rounded-lg py-2 text-[11px] font-semibold capitalize ${goal === g ? "bg-teal text-primary-foreground shadow-[0_0_16px_-4px_var(--teal-glow)]" : "border border-border bg-surface/40 text-muted-foreground"}`}>{g}</button>
              ))}
            </div>
          </label>

          <label className="mb-1 block">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Calorie target</span>
              <span className="font-mono font-bold text-teal">{calGoal} kcal</span>
            </div>
            <input type="range" min={1600} max={3200} step={50} value={calGoal} onChange={(e) => setCalGoal(+e.target.value)} className="w-full accent-teal" />
          </label>

          <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-teal to-violet py-2.5 text-xs font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--teal-glow)]">Optimize plan</button>
        </div>

        <div className="glass-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">Today's plan</div>
              <div className="mt-0.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">4 meals · optimized for cost/protein</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-0.5 text-lg font-bold text-emerald"><DollarSign className="size-4" />{totalCost.toFixed(1)}</div>
              <div className="text-[10px] text-muted-foreground">vs $18 avg</div>
            </div>
          </div>

          <div className="space-y-2">
            {budgetMeals.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3 rounded-lg border border-border bg-surface/40 p-2.5">
                <div className="grid size-8 place-items-center rounded-lg bg-teal/15 text-xs font-bold text-teal">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold">{m.name}</div>
                  <div className="text-[10px] text-muted-foreground">{m.cal} kcal · {m.protein}g protein</div>
                </div>
                <div className="text-xs font-bold text-emerald">${m.cost.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center text-[10px]">
            <div><div className="text-sm font-bold text-teal">{totalCal}</div><div className="text-muted-foreground">kcal</div></div>
            <div><div className="text-sm font-bold text-violet">{totalP}g</div><div className="text-muted-foreground">protein</div></div>
            <div><div className="text-sm font-bold text-emerald">${totalCost.toFixed(2)}</div><div className="text-muted-foreground">total</div></div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
