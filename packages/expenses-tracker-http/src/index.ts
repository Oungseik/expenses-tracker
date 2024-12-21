import { HttpApi } from "@effect/platform";
import { CheckHealthApi } from "./CheckHealth";

export const api = HttpApi.make("expensesTrackerApi").add(CheckHealthApi);
