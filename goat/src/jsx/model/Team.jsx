import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import userService from '../../service/SearchService'
import '../../css/model/Team.css'

const Team = ({match}) => {

    const teamParams = useLocation();
    const [teamData, setTeamData]= useState([])
    const team = teamParams.state

    useEffect(() => {
        const fetchData = async () => {
            const result = await userService.goToSearchResult(team.type, team.id)
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
            <div>
                Team {teamData.name}
            </div>
        </>
       );

}

export default Team