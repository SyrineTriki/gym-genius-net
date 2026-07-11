import { createFileRoute } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/athlete/phone-frame";
import { scannedFoods } from "@/lib/mock-data-extra";
import { Camera, Zap, Plus } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/app/scanner")({ component: ScannerPage });

function ScannerPage() {
  return (
    <PhoneFrame title="Food Scanner">
      <div className="space-y-4 p-4">
        {/* Camera preview */}
        <div className="glass-card relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/10 via-violet/5 to-transparent" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mx-auto grid size-20 place-items-center rounded-full bg-teal/15 backdrop-blur-xl">
                <Camera className="size-10 text-teal" />
              </motion.div>
              <div className="mt-3 text-xs text-muted-foreground">Point at your plate</div>
            </div>
          </div>
          {/* Scanner grid overlay */}
          <div aria-hidden className="pointer-events-none absolute inset-4 rounded-2xl border-2 border-teal/40">
            {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p, i) => (
              <div key={i} className={`absolute size-4 border-teal ${p}`} style={{ borderTopWidth: p.includes("top") ? 2 : 0, borderBottomWidth: p.includes("bottom") ? 2 : 0, borderLeftWidth: p.includes("left") ? 2 : 0, borderRightWidth: p.includes("right") ? 2 : 0 }} />
            ))}
            <motion.div animate={{ y: [0, 180, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-x-0 top-0 h-0.5 bg-teal shadow-[0_0_12px_var(--teal-glow)]" />
          </div>
          <button className="absolute bottom-4 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-teal shadow-[0_0_24px_-4px_var(--teal-glow)]">
            <Zap className="size-6 fill-primary-foreground text-primary-foreground" />
          </button>
        </div>

        {/* Detected foods */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-bold">Detected</div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">AI · vision-v3</span>
          </div>
          <div className="space-y-2">
            {scannedFoods.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex items-center gap-3 p-3"
              >
                <div className="grid size-11 place-items-center rounded-lg bg-teal/15 text-lg">🍽️</div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold">{f.name}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                    <span className="text-teal">{f.cal} kcal</span>
                    <span>·</span>
                    <span>P {f.protein}g</span>
                    <span>·</span>
                    <span>C {f.carbs}g</span>
                    <span>·</span>
                    <span>F {f.fats}g</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${f.confidence > 95 ? "text-emerald" : "text-teal"}`}>{f.confidence}%</div>
                  <div className="text-[9px] text-muted-foreground">confidence</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-violet py-3 text-sm font-bold text-primary-foreground shadow-[0_10px_30px_-8px_var(--teal-glow)]"><Plus className="size-4" /> Log meal (441 kcal)</button>
      </div>
    </PhoneFrame>
  );
}
