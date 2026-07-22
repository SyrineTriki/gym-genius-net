import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAsUser, requireAuth } from "../supabase";

export default defineTool({
  name: "suggest_cheap_meal",
  title: "Suggest cheap high-protein meal",
  description: "Suggest an affordable high-protein meal built from the town's cheapest foods within a budget (in cents).",
  inputSchema: {
    budget_cents: z.number().int().min(100).max(50000).describe("Budget in cents"),
    min_protein_g: z.number().int().min(0).max(300).default(30),
    city: z.string().optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: false },
  handler: async ({ budget_cents, min_protein_g, city }, ctx) => {
    const err = requireAuth(ctx);
    if (err) return err;
    const sb = supabaseAsUser(ctx);
    const { data, error } = await sb
      .from("food_prices")
      .select("name, category, price_cents, unit, protein_g, calories")
      .eq("city", city ?? "default")
      .order("price_cents");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const foods = (data ?? []).slice();
    // Greedy: pick cheapest protein first, then a carb, then a fruit/fat, staying under budget.
    const picks: typeof foods = [];
    let spent = 0;
    let protein = 0;
    const wantCategories = ["protein", "carb", "fruit", "fat"];
    for (const cat of wantCategories) {
      const candidate = foods.find((f) => f.category === cat && spent + f.price_cents <= budget_cents && !picks.includes(f));
      if (candidate) {
        picks.push(candidate);
        spent += candidate.price_cents;
        protein += Number(candidate.protein_g ?? 0);
      }
    }
    // Top up protein if needed
    while (protein < (min_protein_g ?? 30)) {
      const extra = foods.find((f) => f.category === "protein" && spent + f.price_cents <= budget_cents && !picks.includes(f));
      if (!extra) break;
      picks.push(extra);
      spent += extra.price_cents;
      protein += Number(extra.protein_g ?? 0);
    }

    const result = {
      items: picks.map((p) => ({ name: p.name, price_cents: p.price_cents, unit: p.unit, protein_g: Number(p.protein_g ?? 0) })),
      total_cents: spent,
      total_protein_g: protein,
      within_budget: spent <= budget_cents,
      met_protein_goal: protein >= (min_protein_g ?? 30),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
