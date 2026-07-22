import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get_my_profile";
import listMyWorkouts from "./tools/list_my_workouts";
import logWorkout from "./tools/log_workout";
import listFoodPrices from "./tools/list_food_prices";
import suggestCheapMeal from "./tools/suggest_cheap_meal";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "fitforge-mcp",
  title: "FitForge AI",
  version: "0.1.0",
  instructions:
    "Tools to read a FitForge athlete's profile, log workouts, browse the town's food price database, and generate cheap high-protein meal suggestions. All tools act as the signed-in user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, listMyWorkouts, logWorkout, listFoodPrices, suggestCheapMeal],
});
