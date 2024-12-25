import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./sqlite";

const client = new Database(process.env.DB_URL ?? "./datbases/dev.sqlite");
client.exec("PRAGMA foreign_keys = ON;");

export const db = drizzle({ client, schema });
