import { HttpApiBuilder } from "@effect/platform";
import { api } from "@repo/expenses-tracker-http";
import { Effect } from "effect";

export const CheckHealthApiLive = HttpApiBuilder.group(api, "checkHealth", (handlers) =>
  handlers.handle("checkHealth", () => Effect.succeed({ message: "server is up and running" })),
);
