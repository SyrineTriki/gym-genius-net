import { defineTool } from "@lovable.dev/mcp-js";
import { supabaseAsUser, requireAuth } from "../supabase";

export default defineTool({
  name: "get_my_profile",
  title: "Get my profile",
  description: "Return the signed-in FitForge user's profile and roles.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    const err = requireAuth(ctx);
    if (err) return err;
    const sb = supabaseAsUser(ctx);
    const [{ data: profile }, { data: roles }] = await Promise.all([
      sb.from("profiles").select("display_name, gym_name, avatar_url").eq("id", ctx.getUserId()!).maybeSingle(),
      sb.from("user_roles").select("role").eq("user_id", ctx.getUserId()!),
    ]);
    const out = {
      user_id: ctx.getUserId(),
      email: ctx.getUserEmail(),
      profile: profile ?? null,
      roles: (roles ?? []).map((r) => r.role),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      structuredContent: out,
    };
  },
});
