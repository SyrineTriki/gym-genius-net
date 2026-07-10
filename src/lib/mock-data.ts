// Mock data for the admin dashboard — pure frontend demo, no backend.

export const kpis = [
  { id: "users", label: "Total Users", value: 52400, display: "52,400", delta: "+11.2k", trend: "up" as const, icon: "users", tone: "teal" as const },
  { id: "coaches", label: "Active Coaches", value: 1284, display: "1,284", delta: "+148", trend: "up" as const, icon: "coach", tone: "violet" as const },
  { id: "gyms", label: "Partner Gyms", value: 340, display: "340", delta: "+28", trend: "up" as const, icon: "gym", tone: "emerald" as const },
  { id: "revenue", label: "Platform Revenue", value: 381000, display: "$381K", delta: "+28%", trend: "up" as const, icon: "revenue", tone: "teal" as const },
  { id: "approvals", label: "Pending Approvals", value: 47, display: "47", delta: "urgent", trend: "flat" as const, icon: "warn" as const, tone: "amber" as const },
  { id: "tickets", label: "Support Tickets", value: 12, display: "12", delta: "-8", trend: "down" as const, icon: "chat", tone: "rose" as const },
];

export const growthData = [
  { month: "Jan", users: 12000, revenue: 42000 },
  { month: "Feb", users: 15400, revenue: 51000 },
  { month: "Mar", users: 21000, revenue: 68000 },
  { month: "Apr", users: 28800, revenue: 92000 },
  { month: "May", users: 39200, revenue: 148000 },
  { month: "Jun", users: 52400, revenue: 226000 },
];

export const pendingActions = [
  { id: "coach", label: "Coach Verification", count: 23, tone: "violet" as const, href: "/coaches" },
  { id: "gym", label: "Gym Approvals", count: 8, tone: "emerald" as const, href: "/gyms" },
  { id: "content", label: "Content Review", count: 12, tone: "teal" as const, href: "/users" },
  { id: "refund", label: "Refund Requests", count: 4, tone: "rose" as const, href: "/users" },
];

export type UserRole = "athlete" | "coach" | "admin";
export type UserStatus = "active" | "pending" | "banned";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  gym: string;
  joined: string;
  membership: "Free" | "Basic" | "Pro" | "Elite";
  lastActive: string;
};

export const users: UserRow[] = [
  { id: "U-10822", name: "Julian Black", email: "julian@ironpulse.io", role: "athlete", status: "active", gym: "Metro East", joined: "2024-04-12", membership: "Elite", lastActive: "2m ago" },
  { id: "U-10844", name: "Riley Mercer", email: "riley.m@fitforge.app", role: "athlete", status: "pending", gym: "Metro East", joined: "2025-01-04", membership: "Basic", lastActive: "1h ago" },
  { id: "U-10851", name: "Elena Kostas", email: "elena.k@coach.io", role: "coach", status: "active", gym: "Downtown Loft", joined: "2023-11-22", membership: "Pro", lastActive: "just now" },
  { id: "U-10902", name: "Sasha Vane", email: "sasha@ironhouse.com", role: "athlete", status: "banned", gym: "Metro East", joined: "2024-08-18", membership: "Free", lastActive: "3d ago" },
  { id: "U-10940", name: "David Miller", email: "drax@crossfit.io", role: "coach", status: "pending", gym: "Harbor Fitness", joined: "2025-02-10", membership: "Pro", lastActive: "5h ago" },
  { id: "U-10998", name: "Amara Osei", email: "amara@olympia.club", role: "athlete", status: "active", gym: "Olympia Club", joined: "2024-06-30", membership: "Elite", lastActive: "12m ago" },
  { id: "U-11020", name: "Nikolai Petrov", email: "niko@ironpulse.io", role: "athlete", status: "active", gym: "Metro East", joined: "2024-09-05", membership: "Basic", lastActive: "45m ago" },
  { id: "U-11041", name: "Chloé Rousseau", email: "chloe@parisfit.fr", role: "coach", status: "active", gym: "Downtown Loft", joined: "2023-05-14", membership: "Pro", lastActive: "8m ago" },
  { id: "U-11077", name: "Marcus Rhodes", email: "marcus@fitforge.app", role: "admin", status: "active", gym: "— all —", joined: "2022-01-02", membership: "Elite", lastActive: "now" },
];

export type CoachApp = {
  id: string;
  name: string;
  avatar: string;
  cert: string;
  years: number;
  specialty: string;
  submitted: string;
  score: number;
};

export const coachApplications: CoachApp[] = [
  { id: "C-401", name: "Elena Kostas", avatar: "EK", cert: "NASM-CPT", years: 6, specialty: "Strength & Conditioning", submitted: "2h ago", score: 92 },
  { id: "C-402", name: "David 'Drax' Miller", avatar: "DM", cert: "CrossFit L2", years: 4, specialty: "Functional Fitness", submitted: "5h ago", score: 78 },
  { id: "C-403", name: "Sasha Vane", avatar: "SV", cert: "USAW Level 1", years: 3, specialty: "Olympic Weightlifting", submitted: "1d ago", score: 85 },
  { id: "C-404", name: "Yuki Tanaka", avatar: "YT", cert: "NSCA-CSCS", years: 8, specialty: "Athletic Performance", submitted: "2d ago", score: 96 },
  { id: "C-405", name: "Marco Bianchi", avatar: "MB", cert: "ACE-CPT", years: 2, specialty: "General Fitness", submitted: "3d ago", score: 64 },
];

export type Gym = {
  id: string;
  name: string;
  city: string;
  members: number;
  revenue: number;
  status: "active" | "pending" | "review";
  rating: number;
  owner: string;
};

export const gyms: Gym[] = [
  { id: "G-01", name: "Metro East Facility", city: "Brooklyn, NY", members: 842, revenue: 48200, status: "active", rating: 4.8, owner: "Marcus Rhodes" },
  { id: "G-02", name: "Downtown Loft", city: "Los Angeles, CA", members: 512, revenue: 31400, status: "active", rating: 4.7, owner: "Chloé Rousseau" },
  { id: "G-03", name: "Harbor Fitness", city: "Miami, FL", members: 288, revenue: 18900, status: "pending", rating: 4.5, owner: "Diego Alvarez" },
  { id: "G-04", name: "Olympia Club", city: "Chicago, IL", members: 964, revenue: 62100, status: "active", rating: 4.9, owner: "Amara Osei" },
  { id: "G-05", name: "Northside Iron", city: "Seattle, WA", members: 156, revenue: 9800, status: "review", rating: 4.2, owner: "Kai Nakamura" },
  { id: "G-06", name: "Peak Performance", city: "Denver, CO", members: 402, revenue: 26500, status: "pending", rating: 4.6, owner: "Riley Mercer" },
];

export type Food = {
  id: string;
  name: string;
  category: "Protein" | "Carbs" | "Fats" | "Produce" | "Dairy" | "Supplement";
  price: number;
  unit: string;
  city: string;
  updated: string;
  trend: "up" | "down" | "flat";
};

export const foods: Food[] = [
  { id: "F-01", name: "Chicken Breast (organic)", category: "Protein", price: 8.9, unit: "/ lb", city: "New York", updated: "2h ago", trend: "up" },
  { id: "F-02", name: "Wild Alaskan Salmon", category: "Protein", price: 14.2, unit: "/ lb", city: "New York", updated: "1d ago", trend: "flat" },
  { id: "F-03", name: "Grass-fed Whey Protein", category: "Supplement", price: 2.45, unit: "/ serving", city: "New York", updated: "5h ago", trend: "down" },
  { id: "F-04", name: "Brown Rice", category: "Carbs", price: 1.2, unit: "/ lb", city: "New York", updated: "3d ago", trend: "flat" },
  { id: "F-05", name: "Sweet Potato", category: "Carbs", price: 1.6, unit: "/ lb", city: "New York", updated: "4h ago", trend: "up" },
  { id: "F-06", name: "Avocado (Hass)", category: "Fats", price: 1.85, unit: "/ each", city: "New York", updated: "6h ago", trend: "up" },
  { id: "F-07", name: "Greek Yogurt (2%)", category: "Dairy", price: 5.4, unit: "/ 32oz", city: "New York", updated: "1d ago", trend: "flat" },
  { id: "F-08", name: "Spinach (fresh)", category: "Produce", price: 3.2, unit: "/ lb", city: "New York", updated: "8h ago", trend: "down" },
  { id: "F-09", name: "Almonds (raw)", category: "Fats", price: 9.8, unit: "/ lb", city: "New York", updated: "2d ago", trend: "up" },
  { id: "F-10", name: "Cottage Cheese", category: "Dairy", price: 4.1, unit: "/ 16oz", city: "New York", updated: "12h ago", trend: "flat" },
];

export const regionData = [
  { region: "N. America", users: 24800, revenue: 182000 },
  { region: "Europe", users: 14200, revenue: 98000 },
  { region: "Asia", users: 8600, revenue: 54000 },
  { region: "LATAM", users: 3200, revenue: 21000 },
  { region: "MENA", users: 1600, revenue: 12000 },
];

export const membershipMix = [
  { name: "Elite", value: 18, fill: "var(--color-teal)" },
  { name: "Pro", value: 32, fill: "var(--color-violet)" },
  { name: "Basic", value: 34, fill: "var(--color-amber)" },
  { name: "Free", value: 16, fill: "var(--color-rose)" },
];

export const engagementData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  active: Math.round(400 + Math.sin(i / 3) * 300 + Math.random() * 120),
}));
