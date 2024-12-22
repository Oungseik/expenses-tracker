import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "@effect/platform";
import { Schema } from "effect";

export const ExpensesApi = HttpApiGroup.make("expenses")
  .add(
    HttpApiEndpoint.get("categories", "/categories").addSuccess(
      Schema.Array(Schema.String),
    ),
  )
  .prefix("/expenses")
  .annotateContext(
    OpenApi.annotations({
      title: "Expenses",
      description: "Endpoint to do expenses related CRUD operations",
    }),
  );
