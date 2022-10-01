import axios from "axios";
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const api = "http://localhost:8080/"

const getModel = (type, id) => { return axios.get(api + type + "/" + id)}

const getTournamentData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getTeamData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

const getPlayerData = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}

/*const getGames = (type, id) => { return axios.get(api + "model/" + type + "/" + id)}
    
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
    //goToSearchResult
}

export default modelService