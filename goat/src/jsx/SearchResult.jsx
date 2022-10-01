import React,{useEffect,useState} from 'react'
import '../css/model/SearchResult.css'
import searchService from '../service/SearchService'
import modelService from '../service/ModelService'
import {useNavigate, useLocation, useParams} from "react-router-dom";

const SearchResult = () => {   
    
    const navigate = useNavigate();
    const searchParams = useLocation();
    //let {params} = useParams()
    //const searchValue = searchParams.state.id
    const [searchResults,setSearchResult]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            //console.log(params)
            console.log(searchParams.state)
            //
            const results = await searchService.getSearchResults(searchParams.state)
			//.then(res => res.json())
            setSearchResult(results.data)
            //console.log(searchResults)
            
        }
        fetchData()
    }, [searchParams])

    const goToSearchResult = async (event) =>{
        const r = JSON.parse(event.target.getAttribute('value'))
        navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
        //window.location.reload();
    }

    return ( 
            <div className="">
                <br/>Resultados de ' {searchParams.state.simpleSearch}
                    {searchParams.state.isDual ?(
                        ' VS ' +
                        searchParams.state.dualSearch + " '") : ("'")
                    }
                    
                <br/>
                {searchResults.map( (f, index) =>
                    <div className={"item " + f.type} key = {index} value = {JSON.stringify(f)} onClick={goToSearchResult}>
                        {(f.surname && f.name) || f.name || f.teamName + ' VS '}
                    </div>
                )}    
            </div>
    )
}

export default SearchResult