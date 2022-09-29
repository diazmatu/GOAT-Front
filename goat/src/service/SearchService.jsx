import axios from "axios";

const api = "http://localhost:8080/"

const search_api = api + "search/"

const getSearchResults = (search) => {
    return axios.get(search_api + search);
}

const goToSearchResult = (type, id) => { return axios.get(api + type + "/" + id)

}

const userService = {
    getSearchResults,
    goToSearchResult
}

export default userService