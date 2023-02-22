import React, {useEffect,useState}  from 'react';
import '../css/GOAT.css';
import TournamentModal from './Modals/TournamentModal';
import TeamModal from './Modals/TeamModal';
import PlayerModal from './Modals/PlayerModal';
import GameModal from './Modals/GameModal';

const Home = () => {

  const [model, setModel] = useState("")
  const [modalForm, setModalForm] = useState(<></>)
  //const [playerData, setPlayerData] = useState({})
  //const [playerData, setPlayerData] = useState({})

  const requestNewTournament = () => {
    setModel("Tournament")
    setModalForm(<TournamentModal/>)
  }

    const requestNewTeam = () => {
    setModel("Team")
    setModalForm(<TeamModal/>)
  }

  const requestNewPlayer = () => {
    setModel("Player")
    setModalForm(<PlayerModal/>)
  }

  const requestNewGame = () => {
    setModel("Game")
    setModalForm(<GameModal />)
  }

  return (
    <div className="App-header">
      <div className="btn-group btn-group-justified">
        <button type="button" onClick={requestNewTournament} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Tournament</button>
        <button type="button" onClick={requestNewTeam} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Team</button>
        <button type="button" onClick={requestNewPlayer} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Player</button>
      </div>

      <div className="App-title">
        WELCOME TO G.O.A.T.
      </div>
      <div className="App-text">
      <br/>
        G ame <br/>
        O ptimal<br/>
        A ssistant for<br/> 
        T eams<br/>
      </div>

      <div className="btn-group btn-group-justified">
        <button type="button" onClick={requestNewGame} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Game</button>
      </div>

      <div className="modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content" style={{backgroundColor: '#343a40', color:'#6c757d'}}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add new {model}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {modalForm}
          </div>
        </div>
      </div>
      
  </div>
  )
}
export default Home;