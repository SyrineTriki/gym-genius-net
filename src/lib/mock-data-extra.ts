// Extra mock data for Super Admin, Coach, and Athlete apps.

export const superKpis = [
  { id: "tenants", label: "Active Tenants", value: 128, display: "128", delta: "+12", tone: "teal" as const },
  { id: "mrr", label: "MRR", value: 184200, display: "$184.2K", delta: "+18%", tone: "emerald" as const },
  { id: "uptime", label: "Uptime (30d)", value: 99.98, display: "99.98%", delta: "+0.02", tone: "violet" as const },
  { id: "flags", label: "Active Feature Flags", value: 34, display: "34", delta: "+3", tone: "amber" as const },
];

export const tenants = [
  { id: "T-01", name: "IronPulse Group", plan: "Enterprise", gyms: 24, mrr: 48000, health: 98, status: "healthy" as const },
  { id: "T-02", name: "Metro Fitness Co", plan: "Growth", gyms: 12, mrr: 21800, health: 91, status: "healthy" as const },
  { id: "T-03", name: "Olympia Chain", plan: "Enterprise", gyms: 34, mrr: 62400, health: 87, status: "warning" as const },
  { id: "T-04", name: "Harbor Fit Studio", plan: "Starter", gyms: 2, mrr: 1800, health: 74, status: "warning" as const },
  { id: "T-05", name: "Peak Performance", plan: "Growth", gyms: 8, mrr: 14200, health: 96, status: "healthy" as const },
  { id: "T-06", name: "Northside Iron", plan: "Starter", gyms: 1, mrr: 900, health: 62, status: "critical" as const },
];

export const auditEvents = [
  { id: "A1", actor: "marcus@fitforge.app", action: "role.granted", target: "elena@coach.io", severity: "info" as const, time: "2m ago" },
  { id: "A2", actor: "system", action: "backup.completed", target: "db-primary", severity: "info" as const, time: "18m ago" },
  { id: "A3", actor: "riley@fitforge.app", action: "tenant.suspended", target: "T-06 Northside Iron", severity: "warn" as const, time: "1h ago" },
  { id: "A4", actor: "system", action: "rate_limit.exceeded", target: "api /v1/food/search", severity: "warn" as const, time: "3h ago" },
  { id: "A5", actor: "unknown", action: "auth.failed", target: "admin@fitforge.app", severity: "critical" as const, time: "5h ago" },
  { id: "A6", actor: "marcus@fitforge.app", action: "flag.enabled", target: "ai_coach_v2", severity: "info" as const, time: "1d ago" },
];

export const featureFlags = [
  { id: "F1", key: "ai_coach_v2", desc: "GPT-4 coach persona with memory", rollout: 100, env: "prod", enabled: true },
  { id: "F2", key: "food_scanner_beta", desc: "Camera-based nutrition detection", rollout: 45, env: "prod", enabled: true },
  { id: "F3", key: "budget_optimizer", desc: "Cheapest meal plan generator", rollout: 20, env: "prod", enabled: true },
  { id: "F4", key: "marketplace_v3", desc: "New coach discovery ranking", rollout: 0, env: "staging", enabled: false },
  { id: "F5", key: "workout_ar", desc: "AR form correction (experimental)", rollout: 5, env: "dev", enabled: true },
];

export const systemServices = [
  { name: "API Gateway", status: "operational" as const, latency: 42, uptime: 99.99 },
  { name: "AI Inference", status: "operational" as const, latency: 380, uptime: 99.94 },
  { name: "Auth Service", status: "operational" as const, latency: 28, uptime: 100 },
  { name: "Payment Service", status: "degraded" as const, latency: 210, uptime: 99.82 },
  { name: "Media Storage", status: "operational" as const, latency: 68, uptime: 99.98 },
  { name: "Realtime Chat", status: "operational" as const, latency: 55, uptime: 99.91 },
];

// COACH
export const coachStats = [
  { id: "revenue", label: "Monthly Revenue", value: 12400, display: "$12.4K", delta: "+22%", tone: "emerald" as const },
  { id: "clients", label: "Active Clients", value: 38, display: "38", delta: "+4", tone: "teal" as const },
  { id: "sessions", label: "Sessions (wk)", value: 24, display: "24", delta: "+3", tone: "violet" as const },
  { id: "rating", label: "Avg Rating", value: 4.9, display: "4.9", delta: "+0.1", tone: "amber" as const },
];

export const coachClients = [
  { id: "CL-1", name: "Marcus Chen", plan: "Elite 3x/wk", progress: 78, streak: 24, next: "Tomorrow 9:00", status: "on-track" as const, avatar: "MC" },
  { id: "CL-2", name: "Sofia Lin", plan: "Pro 2x/wk", progress: 52, streak: 12, next: "Today 17:30", status: "on-track" as const, avatar: "SL" },
  { id: "CL-3", name: "Kai Nakamura", plan: "Elite 4x/wk", progress: 91, streak: 42, next: "Wed 8:00", status: "on-track" as const, avatar: "KN" },
  { id: "CL-4", name: "Rhea Patel", plan: "Basic 1x/wk", progress: 34, streak: 3, next: "Overdue", status: "at-risk" as const, avatar: "RP" },
  { id: "CL-5", name: "Diego Alvarez", plan: "Pro 3x/wk", progress: 66, streak: 18, next: "Fri 6:30", status: "on-track" as const, avatar: "DA" },
  { id: "CL-6", name: "Amara Osei", plan: "Elite 5x/wk", progress: 88, streak: 61, next: "Today 19:00", status: "on-track" as const, avatar: "AO" },
];

export const coachSessions = [
  { id: "S1", client: "Sofia Lin", type: "Strength · Push day", time: "Today 17:30", duration: 60, mode: "in-person" as const },
  { id: "S2", client: "Amara Osei", type: "Hypertrophy · Legs", time: "Today 19:00", duration: 75, mode: "in-person" as const },
  { id: "S3", client: "Marcus Chen", type: "Conditioning · MetCon", time: "Tomorrow 09:00", duration: 45, mode: "remote" as const },
  { id: "S4", client: "Diego Alvarez", type: "Assessment", time: "Fri 06:30", duration: 30, mode: "remote" as const },
  { id: "S5", client: "Kai Nakamura", type: "Olympic lifting", time: "Wed 08:00", duration: 90, mode: "in-person" as const },
];

export const coachRevenue = [
  { week: "W1", value: 2400 }, { week: "W2", value: 2800 }, { week: "W3", value: 3100 },
  { week: "W4", value: 3600 }, { week: "W5", value: 3200 }, { week: "W6", value: 4100 },
  { week: "W7", value: 4400 }, { week: "W8", value: 4800 },
];

export const coachMessages = [
  { id: "M1", from: "Sofia Lin", avatar: "SL", preview: "Can we move tomorrow's session to 6?", time: "4m", unread: true },
  { id: "M2", from: "Marcus Chen", avatar: "MC", preview: "Hit a new PR on deadlift 💪 210kg!", time: "1h", unread: true },
  { id: "M3", from: "Rhea Patel", avatar: "RP", preview: "Sorry I missed the last two…", time: "3h", unread: false },
  { id: "M4", from: "Amara Osei", avatar: "AO", preview: "Meal plan looks great, thanks!", time: "1d", unread: false },
  { id: "M5", from: "Diego Alvarez", avatar: "DA", preview: "Uploaded form check video.", time: "2d", unread: false },
];

// ATHLETE
export const athleteStats = {
  streak: 24, weeklyWorkouts: 4, weeklyGoal: 5, calories: 2180, calorieGoal: 2400,
  protein: 168, proteinGoal: 190, water: 2.1, waterGoal: 3, weight: 78.4, weightDelta: -1.2,
};

export const todayWorkout = {
  name: "Push Day · Hypertrophy",
  duration: "62 min",
  exercises: [
    { name: "Bench Press", sets: "4×8", weight: "82kg", rpe: 8 },
    { name: "Overhead Press", sets: "4×10", weight: "52kg", rpe: 7 },
    { name: "Incline DB Press", sets: "3×12", weight: "28kg", rpe: 8 },
    { name: "Lateral Raises", sets: "4×15", weight: "12kg", rpe: 9 },
    { name: "Tricep Rope", sets: "3×15", weight: "24kg", rpe: 8 },
  ],
};

export const scannedFoods = [
  { name: "Grilled Chicken", confidence: 98, cal: 165, protein: 31, carbs: 0, fats: 3.6 },
  { name: "Brown Rice (1 cup)", confidence: 94, cal: 216, protein: 5, carbs: 45, fats: 1.8 },
  { name: "Steamed Broccoli", confidence: 91, cal: 55, protein: 3.7, carbs: 11, fats: 0.6 },
];

export const budgetMeals = [
  { name: "High-protein oats", cost: 1.8, cal: 480, protein: 32 },
  { name: "Chicken & rice bowl", cost: 3.2, cal: 620, protein: 48 },
  { name: "Tuna wrap", cost: 2.4, cal: 410, protein: 34 },
  { name: "Yogurt + berries", cost: 1.6, cal: 240, protein: 18 },
];

export const weightHistory = [
  { day: "D1", w: 81.2 }, { day: "D7", w: 80.6 }, { day: "D14", w: 80.1 },
  { day: "D21", w: 79.3 }, { day: "D28", w: 78.9 }, { day: "D35", w: 78.4 },
  // predicted
  { day: "D42", w: 77.8, predicted: true }, { day: "D49", w: 77.2, predicted: true },
  { day: "D56", w: 76.7, predicted: true },
];

export const aiChatMessages = [
  { role: "assistant" as const, text: "Morning Alex 👋 Ready for push day? You crushed 82kg×8 last time — let's aim for 84kg." },
  { role: "user" as const, text: "My shoulder feels tight, should I skip OHP?" },
  { role: "assistant" as const, text: "Swap OHP for landmine press (3×10). Same movement pattern, less impingement risk. I'll update today's plan." },
];

export const achievements = [
  { name: "30-Day Streak", desc: "Trained 30 days straight", progress: 80, tone: "teal" as const, icon: "flame" },
  { name: "First 100kg", desc: "Bench 100kg for 1 rep", progress: 82, tone: "violet" as const, icon: "trophy" },
  { name: "10K Steps × 30", desc: "Hit 10K daily for 30 days", progress: 100, tone: "emerald" as const, icon: "footprints" },
  { name: "Protein Master", desc: "Hit protein goal 90 days", progress: 55, tone: "amber" as const, icon: "beef" },
  { name: "Iron Discipline", desc: "Zero missed workouts / month", progress: 100, tone: "rose" as const, icon: "shield" },
  { name: "Meal Prep Pro", desc: "Log meals 60 days", progress: 42, tone: "teal" as const, icon: "utensils" },
];

export const marketplaceCoaches = [
  { id: "MK-1", name: "Elena Kostas", specialty: "Strength", rating: 4.9, reviews: 214, price: 120, avatar: "EK", tags: ["Powerlifting", "Nutrition"] },
  { id: "MK-2", name: "Yuki Tanaka", specialty: "Athletic Perf", rating: 5.0, reviews: 182, price: 180, avatar: "YT", tags: ["Speed", "Recovery"] },
  { id: "MK-3", name: "Chloé Rousseau", specialty: "Physique", rating: 4.8, reviews: 341, price: 95, avatar: "CR", tags: ["Hypertrophy", "Cutting"] },
  { id: "MK-4", name: "David Miller", specialty: "CrossFit", rating: 4.7, reviews: 128, price: 85, avatar: "DM", tags: ["Conditioning", "Oly"] },
];
