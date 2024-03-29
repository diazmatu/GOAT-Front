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
            
            const results = await searchService.getSearchResults(searchParams.state)
			//.then(res => res.json())
            //console.log(results.data.first)
            
            if(!searchParams.state.isDual){
                setSearchResult(results.data.first)
                setSearchError(results.data.second)
            } else{
                setSearchResult(results.data)
            }
            console.log(results.data)
            
        }
        fetchData()
    }, [searchParams])

    const goToSearchResult = async (event) => {
        const r = JSON.parse(event.target.getAttribute('value'))
        
        navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
        //window.location.reload();
    }

    const hideAlert = (event) =>{
        var myAlert = document.getElementsByName(event.target.value);
        myAlert[0].hidden = true
        myAlert[1].hidden = true
    }

    const searchErrorText = () => {
                
        if (searchError.length == 3 || (searchParams.state.isDual && searchResults.length == 0)){
            return(
                <>
                    <div className="alert alert-danger collapse alert-dismissible fade show" role="alert" name='resultsAlert'>
                        <strong>Not found ANY results</strong>
                        <button type="button" className="btn-close" value="resultsAlert" onClick={hideAlert} aria-label="Close"></button>
                    </div>
                </>)
        }
        else if (searchError.length > 0){
            return(
                <>
                    <div className="alert alert-danger collapse alert-dismissible fade show" role="alert" name='resultsAlert'>
                        <strong>Not found results for:</strong> {searchError.map( (r) =>' ' + r + ' |')}
                        <button type="button" className="btn-close" value="resultsAlert" onClick={hideAlert} aria-label="Close"></button>
                    </div>
                        
                </>)
        }
    }

    const cardBody = (f) =>{

        const image = (i) => {return(<img src={"data:image/jpg;base64," + i.img} className="p-2 center-block rounded-circle img-thumbnail " style={{display: 'inline-block', textAlign: 'center', width: '5vw'}} alt="..." value = {JSON.stringify(i)}/>)}

        switch(f.type){
            case "Tournament":
                return(
                    <>
                        <div className="card-header text-center" value = {JSON.stringify(f)} hidden={f.type != "Tournament"} style={{background: 'linear-gradient(135deg, #bd2300, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Tournament</div>
                        {image(f)}  
                        <div className="card-body  text-center" value = {JSON.stringify(f)}>
                            <h5 className="card-title" value = {JSON.stringify(f)}>{f.name}</h5>
                            <p className="card-text" value = {JSON.stringify(f)}/>
                        </div>          
                    </>
                )
                break
                
            case "Team":
                return(
                    <>
                        <div className="card-header text-center" value = {JSON.stringify(f)} hidden={f.type != "Team"} style={{background: 'linear-gradient(135deg, #c44500, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Team</div>
                        {image(f)}
                        <div className="card-body  text-center" value = {JSON.stringify(f)}>
                            <h5 className="card-title" value = {JSON.stringify(f)}>{f.name}</h5>
                            <p className="card-text" value = {JSON.stringify(f)}/>
                        </div>
            
                    </>
                )
                break
                
            case "Player":
                return(
                    <>
                        <div className="card-header text-center" value = {JSON.stringify(f)} hidden={f.type != "Player"} style={{background: 'linear-gradient(135deg, #ff8400, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Player</div>
                        {image(f)}
                        <div className="card-body  text-center" value = {JSON.stringify(f)}>
                            <h5 className="card-title" value = {JSON.stringify(f)}>{f.surname+ ' ' + f.name}</h5>
                            <p className="card-text" value = {JSON.stringify(f)}/>
                        </div>
                    </>
                )
                break

            default:
                return(
                    <>
                        <div className="card-header text-center" value = {JSON.stringify(f)} hidden={f.type != "Game"} style={{background: 'linear-gradient(135deg, #dc3545, #141619)', borderRadius: '30px', fontSize: "17px", fontWeight: 'bold'}} >Game</div>
                        {image(f.homeTeam)}
                        {image(f.awayTeam)}
                        <div className="card-body  text-center" value = {JSON.stringify(f)}>
                            <h5 className="card-title" value = {JSON.stringify(f)}>{f.homeTeam.name + ' VS ' + f.awayTeam.name}</h5>
                            <p className="card-text" value = {JSON.stringify(f)}/>
                        </div>
                    </>
                )
                break
        }
        
        
    }

    return (
        <>
            <div className="">
                <div>
                    <br/>Search results of '{searchParams.state.simpleSearch}
                        {searchParams.state.isDual ?(
                            ' VS ' +
                            searchParams.state.dualSearch + " '") : ("' ")
                        }
                        {searchErrorText()}

                </div>
                <div className="row row-cols-1 row-cols-md-3 ">
                    {searchResults.map( (f, index) =>                      
                        <div className="col mx-auto" key = {index} >
                            <div className={"card text-bg mb-3 item text-center" + f.type} value = {JSON.stringify(f)} onClick={goToSearchResult} style={{background: 'var(--bs-gray-800)', borderRadius: '30px', fontSize: "17px"}} >
                                {cardBody(f)}
                            </div>
                        </div>
                    )}    
                </div>
            </div>
        </>
    )
}

export default SearchResult