import React, {useState, useEffect}  from 'react';
import modelService from '../../service/ModelService';
import TomSelect from 'tom-select';
import Select from 'react-select';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const TeamModal = () => {

    const [tournaments, setTournaments] = useState([])
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        season: '',
        category: '',
        profileImage: '',
        tournament: []
    })

    const tournamentsOptions = []

    useEffect(() => {

        const fetchTournaments = async () => {
            const result = await modelService.getAllTournaments()
			//.then(res => res.json())
            
            setTournaments(result.data)
            //console.log(result.data)
        }

        fetchTournaments()
    }, [])

    const setTournamentsOptions = (options) => {
        options.map((t) =>{
            const option = { value: JSON.stringify(t), label: t.name}
            console.log(option)
            tournamentsOptions.push(option)
        })
    }

    const handleInputChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const handleTournamentChange = (event) => {
        setData({
            ...data,
            tournament : event
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
    

    const requestNewTeam = (event) => {
        modelService.saveTeam(data, navigate)
        
        event.preventDefault()
      }

  return (
    <>
    <div className="modal-body">
        <form className="mb-3 needs-validation" id="teamForm" noValidate={false}  onSubmit={requestNewTeam}>
        
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
                    <label htmlFor="validationCustom02" className="form-label">Season</label>
                    <input type="number" className="form-control" id="validationCustom02" name="season" onChange={handleInputChange} required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    <div className="invalid-feedback">
                        Please select a number of season.
                    </div>
                </div>
                <div className="">
                    <label htmlFor="validationCustom04" className="form-label">Category </label>
                    <select className="form-select" id="validationCustom04" name="category" onChange={handleInputChange} required>
                        <option defaultValue={true} hidden value="">Choose...</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="15">15</option>
                        <option value="17">17</option>
                        <option value="19">19</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a category.
                    </div>
                </div>
                <div className="" >
                    <label htmlFor="validationCustom04" className="form-label">Tournament</label>
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
                <div className="">
                    <label htmlFor="validationCustom03" className="form-label">Image</label>
                    <input type="text" className="form-control" id="validationCustom03" name="profileImage" onChange={handleImageChange} required/>
                    <div className="invalid-feedback">
                        Please provide a image.
                    </div>
                </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" form='teamForm'>Add Team</button>
        </div>
    </>
  )
}

export default TeamModal;