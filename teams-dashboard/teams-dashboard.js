const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const placeholderName = document.getElementById('placeholder_league_name');

let db = new sqlite3.Database('./data/database/data.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
});

window.onload = function () {
    console.log("window loaded");
    const params = new URLSearchParams(window.location.search);
    const leagueToShow = params.get('league');
    let leagueData = "";

    db.all("SELECT * FROM leagues WHERE league_id = ?", leagueToShow, function (err, rows) {
        if (err) {
            document.getElementById("error").style.display = "block";
            return;
        }
        else{
            leagueData = rows[0];
            showData(leagueData);
        }
    });
}
function showData(league){
    placeholderName.innerHTML = league.name;
    buildTable(league);
}




function buildTable(league){
        db.all("SELECT * FROM leagueTables WHERE league_id = ?" ,league.league_id,function (err, rows) {
            if ( err ) {
                document.getElementById("error").style.display = "block";
                return;
            }
            else{
                rows.sort((a, b) => (a.points < b.points) ? 1 : -1);
                for(let i = 0; i < rows.length; i++){
                    let team = rows[i];
                    console.log(team);
                    let pos = 0;;
                    let tableBody = document.querySelector("#table-body");

                    let goalDifference = team.goals_scored - team.goals_conceded;
                    let row =
                        `<tr>
                            <td>${i+ 1}</td>
                            <td>${team.team_name}</td>
                            <td>${team.points}</td>
                            <td>${team.won}</td>
                            <td>${team.drawn}</td>
                            <td>${team.lost}</td>
                            <td>${team.goals_scored}</td>
                            <td>${team.goals_conceded}</td>
                            <td>${goalDifference}</td>
                        </tr>`;
                    tableBody.innerHTML += row;
                };
            }
        });


}
