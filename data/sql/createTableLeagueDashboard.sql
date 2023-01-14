CREATE TABLE IF NOT EXISTS "leagues" (
	"league_id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"amountTeams"	INTEGER,
	PRIMARY KEY("league_id" AUTOINCREMENT)
);