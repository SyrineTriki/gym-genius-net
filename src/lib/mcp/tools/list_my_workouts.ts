import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAsUser, requireAuth } from "../supabase";

export default defineTool({
  name: "list_my_workouts",
  title: "List my workouts",
  description: "List the signed-in athlete's recent workouts (most recent first).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(10).describe("Max workouts to return"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    const err = requireAuth(ctx);
    if (err) return err;
    const sb = supabaseAsUser(ctx);
    const { data, error } = await sb
      .from("workouts")
      .select("id, name, focus, duration_min, notes, completed_at")
      .order("completed_at", { ascending: false })
      .limit(limit ?? 10);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { workouts: data ?? [] },
    };
  },
});
