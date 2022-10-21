import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/model/SearchResult.css'
import StatSheet from '../model/StatSheet'

const Team = ({match}) => {

    const teamParams = useLocation();
    const [teamData, setTeamData]= useState([])
    const team = teamParams.state
    const [teamGames, setTeamGames]= useState([])
    const [teamTournaments, setTeamTournaments]= useState([])
    const [teamPlayers, setTeamPlayers]= useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await modelService.getModel(team.type, team.id)
			//.then(res => res.json())
            setTeamData(result.data)
            console.log(result.data)
        }
        const fetchTeamData = async () => {
            const result = await modelService.getTeamData(team.type, team.id)
            //const games = await modelService.getGames(teamData.type, teamData.id)
			//.then(res => res.json())
            console.log(result.data)
            setTeamPlayers(result.data.players) 
            setTeamTournaments(result.data.tournaments)  
            //setTeamGames(result.data.games)
        }
        fetchData()
        fetchTeamData()
    }, [setTeamData])

    const navigate = useNavigate();

    const goToSearchResult = async (event) =>{
        const r = JSON.parse(event.target.getAttribute('value'))
        navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
        //window.location.reload();
    }

    const handleClick = (e) => {
                       
    }
    
    return (
        <>
            <div className="App-header">
                <div className="App-title">
                    <div className="containerStats">
                        <div className="Data">
                            <div className="card text-white bg-dark mb-3" >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="..." className="img-fluid rounded-start" alt="image of team"/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{teamData.name}</h5>
                                            <p className="card-text">
                                                Category: {teamData.category}<br/>
                                                Season: {teamData.season}
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">
                                                    <table id="StatsTable">Tabla de Stats</table>
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Players">Players
                            <div className="overflow-auto">
                                <div className="btn-group-vertical">
                                    {teamPlayers.map( (p, index) =>
                                        <div className={"item " + p.type} key = {index} value = {JSON.stringify(p)} onClick={goToSearchResult}>
                                            {p.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Games">Games
                            <div className="overflow-auto">
                                <button type="button" className="btn btn-primary">Left</button>
                                <button type="button" className="btn btn-primary">Middle</button>
                                <button type="button" className="btn btn-primary">Right</button></div>
                        </div>
                        <div className="Tournaments">Tournaments
                            <div className="overflow-auto">
                                <div className="btn-group-vertical">
                                    {teamTournaments.map( (t, index) =>
                                        <div className={"item " + t.type} key = {index} value = {JSON.stringify(t)} onClick={goToSearchResult}>
                                            {t.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
       );

}

export default Team