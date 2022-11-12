import React, {useState}  from 'react';
import modelService from '../../service/ModelService';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";

const PlayerModal = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        dni: '',
        name: '',
        surname: '',
        birth: '',
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

    const requestNewPlayer = () => {
        modelService.savePlayer(data)
        
        navigate("/Home")
      }

  return (
    <>
            <form className="mb-3 needs-validation" novalidate onSubmit={requestNewPlayer}>
        <div className="modal-body">
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
                <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">Image</label>
                    <input type="text" className="form-control" id="validationCustom03" name="profileImage" onChange={handleInputChange} required/>
                    <div className="invalid-feedback">
                        Please provide a image.
                    </div>
                </div>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Add Player</button>
        </div>
            </form>
    </>
  )
}

export default PlayerModal;