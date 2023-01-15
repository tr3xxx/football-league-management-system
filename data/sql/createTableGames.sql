CREATE TABLE IF NOT EXISTS games (
    game_id INTEGER PRIMARY KEY,
    league_id INTEGER,
    matchday_id INTEGER,
    team1_table_id INTEGER,
    team2_table_id INTEGER,
    team1_goals INTEGER,
    team2_goals INTEGER,

    FOREIGN KEY (league_id) REFERENCES leagues(league_id),
    FOREIGN KEY (matchday_id) REFERENCES matchdays(matchday_id),
    FOREIGN KEY (team1_table_id) REFERENCES leagueTables(table_id),
    FOREIGN KEY (team2_table_id) REFERENCES leagueTables(table_id)
);