import React, { useState } from "react";
import { createSearchParams, NavLink } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import '../css/GOAT.css';
import SearchService from "../service/SearchService";

const SearchBar = () => {
    
    const navigate = useNavigate();
    const [simpleSearchValue, setSimpleSearchValue] = useState('');
    const [dualSearchValue, setDualSearchValue] = useState('');
    const [tournamentFilter, setTournamentFilter] = useState(true);
    const [teamFilter, setTeamFilter] = useState(true);
    const [playerFilter, setPlayerFilter] = useState(true);
    const [isDualSearch, setIsDualSearch] = useState(false);

    const handleSimpleSearchChange = (e)=>{
        setSimpleSearchValue(e.target.value)
    }

    const handleDualSearchChange = (e)=>{
        setDualSearchValue(e.target.value)
    }

    const handleEnter = async (event) => {
        if (event.key === 'Enter') {
            document.getElementById("search-button").click();
        }
    }

    const handleEnterNextTeam = (event) => {
        if (event.key === 'Enter') {
            document.getElementById("search-AwayTeam-input").focus();
            document.getElementById("search-AwayTeam-input").select();   
        }
    }

    const handleSearch = () =>{
        var myAlert = document.getElementsByName("resultsAlert");
        debugger
        var numOfAlerts = 0
        while (myAlert.length != numOfAlerts){
            myAlert[numOfAlerts].hidden = false
            numOfAlerts+=1
        }
        navigate("/SearchResult/" + simpleSearchValue + "--" + dualSearchValue, { replace: true, state: {simpleSearch:simpleSearchValue, dualSearch:dualSearchValue, isDual: isDualSearch, tournament: tournamentFilter, team: teamFilter, player: playerFilter} });
    }

    function onChange( { target } ) {
        if ( target.type !== 'checkbox' ) {
            return;
        }
        updateChildren( target );
        updateParents( target );
    }
    
    function updateChildren( el ) {
        const { checked } = el;
    
        getChildren( el ).forEach( child => {
            child.checked = checked;
            child.indeterminate = false;
        } );
    
    }
    
    function updateParents( parent ) {
        while ( parent = getParent( parent ) ) {
    
            let children = getChildren( parent );
            let checked = [ ...children ].filter( child => child.checked ).length;
    
            parent.checked = checked === children.length;
            parent.indeterminate = checked && ! parent.checked;
        }
    }
    
    function getChildren( el ) {
    
        el = el.closest( 'li' );
        el = el && el.querySelector( 'ul' );
        return el && el.querySelectorAll( 'input[type="checkbox"]' ) || [];
    
    }
    
    function getParent( el ) {
    
        el = el.closest( 'ul' );
        el = el && el.closest( 'li' );
        return el && el.querySelector( 'input[type="checkbox"]' );
    
    }

    const handleSelection = (event) =>{
        const setFilters = (bool) =>{
            setTeamFilter(bool)
            setTournamentFilter(bool)
            setPlayerFilter(bool)
        }

        const anyTrue = () =>{
            return document.getElementById("TournamentSearchCheckbox").checked ||               
            document.getElementById("TeamSearchCheckbox").checked    ||            
            document.getElementById("PlayerSearchCheckbox").checked
        }

        const setGameSearch = () =>{
            if(!anyTrue()){
                document.getElementById("GameSearchCheckbox").checked=(true)
                setIsDualSearch(true)}
            else{
                
                document.getElementById("GameSearchCheckbox").checked=(false)
                setDualSearchValue('')
                setIsDualSearch(false)}
        }
        switch(event.target.value) {
            case 'All':
                setFilters(event.target.checked)
                document.getElementById("GameSearchCheckbox").checked=(!event.target.checked)
                setDualSearchValue('')
                setIsDualSearch(!event.target.checked)
                
                break;
            case 'Tournament':
                setTournamentFilter(event.target.checked)
                setGameSearch()
                break;
            case 'Team':
                setTeamFilter(event.target.checked)
                setGameSearch()
                break;
            case 'Player':
                setPlayerFilter(event.target.checked)
                setGameSearch()
                break;
            case 'Game':
                setFilters(!event.target.checked)                
                document.getElementById("AllSearchCheckbox").checked=(!event.target.checked)
                document.getElementById("TournamentSearchCheckbox").checked=(!event.target.checked)                
                document.getElementById("TeamSearchCheckbox").checked=(!event.target.checked)                
                document.getElementById("PlayerSearchCheckbox").checked=(!event.target.checked)
                setIsDualSearch(event.target.checked)
                break;
            default:
              // code block
          }
    }

    const noClose = (event) => {
        event.stopPropagation();
      };
    
    document.addEventListener( 'change', onChange);
    document.addEventListener( 'click', noClose);

    return (
        <>
            <form className="form-inline my-2 my-lg-0">
                <div className="col-md mx-auto">
                    <div className="input-group dropdown">
                            <button type="button" className="btn btn-outline-secondary bg-white border-bottom-0 border" id="dropdown-menu-button" data-bs-toggle="dropdown" aria-expanded="false" style={{borderRadius: '9999em 0px 0px 9999em'}}>
                                <i className="fa-solid fa-sort-down"/> 
                            </button>
                            <ul className="dropdown-menu" id="searchFilters" aria-labelledby="dropdown-menu-button" onClick={noClose}>
                                <li className="dropdown-item">
                                    <input className="form-check-input" id="AllSearchCheckbox" value="All" type="checkbox" defaultChecked={true} onChange={handleSelection}/>
                                    <label className="form-check-label" htmlFor="All" >All</label>
                                <ul>
                                    <li className="dropdown-item filters">
                                        <input type="checkbox" name="radios" id="TournamentSearchCheckbox" value="Tournament" defaultChecked={true} onChange={handleSelection}/>
                                        <label htmlFor="Tournament" >Tournament</label>
                                    </li>
                                    <li className="dropdown-item filters">
                                        <input type="checkbox" name="radios" id="TeamSearchCheckbox" value="Team" defaultChecked={true} onChange={handleSelection}/>
                                        <label htmlFor="Team" >Team</label>
                                    </li>
                                    <li className="dropdown-item filters">
                                        <input type="checkbox" name="radios" id="PlayerSearchCheckbox" value="Player" defaultChecked={true} onChange={handleSelection}/>
                                        <label htmlFor="Player" >Player</label>
                                    </li>
                                </ul>
                                </li>
                                <li className="dropdown-item">
                                    <input type="checkbox" name="radios" id="GameSearchCheckbox" value="Game"  onChange={handleSelection}/>
                                    <label htmlFor="Game" >Game</label>
                                </li>
                            </ul>
                        <input className="form-control border-end-0 border " type="simple-search" value={simpleSearchValue} onChange={handleSimpleSearchChange} placeholder="Buscar..." id="search-input" onKeyDown={handleEnter} hidden={isDualSearch}/>  

                        <input className="form-control border-end-0 border " type="simple-search" value={simpleSearchValue} onChange={handleSimpleSearchChange} placeholder="Team A" id="search-HomeTeam-input" onKeyDown={handleEnterNextTeam} hidden={!isDualSearch}/>  
                        <div className="input-group-prepend" hidden={!isDualSearch}>
                            <span className="input-group-text border-end-0 border " id="" style={{borderRadius: '0px 0px 0px 0px'}}>VS</span>
                        </div>
                        <input className="form-control border-end-0 border " type="dual-search" value={dualSearchValue} onChange={handleDualSearchChange} placeholder="Team B" id="search-AwayTeam-input" onKeyDown={handleEnter} hidden={!isDualSearch} />
                        
                        <button className="btn btn-outline-secondary bg-white border-bottom-0 border" type="button" onClick={handleSearch} id="search-button" style={{textAlign: 'center', borderRadius: '0px 9999em 9999em 0px'}}>
                            <i className="fa-solid fa-magnifying-glass"/>
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchBar;