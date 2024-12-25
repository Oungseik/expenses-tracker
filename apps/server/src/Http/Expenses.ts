import { HttpApiBuilder } from "@effect/platform";
import { api } from "@repo/expenses-tracker-http";
import { ExpenseWithId, baseCategories } from "@repo/expenses-tracker-http/domain";
import { InternalServerError, NotFound } from "@repo/expenses-tracker-http/errors";
import { eq } from "drizzle-orm";
import { Effect as Ef, Schema as S } from "effect";
import { v7 } from "uuid";
import { db } from "../Drizzle";
import { expenses } from "../Drizzle/sqlite";

export const ExpensesApiLive = HttpApiBuilder.group(api, "expenses", (handlers) =>
  handlers
    .handle("addExpense", ({ payload }) =>
      Ef.tryPromise(() => db.insert(expenses).values({ ...payload, id: v7() })).pipe(
        Ef.andThen(Ef.succeed({ status: "success" as const })),
        Ef.tapError((e) => Ef.sync(() => console.error(e))),
        Ef.catchTags({
          UnknownException: () => new InternalServerError(),
        }),
      ),
    )
    .handle("getExpense", ({ path: { id } }) =>
      Ef.tryPromise(() =>
        db.query.expenses.findFirst({ where: (expenses, { eq }) => eq(expenses.id, id) }),
      ).pipe(
        Ef.flatMap(Ef.fromNullable),
        Ef.flatMap(S.decodeUnknown(ExpenseWithId)),
        Ef.tapError((e) => Ef.sync(() => console.error(e))),
        Ef.catchTags({
          NoSuchElementException: () => new NotFound({ message: "not found" }),
          UnknownException: () => new InternalServerError(),
          ParseError: () => new InternalServerError(),
        }),
      ),
    )
    .handle("updateExpenses", ({ payload, path: { id } }) =>
      Ef.tryPromise(() =>
        db
          .update(expenses)
          .set({ ...payload })
          .where(eq(expenses.id, id)),
      ).pipe(
        Ef.andThen(Ef.succeed({ status: "success" as const })),
        Ef.tapError((e) => Ef.sync(() => console.error(e))),
        Ef.catchTags({ UnknownException: () => new InternalServerError() }),
      ),
    )
    .handle("deleteExpense", ({ path: { id } }) =>
      Ef.tryPromise(() => db.delete(expenses).where(eq(expenses.id, id))).pipe(
        Ef.andThen(Ef.succeed({ status: "success" as const })),
        Ef.tapError((e) => Ef.sync(() => console.error(e))),
        Ef.catchTags({ UnknownException: () => new InternalServerError() }),
      ),
    )
    .handle("getExpenses", () =>
      Ef.tryPromise(() => db.select().from(expenses).limit(100)).pipe(
        Ef.flatMap(S.decodeUnknown(S.Array(ExpenseWithId))),
        Ef.tapError((e) => Ef.sync(() => console.error(e))),
        Ef.catchTags({
          UnknownException: () => new InternalServerError(),
          ParseError: () => new InternalServerError(),
        }),
      ),
    )
    .handle("deleteExpenses", () => Ef.succeed({ status: "success" as const }))
    .handle("getCategories", () => Ef.succeed(baseCategories)),
);
