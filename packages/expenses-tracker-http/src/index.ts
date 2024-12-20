import { HttpApi } from "@effect/platform";
import { CheckHealthApi } from "./CheckHealth.js";

export const api = HttpApi.make("expensesTrackerApi").add(CheckHealthApi);
