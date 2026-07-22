import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseAsUser, requireAuth } from "../supabase";

export default defineTool({
  name: "log_workout",
  title: "Log a workout",
  description: "Log a completed workout for the signed-in athlete.",
  inputSchema: {
    name: z.string().min(1).describe("Workout name, e.g. 'Push day'"),
    focus: z.string().optional().describe("Muscle group / focus, e.g. 'chest, triceps'"),
    duration_min: z.number().int().min(1).max(600).optional(),
    notes: z.string().max(1000).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    const err = requireAuth(ctx);
    if (err) return err;
    const sb = supabaseAsUser(ctx);
    const { data, error } = await sb
      .from("workouts")
      .insert({
        user_id: ctx.getUserId()!,
        name: input.name,
        focus: input.focus ?? null,
        duration_min: input.duration_min ?? null,
        notes: input.notes ?? null,
      })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Logged workout '${input.name}' (id ${data.id}).` }],
      structuredContent: { workout: data },
    };
  },
});
