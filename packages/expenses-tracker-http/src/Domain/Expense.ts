import { Schema as S } from "effect";

import { ExpenseCategory } from "./Category";
import { Currency } from "./Currency";

export const Expense = S.Struct({
  title: S.String,
  description: S.String.pipe(S.UndefinedOr),
  amount: S.Number,
  currency: Currency,
  category: ExpenseCategory,
  subCategories: S.Array(ExpenseCategory),
  date: S.Date,
});

export type Expense = typeof Expense.Type;
