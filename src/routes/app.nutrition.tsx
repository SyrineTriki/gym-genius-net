import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { athleteStats } from "@/lib/mock-data-extra";
import { Plus, Zap, Beef, Wheat, Droplet } from "lucide-react";

export const Route = createFileRoute("/app/nutrition")({ component: NutritionPage });

const meals = [
  { name: "Breakfast", time: "7:20", items: ["Oats + whey", "Berries"], cal: 480, protein: 38, tone: "teal" },
  { name: "Lunch", time: "13:00", items: ["Chicken bowl", "Rice + veg"], cal: 720, protein: 52, tone: "violet" },
  { name: "Snack", time: "16:30", items: ["Greek yogurt", "Almonds"], cal: 320, protein: 24, tone: "amber" },
  { name: "Dinner", time: "20:00", items: ["Salmon", "Sweet potato"], cal: 660, protein: 44, tone: "emerald" },
];

function NutritionPage() {
  const s = athleteStats;
  const carbs = 218, carbsGoal = 250, fats = 62, fatsGoal = 75;
  return (
    <PhoneFrame title="Nutrition">
      <div className="space-y-4 p-4">
        <div className="glass-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold gradient-text">{s.calories}</div>
              <div className="text-[10px] text-muted-foreground">of {s.calorieGoal} kcal · <span className="text-emerald">{s.calorieGoal - s.calories} left</span></div>
            </div>
            <div className="relative size-16">
              <svg viewBox="0 0 40 40" className="size-full -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--surface-2)" strokeWidth="4" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="var(--teal)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(s.calories / s.calorieGoal) * 100.5} 100.5`} />
              </svg>
              <Zap className="absolute inset-0 m-auto size-5 text-teal" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
            {[
              { label: "Protein", value: s.protein, goal: s.proteinGoal, unit: "g", tone: "violet", icon: Beef },
              { label: "Carbs", value: carbs, goal: carbsGoal, unit: "g", tone: "amber", icon: Wheat },
              { label: "Fats", value: fats, goal: fatsGoal, unit: "g", tone: "rose", icon: Droplet },
            ].map((m) => {
              const Icon = m.icon;
              const pct = Math.round((m.value / m.goal) * 100);
              return (
                <div key={m.label}>
                  <div className={`flex items-center gap-1 text-[10px] text-${m.tone} font-semibold`}><Icon className="size-2.5" />{m.label}</div>
                  <div className="mt-0.5 text-sm font-bold">{m.value}<span className="text-[10px] text-muted-foreground">/{m.goal}{m.unit}</span></div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface-2">
                    <div className={`h-full rounded-full bg-${m.tone}`} style={{ width: `${Math.min(100, pct)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {meals.map((m) => (
            <div key={m.name} className="glass-card p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full bg-${m.tone} shadow-[0_0_6px_var(--${m.tone})]`} />
                    <div className="text-sm font-bold">{m.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{m.time}</div>
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{m.items.join(" · ")}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{m.cal}</div>
                  <div className="text-[9px] text-violet">P {m.protein}g</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-violet py-3 text-sm font-bold text-primary-foreground shadow-[0_10px_30px_-8px_var(--teal-glow)]"><Plus className="size-4" /> Log meal</button>
      </div>
    </PhoneFrame>
  );
}
