import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAsUser, requireAuth } from "../supabase";

export default defineTool({
  name: "list_food_prices",
  title: "List town food prices",
  description: "List current food prices in the athlete's town for AI meal planning.",
  inputSchema: {
    city: z.string().optional().describe("City filter; defaults to 'default'"),
    category: z.string().optional().describe("Optional category filter: protein, carb, fat, fruit"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ city, category }, ctx) => {
    const err = requireAuth(ctx);
    if (err) return err;
    const sb = supabaseAsUser(ctx);
    let q = sb.from("food_prices").select("name, category, price_cents, unit, protein_g, calories, city").eq("city", city ?? "default");
    if (category) q = q.eq("category", category);
    const { data, error } = await q.order("price_cents");
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { foods: data ?? [] },
    };
  },
});
