import axios from "axios";

const api = "http://localhost:8080/"

const search_api = api + "search/"

const getSimpleSearchResults = (search) =>{
    console.log(search)
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

const goToSearchResult = (type, id) => { return axios.get(api + type + "/" + id)

}

const userService = {
    getSearchResults,
    goToSearchResult
}

export default userService