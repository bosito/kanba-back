CREATE TYPE "token_types" AS ENUM (
  'verify',
  'reset'
);

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" text,
  "due_date" timestamp NOT NULL,
  "user_id" int NOT NULL,
  "category_id" int NOT NULL DEFAULT 1,
  "status_id" int,
  "completed" boolean DEFAULT false,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar NOT NULL,
  "lastname" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "profile_photo" varchar,
  "active" boolean DEFAULT true,
  "verified" boolean DEFAULT false,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "tokens" (
  "id" SERIAL PRIMARY KEY,
  "token" varchar NOT NULL,
  "user_id" int NOT NULL,
  "used" boolean NOT NULL DEFAULT false,
  "type" token_types,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "created_by" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "statuses" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "color" varchar NOT NULL,
  "created_by" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "social_networks" (
  "id" varchar PRIMARY KEY NOT NULL,
  "user_id" int,
  "provider" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "tasks" ADD FOREIGN KEY ("status_id") REFERENCES "statuses" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "statuses" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "social_networks" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "tokens" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
