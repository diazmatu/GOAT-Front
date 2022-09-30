import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/GOAT.css';
import '../../css/model/SearchResult.css'

const Player = ({match}) => {

  const playerParams = useLocation();
  const [playerData, setPlayerData]= useState([])
  const player = playerParams.state

  useEffect(() => {
      const fetchData = async () => {
          const result = await modelService.getModel(player.type, player.id)
          //.then(res => res.json())
          setPlayerData(result.data)
          //console.log(searchResults)
      }
      fetchData()
  }, [])

  return (
    <div className="App-header">
      <div className="App-title">
        <div className="containerStats">
          <div className="Data">
            <div className="card text-white bg-dark mb-3" style="max-width: 540px;">
              <div className="row g-0">
                  <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..."/>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{playerData.name}</h5>
                      <p className="card-text"></p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="Teams">Teams
                            <div className="overflow-auto">...</div>
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