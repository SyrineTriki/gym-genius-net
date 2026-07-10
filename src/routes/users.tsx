import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { users, type UserRow } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Ban,
  Trash2,
  CheckCircle2,
  Mail,
  X,
} from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/users")({
  component: UsersPage,
});

const roleTone: Record<UserRow["role"], string> = {
  athlete: "bg-teal/15 text-teal",
  coach: "bg-violet/15 text-violet",
  admin: "bg-amber/15 text-amber",
};

const statusTone: Record<UserRow["status"], { dot: string; label: string }> = {
  active: { dot: "bg-emerald shadow-[0_0_6px_var(--emerald)]", label: "text-emerald" },
  pending: { dot: "bg-amber shadow-[0_0_6px_var(--amber)]", label: "text-amber" },
  banned: { dot: "bg-rose shadow-[0_0_6px_var(--rose)]", label: "text-rose" },
};

function UsersPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"all" | UserRow["role"]>("all");
  const [showAdd, setShowAdd] = useState(false);
  const [rows, setRows] = useState(users);

  const filtered = useMemo(
    () =>
      rows.filter(
        (u) =>
          (role === "all" || u.role === role) &&
          (u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase()) ||
            u.id.toLowerCase().includes(query.toLowerCase())),
      ),
    [rows, query, role],
  );

  return (
    <AdminShell title="Users">
      <Toaster theme="dark" position="bottom-right" />
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Total", value: rows.length, tone: "text-teal" },
            { label: "Active", value: rows.filter((u) => u.status === "active").length, tone: "text-emerald" },
            { label: "Pending", value: rows.filter((u) => u.status === "pending").length, tone: "text-amber" },
            { label: "Banned", value: rows.filter((u) => u.status === "banned").length, tone: "text-rose" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              <div className={`mt-1 text-2xl font-bold ${s.tone}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="glass-card overflow-hidden">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, or ID…"
                className="h-9 w-full rounded-full border border-border bg-surface/60 pl-9 pr-4 text-sm outline-none focus:border-teal/50"
              />
            </div>
            <div className="flex gap-1 rounded-full border border-border bg-surface/60 p-1 text-xs font-semibold">
              {(["all", "athlete", "coach", "admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-full px-3 py-1 capitalize transition-colors ${
                    role === r ? "bg-teal/15 text-teal" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <Filter className="size-3.5" /> Filter
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <UserPlus className="size-3.5" /> Add user
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="px-6 py-3 font-semibold">User</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Gym</th>
                  <th className="px-6 py-3 font-semibold">Membership</th>
                  <th className="px-6 py-3 font-semibold">Last Active</th>
                  <th className="px-6 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                <AnimatePresence>
                  {filtered.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.02 }}
                      className="group transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-teal/40 to-violet/40 text-[11px] font-bold">
                            {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-medium">{u.name}</div>
                            <div className="truncate font-mono text-[10px] text-muted-foreground">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${roleTone[u.role]}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`size-1.5 rounded-full ${statusTone[u.status].dot}`} />
                          <span className={`text-xs font-semibold capitalize ${statusTone[u.status].label}`}>{u.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">{u.gym}</td>
                      <td className="px-6 py-4">
                        <span className="rounded border border-border bg-surface/60 px-2 py-0.5 text-[10px] font-bold uppercase">
                          {u.membership}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{u.lastActive}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <IconBtn onClick={() => toast.success(`Edit ${u.name}`)} label="Edit"><Edit3 className="size-3.5" /></IconBtn>
                          <IconBtn onClick={() => {
                            setRows((r) => r.map((x) => x.id === u.id ? { ...x, status: x.status === "banned" ? "active" : "banned" } : x));
                            toast(`${u.name} ${u.status === "banned" ? "unbanned" : "banned"}`);
                          }} label="Ban"><Ban className="size-3.5" /></IconBtn>
                          <IconBtn onClick={() => {
                            setRows((r) => r.filter((x) => x.id !== u.id));
                            toast.error(`Deleted ${u.name}`);
                          }} label="Delete" danger><Trash2 className="size-3.5" /></IconBtn>
                          <IconBtn label="More"><MoreHorizontal className="size-3.5" /></IconBtn>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center text-sm text-muted-foreground">No users match your search.</div>
            )}
          </div>
        </div>
      </div>

      <AddUserModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onCreate={(u) => {
          setRows((r) => [u, ...r]);
          toast.success(`Invitation sent to ${u.email}`);
          setShowAdd(false);
        }}
      />
    </AdminShell>
  );
}

function IconBtn({ children, onClick, label, danger }: { children: React.ReactNode; onClick?: () => void; label: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`grid size-8 place-items-center rounded-lg border border-border bg-surface/60 transition-all hover:scale-105 ${
        danger ? "text-rose hover:border-rose/50 hover:bg-rose/10" : "text-muted-foreground hover:border-teal/50 hover:text-teal"
      }`}
    >
      {children}
    </button>
  );
}

function AddUserModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (u: UserRow) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRow["role"]>("athlete");
  const [mode, setMode] = useState<"invite" | "link">("invite");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card relative w-full max-w-md overflow-hidden p-6"
          >
            <button onClick={onClose} className="absolute right-4 top-4 grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-white/5 hover:text-foreground">
              <X className="size-4" />
            </button>
            <h3 className="text-lg font-bold">Add a user</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Send an invitation email or link an existing FitForge account.
            </p>

            <div className="mt-5 flex gap-1 rounded-full border border-border bg-surface/60 p-1 text-xs font-semibold">
              <button
                onClick={() => setMode("invite")}
                className={`flex-1 rounded-full px-3 py-1.5 transition-colors ${mode === "invite" ? "bg-teal/15 text-teal" : "text-muted-foreground"}`}
              >
                Create new
              </button>
              <button
                onClick={() => setMode("link")}
                className={`flex-1 rounded-full px-3 py-1.5 transition-colors ${mode === "link" ? "bg-teal/15 text-teal" : "text-muted-foreground"}`}
              >
                Link existing
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <Field label="Full name">
                <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Jane Doe" />
              </Field>
              <Field label="Email">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input-field" placeholder="jane@gym.com" />
              </Field>
              <Field label="Role">
                <div className="flex gap-2">
                  {(["athlete", "coach"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition-all ${
                        role === r ? "border-teal bg-teal/10 text-teal" : "border-border bg-surface/60 text-muted-foreground"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-border/60 bg-surface/40 p-3 text-xs text-muted-foreground">
              {mode === "invite" ? <Mail className="size-4 shrink-0 text-teal" /> : <CheckCircle2 className="size-4 shrink-0 text-teal" />}
              <span>
                {mode === "invite"
                  ? "Account stays inactive until they verify their email."
                  : "Existing account will be linked to your gym immediately."}
              </span>
            </div>

            <button
              disabled={!name || !email}
              onClick={() =>
                onCreate({
                  id: `U-${Math.floor(Math.random() * 90000) + 10000}`,
                  name,
                  email,
                  role,
                  status: mode === "invite" ? "pending" : "active",
                  gym: "Metro East",
                  joined: new Date().toISOString().slice(0, 10),
                  membership: "Basic",
                  lastActive: "just now",
                })
              }
              className="mt-5 w-full rounded-full bg-gradient-to-r from-teal to-violet px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_var(--teal-glow)] transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              {mode === "invite" ? "Send invitation" : "Link account"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
      <style>{`.input-field { height: 40px; width: 100%; border-radius: 10px; border: 1px solid var(--color-border); background: oklch(0.22 0.028 240 / 0.6); padding: 0 12px; font-size: 14px; outline: none; }
      .input-field:focus { border-color: var(--color-teal); box-shadow: 0 0 0 4px oklch(0.82 0.14 180 / 0.1); }`}</style>
    </label>
  );
}
