CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"cost" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
