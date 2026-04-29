import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface Account {
  admin: boolean;
  bio?: string;
  displayName?: string;
  email?: string;
  nameFont?: string;
  id: string;
  joined: number;
  password: string;
  pronouns?: string;
  username: string;
}

export type PublicAccount = Pick<Required<Account>, "admin" | "bio" | "displayName" | "id" | "joined" | "nameFont" | "pronouns" | "username">;

export const accountsTable = sqliteTable("accounts", {
  admin: int(),
  bio: text(),
  displayName: text(),
  email: text(),
  nameFont: text(),
  id: text().notNull().unique(),
  joined: int().notNull(),
  password: text().notNull(),
  pronouns: text(),
  username: text().notNull().unique()
});

export const sessionsTable = sqliteTable("sessions", {
  code: text().notNull(),
  date: int().notNull(),
  id: text().notNull(),
  ip: text(),
  userAgent: text()
});
