import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/model/SearchResult.css'
import StatSheet from './StatSheet';

const Game = () => {

    const gameParams = useLocation();
    const [gameData, setGameData]= useState({homeTeam:{img:"", name:""}, awayTeam:{img:"", name:""}})
    const game = gameParams.state
    const [gameHomeTeam, setGameHomeTeam]= useState([])
    const [gameAwayTeam, setGameAwayTeam]= useState([])
    const [gameHomePlayers, setGameHomePlayers]= useState([])
    const [gameAwayPlayers, setGameAwayPlayers]= useState([])
    const [tournament, setTournament]= useState({name:""})

    
    useEffect(() => {
        
        const fetchData = async () => {
            
            const result = await modelService.getModel(game.type, game.id)
			//.then(res => res.json())
            setGameData(result.data)
            //console.log(result.data)
        }
        const fetchGameData = async () => {
            
            const result = await modelService.getGameData(game.type, game.id)
            //const games = await modelService.getTeams(gameData.type, gameData.id)
			//.then(res => res.json())
            //console.log(result.data)
            
            setTournament(result.data.tournaments[0])
            setGameHomeTeam([result.data.homeTeam])
            setGameAwayTeam([result.data.awayTeam])
            setGameHomePlayers(result.data.homePlayers)
            setGameAwayPlayers(result.data.awayPlayers)
            console.log(gameHomeTeam)
            
            //setGameTeams(result.data.games)
        }
        
        fetchData()
        fetchGameData()
        
    }, [setGameData, setGameHomeTeam, setGameAwayTeam, setGameHomePlayers, setGameAwayPlayers])

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
            <div className="App-title">
                <div className="gameStats">
                    <div className="DataGame text-white bg-dark mb-3">
                        <div className="Image">
                            <img src={"data:image/jpg;base64," + gameData.homeTeam.img} className="img-fluid rounded-start p-2 center-block rounded-circle img-thumbnail" alt="image of game" style={{display: 'inline-block', textAlign: 'center', width: '20vh'}}/>
                            <img src={"data:image/jpg;base64," + gameData.awayTeam.img} className="img-fluid rounded-start p-2 center-block rounded-circle img-thumbnail" alt="image of game" style={{display: 'inline-block', textAlign: 'center', width: '20vh'}}/>
                        </div>
                        <div className="Info card-body">
                            <h5 className="card-title">{gameData.homeTeam.name + ' VS ' + gameData.awayTeam.name}</h5>
                            <p className="card-text">
                                <br/>
                            </p>
                        </div>
                        <div className="Stats"><StatSheet componentData = {[gameData].concat(gameHomeTeam).concat(gameHomePlayers).concat(gameAwayTeam).concat(gameAwayPlayers)} /></div>
                    </div>
                    <div className="Teams">Teams
                            <div className="overflow-auto">
                              <div className="btn-group-vertical">
                                    {[gameData.homeTeam, gameData.awayTeam].map( (t, index) =>
                                        <div className={"item " + t.type} key = {index} value = {JSON.stringify(t)} onClick={goToSearchResult}>
                                            {t.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="Tournaments">Tournament
                        <div className="overflow-auto">
                            <div className="btn-group-vertical">
                                        <div className={"item Tournament" } value = {JSON.stringify(tournament)}  onClick={goToSearchResult}>
                                        {tournament.name}
                            </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
       );

}

export default Game;