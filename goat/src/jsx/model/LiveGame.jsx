import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'
import StatSheet from './StatSheet';
//import useCountDown from "react-countdown-hook";
import { useTimer } from 'react-timer-hook';
import Timer from './LiveClock';
import Scoreboard from './LiveGame/Scoreboard/js';
//import Timer from "react-compound-timer"

const LiveGame = () => {

    const gameParams = useLocation();
    const [gameData, setGameData]= useState({})
    const game = gameParams.state
    const [gameHomeTeam, setGameHomeTeam]= useState({})
    const [gameAwayTeam, setGameAwayTeam]= useState({})
    const [gameHomePlayers, setGameHomePlayers]= useState([{}])
    const [gameAwayPlayers, setGameAwayPlayers]= useState([{}])
    const [currentPlayer, setCurrentPlayer]= useState({})
    const [currentTeam, setCurrentTeam]= useState({})
    const [tournament, setTournament]= useState({})
    //const [timeLeft, actions] = useCountDown(10000, 100);

    const {
        miliseconds,
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({
        
        onExpire: () => console.warn('onExpire called') });
    
    

    useEffect(() => {
        console.log(gameParams)    
        const fetchData = async () => {
            const result = await modelService.getModel(game.type, game.id)
			//.then(res => res.json())
            setGameData(result.data)
            setTournament(result.data.tournamentId)
            //console.log(result.data)
        }
        const fetchGameData = async () => {
            //debugger
            const result = await modelService.getGameData('Game', game.id)
            //const games = await modelService.getTeams(gameData.type, gameData.id)
			//.then(res => res.json())
            
            setGameHomeTeam(result.data.homeTeam)
            setGameAwayTeam(result.data.awayTeam)
            setGameHomePlayers(result.data.homePlayers)
            setGameAwayPlayers(result.data.awayPlayers)
            debugger
            //console.log(gameHomeTeam)
            
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

    const selectPlayer = (e) => {
        const data = JSON.parse(e.target.value)
        setCurrentPlayer(data.player)
        setCurrentTeam(data.team)
    }

    const handleStat = (e) => {
        modelService.saveStat(e.target.value, currentPlayer, currentTeam, tournament, game.id)
    }
    
    return (
        <>
            <div className="LiveGame">
                <div className="Court">
                    
                </div>
                <Timer/>
                
                <Scoreboard
            // theme="whale"
            // theme="dragon"
            // theme="unicorn"
            // theme="unicorn-dark"
            // theme="ice"
            time={0}
            home_score={0}
            away_score={0}
            home_label={gameHomeTeam.name}
            away_label={gameAwayTeam.name}
            home_logo={gameHomeTeam.profileImage}
            away_logo={gameAwayTeam.profileImage}
            cur_period={1}
            period_label={"Period"}
            period_box={false}
            period_indicators={true}
            total_periods={4}>
          </Scoreboard>

                <div className="TopButtons">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" value="threePointsMade" onClick={handleStat}>3PT</button>
                        <button type="button" className="btn btn-success" value="twoPointsMade" onClick={handleStat}>2PT</button>
                        <button type="button" className="btn btn-success" value="freeThrowsMade" onClick={handleStat}>1FT</button>
                    </div>
                </div>

                <div className="BottomButtons">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-danger" value="threePointsAttempted" onClick={handleStat}>3PT</button>
                        <button type="button" className="btn btn-danger" value="twoPointsAttempted" onClick={handleStat}>2PT</button>
                        <button type="button" className="btn btn-danger" value="freeThrowsAttempted" onClick={handleStat}>1FT</button>
                    </div>
                </div>

                <div className="AwayPlayers">
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                        {gameAwayPlayers.map( (p, index) =>
                            <button type="button" key={index} className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title={p.surname + ' ' + p.name} value={JSON.stringify({player: p.modelId, team: gameAwayTeam.modelId})} onClick={selectPlayer}>
                                {index + 4}
                            </button>
                        )}
                    </div>
                </div>

                <div className="HomePlayers">
                    <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                        {gameHomePlayers.map( (p, index) =>
                            <button type="button" key={index} className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title={p.surname + ' ' + p.name} value={JSON.stringify({player: p.modelId, team: gameAwayTeam.modelId})} onClick={selectPlayer}>
                                {index + 4}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
       );

}

export default LiveGame;