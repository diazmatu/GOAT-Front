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
    const [searchResults,setSearchResult]= useState([])/*
    const [results, setResults]= useState(false)
    const [tournamets, setTournaments]= useState(false)
    const [teams, setTeams]= useState(false)
    const [players, setPlayers]= useState(false)*/
    const [searchError, setSearchError]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            //console.log(params)
            //console.log(searchParams.state)
            //debugger
            const results = await searchService.getSearchResults(searchParams.state)
			//.then(res => res.json())
            console.log(results.data.first)
            //debugger
            if(!searchParams.state.isDual){
                setSearchResult(results.data.first)
                setSearchError(results.data.second)
            } else{
                setSearchResult(results.data)
            }
            //console.log(searchResults)
            
        }
        fetchData()
    }, [searchParams])

    const goToSearchResult = async (event) => {
        const r = JSON.parse(event.target.getAttribute('value'))
        
        navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
        //window.location.reload();
    }

    const searchErrorText = () => {
                
        if (searchError.length == 3 || (searchParams.state.isDual && searchResults.length == 0)){
            return(
                <>
                    || Not found ANY results ||
                </>)
        }
        else if (searchError.length > 0){
            return(
                <>
                        || Not found for
                    {searchError.map( (r) =>
                        ' ' + r + ' |'
                    )
                    }|
                        
                    <br/>
                </>
                )
        }
    }

    return (
        <>
            <div className="">
                <div>
                    <br/>Search results of ' {searchParams.state.simpleSearch}
                        {searchParams.state.isDual ?(
                            ' VS ' +
                            searchParams.state.dualSearch + " '") : ("' ")
                        }

                        {searchErrorText()}
                </div>
                <div className="row row-cols-1 row-cols-md-3 ">
                    {searchResults.map( (f, index) =>                      
                        <div className="col" key = {index} >
                            <div className={"card text-bg mb-3 item " + f.type} value = {JSON.stringify(f)} onClick={goToSearchResult} style={{background: 'var(--bs-gray-800)', borderRadius: '30px', fontSize: "17px"}} >
                                <div className="card-header" value = {JSON.stringify(f)} hidden={f.type != "Tournament"} style={{background: 'linear-gradient(135deg, #dc6601, #dc6601)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Tournament</div>
                                <div className="card-header" value = {JSON.stringify(f)} hidden={f.type != "Team"} style={{background: 'linear-gradient(135deg, #dc3545, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Team</div>
                                <div className="card-header" value = {JSON.stringify(f)} hidden={f.type != "Player"} style={{background: 'linear-gradient(135deg, #dc3545, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Player</div>
                                <div className="card-header" value = {JSON.stringify(f)} hidden={f.type != "Game"} style={{background: 'linear-gradient(135deg, #dc3545, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Game</div>
                                
                                <img src="..." className="card-img-top" alt="..." value = {JSON.stringify(f)}/>
                                <div className="card-body" value = {JSON.stringify(f)}>
                                    <h5 className="card-title" value = {JSON.stringify(f)}>{(f.surname && f.name) || f.name || f.teamName + ' VS '}</h5>
                                    <p className="card-text" value = {JSON.stringify(f)}/>
                                </div>
                            </div>
                        </div>
                    )}    
                </div>
            </div>
        </>
    )
}

export default SearchResult