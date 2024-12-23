import { BunHttpServer, BunRuntime } from "@effect/platform-bun";
import { Config, Layer } from "effect";
import { Server } from "./Server";

Server.pipe(
  Layer.provide(
    BunHttpServer.layerConfig({
      port: Config.integer("PORT").pipe(Config.withDefault(5000)),
    }),
  ),
  Layer.launch,
  BunRuntime.runMain,
);
