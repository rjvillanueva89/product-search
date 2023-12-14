ALTER TABLE "tenants" ADD CONSTRAINT "tenants_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");