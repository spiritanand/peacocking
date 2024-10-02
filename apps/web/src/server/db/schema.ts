import { relations, sql } from "drizzle-orm";
import {
  doublePrecision,
  index,
  integer,
  json,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";
import {
  type ImageGenerationOutput,
  type ImageGenerationInput,
  type Logs,
} from "@web/lib/types";
import { RequestStatus, type RequestType } from "@web/lib/constants";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `peacocking_${name}`);

// Auth Schemas

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  credits: doublePrecision("credits").notNull().default(0.0),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));
export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// App Schemas
export const requests = createTable("request", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  responseUrl: text("response_url").notNull(),
  statusUrl: text("status_url").notNull(),
  cancelUrl: text("cancel_url").notNull(),
  status: text("status")
    .$type<RequestStatus>()
    .default(RequestStatus.IN_QUEUE)
    .notNull(),
  type: text("type").$type<RequestType>().notNull(),
  queuePosition: integer("queue_position").default(-1).notNull(),
  logs: json("logs").$type<Logs | null>(),
});

export const models = createTable("model", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar("name", { length: 256 }),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  requestId: varchar("request_id", { length: 255 })
    .notNull()
    .references(() => requests.id)
    .unique(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  configFile: text("config_file"),
  loraFile: text("lora_file"),
  featurePhotoUrl: text("feature_photo_url").default(
    "https://images.unsplash.com/photo-1724888861686-ad3f706ab067?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ),
});
export type Model = typeof models.$inferSelect; // return type when queried
export type NewModel = typeof models.$inferInsert; // insert type

export const gens = createTable("gen", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  modelId: varchar("model_id", { length: 255 })
    .notNull()
    .references(() => models.id),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  requestId: varchar("request_id", { length: 255 })
    .notNull()
    .references(() => requests.id)
    .unique(),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .$defaultFn(() => new Date().toISOString())
    .notNull(),
  input: json("input").$type<ImageGenerationInput>(),
  output: json("output").$type<ImageGenerationOutput>(),
});
export type Gen = typeof gens.$inferSelect; // return type when queried
export type NewGen = typeof gens.$inferInsert; // insert type

// Relations
export const requestsRelations = relations(requests, ({ one }) => ({
  user: one(users, { fields: [requests.userId], references: [users.id] }),
}));
export const modelsRelations = relations(models, ({ one }) => ({
  request: one(requests, {
    fields: [models.requestId],
    references: [requests.id],
  }),
  user: one(users, { fields: [models.userId], references: [users.id] }),
}));
export const gensRelations = relations(gens, ({ one }) => ({
  request: one(requests, {
    fields: [gens.requestId],
    references: [requests.id],
  }),
  model: one(models, { fields: [gens.modelId], references: [models.id] }),
  user: one(users, { fields: [gens.userId], references: [users.id] }),
}));
