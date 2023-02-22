import React, {useState, useEffect}  from 'react';
import modelService from '../../service/ModelService';
import Select from 'react-select';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const PlayerModal = () => {

    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([])
    const [teams, setTeams] = useState([])
    const [data, setData] = useState({
        dni: '',
        name: '',
        surname: '',
        birth: '',
        profileImage: '',
        tournament: [],
        team: []
    })

    useEffect(() => {

        const fetchTournaments = async () => {
            const result = await modelService.getAllTournaments()
			//.then(res => res.json())
            
            setTournaments(result.data)
            //console.log(result.data)
        }
        const fetchTeams = async () => {
            const ts = data.tournament
            var teams = []
            for (const t in ts) {
                console.log(ts[t].value)
                
                const result = await modelService.getTournamentData("Tournament", ts[t].value)
                //.then(res => res.json())
                
                console.log(result.data.teams)
                
                teams = teams.concat(result.data.teams)
            }
            
            setTeams(teams)
        }

        
        fetchTournaments()
        fetchTeams()
    }, [data.tournament])

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleTournamentChange = (event) => {
        
        setData({
            ...data,
            tournament : event,
            team: []
        })
    }

    const handleTeamChange = (event) => {
        setData({
            ...data,
            team : event
        })
    }

    const handleImageChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)

        //let file = event.target.files[0];
        //const imageData = new FormData();
        //imageData.append('imageFile', file);
        setData({
            ...data,
            profileImage : event.target.files[0]
        })
    }

    const requestNewPlayer = (event) => {
        modelService.savePlayer(data, navigate)
        event.preventDefault()
      }

  return (
    <><div className="modal-body">
            <form className="mb-3 needs-validation" id='playerForm' noValidate={false}  onSubmit={requestNewPlayer}>
        
            <div className="">
                    <label htmlFor="validationCustom02" className="form-label">DNI</label>
                    <input type="number" className="form-control" id="validationCustom02" name="dni" onChange={handleInputChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please select a number of identification.
                    </div>
                </div>
                <div className="">
                    <label htmlFor="validationCustom01" className="form-label">Name</label>
                    <input type="text" className="form-control" id="validationCustom01" name="name" onChange={handleInputChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please select a name.
                    </div>
                </div>
                <div className="">
                    <label htmlFor="validationCustom01" className="form-label">Surname</label>
                    <input type="text" className="form-control" id="validationCustom01" name="surname" onChange={handleInputChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please select a name.
                    </div>
                </div>
                <div className="">
                    <label htmlFor="validationCustom02" className="form-label">Date Of birth</label>
                    <input type="date" className="form-control" id="validationCustom02" name="birth" onChange={handleInputChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please select a date of birth.
                    </div>
                </div>
                <div className="" >
                    <label htmlFor="validationCustom04" className="form-label">Tournaments</label>
                        <Select
                            isMulti
                            closeMenuOnSelect={false}
                            defaultValue={data.tournament}
                            onChange={handleTournamentChange}
                            options={tournaments.map(t =>({value:t.id , label: t.name}))}
                            name="tournament"
                            isClearable={true}
                            isSearchable={true}
                        />
                </div>
                <div className="" >
                    <label htmlFor="validationCustom04" className="form-label">Teams</label>
                        <Select
                            id='teamSelect'
                            isMulti
                            closeMenuOnSelect={false}
                            defaultValue={data.team}
                            onChange={handleTeamChange}
                            options={teams.map(t =>({value:t.id , label: t.name + ' (' + t.tournamentName[0] + ')'}))}
                            name="team"
                            isClearable={true}
                            isSearchable={true}
                        />
                </div>
                <div className="">
                    <label htmlFor="validationCustom03" className="form-label">Image</label>
                    <input type="file" className="form-control" accept="image/*" id="validationCustom03" name="profileImage" onChange={handleImageChange} required/>
                    <div className="invalid-feedback">
                        Please provide a image.
                    </div>
                </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" form='playerForm'>Add Player</button>
        </div>
    </>
  )
}

export default PlayerModal;