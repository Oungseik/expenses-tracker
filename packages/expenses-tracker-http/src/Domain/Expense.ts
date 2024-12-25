import { Schema as S } from "effect";

import { ExpenseCategory } from "./Category";
import { Currency } from "./Currency";
import { Id } from "./Id";

export const Expense = S.Struct({
  title: S.String,
  description: S.String.pipe(S.UndefinedOr),
  amount: S.Number,
  currency: Currency,
  category: ExpenseCategory,
  date: S.Date,
});

export type Expense = typeof Expense.Type;

export const ExpenseWithId = S.extend(Expense, S.Struct({ id: Id }));
export type ExpenseWithId = typeof ExpenseWithId.Type;
