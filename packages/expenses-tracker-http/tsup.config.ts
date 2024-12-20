import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  target: "esnext",
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["esm"],
});
