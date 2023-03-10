const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
import showLeague from "../teams-dashboard/loadTeamsDashboard.js";

let db = new sqlite3.Database('./data/database/data.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
});


const form = document.querySelector("#team-form");
const teamList = document.querySelector("#team-list");
const teamCount = document.querySelector("#team-count");
const maxTeams = document.querySelector("#max-teams");
const addTeamButton = document.querySelector("#add-team");
const submitButton = document.querySelector("#submit-form");
let teams = 0;

addTeamButton.addEventListener("click", (event) => {
    event.preventDefault();

    const teamName = document.querySelector("#team-name").value;
    const team = document.createElement("li");
    team.innerHTML = teamName;
    teamList.appendChild(team);
    teams++;
    if(maxTeams.value == 0) {
        teamCount.innerHTML = `${teams}/ 100`;
    }else{
        teamCount.innerHTML = `${teams}/${maxTeams.value}`;
    }

    document.querySelector("#team-name").value = "";

    if (teams > maxTeams) {
        form.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    maxTeams.innerHTML = document.querySelector("#league-teams").value;
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    fs.readFile('./data/sql/createNewLeague.sql', 'utf8', (err, data) => {
        data = data.replace("{name}", document.querySelector("#league-name").value.toString());
        data = data.replace("{description}", document.querySelector("#league-description").value.toString());
        data = data.replace("'{amountTeams}'", document.querySelector("#league-teams").value);
        data = data.replace("'{pointsWin}'", document.querySelector("#league-points-win").value);
        data = data.replace("'{pointsDraw}'", document.querySelector("#league-points-draw").value);
        data = data.replace("'{pointsLoss}'", document.querySelector("#league-points-loose").value);
        data = data.replace("'{placeTop}'", document.querySelector("#league-place-top").value);
        data = data.replace("'{placeBottom}'", document.querySelector("#league-place-bottom").value);

        let teamString = "";

        if(document.querySelector("#league-teams").value%2 !== 0){
            alert("Please enter an even number of teams");
            return
        }
        teamList.childNodes.forEach(function(element){
            if(element.innerHTML !== ""){
                if(!teamString.includes(element.innerHTML)) {
                    teamString += element.innerHTML + ";";
                }
                else{
                    alert("Teams can't have the same name!");
                    return
                }
            }
            else{
                alert("Team Name cannot be empty!");
                return;
            }
        });

        data = data.replace("{teamNames}", teamString.toString());
        console.log(data);
        db.run(data, function(err) {

            if (err) {
                console.log(err);
                return;
            }
            fs.readFile('./data/sql/addLeagueTable.sql', 'utf8', (err, data) => {
                    let originalData = data;
                    let teams = teamString.split(";");
                    teams.forEach(function (team) {
                        let data = originalData;
                        data = data.replace("{name}", team);
                        db.all(data, function (err, rows) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                });
        });

        db.all("SELECT * FROM leagues WHERE league_id = (SELECT MAX(league_id) FROM leagues)", function(err, rows) {
            if (err) {
                console.log(err);
                return;
            }else{
                showLeague(rows[0]);
            }


        });


    });
});