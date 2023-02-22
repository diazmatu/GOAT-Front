import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/model/LiveGame.css';
import '../../css/model/SearchResult.css'
import StatSheet from '../model/StatSheet';
//import useCountDown from "react-countdown-hook";
import { useTimer } from 'react-timer-hook';
import Timer from './LiveClock';
import Scoreboard from './Scoreboard';
//import Timer from "react-compound-timer"

const LiveGame = () => {

    const gameParams = useLocation();
    const [gameData, setGameData]= useState({})
    const game = gameParams.state
    const [gameHomeTeam, setGameHomeTeam]= useState({})
    const [gameAwayTeam, setGameAwayTeam]= useState({})
    const [gameHomePlayers, setGameHomePlayers]= useState([{}])
    const [gameAwayPlayers, setGameAwayPlayers]= useState([{}])
    const [currentPlayer, setCurrentPlayer]= useState()
    const [currentTeam, setCurrentTeam]= useState({})
    const [tournament, setTournament]= useState({})
    const [homeScore, setHomeScore]= useState(0)
    const [awayScore, setAwayScore]= useState(0)
    //const [timeLeft, actions] = useCountDown(10000, 100);

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
            
            const result = await modelService.getGameData('Game', game.id)
            //const games = await modelService.getTeams(gameData.type, gameData.id)
			//.then(res => res.json())
            setGameHomeTeam(result.data.homeTeam)
            setGameAwayTeam(result.data.awayTeam)
            setGameHomePlayers(result.data.homePlayers)
            setGameAwayPlayers(result.data.awayPlayers)
            
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

    const hideAlert = (event) =>{
        var myAlert = document.getElementById("choosePlayer");
        myAlert.hidden = true
    }

    const handleStat = (e) => {
        console.log(e.target)
        if(currentPlayer == undefined){
            var myAlert = document.getElementById("choosePlayer");
            myAlert.hidden = false
            
        } else{
            modelService.saveStat(e.target.value, currentPlayer, currentTeam, tournament, game.id)
            setCurrentPlayer(undefined)
            hideAlert()
        }
    }

    const handlePointConverted = (e) => {
        handleStat(e)
        
        if (currentTeam == gameHomeTeam.modelId){
            setHomeScore(homeScore + parseInt(e.target.name))
        } else {setAwayScore(awayScore + parseInt(e.target.name))}
    }

    const handleFoul = (e) => {
        handleStat(e)
        var pause = document.getElementById("pauseTimer");
        pause.click()
    }
    
    return (
        <>
            <div className="LiveGame">
                <div className="Court">
                    
                </div>
                <Timer/>
                
                <Scoreboard
            home_score={homeScore}
            away_score={awayScore}
            home_label={gameHomeTeam.name}
            away_label={gameAwayTeam.name}
            /*home_logo={gameHomeTeam.profileImage}
            away_logo={gameAwayTeam.profileImage}
            cur_period={1}
            period_label={"Period"}
            period_box={false}
            period_indicators={true}
            total_periods={4}>*/
          />

                <div className="TopButtons">
                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" value="threePointsMade" name={3} onClick={handlePointConverted}>3PT</button>
                        <button type="button" className="btn btn-success" value="twoPointsMade" name={2}  onClick={handlePointConverted}>2PT</button>
                        <button type="button" className="btn btn-success" value="freeThrowsMade" name={1}  onClick={handlePointConverted}>1FT</button>
                    </div>
                    
                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" value="offensiveRebounds" onClick={handleStat}>OfR</button>
                        <button type="button" className="btn btn-success" value="defensiveRebounds" onClick={handleStat}>DeR</button>
                    </div>

                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" value="assists" onClick={handleStat}>Ass</button>
                        <button type="button" className="btn btn-success" value="steals" onClick={handleStat}>Stl</button>
                        <button type="button" className="btn btn-danger" value="turnovers" onClick={handleStat}>Tov</button>
                    </div>

                    <br/><br/>
                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-danger" value="threePointsAttempted" onClick={handleStat}>3PT</button>
                        <button type="button" className="btn btn-danger" value="twoPointsAttempted" onClick={handleStat}>2PT</button>
                        <button type="button" className="btn btn-danger" value="freeThrowsAttempted" onClick={handleStat}>1FT</button>
                    </div>
                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" value="commitedFouls" onClick={handleFoul}>CFl</button>
                        <button type="button" className="btn btn-danger" value="recievedFouls" onClick={handleFoul}>RFl</button>
                    </div>
                    <div className="btn-group btn-group-lg mr-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-success" value="commitedBlocks" onClick={handleStat}>CBl</button>
                        <button type="button" className="btn btn-danger" value="recievedBlocks" onClick={handleStat}>RBl</button>
                    </div>
                </div>

                <div className="AwayPlayers">
                    <div className="btn-group-vertical btn-group-lg" role="group" aria-label="Vertical button group">
                        AWAY PLAYERS
                        {gameAwayPlayers.map( (p, index) =>
                            <button type="button" key={index} className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title={p.surname + ' ' + p.name} value={JSON.stringify({player: p.modelId, team: gameAwayTeam.modelId})} onClick={selectPlayer}>
                                {index + 4}
                            </button>
                        )}
                    </div>
                </div>

                <div className='Court'>
                </div>

                <div className="HomePlayers">
                    <div className="btn-group-vertical btn-group-lg" role="group" aria-label="Vertical button group">
                        HOME PLAYERS
                        {gameHomePlayers.map( (p, index) =>
                            <button type="button" key={index} className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title={p.surname + ' ' + p.name} value={JSON.stringify({player: p.modelId, team: gameHomeTeam.modelId})} onClick={selectPlayer}>
                                {index + 4}
                            </button>
                        )}
                    </div>
                </div>
                <div className='BottomButtons'>
                    <div className="alert alert-danger collapse alert-dismissible fade show" role="alert"  id='choosePlayer' hidden>
                        <strong>Choose a player</strong>
                        <button type="button" className="btn-close" value="choosePlayer" onClick={hideAlert} aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
       );

}

export default LiveGame;