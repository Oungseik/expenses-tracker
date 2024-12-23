import { HttpApiBuilder, type HttpApiGroup } from "@effect/platform";
import { api } from "@repo/expenses-tracker-http";
import {
  Currency,
  ExpenseCategory,
  baseCategories,
} from "@repo/expenses-tracker-http/domain";
import { Effect as Ef, type Layer } from "effect";

export const ExpensesApiLive: Layer.Layer<
  HttpApiGroup.ApiGroup<"expensesTrackerApi", "expenses">,
  never,
  never
> = HttpApiBuilder.group(api, "expenses", (handlers) =>
  handlers
    .handle("addExpense", () => Ef.succeed("success"))
    .handle("getExpense", () =>
      Ef.succeed({
        date: new Date(),
        title: "dummy expense",
        category: ExpenseCategory.make("Utilites"),
        amount: 200,
        currency: Currency.make("USD"),
        description: "just dummy data",
      }),
    )
    .handle("updateExpenses", () => Ef.succeed("success"))
    .handle("deleteExpense", () => Ef.succeed("success"))
    .handle("addExpenses", () => Ef.succeed("success"))
    .handle("getExpenses", () => Ef.succeed([]))
    .handle("deleteExpenses", () => Ef.succeed("success"))
    .handle("getCategories", () => Ef.succeed(baseCategories)),
);
