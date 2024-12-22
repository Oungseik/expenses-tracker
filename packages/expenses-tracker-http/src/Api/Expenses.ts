import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "@effect/platform";
import { Schema as S } from "effect";
import { Expense } from "../Domain";
import { InternalServerError } from "../Errors";

export const ExpensesApi = HttpApiGroup.make("expenses")
  .add(HttpApiEndpoint.get("expenses", "/").addSuccess(S.Array(Expense)))
  .add(
    HttpApiEndpoint.get("categories", "/categories").addSuccess(
      S.Array(S.String),
    ),
  )
  .addError(InternalServerError)
  .prefix("/expenses")
  .annotateContext(
    OpenApi.annotations({
      title: "Expenses",
      description: "Endpoint to do expenses related CRUD operations",
    }),
  );
