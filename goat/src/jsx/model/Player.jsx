import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'
import StatSheet from './StatSheet';

const Player = ({match}) => {

  const playerParams = useLocation();
  const [playerData, setPlayerData] = useState({})
  const [playerGames, setPlayerGames] = useState([])
  const [playerTeams, setPlayerTeams] = useState([])
  const player = playerParams.state

  useEffect(() => {
      const fetchData = async () => {
          const result = await modelService.getModel(player.type, player.id)
          //.then(res => res.json())
          setPlayerData(result.data)
          //console.log(result.data)        
      }
      const fetchPlayerData = async () => {
        const result = await modelService.getPlayerData(player.type, player.id)
        //const games = await modelService.getGames(tournamentData.type, tournamentData.id)
        //.then(res => res.json())
        setPlayerTeams(result.data.teams)            
        setPlayerGames(result.data.games)
        console.log(result.data)
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

  const image = (i) => {return(<img src={"data:image/jpg;base64," + i.img} className="p-2 center-block rounded-circle img-thumbnail " style={{display: 'inline-block', textAlign: 'center', width: '5vw'}} alt="..." value = {JSON.stringify(i)}/>)}


  return (
      <div className="App-title">
        <div className="container">
        <div className="Data text-white bg-dark mb-3 DataCard">
          <div className="Image">
            <img src={"data:image/jpg;base64," + playerData.img} className="img-fluid rounded-start p-2 center-block rounded-circle img-thumbnail" alt="Imagen de Morena" style={{display: 'inline-block', textAlign: 'center', width: '20vh'}}/>
          </div>
            <div className="Info card-body">
              <h5 className="card-title">{playerData.name} {playerData.surname}</h5>
              <p className="card-text">
                DNI: {playerData.id} <br/>
                Date of birth: {playerData.birth}
              </p>
            </div>
          <div className="Stats"><StatSheet componentData = {[playerData]} /></div>
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
                        <div className="overflow-auto">
                        {playerGames.map( (f, index) =>
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

        </div>
        
      </div>
  )
}
export default Player;