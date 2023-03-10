CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(255) NOT NULL,
	"completed" BOOLEAN
);

INSERT INTO "todo" ("task", "completed")
VALUES ('Shovel the driveway', false);