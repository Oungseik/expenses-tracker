import { Schema } from "effect";

export const currencies = ["USD", "BAHT", "MMK"] as const;

export const Currency = Schema.Literal(...currencies).pipe(
  Schema.brand("Currency"),
  Schema.annotations({
    title: "Currency",
  }),
);

export type Currency = typeof Currency.Type;
