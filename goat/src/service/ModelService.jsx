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

const saveTeam = (data) => { 
    const teamData = {name: data.name, season: data.season, category: data.category, profileImage: data.profileImage}
    return axios.post(api + "Team", teamData)
}

const savePlayer = (data) => { 
    const formData = new FormData();
    formData.append("profileImage", data.profileImage);
    const playerData = {dni: data.dni, name: data.name, surname: data.surname, birth: data.birth, profileImage: data.profileImage}
    console.log(playerData)
    debugger
    return axios.post(api + "Player", playerData, {params: { profileImage: formData}})
}
    
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
    saveTournament
    //goToSearchResult
}

export default modelService