import React, {useState, useEffect}  from 'react';
import modelService from '../../service/ModelService';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const GameModal = () => {

    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([])
    const [teams, setTeams] = useState([])
    const [homePlayers, setHomePlayers] = useState([])
    const [limitOfHomePlayers, setLimitOfHomePlayers] = useState(false)
    const [awayPlayers, setAwayPlayers] = useState([])
    const [limitOfAwayPlayers, setLimitOfAwayPlayers] = useState(false)
    const [data, setData] = useState({
        tournament: '',
        homeTeam: '',
        homePlayers: [],
        awayTeam: '',
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
            try {
                const t = JSON.parse(data.tournament)
                //debugger
                const result = await modelService.getTournamentData("Tournament", t.id)
                //.then(res => res.json())
                //debugger
                setTeams(result.data.teams)
                //console.log(result.data.teams)           
            } catch (err) {

            }
        }

        const fetchPlayers = async () => {
            try {
                const hT = JSON.parse(data.homeTeam)
                const result = await modelService.getTeamData("Team", hT.id)
                //.then(res => res.json())
                //debugger
                setHomePlayers(result.data.players)
                ///console.log("result.data.players")
              } catch (err) {

              }
            try {
                const aT = JSON.parse(data.awayTeam)
                const res = await modelService.getTeamData("Team", aT.id)
                //.then(res => res.json())
                //debugger
                setAwayPlayers(res.data.players)
                //console.log(res.data.players)
            } catch (err) {

            }
        }

        //debugger
        fetchTournaments()
        fetchTeams()
        fetchPlayers()
    }, [data])

    const clearSelectedTeams = () =>{

        var radios = new Set([
            ...document.getElementsByName('homeTeam'),
            ...document.getElementsByName('awayTeam')
        ])
        for (var radio of radios) {
            radio.checked = false;
        }

        setData(data => ({
            ...data,
            homeTeam: '',
            awayTeam: '',
            homePlayers: [],
            awayPlayers: []
          }))
    }

    const clearCheckedPlayers = (name) =>{
        
        var checkboxes = document.getElementsByName(name);
        for (var checkbox of checkboxes) {
            checkbox.checked = false;
        }


        setData(data => ({
            ...data,
            [`${name}`]: [],
        }))
    }

    const addRemoveFromArray = (name, value, checked, setLimit) => {
        console.log(name)
        
        if(checked){
            setData(data => ({
                ...data,
                [`${name}`]: [...data[`${name}`], value]
              }))

              setLimit(data[`${name}`].length + 1 === 1)
        } else{
            
            var index = data[`${name}`].indexOf(value); 
            const list = data[`${name}`].splice(index, 1);
            if (index !== -1){
                list.splice(index, 1);
            }
            setData(data => ({
                ...data,
                [`${name}`]: list
              }))

              setLimit(data[`${name}`].length - 1 === 1)
        }

        console.log(limitOfHomePlayers)
        console.log(limitOfAwayPlayers)
    }

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        const name = event.target.name
        const value = event.target.value
        switch (name) {

            case 'tournament':
                setData({
                    tournament: value,
                    homeTeam: '',
                    homePlayers: [],
                    awayTeam: '',
                    awayPlayers: []
                })
                clearSelectedTeams()
                break
            
            case 'homeTeam':
                setData({
                    ...data,
                    [`${name}`] : value
                })
                clearCheckedPlayers('homePlayers')
                setLimitOfHomePlayers(false)

                break
            
            case 'awayTeam':
                setData({
                    ...data,
                    [`${name}`] : value
                })
                clearCheckedPlayers('awayPlayers')
                setLimitOfAwayPlayers(false)

                break
            
            case 'homePlayers':
                addRemoveFromArray(name, value, event.target.checked, setLimitOfHomePlayers)
                break
            
            case 'awayPlayers':
                addRemoveFromArray(name, value, event.target.checked, setLimitOfAwayPlayers)
                break
            
            default:
                setData({
                    ...data,
                    [`${name}`] : value
                })
              break
          }
        console.log(data)
    }

/*
    const handleHomePlayerChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData(data => ({
            ...data,
            homePlayers: [...data.homePlayers, event.target.value]
          }))
        setLimitOfHomePlayers(data.homePlayers.length + 1 === 1)
        //debugger
    }

    const handleAwayPlayerChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData({
            ...data,
            awayPlayers : [...data.awayPlayers, event.target.value]
        })
        setLimitOfAwayPlayers(data.awayPlayers.length + 1 === 12)
        console.log(data)
        //debugger
    }*/

    const isLimit = (name, index) =>{
            try {
            const checkbox = document.getElementById(name + index)
            //console.log(limitOfHomePlayers)
            //debugger
            if (name == "homePlayers"){
                //debugger
                return (limitOfHomePlayers && !checkbox.checked)
            } else {
                //debugger
                return (limitOfAwayPlayers && !checkbox.checked)
            }  
        } catch (error) {
            return false
        }
    }

    const isAwayTeam = (id) =>{
        try{
            const t = JSON.parse(data.awayTeam)
            return id == t.id} catch{ return false}
    }

    const isHomeTeam = (id) =>{
        try{
            const t = JSON.parse(data.homeTeam)
            return id == t.id} catch{ return false}
    }

    const chosenTournament = () =>{
        return data.tournament === ''
    }

    const chosenAwayTeam = () =>{
        return data.awayTeam === ''
    }

    const chosenHomeTeam = () =>{
        return data.homeTeam === ''
    }

    const requestNewGame = () => {
        modelService.saveGame(data)
        navigate("/Home")
      }


  return (
    <>
        <div className="modal-body ">
        <form className="mb-3 needs-validation" id="gameForm" novalidate onSubmit={requestNewGame}>
            Choose a tournament
            {tournaments.map( (t, index) =>
                    <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                        <input className="form-check-input" type="radio" id="flexRadioDefault1" value={JSON.stringify(t)} name="tournament" onChange={handleInputChange} required/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
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
            <div className='teams' hidden={chosenTournament()}>
                Choose home team
                {teams.map( (t, index) =>
                        <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                            <input className="form-check-input" type="radio" id="flexRadioDefault1" value={JSON.stringify(t)} name="homeTeam" onChange={handleInputChange} required disabled={isAwayTeam(t.id)}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                            <input className="form-check-input" type="radio" id="flexRadioDefault2" value={JSON.stringify(t)} name="awayTeam" onChange={handleInputChange} required disabled={isHomeTeam(t.id)}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
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
            <div className='homePlayers' hidden={chosenHomeTeam()}>
                Choose home players
                {homePlayers.map( (t, index) =>
                        <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                            <input className="form-check-input" type="checkbox" id={'homePlayers'+index} value={JSON.stringify(t)} name="homePlayers" onChange={handleInputChange} required disabled={isLimit('homePlayers', index)}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
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
            <div className='awayPlayers' hidden={chosenAwayTeam()}>
                Choose away players
                {awayPlayers.map( (t, index) =>
                        <div className={"form-check item " + t.type} key = {index} value = {JSON.stringify(t)}>
                            <input className="form-check-input" type="checkbox" id={'awayPlayers'+ index} value={JSON.stringify(t)} name="awayPlayers" onChange={handleInputChange} required disabled={isLimit("awayPlayers", index)}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
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
        </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" form="gameForm">Add Game</button>
        </div>
    </>
  )
}

export default GameModal;