/* eslint-disable @typescript-eslint/no-unused-vars */
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import {
  blob,
  index,
  int,
  sqliteTableCreator,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

/**
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const dbTableNameResolver = (name: string) => `${name}`;
export const createTable = sqliteTableCreator(dbTableNameResolver);

export const now = sql`(unixepoch())`;
export const string = text;
export const number = (field: string) => int(field, { mode: "number" });
export const boolean = (field: string) => int(field, { mode: "boolean" });
export const json = (field: string) => text(field, { mode: "json" });
export const bigint = (field: string) => blob(field, { mode: "bigint" });
export const timestamp = (field: string) => int(field, { mode: "timestamp" });
export const cuid = (field: string) => string(field);

export const id = cuid("id").primaryKey().notNull().$defaultFn(createId);
export const createdAt = timestamp("created_at").default(now).notNull();
export const updatedAt = timestamp("updated_at").$onUpdate(() => new Date());

// NOTE: since createdAt resolved at DB, updatedAt is at ORM level
// updatedAt might be greater than createdAt in subsequent inserts
