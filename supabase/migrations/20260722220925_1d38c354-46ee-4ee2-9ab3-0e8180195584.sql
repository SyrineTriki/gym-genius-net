
-- Roles enum + table
CREATE TYPE public.app_role AS ENUM ('athlete', 'coach', 'admin', 'super');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT,
  gym_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles read own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles update own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles insert own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_roles read own" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- Workouts
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  focus TEXT,
  duration_min INT,
  notes TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.workouts TO authenticated;
GRANT ALL ON public.workouts TO service_role;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workouts own" ON public.workouts FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Food prices — shared town catalog
CREATE TABLE public.food_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_cents INT NOT NULL,
  unit TEXT NOT NULL DEFAULT '100g',
  protein_g NUMERIC(6,2) DEFAULT 0,
  calories INT DEFAULT 0,
  city TEXT NOT NULL DEFAULT 'default',
  updated_by UUID REFERENCES auth.users ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.food_prices TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.food_prices TO authenticated;
GRANT ALL ON public.food_prices TO service_role;
ALTER TABLE public.food_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "food_prices read all auth" ON public.food_prices FOR SELECT TO authenticated USING (true);
CREATE POLICY "food_prices admins write" ON public.food_prices FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "food_prices admins update" ON public.food_prices FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "food_prices admins delete" ON public.food_prices FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'athlete');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed food prices
INSERT INTO public.food_prices (name, category, price_cents, unit, protein_g, calories, city) VALUES
  ('Chicken breast', 'protein', 899, '1kg', 31, 165, 'default'),
  ('Eggs', 'protein', 349, '12pk', 6, 78, 'default'),
  ('Rolled oats', 'carb', 249, '1kg', 13, 379, 'default'),
  ('Brown rice', 'carb', 199, '1kg', 8, 370, 'default'),
  ('Lentils', 'protein', 299, '1kg', 25, 353, 'default'),
  ('Bananas', 'fruit', 149, '1kg', 1, 89, 'default'),
  ('Whey protein', 'protein', 2999, '1kg', 80, 400, 'default'),
  ('Olive oil', 'fat', 799, '1L', 0, 884, 'default'),
  ('Sweet potato', 'carb', 179, '1kg', 2, 86, 'default'),
  ('Greek yogurt', 'protein', 399, '1kg', 10, 59, 'default');
