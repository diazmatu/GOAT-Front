import React,{useEffect,useState} from 'react'
import '../css/model/SearchResult.css'
import userService from '../service/SearchService'

const SearchResult = () => {   
    const [searchResults,setSearchResult]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const results = await userService.getSearchResults(localStorage.getItem("search"))
			//.then(res => res.json())
            setSearchResult(results.data)
            console.log(searchResults)
        }
        fetchData()
    }, [])

    return ( 
            <div className="btn-group-vertical">
                <br/>Resultados de '{localStorage.getItem("search")}'
                {searchResults.map( event =>
                    <div className="item" key = {event._id} onClick={goToResult}>
                        {event.name}
                    </div>
                )}    
            </div>
    )
}

export default SearchResult