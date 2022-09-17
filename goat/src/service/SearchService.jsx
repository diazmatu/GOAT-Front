import axios from "axios";

const search_api = "http://localhost:8080/search/"

const getSearchResults = (search) =>{

    return axios.get(search_api + search);

}


const userService = {
    getSearchResults
}

export default userService