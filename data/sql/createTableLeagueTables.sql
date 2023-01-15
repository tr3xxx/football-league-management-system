CREATE TABLE IF NOT EXISTS leagueTables (
    table_id INTEGER PRIMARY KEY AUTOINCREMENT,
    league_id INTEGER,
    team_name TEXT,
    place INTEGER,
    points INTEGER,
    won INTEGER,
    drawn INTEGER,
    lost INTEGER,
    goals_scored INTEGER,
    goals_conceded INTEGER,
    FOREIGN KEY(league_id) REFERENCES leagues(league_id)
);