import axios from "axios";
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const api = "http://localhost:8080/"

const getModel = (type, id) => { return axios.get(api + type + "/" + id)}

const getTournamentData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getTeamData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getPlayerData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getGameData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const saveTournament = (data) => { 
    const tournamentData = {name: data.name, season: data.season, category: data.category, profileImage: ""}
    const formData = new FormData();
    formData.append("profileImage", data.profileImage);
    axios.post(api + "Tournament", tournamentData, {params: { profileImage: formData}}).then((response) => {
        return response
    })
}

const saveTeam = (data, navigate) => {
    const teamData = {name: data.name, season: data.season, category: data.category, profileImage: data.profileImage, tournaments: data.tournament.map( t => (t.value))} 
    //const tournamentID = Object.assign({}, data.tournament.map( t => (t.value)))
    //data.tournament.map( t => (t.value))
    //console.log(tournamentID)
    debugger
    return axios.post(api + "Team", teamData, {params: { }}).then(response => {
        debugger
        console.log(response)
        navigate("/Team/" + response.data, {state : {type : "Team", id : response.data}})
        debugger
    })
}

const savePlayer = (data, navigate) => { 
    //const formData = new FormData();
    //formData.append("profileImage", data.profileImage);
    const playerData = {dni: data.dni, name: data.name, surname: data.surname, birth: data.birth, profileImage: data.profileImage, teams: data.team.map( t => (t.value)) }
    console.log(playerData)
    debugger
    return axios.post(api + "Player", playerData, {params: { /*profileImage: formData*/}}).then(response => {
        debugger
        console.log(response)
        navigate("/Player/" + response.data, {state : {type : "Player", id : response.data}})
        debugger
    })
}

const saveGame = (data, navigate) => { 

    var homePlayersId = []
    data.homePlayers.map(p => homePlayersId.push(p.id))
    var awayPlayersId = []
    data.awayPlayers.map(p => awayPlayersId.push(p.id))
    //debugger

    const gameData = {tournament: data.tournament.id, homeTeam: data.homeTeam.id, awayTeam: data.awayTeam.id, homePlayers: homePlayersId, awayPlayers: awayPlayersId}
    console.log(gameData)
    //debugger
    return axios.post(api + "Game", gameData, {}).then(response => {
        //debugger
        console.log(response)
        navigate("/LiveGame/" + response.data, {state : {type : "Game", id : response.data}})
        //debugger
    })
}


const saveStat = (stat, player, team, tournament, game) =>{
    debugger
    axios.post(api + "model/Stat", null, { params: {stat: stat, playerDni: player, teamId: team, tournamentId: tournament, gameId: game } })
}

const getAllTournaments = () =>{ return axios.get(api + "Tournament")}
 
const getAllTeamsOfTournament = (id) =>{ return axios.get(api + "model/Tournament")}
/*
const saveTournament = (name, season, category, profileImage) => { return axios.post(api + "Tournament")}

const navigate = useNavigate();

const goToSearchResult = async (event) =>{
    const r = JSON.parse(event.target.getAttribute('value'))
    navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
    //window.location.reload();
}*/

const modelService = {
    getModel,
    getTournamentData,
    getTeamData,
    getPlayerData,
    getGameData,
    saveTeam,
    savePlayer,
    saveTournament,
    saveGame,
    saveStat,
    getAllTournaments,
    getAllTeamsOfTournament
    //goToSearchResult
}

export default modelService