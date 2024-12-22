import { Schema } from "effect";

export const baseCategories = [
  "Entertainment",
  "Food & Drinks",
  "Groceries",
  "Health & Fitness",
  "Home",
  "Shopping",
  "Transport",
  "Utilites",
];

export const ExpenseCategory = Schema.Literal(...baseCategories).pipe(
  Schema.brand("Category"),
  Schema.annotations({
    title: "Expense Category",
  }),
);
