import axios from "axios";

const api = "http://localhost:8080/"

const search_api = api + "search/"

const getSimpleSearchResults = (simpleValue) =>{
    debugger
    return axios.get(search_api + 'simpleSearch/' + simpleValue);
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
        return getSimpleSearchResults(search.simpleSearch)
}

const goToSearchResult = (type, id) => { return axios.get(api + type + "/" + id)

}

const userService = {
    getSearchResults,
    goToSearchResult
}

export default userService