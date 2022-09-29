import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import userService from '../../service/SearchService'
import '../../css/GOAT.css';

const Player = ({match}) => {

  const playerParams = useLocation();
  const [playerData, setPlayerData]= useState([])
  const player = playerParams.state

  useEffect(() => {
      const fetchData = async () => {
          const result = await userService.goToSearchResult(player.type, player.id)
          //.then(res => res.json())
          setPlayerData(result.data)
          //console.log(searchResults)
      }
      fetchData()
  }, [])

  return (
    <div className="App-header">
        <div className="App-title">
          Player {playerData.name}
        </div>
  </div>
  )
}
export default Player;