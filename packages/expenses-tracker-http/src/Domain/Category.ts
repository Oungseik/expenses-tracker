import { Schema } from "effect";

export const baseCategories = [
  "Food & Drinks",
  "Groceries",
  "Shopping",
  "Transport",
  "Entertainment",
  "Utilites",
  "Health & Fitness",
  "Home",
];

export const ExpenseCategory = Schema.Literal(...baseCategories).pipe(
  Schema.brand("Category"),
  Schema.annotations({
    title: "Expense Category",
  }),
);
