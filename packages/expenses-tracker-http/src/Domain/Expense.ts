import { Schema as S } from "effect";

import { Amount } from "./Amount";
import { ExpenseCategory } from "./Category";

export const Expense = S.Struct({
  title: S.String,
  description: S.String.pipe(S.UndefinedOr),
  amount: Amount,
  category: ExpenseCategory,
  subCategories: S.Array(ExpenseCategory),
  date: S.Date,
});

export type Expense = typeof Expense.Type;
