const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
import showLeague from "../teams-dashboard/teams-dashboard.js";

let db = new sqlite3.Database('./data/database/data.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});



fs.readFile('./data/sql/createTableLeagueDashboard.sql', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    db.serialize(() => {
        db.run(data, function(err) {
            if (err) {
                console.log(err);
            }
        });
    });
});

window.onload = function() {
    db.all("SELECT * FROM leagues", function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        const container = document.getElementById("leagues-container");
       rows.forEach(league => {
            console.log(league.name);
            const leagueDiv = document.createElement("div");
            leagueDiv.classList.add("league");

            const leagueNameDiv = document.createElement("div");
            leagueNameDiv.classList.add("league-name");
            leagueNameDiv.innerText = league.name;
            leagueDiv.appendChild(leagueNameDiv);

            const leagueTeamsCountDiv = document.createElement("div");
            leagueTeamsCountDiv.classList.add("league-teams-count");
            leagueTeamsCountDiv.innerText = league.amountTeams + " teams";
            leagueDiv.appendChild(leagueTeamsCountDiv);

            container.appendChild(leagueDiv);

           leagueDiv.addEventListener("click", function(event) {
               showLeague(league);
           });
        });
    });
}