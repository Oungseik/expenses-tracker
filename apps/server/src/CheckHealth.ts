import { HttpApiBuilder, type HttpApiGroup } from "@effect/platform";
import { api } from "@repo/expenses-tracker-http";
import { Effect, type Layer } from "effect";

export const CheckHealthApiLive: Layer.Layer<
  HttpApiGroup.ApiGroup<"expensesTrackerApi", "checkHealth">,
  never,
  never
> = HttpApiBuilder.group(api, "checkHealth", (handlers) =>
  handlers.handle("checkHealth", () =>
    Effect.succeed({ message: "server is up and running" }),
  ),
);
