import axios from "axios";

const search_api = "http://localhost:8080/search/"

const getSimpleSearchResults = (search) =>{
    return axios.get(search_api + 'simpleSearch/' + search.simpleSearch, { 
        params:{
            tournamentFilter: search.tournament, 
            teamFilter: search.team, 
            playerFilter: search.player
    }});
}

const getDualSearchResults = (simpleValue, dualValue) =>{
    if (dualValue === '')
        dualValue = '*'
    
    return axios.get(search_api + 'dualSearch/' + simpleValue + '/' + dualValue);
}

const getSearchResults = (search) => {
    if (search.isDual)
        return getDualSearchResults(search.simpleSearch, search.dualSearch)
    else
        return getSimpleSearchResults(search)
}

const searchService = {
    getSearchResults,
}

export default searchService