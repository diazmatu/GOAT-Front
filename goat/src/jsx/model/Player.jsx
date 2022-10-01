import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'

const Player = ({match}) => {

  const playerParams = useLocation();
  const [playerData, setPlayerData]= useState([])
  const [playerGames, setPlayerGames]= useState([])
  const [playerTeams, setPlayerTeams]= useState([])
  const player = playerParams.state

  useEffect(() => {
      const fetchData = async () => {
          const result = await modelService.getModel(player.type, player.id)
          //.then(res => res.json())
          setPlayerData(result.data)
          //console.log(searchResults)
      }
      const fetchPlayerData = async () => {
        const result = await modelService.getPlayerData(player.type, player.id)
        //const games = await modelService.getGames(tournamentData.type, tournamentData.id)
        //.then(res => res.json())
        console.log(result.data)
        setPlayerTeams(result.data.teams)            
        //setPlayerGames(result.data.games)
    }
      fetchData()
      fetchPlayerData()
  }, [])

  
  const navigate = useNavigate();

  const goToSearchResult = async (event) =>{
      const r = JSON.parse(event.target.getAttribute('value'))
      navigate("/"+ r.type + "/" + r.id, {state : {type : r.type, id : r.id}});
      //window.location.reload();
  }

  return (
    <div className="App-header">
      <div className="App-title">
        <div className="containerStats">
          <div className="Data">
            <div className="card text-white bg-dark mb-3">
              <div className="row g-0">
                  <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="Imagen de Morena"/>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{playerData.name} {playerData.surname}</h5>
                      <p className="card-text">
                        DNI: {playerData.id} <br/>
                        Date of birth: {playerData.birth}
                      </p>
                      <p className="card-text"><small className="text-muted"><table id="StatsTable">Tabla de Stats</table></small></p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="Teams">Teams
                            <div className="overflow-auto">
                              <div className="btn-group-vertical">
                                    {playerTeams.map( (t, index) =>
                                        <div className={"item " + t.type} key = {index} value = {JSON.stringify(t)} onClick={goToSearchResult}>
                                            {t.name}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
          <div className="Games">Games
                            <div className="overflow-auto">...</div>
                        </div>
          <div className="Tournaments">Tournaments
                            <div className="overflow-auto">...</div>
                        </div>

        </div>
        
      </div>
  </div>
  )
}
export default Player;