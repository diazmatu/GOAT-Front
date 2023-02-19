import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'
import StatSheet from './StatSheet';

const Team = ({match}) => {

    const teamParams = useLocation();
    const [teamData, setTeamData]= useState({})
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
            setTeamPlayers(result.data.players) 
            setTeamTournaments(result.data.tournaments)  
            setTeamGames(result.data.games)
            //console.log(result.data)
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
    const image = (i) => {return(<img src={"data:image/jpg;base64," + i.img} className="p-2 center-block rounded-circle img-thumbnail " style={{display: 'inline-block', textAlign: 'center', width: '5vw'}} alt="..." value = {JSON.stringify(i)}/>)}

    
    return (
        <>
            <div className="App-title">
                <div className="containerStats">
                    <div className="Data text-white bg-dark mb-3 DataCard">
                        <div className="Image">
                            <img src={"data:image/jpg;base64," + teamData.img} className="img-fluid rounded-start p-2 center-block rounded-circle img-thumbnail" alt="image of team" style={{display: 'inline-block', textAlign: 'center', width: '20vh'}}/>
                        </div>
                        <div className="Info card-body">
                            <h5 className="card-title">{teamData.name}</h5>
                            <p className="card-text">
                                Category: {teamData.category}<br/>
                                Season: {teamData.season}
                            </p>
                        </div>
                        <div className="Stats"><StatSheet componentData = {[teamData].concat(teamPlayers)} /></div>
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
                        {teamGames.map( (f, index) =>
                            <div className={"card text-bg mb-3 item text-center" + f.type} value = {JSON.stringify(f)} onClick={goToSearchResult} style={{background: 'var(--bs-gray-800)', borderRadius: '30px', fontSize: "17px"}} >
                                {image(f.homeTeam)}
                                {image(f.awayTeam)}
                                <div className="card-body  text-center" value = {JSON.stringify(f)}>
                                    <h5 className="card-title" value = {JSON.stringify(f)}>{f.homeTeam.name + ' VS ' + f.awayTeam.name}</h5>
                                    <p className="card-text" value = {JSON.stringify(f)}/>
                                </div>
                            </div>
                        )}
                        </div>
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
        </>
       );

}

export default Team