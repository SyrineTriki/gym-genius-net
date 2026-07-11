import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { achievements } from "@/lib/mock-data-extra";
import { Trophy, Flame, Footprints, Beef, Shield, Utensils } from "lucide-react";

export const Route = createFileRoute("/app/achievements")({ component: AchievementsPage });

const iconMap = { flame: Flame, trophy: Trophy, footprints: Footprints, beef: Beef, shield: Shield, utensils: Utensils } as const;

function AchievementsPage() {
  const unlocked = achievements.filter((a) => a.progress === 100).length;
  return (
    <PhoneFrame title="Achievements">
      <div className="space-y-4 p-4">
        <div className="glass-card relative overflow-hidden p-4 text-center">
          <div aria-hidden className="absolute -right-8 -top-8 size-32 rounded-full bg-amber/25 blur-3xl" />
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-amber to-rose shadow-[0_0_20px_-4px_var(--amber)] animate-pulse-glow">
            <Trophy className="size-7 text-primary-foreground" />
          </div>
          <div className="mt-2 text-3xl font-bold gradient-text">{unlocked}/{achievements.length}</div>
          <div className="text-[11px] text-muted-foreground">badges unlocked</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((a) => {
            const Icon = iconMap[a.icon as keyof typeof iconMap];
            const unlocked = a.progress === 100;
            return (
              <div key={a.name} className={`glass-card relative overflow-hidden p-4 ${!unlocked ? "opacity-80" : ""}`}>
                {unlocked && <div aria-hidden className={`absolute inset-0 bg-gradient-to-br from-${a.tone}/10 to-transparent`} />}
                <div className="relative">
                  <div className={`mx-auto grid size-12 place-items-center rounded-2xl bg-${a.tone}/15 text-${a.tone} ${unlocked ? `shadow-[0_0_20px_-4px_var(--${a.tone})]` : "grayscale opacity-60"}`}>
                    <Icon className="size-6" />
                  </div>
                  <div className="mt-2 text-center text-[11px] font-bold">{a.name}</div>
                  <div className="mt-0.5 text-center text-[9px] leading-tight text-muted-foreground">{a.desc}</div>
                  <div className="mt-3">
                    <div className="h-1 overflow-hidden rounded-full bg-surface-2">
                      <div className={`h-full rounded-full bg-${a.tone}`} style={{ width: `${a.progress}%` }} />
                    </div>
                    <div className="mt-1 text-center text-[9px] font-mono text-muted-foreground">{a.progress}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
