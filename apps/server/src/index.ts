import {
  HttpApiBuilder,
  HttpApiSwagger,
  HttpMiddleware,
  HttpServer,
} from "@effect/platform";
import { BunHttpServer, BunRuntime } from "@effect/platform-bun";
import { api } from "@repo/expenses-tracker-http";
import { Layer } from "effect";
import { CheckHealthApiLive } from "./CheckHealth";

export const ApiLive = HttpApiBuilder.api(api).pipe(
  Layer.provide(CheckHealthApiLive),
);

HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiSwagger.layer({ path: "/docs" })),
  Layer.provide(HttpApiBuilder.middlewareOpenApi()),
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(ApiLive),
  HttpServer.withLogAddress,
  Layer.provide(BunHttpServer.layer({ port: 5000 })),
  Layer.launch,
  BunRuntime.runMain,
);
