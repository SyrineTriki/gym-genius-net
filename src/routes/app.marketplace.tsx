import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { marketplaceCoaches } from "@/lib/mock-data-extra";
import { Star, Search } from "lucide-react";

export const Route = createFileRoute("/app/marketplace")({ component: MarketplacePage });

const filters = ["All", "Strength", "Physique", "CrossFit", "Athletic"];

function MarketplacePage() {
  return (
    <PhoneFrame title="Coach Marketplace">
      <div className="space-y-4 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="Search coaches…" className="h-10 w-full rounded-full border border-border bg-surface/60 pl-9 pr-3 text-xs outline-none focus:border-teal/50" />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((f, i) => (
            <button key={f} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${i === 0 ? "bg-teal text-primary-foreground shadow-[0_0_16px_-4px_var(--teal-glow)]" : "border border-border bg-surface/40 text-muted-foreground"}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-3">
          {marketplaceCoaches.map((c) => (
            <div key={c.id} className="glass-card p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal to-violet text-sm font-bold shadow-[0_0_16px_-4px_var(--teal-glow)]">{c.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold">{c.name}</div>
                    <div className="flex items-center gap-0.5 text-xs font-bold text-amber">
                      <Star className="size-3 fill-current" /> {c.rating}
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground">{c.specialty} · {c.reviews} reviews</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.tags.map((t) => <span key={t} className="rounded-full bg-teal/10 px-2 py-0.5 text-[9px] font-semibold text-teal">{t}</span>)}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div><span className="text-sm font-bold gradient-text">${c.price}</span><span className="text-[10px] text-muted-foreground">/mo</span></div>
                    <button className="rounded-full bg-gradient-to-r from-teal to-violet px-4 py-1.5 text-[11px] font-bold text-primary-foreground shadow-[0_6px_16px_-4px_var(--teal-glow)]">Book</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
