import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { gyms, type Gym } from "@/lib/mock-data";
import { useState } from "react";
import { motion } from "motion/react";
import { Building2, MapPin, Star, Users, TrendingUp, Check, Eye, MoreHorizontal } from "lucide-react";
import { Tilt3D } from "@/components/admin/tilt-3d";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/gyms")({
  component: GymsPage,
});

const statusStyle: Record<Gym["status"], string> = {
  active: "bg-emerald/15 text-emerald",
  pending: "bg-amber/15 text-amber",
  review: "bg-rose/15 text-rose",
};

function GymsPage() {
  const [rows, setRows] = useState(gyms);
  const totalMembers = rows.reduce((s, g) => s + g.members, 0);
  const totalRevenue = rows.reduce((s, g) => s + g.revenue, 0);

  return (
    <AdminShell title="Gym Approvals">
      <Toaster theme="dark" position="bottom-right" />
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Partner Gyms", value: rows.length, icon: Building2, tone: "teal" },
            { label: "Total Members", value: totalMembers.toLocaleString(), icon: Users, tone: "violet" },
            { label: "Monthly Revenue", value: `$${(totalRevenue / 1000).toFixed(1)}K`, icon: TrendingUp, tone: "emerald" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Tilt3D>
                  <div className="glass-card flex items-center gap-4 p-5">
                    <div className={`grid size-12 place-items-center rounded-xl bg-${s.tone}/15 text-${s.tone}`}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Tilt3D>
                <div className="glass-card relative overflow-hidden p-5">
                  <div className="absolute -right-8 -top-8 size-32 rounded-full bg-teal/15 blur-3xl" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-2">
                      <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet text-lg font-bold text-primary-foreground">
                        {g.name[0]}
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${statusStyle[g.status]}`}>
                        {g.status}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-bold">{g.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" /> {g.city}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
                      <Stat label="Members" value={g.members.toLocaleString()} />
                      <Stat label="MRR" value={`$${(g.revenue / 1000).toFixed(1)}K`} />
                      <Stat label="Rating" value={g.rating.toFixed(1)} icon={<Star className="size-2.5 fill-amber text-amber" />} />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Owner: <span className="text-foreground">{g.owner}</span></span>
                    </div>

                    {g.status !== "active" && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => {
                            setRows((r) => r.map((x) => x.id === g.id ? { ...x, status: "active" } : x));
                            toast.success(`${g.name} approved`);
                          }}
                          className="flex-1 rounded-full bg-gradient-to-r from-teal to-emerald py-2 text-xs font-bold text-primary-foreground shadow-[0_6px_20px_-6px_var(--teal-glow)] hover:scale-[1.02] transition-transform"
                        >
                          <Check className="mr-1 inline size-3.5" /> Approve
                        </button>
                        <button className="grid size-9 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-foreground">
                          <Eye className="size-4" />
                        </button>
                      </div>
                    )}
                    {g.status === "active" && (
                      <div className="mt-4 flex items-center justify-between text-xs">
                        <button className="text-teal hover:underline">Manage →</button>
                        <button className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-white/5">
                          <MoreHorizontal className="size-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm font-bold">
        {icon}
        {value}
      </div>
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
