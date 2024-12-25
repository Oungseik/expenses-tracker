import {
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  OpenApi,
} from "@effect/platform";
import { Schema as S, Schema } from "effect";
import { Expense, ExpenseWithId } from "../Domain";
import { InternalServerError, NotFound } from "../Errors";

const ExpenseIdParam = HttpApiSchema.param("id", Schema.NonEmptyString);

const addExpense = HttpApiEndpoint.post("addExpense", "/")
  .setPayload(Expense)
  .addSuccess(S.Struct({ status: S.Literal("success") }))
  .annotateContext(
    OpenApi.annotations({
      title: "Add Expense",
      description: "Add new expense to the list",
    }),
  );

const getExpense = HttpApiEndpoint.get("getExpense")`/${ExpenseIdParam}`
  .addSuccess(ExpenseWithId)
  .addError(NotFound)
  .annotateContext(
    OpenApi.annotations({
      title: "Get Expense",
      description: "Get expense by id",
    }),
  );

const updateExpense = HttpApiEndpoint.put("updateExpense")`/${ExpenseIdParam}`
  .setPayload(Expense.pipe(S.partial))
  .addSuccess(S.Struct({ status: S.Literal("success") }))
  .addError(NotFound)
  .annotateContext(
    OpenApi.annotations({
      title: "Update Expense",
      description: "Update an expense.",
    }),
  );

const deleteExpense = HttpApiEndpoint.del("deleteExpense")`/${ExpenseIdParam}`
  .addSuccess(S.Struct({ status: S.Literal("success") }))
  .addError(NotFound)
  .annotateContext(
    OpenApi.annotations({
      title: "Delete Expense",
      description: "Delete an expense",
    }),
  );

// TODO implement filtering feature
const getExpenses = HttpApiEndpoint.get("getExpenses", "/")
  .addSuccess(S.Array(ExpenseWithId))
  .annotateContext(
    OpenApi.annotations({
      title: "Get Expenses",
      description: "Get the list of expenses",
    }),
  );

const deleteExpenses = HttpApiEndpoint.del("deleteExpenses", "/")
  .setPayload(S.Array(S.String))
  .addSuccess(S.Struct({ status: S.Literal("success") }))
  .addError(NotFound)
  .annotateContext(
    OpenApi.annotations({
      title: "Delete Expenses",
      description: "Delete multiple expenses",
    }),
  );

const getCategories = HttpApiEndpoint.get("getCategories", "/categories")
  .addSuccess(S.Array(S.String))
  .annotateContext(
    OpenApi.annotations({
      title: "Get Categories",
      description: "Get the pre-defined categories",
    }),
  );

export const ExpensesApi = HttpApiGroup.make("expenses")
  .add(addExpense)
  .add(getExpense)
  .add(updateExpense)
  .add(deleteExpense)
  .add(getExpenses)
  .add(deleteExpenses)
  .add(getCategories)
  .addError(InternalServerError)
  .prefix("/expenses")
  .annotateContext(
    OpenApi.annotations({
      title: "Expenses",
      description: "Endpoint to do expenses related CRUD operations",
    }),
  );
