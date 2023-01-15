
function showLeague(league) {
    if (typeof window === "undefined") {
        console.log("UNDEFINED");
        return
    }
    else{
        try{
            console.log(league);
            window.location.href = `../teams-dashboard/index.html?league=${league.league_id}`;
        }catch (e) {
            console.log(e);
        }
    }

}
export default showLeague;