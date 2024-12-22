import { Schema as S } from "effect";
import { Currency } from "./Currency";

export const Amount = S.Struct({
  n: S.Number,
  currency: Currency,
});
