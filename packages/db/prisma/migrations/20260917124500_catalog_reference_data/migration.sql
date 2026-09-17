-- One-time catalog reference data for onboarding, profile edit, and search.
-- Prisma applies this migration once. Local `pnpm db:seed` upserts the same slugs.
INSERT INTO "District" ("id", "city", "name", "slug", "sort")
VALUES
  (gen_random_uuid()::text, 'Minsk', 'Центральный', 'tsentralnyi', 0),
  (gen_random_uuid()::text, 'Minsk', 'Советский', 'sovetskii', 1),
  (gen_random_uuid()::text, 'Minsk', 'Первомайский', 'pervomaiskii', 2),
  (gen_random_uuid()::text, 'Minsk', 'Партизанский', 'partizanskii', 3),
  (gen_random_uuid()::text, 'Minsk', 'Заводской', 'zavodskoi', 4),
  (gen_random_uuid()::text, 'Minsk', 'Ленинский', 'leninskii', 5),
  (gen_random_uuid()::text, 'Minsk', 'Московский', 'moskovskii', 6),
  (gen_random_uuid()::text, 'Minsk', 'Октябрьский', 'oktyabrskii', 7),
  (gen_random_uuid()::text, 'Minsk', 'Фрунзенский', 'frunzenskii', 8)
ON CONFLICT ("slug") DO NOTHING;

INSERT INTO "ServiceCategory" ("id", "name", "slug", "sort")
VALUES
  (gen_random_uuid()::text, 'Ногти', 'nogti', 0),
  (gen_random_uuid()::text, 'Брови и ресницы', 'brovi-i-resnitsy', 1),
  (gen_random_uuid()::text, 'Волосы', 'volosy', 2),
  (gen_random_uuid()::text, 'Макияж', 'makiyazh', 3),
  (gen_random_uuid()::text, 'Косметология', 'kosmetologiya', 4),
  (gen_random_uuid()::text, 'Депиляция', 'depilyatsiya', 5),
  (gen_random_uuid()::text, 'Массаж', 'massazh', 6),
  (gen_random_uuid()::text, 'Тату и пирсинг', 'tatu-i-pirsing', 7)
ON CONFLICT ("slug") DO NOTHING;
