import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { foods, type Food } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, TrendingUp, TrendingDown, Minus, Edit3, Sparkles, MapPin } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Tilt3D } from "@/components/admin/tilt-3d";

export const Route = createFileRoute("/food")({
  component: FoodPage,
});

const categoryColor: Record<Food["category"], string> = {
  Protein: "bg-rose/15 text-rose",
  Carbs: "bg-amber/15 text-amber",
  Fats: "bg-violet/15 text-violet",
  Produce: "bg-emerald/15 text-emerald",
  Dairy: "bg-teal/15 text-teal",
  Supplement: "bg-primary/15 text-primary",
};

function FoodPage() {
  const [rows, setRows] = useState(foods);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Food["category"]>("All");
  const [editing, setEditing] = useState<Food | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (f) =>
          (category === "All" || f.category === category) &&
          f.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [rows, query, category],
  );

  return (
    <AdminShell title="Food Database">
      <Toaster theme="dark" position="bottom-right" />
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* AI feed banner */}
        <Tilt3D intensity={3}>
          <div className="glass-card relative overflow-hidden p-6">
            <div className="absolute -right-16 -top-16 size-52 rounded-full bg-teal/25 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-violet/25 blur-3xl" />
            <div className="relative flex flex-wrap items-center gap-4">
              <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-teal to-violet animate-pulse-glow">
                <Sparkles className="size-5 text-primary-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-teal">Live · powers meal recommender</div>
                <h2 className="text-lg font-bold">
                  {rows.length} foods indexed in <span className="gradient-text">New York</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Your athlete app pulls these prices to suggest cheapest meals matching each user's budget & macros.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs">
                <MapPin className="size-3.5 text-teal" />
                <span className="font-semibold">New York</span>
                <button className="font-mono text-[10px] text-teal hover:underline">CHANGE</button>
              </div>
            </div>
          </div>
        </Tilt3D>

        <div className="glass-card overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search foods…"
                className="h-9 w-full rounded-full border border-border bg-surface/60 pl-9 pr-4 text-sm outline-none focus:border-teal/50"
              />
            </div>
            <div className="flex flex-wrap gap-1 rounded-full border border-border bg-surface/60 p-1 text-[11px] font-semibold">
              {(["All", "Protein", "Carbs", "Fats", "Produce", "Dairy", "Supplement"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    category === c ? "bg-teal/15 text-teal" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setEditing({
                  id: `F-${Math.floor(Math.random() * 900) + 100}`,
                  name: "",
                  category: "Protein",
                  price: 0,
                  unit: "/ lb",
                  city: "New York",
                  updated: "now",
                  trend: "flat",
                })
              }
              className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Plus className="size-3.5" /> Add food
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-3 font-semibold">Food</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">Trend</th>
                  <th className="px-6 py-3 font-semibold">Updated</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <AnimatePresence>
                  {filtered.map((f, i) => {
                    const Trend = f.trend === "up" ? TrendingUp : f.trend === "down" ? TrendingDown : Minus;
                    const trendTone = f.trend === "up" ? "text-rose" : f.trend === "down" ? "text-emerald" : "text-muted-foreground";
                    return (
                      <motion.tr
                        key={f.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.02 }}
                        className="group transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium">{f.name}</div>
                          <div className="font-mono text-[10px] text-muted-foreground">{f.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${categoryColor[f.category]}`}>
                            {f.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-mono text-base font-bold">${f.price.toFixed(2)}</div>
                          <div className="text-[10px] text-muted-foreground">{f.unit}</div>
                        </td>
                        <td className={`px-6 py-4 ${trendTone}`}>
                          <Trend className="inline size-4" />
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{f.updated}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setEditing(f)}
                            className="grid size-8 place-items-center rounded-lg border border-border bg-surface/60 text-muted-foreground opacity-0 transition-all hover:border-teal/50 hover:text-teal group-hover:opacity-100"
                          >
                            <Edit3 className="size-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EditFood
        food={editing}
        onClose={() => setEditing(null)}
        onSave={(f) => {
          setRows((r) => {
            const exists = r.some((x) => x.id === f.id);
            return exists ? r.map((x) => (x.id === f.id ? f : x)) : [f, ...r];
          });
          toast.success(`${f.name} saved — AI recommender updated`);
          setEditing(null);
        }}
      />
    </AdminShell>
  );
}

function EditFood({ food, onClose, onSave }: { food: Food | null; onClose: () => void; onSave: (f: Food) => void }) {
  const [state, setState] = useState<Food | null>(food);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setState(food), [food?.id]);
  if (!food || !state) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card w-full max-w-md p-6"
        >
          <h3 className="text-lg font-bold">{food.name ? "Edit food" : "Add food"}</h3>
          <p className="mt-1 text-xs text-muted-foreground">Prices sync to the AI meal recommender.</p>

          <div className="mt-5 space-y-3">
            <FField label="Name">
              <input
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                className="h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm outline-none focus:border-teal"
                placeholder="e.g. Wild Salmon"
              />
            </FField>
            <div className="grid grid-cols-2 gap-3">
              <FField label="Price (USD)">
                <input
                  type="number"
                  step="0.01"
                  value={state.price}
                  onChange={(e) => setState({ ...state, price: parseFloat(e.target.value) || 0 })}
                  className="h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm outline-none focus:border-teal"
                />
              </FField>
              <FField label="Unit">
                <input
                  value={state.unit}
                  onChange={(e) => setState({ ...state, unit: e.target.value })}
                  className="h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm outline-none focus:border-teal"
                />
              </FField>
            </div>
            <FField label="Category">
              <div className="flex flex-wrap gap-1.5">
                {(["Protein", "Carbs", "Fats", "Produce", "Dairy", "Supplement"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setState({ ...state, category: c })}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
                      state.category === c ? "border-teal bg-teal/15 text-teal" : "border-border bg-surface/60 text-muted-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </FField>
          </div>

          <div className="mt-6 flex gap-2">
            <button onClick={onClose} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
              Cancel
            </button>
            <button
              onClick={() => onSave({ ...state, updated: "now" })}
              disabled={!state.name || state.price <= 0}
              className="flex-1 rounded-full bg-gradient-to-r from-teal to-violet py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--teal-glow)] hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}
