import axios from "axios";

const api = "http://localhost:8080/"

const getModel = (type, id) => { return axios.get(api + type + "/" + id)}

const getTournaments = (type, id) => { return axios.get(api + type + "/" + id)}

const getTeams = (type, id) => { return axios.get(api + type + "/" + id)}

const getPlayers = (type, id) => { return axios.get(api + type + "/" + id)}

const getGames = (type, id) => { return axios.get(api + type + "/" + id)}

const searchService = {
    getModel,
    getTournaments,
    getTeams,
    getPlayers,
    getGames
}

export default searchService