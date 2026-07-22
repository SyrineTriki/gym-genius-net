# Plan: Auth + OAuth MCP for FitForge

Add real user accounts and expose the app as an OAuth-protected MCP server so users can chat with their FitForge data from ChatGPT / Claude / Codex.

## Phase 1 — Backend foundation

1. Enable Lovable Cloud.
2. Add favicon (dumbbell emoji SVG) — used as MCP icon.
3. Migration:
   - `profiles` (id → auth.users, display_name, gym_name, avatar_url)
   - `app_role` enum: `athlete`, `coach`, `admin`, `super`
   - `user_roles` (user_id, role) + `has_role()` security-definer fn
   - `workouts` (user_id, name, focus, duration_min, completed_at)
   - `food_prices` (id, name, category, price_cents, city, updated_by, updated_at) — the "town food prices" the AI reads
   - Trigger to auto-create profile on signup
   - RLS: profiles/workouts scoped to `auth.uid()`; food_prices readable by any authenticated user, writable by admins
   - GRANTs to `authenticated` / `service_role`
4. Seed a handful of `food_prices` rows so the MCP has something to return.

## Phase 2 — Auth UI

5. `/auth` page: email/password sign-in + sign-up + Google OAuth (via `lovable.auth.signInWithOAuth`). Handles `?next=` for OAuth-consent return.
6. `supabase--configure_social_auth` for Google.
7. Wire `onAuthStateChange` in `__root.tsx` (filtered).
8. Move `/app/*` and `/coach/*` and `/super/*` and `/admin/*` under `src/routes/_authenticated/` — keep the mock demo screens, just gated. RoleSwitcher stays; landing `/` stays public.

## Phase 3 — OAuth server activation

9. `supabase--configure_oauth_server` (no params).
10. Consent route `src/routes/[.]lovable.oauth.consent.tsx` per contract, with `next` preservation on password sign-in, sign-up, and Google.

## Phase 4 — MCP server

11. `bun add @lovable.dev/mcp-js zod`; add to `minimumReleaseAgeExcludes` in `bunfig.toml`.
12. `mcpPlugin()` in `vite.config.ts`, mounted at `/mcp`.
13. `src/lib/mcp/index.ts` with Supabase OAuth auth using `import.meta.env.VITE_SUPABASE_PROJECT_ID`.
14. Tools (all per-user, RLS-scoped via bearer forward):
    - `get_my_profile` — signed-in user's profile
    - `list_my_workouts` — recent workouts
    - `log_workout` — insert a workout (readOnly:false, needsApproval-safe)
    - `list_food_prices` — town food prices (input: optional category/city filter)
    - `update_food_price` — admins only (checked in handler via `has_role`)
    - `suggest_cheap_meal` — reads food_prices, returns cheapest combo hitting a protein target
15. Run `app_mcp_server--extract_mcp_manifest` after tools are saved.

## Phase 5 — Finish

16. Tell user MCP is live; include Publish action (needed before external clients can connect).

## Technical notes

- MCP issuer must be direct `https://<ref>.supabase.co/auth/v1` — built from `VITE_SUPABASE_PROJECT_ID` inline literal.
- Consent route file must be `[.]lovable.oauth.consent.tsx` (bracketed dot), `ssr: false`.
- Tool handlers create a per-request Supabase client with `Authorization: Bearer ${ctx.getToken()}` so RLS runs as the signed-in user.
- Mock demo data stays; MCP only exposes real DB-backed per-user data.
- No `service_role` inside tool handlers.
