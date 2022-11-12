import React, {useState}  from 'react';
import modelService from '../../service/ModelService';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const TournamentModal = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        season: '',
        category: '',
        profileImage: ''
    })

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setData({
            ...data,
            [event.target.name] : event.target.value
        })
    }

    const requestNewTournament = () => {
        modelService.saveTournament(data)
        
        navigate("/Home")
      }

  return (
    <>
            <form className="mb-3 needs-validation" novalidate onSubmit={requestNewTournament}>
        <div className="modal-body">
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
                <div className="col-md-6">
                    <label htmlFor="validationCustom04" className="form-label">Category </label>
                    <select className="form-select" id="validationCustom04" name="category" onChange={handleInputChange} required>
                        <option selected disabled value="">Choose...</option>
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
                <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">Image</label>
                    <input type="file" className="form-control" accept="image/*" id="validationCustom03" name="profileImage" onChange={handleInputChange} required/>
                    <div className="invalid-feedback">
                        Please provide a image.
                    </div>
                </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Add Tournament</button>
        </div>
            </form>
    </>
  )
}

export default TournamentModal;