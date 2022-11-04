import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'
import StatSheet from './StatSheet';

const Game = () => {

    const gameParams = useLocation();
    const [gameData, setGameData]= useState({})
    const game = gameParams.state
    const [gameTeamA, setGameTeamA]= useState({})
    const [gameTeamB, setGameTeamB]= useState({})
    const [gamePlayersA, setGamePlayersA]= useState([])
    const [gamePlayersB, setGamePlayersB]= useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await modelService.getModel(game.type, game.id)
			//.then(res => res.json())
            //debugger
            setGameData(result.data)
            //console.log(result.data)
        }
        const fetchGameData = async () => {
            //debugger
            const result = await modelService.getGameData(game.type, game.id)
            //const games = await modelService.getTeams(gameData.type, gameData.id)
			//.then(res => res.json())
            //console.log(result.data)
            
            setGameTeamA([result.data.teamA])
            setGameTeamB([result.data.teamB])
            setGamePlayersA(result.data.playersA)
            setGamePlayersB(result.data.playersB)
            console.log(gameTeamA)
            //setGameTeams(result.data.games)
        }
        fetchData()
        fetchGameData()
    }, [setGameData, setGameTeamA, setGameTeamB, setGamePlayersA, setGamePlayersB])

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
                <div className="containerStats">
                    <div className="Data text-white bg-dark mb-3 DataCard">
                        <div className="Image">
                            <img src={"data:image/jpg;base64," + gameData.teamA.img} className="img-fluid rounded-start p-2 center-block rounded-circle img-thumbnail" alt="image of game" style={{display: 'inline-block', textAlign: 'center', width: '20vh'}}/>
                            <img src={"data:image/jpg;base64," + gameData.teamB.img} className="img-fluid rounded-start p-2 center-block rounded-circle img-thumbnail" alt="image of game" style={{display: 'inline-block', textAlign: 'center', width: '20vh'}}/>
                        </div>
                        <div className="Info card-body">
                            <h5 className="card-title">{gameData.teamA.name + ' VS ' + gameData.teamB.name}</h5>
                            <p className="card-text">
                                datos de juego<br/>
                            </p>
                        </div>
                        <div className="Stats"><StatSheet componentData = {[gameData].concat(gameTeamA).concat(gamePlayersA).concat(gameTeamB).concat(gamePlayersB)} /></div>
                    </div>
                </div> 
            </div>
        </>
       );

}

export default Game;