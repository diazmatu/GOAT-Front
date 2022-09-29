import React, {useEffect,useState}  from 'react';
import {useNavigate, useLocation, useSearchParams} from "react-router-dom";
import userService from '../../service/SearchService'
import '../../css/GOAT.css';
import '../../css/model/Tournament.css'
export const Tournament = ({match})=>{
    
    const tournamentParams = useLocation();
    const [tournamentData, setTournamentData]= useState([])
    const tournament = tournamentParams.state

    useEffect(() => {
        const fetchData = async () => {
            const result = await userService.goToSearchResult(tournament.type, tournament.id)
			//.then(res => res.json())
            setTournamentData(result.data)
            //console.log(searchResults)
        }
        fetchData()
    }, [])

    const handleClick = (e)=>{     
    }  

    return (
       <>
            <div>
                Tournament {tournamentData.name}
            </div>
       </>
    )
    
}

export default Tournament;