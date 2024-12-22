import { HttpApiBuilder, type HttpApiGroup } from "@effect/platform";
import { api } from "@repo/expenses-tracker-http";
import { baseCategories } from "@repo/expenses-tracker-http/domain";
import { Effect, type Layer } from "effect";

export const ExpensesApiLive: Layer.Layer<
  HttpApiGroup.ApiGroup<"expensesTrackerApi", "expenses">,
  never,
  never
> = HttpApiBuilder.group(api, "expenses", (handlers) =>
  handlers
    .handle("getCategories", () => Effect.succeed(baseCategories))
    .handle("getExpenses", () => Effect.succeed([])),
);
