import { Schema as S } from "effect";

export const Id = S.String.pipe(
  S.filter((s) => s.length === 32, { jsonSchema: { minLength: 32 } }),
  S.brand("Id"),
  S.annotations({ title: "Id", description: "An uuid v7 Id" }),
);

export type Id = typeof Id.Type;
