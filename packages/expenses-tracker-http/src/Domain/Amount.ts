import { Schema as S } from "effect";
import { Currency } from "./Currency";

export const Amount = S.Struct({
  amount: S.Number,
  currency: Currency,
});
