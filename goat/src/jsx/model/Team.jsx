import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import modelService from '../../service/ModelService'
import '../../css/model/SearchResult.css'

const Team = ({match}) => {

    const teamParams = useLocation();
    const [teamData, setTeamData]= useState([])
    const team = teamParams.state

    useEffect(() => {
        const fetchData = async () => {
            const result = await modelService.getModel(team.type, team.id)
			//.then(res => res.json())
            setTeamData(result.data)
            //console.log(searchResults)
        }
        fetchData()
    }, [])


    const handleClick = (e) => {
                       
    }
    
    return (
        <>
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
                                        <h5 className="card-title">{teamData.name}</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Players">Players
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
        </>
       );

}

export default Team