import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'

export const Tournament = ({match})=>{
    
    const tournamentParams = useLocation();
    const [tournamentData, setTournamentData]= useState([])
    const [tournamentGames, setTournamentGames]= useState([])
    const [tournamentTeams, setTournamentTeams]= useState([])
    const tournament = tournamentParams.state

    useEffect(() => {
        const fetchData = async () => {
            const result = await modelService.getModel(tournament.type, tournament.id)
            setTournamentData(result.data)
        }
        const fetchTournamentData = async () => {
            const result = await modelService.getTournamentData(tournament.type, tournament.id)
            //const games = await modelService.getGames(tournamentData.type, tournamentData.id)
			//.then(res => res.json())
            console.log(result.data)
            setTournamentTeams(result.data.teams)            
            //setTournamentGames(games.data)
        }
        fetchData()
        fetchTournamentData()
    }, [])

    const navigate = useNavigate();

    const goToSearchResult = async (event) =>{
        const r = JSON.parse(event.target.getAttribute('value'))
        navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
        //window.location.reload();
    }

    const handleClick = (e)=>{     
    }  

    return (
        <>
            <div className="App-header">
                <div className="App-title">
                    <div className="container">
                        <div className="Data">
                            <div className="card text-white bg-dark mb-3">
                                <img src="..." className="card-img-top" alt="'Image of tournament'"/>
                                <div className="card-body">
                                    <h5 className="card-title">{tournamentData.name}</h5>
                                    <p className="card-text">
                                        Category: {tournamentData.category}<br/>
                                        Season: {tournamentData.season}
                                    </p>
                                    <p className="card-text"><small className="text-muted">Other info</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="Teams">Teams
                            <div className="overflow-auto">
                                <div className="btn-group-vertical">
                                    {tournamentTeams.map( (t, index) =>
                                        <div className={"item " + t.type} key = {index} value = {JSON.stringify(t)} onClick={goToSearchResult}>
                                            {t.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Games">games
                            <div className="overflow-auto">
                                <button type="button" className="btn btn-primary">Left</button>
                                <button type="button" className="btn btn-primary">Middle</button>
                                <button type="button" className="btn btn-primary">Right</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default Tournament;