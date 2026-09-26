ALTER TABLE "whiteBoards" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "whiteBoards" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "whiteBoards_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "whiteBoards" ALTER COLUMN "projectid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "whiteBoards" ADD CONSTRAINT "whiteBoards_projectid_key" UNIQUE("projectid");