import { defineConfig } from "drizzle-kit";
import { Effect, Config } from "effect";

const dialects = ["sqlite", "mysql", "postgresql", "turso"] as const;
type Dialects = (typeof dialects)[number];

const config = Effect.gen(function* () {
  const url = yield* Config.string("DB_URL");
  const dialect = (yield* Config.string("DB_DIALECT").pipe(
    Config.validate({
      message:
        "expect DB_DIALECT to be one of 'sqlite', 'mysql', 'turso' or 'postgresql'",
      validation: (s) => dialects.includes(s as Dialects),
    }),
  )) as Dialects;

  return defineConfig({
    schema: `./src/Drizzle/${dialect}.ts`,
    out: "./drizzle",
    dialect,
    dbCredentials: { url },
    verbose: true,
    strict: true,
  });
});

export default Effect.runSync(config);
