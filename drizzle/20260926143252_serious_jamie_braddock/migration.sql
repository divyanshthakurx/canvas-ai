CREATE TABLE "whiteBoards" (
	"id" integer PRIMARY KEY,
	"projectid" varchar,
	"elements" jsonb,
	"appState" jsonb,
	"files" jsonb
);
--> statement-breakpoint
ALTER TABLE "whiteBoards" ADD CONSTRAINT "whiteBoards_projectid_boards_project_id_fkey" FOREIGN KEY ("projectid") REFERENCES "boards"("project_id");