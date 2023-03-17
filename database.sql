CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(255) NOT NULL,
	"completed" varchar(20) DEFAULT 'No'
);

INSERT INTO "todo" ("task")
VALUES ('Shovel the driveway'),
('Clean the house');