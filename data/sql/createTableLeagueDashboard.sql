CREATE TABLE IF NOT EXISTS "leagues" (
	"league_id"	INTEGER UNIQUE,
	"name"	        TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"amountTeams"	INTEGER NOT NULL,
	"pointsWin"	    INTEGER NOT NULL,
	"pointsDraw"	INTEGER NOT NULL,
	"pointsLoss"	INTEGER NOT NULL,
	"placeTop"	    INTEGER NOT NULL,
	"placeBottom"	INTEGER NOT NULL,
	"teamNames"	    TEXT NOT NULL,
	PRIMARY KEY("league_id" AUTOINCREMENT)
);