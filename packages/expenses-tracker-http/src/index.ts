import { HttpApi } from "@effect/platform";
import { CheckHealthApi, ExpensesApi } from "./Api";

export const api = HttpApi.make("expensesTrackerApi")
  .add(CheckHealthApi)
  .add(ExpensesApi);
