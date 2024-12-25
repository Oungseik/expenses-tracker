import { HttpApiBuilder, HttpApiSwagger, HttpMiddleware, HttpServer } from "@effect/platform";
import { api } from "@repo/expenses-tracker-http";
import { Layer } from "effect";
import { CheckHealthApiLive, ExpensesApiLive } from "./Http";

export const ApiLive = HttpApiBuilder.api(api).pipe(
  Layer.provide(CheckHealthApiLive),
  Layer.provide(ExpensesApiLive),
);

export const Server = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiSwagger.layer({ path: "/docs" })),
  Layer.provide(HttpApiBuilder.middlewareOpenApi()),
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(ApiLive),
  HttpServer.withLogAddress,
);
