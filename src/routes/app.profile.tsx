import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { Settings, Bell, Shield, CreditCard, HelpCircle, LogOut, ChevronRight, Crown } from "lucide-react";

export const Route = createFileRoute("/app/profile")({ component: ProfilePage });

const items = [
  { label: "Notifications", icon: Bell },
  { label: "Privacy & Security", icon: Shield },
  { label: "Subscription — Elite", icon: CreditCard, badge: "$29/mo" },
  { label: "Preferences", icon: Settings },
  { label: "Help & Support", icon: HelpCircle },
];

function ProfilePage() {
  return (
    <PhoneFrame title="Profile">
      <div className="space-y-4 p-4">
        <div className="glass-card relative overflow-hidden p-5 text-center">
          <div aria-hidden className="absolute inset-x-0 -top-10 h-32 bg-gradient-to-b from-teal/20 to-transparent" />
          <div className="relative">
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-teal to-violet text-lg font-bold shadow-[0_0_24px_-4px_var(--teal-glow)] animate-pulse-glow">AJ</div>
            <div className="mt-3 text-lg font-bold">Alex Johnson</div>
            <div className="text-[11px] text-muted-foreground">Metro East Facility · Member since 2024</div>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber/20 to-rose/20 px-3 py-0.5 text-[10px] font-bold text-amber">
              <Crown className="size-3" /> ELITE MEMBER
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-3">
              <div><div className="text-lg font-bold gradient-text">24</div><div className="text-[9px] text-muted-foreground">Streak</div></div>
              <div><div className="text-lg font-bold gradient-text">142</div><div className="text-[9px] text-muted-foreground">Workouts</div></div>
              <div><div className="text-lg font-bold gradient-text">18</div><div className="text-[9px] text-muted-foreground">PRs</div></div>
            </div>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <button key={it.label} className={`flex w-full items-center gap-3 p-3.5 text-left text-sm ${i > 0 ? "border-t border-border/40" : ""}`}>
                <div className="grid size-9 place-items-center rounded-xl bg-teal/10 text-teal"><Icon className="size-4" /></div>
                <span className="flex-1 font-semibold">{it.label}</span>
                {it.badge && <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[10px] font-bold text-amber">{it.badge}</span>}
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        <button className="glass-card flex w-full items-center justify-center gap-2 p-3.5 text-sm font-semibold text-rose">
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </PhoneFrame>
  );
}
