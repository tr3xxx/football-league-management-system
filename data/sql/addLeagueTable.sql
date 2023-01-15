INSERT INTO leagueTables (league_id,team_name,place,points,won,drawn,lost,goals_scored,goals_conceded)
Values ((SELECT max(league_id) FROM leagues), '{name}',1,0,0,0,0,0,0);