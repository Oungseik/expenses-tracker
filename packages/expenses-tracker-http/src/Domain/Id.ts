import { Schema as S } from "effect";

export const Id = S.String.pipe(
  S.filter((s) => s.length === 36, { jsonSchema: { minLength: 36 } }),
  S.brand("Id"),
  S.annotations({ title: "Id", description: "An uuid v7 Id with separator" }),
);

export type Id = typeof Id.Type;
