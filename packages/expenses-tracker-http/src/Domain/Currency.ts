import { Schema } from "effect";

export const currencies = ["USD", "BAHT", "MMK"];

export const Currency = Schema.Literal(...currencies).pipe(
  Schema.brand("Currency"),
  Schema.annotations({
    title: "Currency",
  }),
);
