import {
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
  OpenApi,
} from "@effect/platform";
import { Schema as S, Schema } from "effect";
import { Expense } from "../Domain";
import { InternalServerError } from "../Errors";

const ExpenseIdParam = HttpApiSchema.param("id", Schema.NonEmptyString);

const addExpense = HttpApiEndpoint.post("addExpense", "/")
  .setPayload(Expense)
  .addSuccess(S.Literal("success"))
  .annotateContext(
    OpenApi.annotations({
      title: "Add Expense",
      description: "Add new expense to the list",
    }),
  );

const getExpense = HttpApiEndpoint.get("getExpense", `/${ExpenseIdParam}`)
  .addSuccess(Expense)
  .annotateContext(
    OpenApi.annotations({
      title: "Get Expense",
      description: "Get expense by id",
    }),
  );

const updateExpense = HttpApiEndpoint.put(
  "updateExpenses",
  `/${ExpenseIdParam}`,
)
  .setPayload(Expense.pipe(S.partial))
  .addSuccess(S.Literal("success"))
  .annotateContext(
    OpenApi.annotations({
      title: "Update Expense",
      description: "Update an expense.",
    }),
  );

const deleteExpense = HttpApiEndpoint.del("deleteExpense", `/${ExpenseIdParam}`)
  .addSuccess(S.Literal("success"))
  .annotateContext(
    OpenApi.annotations({
      title: "Delete Expense",
      description: "Delete an expense",
    }),
  );

const addExpenses = HttpApiEndpoint.post("/addExpenses", "/")
  .setPayload(S.Array(Expense))
  .addSuccess(S.Literal("success"))
  .annotateContext(
    OpenApi.annotations({
      title: "Add Expenses",
      description: "Add multiple expenses",
    }),
  );

const getExpenses = HttpApiEndpoint.get("getExpenses", "/")
  .addSuccess(S.Array(Expense))
  .annotateContext(
    OpenApi.annotations({
      title: "Get Expenses",
      description: "Get the list of expenses",
    }),
  );

const deleteExpenses = HttpApiEndpoint.del("deleteExpenses", "/")
  .setPayload(S.Array(S.String))
  .addSuccess(S.Literal("success"))
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
  .add(addExpenses)
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
