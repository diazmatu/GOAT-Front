import axios from "axios";

const api = "http://localhost:8080/"

const search_api = api + "search/"

const getSimpleSearchResults = (simpleValue) =>{
    return axios.get(search_api + 'simpleSearch/' + simpleValue);
}

const getDualSearchResults = (simpleValue, dualValue) =>{
    if (dualValue == '')
        dualValue = '*'
    //debugger
    return axios.get(search_api + 'dualSearch/' + simpleValue + '/' + dualValue);
}

const getSearchResults = async (search) => {
    if (search.isDual)
        await getDualSearchResults(search.simpleSearch, search.dualSearch)
    else
        await getSimpleSearchResults(search.simpleSearch)
}

const goToSearchResult = (type, id) => { return axios.get(api + type + "/" + id)

}

const userService = {
    getSearchResults,
    goToSearchResult
}

export default userService