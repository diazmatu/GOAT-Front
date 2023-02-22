import axios from "axios";
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const api = "http://localhost:8080/"

const getModel = (type, id) => { return axios.get(api + type + "/" + id)}

const getTournamentData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getTeamData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getPlayerData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getGameData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const uploadImage = async (profileImage, id, type) => {
        console.log("Upload Image", profileImage);
        const formData = new FormData();
        formData.append("profileImage", profileImage);/*
        formData.append("destination", "images");
        formData.append("create_thumbnail", true);
        formData.append("id", id);
        formData.append("type", type);*/
        
    try {
        const config = {
            headers: {
            "content-type": "multipart/form-data"
            }
        };  
        const result = await axios.post(api + "model/UploadImage", formData, { params: { type: type, id: id } }, config);
        console.log("Result: ", result);
        
    } catch (error) {
        console.error(error);
        
    }
}
/*
const imageDataForm = (image) => {
    const formData = new FormData();
    formData.append("profileImage", image)
    return formData
}*/

const saveTournament = async (data, navigate) => {
    const tournamentData = {name: data.name, season: data.season, category: data.category, profileImage: ""}
    const config = {
        headers: {
        "content-type": "multipart/form-data"
        }
    }; 
    await axios.post(api + "Tournament", tournamentData, { params: { }, config }).then(response => {
        console.log(response)
        uploadImage(data.profileImage, response.data, "Tournament")
        
        navigate("/Tournament/" + response.data, {state : {type : "Tournament", id : response.data}})
        
    })
    
}

const saveTeam = (data, navigate) => {
    const teamData = {name: data.name, season: data.season, category: data.category, profileImage: "", tournaments: data.tournament.map( t => (t.value))} 
    //const tournamentID = Object.assign({}, data.tournament.map( t => (t.value)))
    //data.tournament.map( t => (t.value))
    //console.log(tournamentID)
    
    return axios.post(api + "Team", teamData, {params: { }}).then(response => {
        
        console.log(response)
        navigate("/Team/" + response.data, {state : {type : "Team", id : response.data}})
        
    })
}

const savePlayer = (data, navigate) => { 
    //const formData = new FormData();
    //formData.append("profileImage", data.profileImage);
    const playerData = {dni: data.dni, name: data.name, surname: data.surname, birth: data.birth, profileImage: "", teams: data.team.map( t => (t.value)) }
    console.log(playerData)
    
    return axios.post(api + "Player", playerData, {params: {}}).then(response => {
        
        console.log(response)
        navigate("/Player/" + response.data, {state : {type : "Player", id : response.data}})
        
    })
}

const saveGame = (data, navigate) => { 

    var homePlayersId = []
    data.homePlayers.map(p => homePlayersId.push(p.id))
    var awayPlayersId = []
    data.awayPlayers.map(p => awayPlayersId.push(p.id))
    

    const gameData = {tournament: data.tournament.id, homeTeam: data.homeTeam.id, awayTeam: data.awayTeam.id, homePlayers: homePlayersId, awayPlayers: awayPlayersId}
    console.log(gameData)
    
    return axios.post(api + "Game", gameData, {}).then(response => {
        
        console.log(response)
        navigate("/LiveGame/" + response.data, {state : {type : "Game", id : response.data}})
        
    })
}


const saveStat = (stat, player, team, tournament, game) =>{
    
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