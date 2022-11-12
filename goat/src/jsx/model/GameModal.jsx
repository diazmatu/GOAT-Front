import React, {useState, useEffect}  from 'react';
import modelService from '../../service/ModelService';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const GameModal = () => {

    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([])
    const [teams, setTeams] = useState([])
    const [homePlayers, setHomePlayers] = useState([])
    const [awayPlayers, setAwayPlayers] = useState([])
    const [data, setData] = useState({
        tournament: '',
        homeTeam: '""',
        homePlayers: [],
        awayTeam: '""',
        awayPlayers: []
    })

    useEffect(() => {
        const fetchTournaments = async () => {
            const result = await modelService.getAllTournaments()
			//.then(res => res.json())
            //debugger
            setTournaments(result.data)
            //console.log(result.data)
        }
        const fetchTeams = async () => {
            const t = JSON.parse(data.tournament)
            //debugger
            const result = await modelService.getTournamentData("Tournament", t.id)
			//.then(res => res.json())
            //debugger
            setTeams(result.data.teams)
            console.log(result.data.teams)
        }

        const fetchPlayers = async () => {
            const hT = JSON.parse(data.homeTeam)
            if (hT!= ""){
            debugger
            const result = await modelService.getTeamData("Team", hT.id)
			//.then(res => res.json())
            //debugger
            setHomePlayers(result.data.players)
            console.log(result.data.players)
        }
            const aT = JSON.parse(data.awayTeam)
            if (aT!= ""){
            debugger
            const res = await modelService.getTeamData("Team", aT.id)
			//.then(res => res.json())
            //debugger
            setAwayPlayers(res.data.players)
            console.log(res.data.players)}
        }

        //debugger
        fetchTournaments()
        fetchTeams()
        fetchPlayers()
    }, [data])

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
        console.log(data)
    }

    const handleHomePlayerChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData({
            ...data,
            homePlayers : (homePlayers => [...homePlayers, event.target.value])
        })
        console.log(data)
    }

    const handleAwayPlayerChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData({
            ...data,
            homePlayers : (homePlayers => [...homePlayers, event.target.value])
        })
        console.log(data)
    }

    const requestNewGame = () => {
        modelService.saveGame(data)
        navigate("/Home")
      }

    const isAwayTeam = (id) =>{
        const t = JSON.parse(data.awayTeam)
        return id == t.id
    }
    const isHomeTeam = (id) =>{
        const t = JSON.parse(data.homeTeam)
        return id == t.id
    }

    const chosenTournament = () =>{
        return data.tournament == ''
    }

  return (
    <>
            <form className="mb-3 needs-validation" novalidate onSubmit={requestNewGame}>
        <div className="modal-body">
                        Choose a tournament
            {tournaments.map( (t, index) =>
                    <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                        <input class="form-check-input" type="radio" id="flexRadioDefault1" value={JSON.stringify(t)} name="tournament" onChange={handleInputChange} required/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            {t.name}
                        </label>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please select a tournament.
                        </div>
                    </div>
            )}
            <div >
            Choose home team
            {teams.map( (t, index) =>
                    <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                        <input class="form-check-input" type="radio" id="flexRadioDefault1" value={JSON.stringify(t)} name="homeTeam" onChange={handleInputChange} required disabled={isAwayTeam(t.id)}/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            {t.name}
                        </label>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please select a tournament.
                        </div>
                    </div>
            )}
            Choose away team
            {teams.map( (t, index) =>
                    <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                        <input class="form-check-input" type="radio" id="flexRadioDefault2" value={JSON.stringify(t)} name="awayTeam" onChange={handleInputChange} required disabled={isHomeTeam(t.id)}/>
                        <label class="form-check-label" for="flexRadioDefault2">
                            {t.name}
                        </label>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please select a tournament.
                        </div>
                    </div>
            )}
            </div>
            <div >
            Choose home players
            {homePlayers.map( (t, index) =>
                    <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                        <input class="form-check-input" type="radio" id="flexRadioDefault1" value={JSON.stringify(t)} name="homePlayers" onChange={handleHomePlayerChange} required/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            {t.name + ' ' + t.surname}
                        </label>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please select a tournament.
                        </div>
                    </div>
            )}
            Choose away players
            {awayPlayers.map( (t, index) =>
                    <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                        <input class="form-check-input" type="radio" id="flexRadioDefault1" value={JSON.stringify(t)} name="awayPlayers" onChange={handleAwayPlayerChange} required/>
                        <label class="form-check-label" for="flexRadioDefault1">
                            {t.name + ' ' + t.surname}
                        </label>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Please select a tournament.
                        </div>
                    </div>
            )}
            </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Add Game</button>
        </div>
            </form>
    </>
  )
}

export default GameModal;