CREATE TABLE IF NOT EXISTS matchdays (
    matchday_id INTEGER PRIMARY KEY,
    league_id INTEGER,
    matchday_number INTEGER,
    FOREIGN KEY (league_id) REFERENCES leagues(league_id)
);