import React, { useState } from "react";
import { createSearchParams, NavLink } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import '../css/GOAT.css';
import userService from "../service/SearchService";

const SearchBar = () => {
    
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [tournamentFilter, setTournamentFilter] = useState(true);
    const [teamFilter, setTeamFilter] = useState(true);
    const [playerFilter, setPlayerFilter] = useState(true);
    const [gameFilter, setGameFilter] = useState(false);

    const handleSearchChange = (e)=>{
        setSearchValue(e.target.value)
    }

    const handleEnter = async (event) => {
        if (event.key === 'Enter') {
            document.getElementById("search-button").click();
        }
    }

    const handleSearch = (event) =>{
        navigate("/SearchResult/" + searchValue, {state:{id:searchValue}});
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
    
    document.addEventListener( 'change', onChange);

    const handleSelection = (event) =>{
        const setFilters = (bool) =>{
            setGameFilter(!bool)
            setTeamFilter(bool)
            setTournamentFilter(bool)
            setPlayerFilter(bool)
        }

        const anyTrue = () =>{
            return document.getElementById("TournamentSearchCheckbox").checked ||               
            document.getElementById("TeamSearchCheckbox").checked    ||            
            document.getElementById("PlayerSearchCheckbox").checked
        }
        switch(event.target.value) {
            case 'All':
                setFilters(event.target.checked)
                document.getElementById("GameSearchCheckbox").checked=(!event.target.checked)
                break;
            case 'Tournament':
                setTournamentFilter(event.target.checked)
                if(!anyTrue()){
                    document.getElementById("GameSearchCheckbox").checked=(true)}
                else{
                    document.getElementById("GameSearchCheckbox").checked=(false)}
                break;
            case 'Team':
                setTeamFilter(event.target.checked)
                if(!anyTrue()){
                    document.getElementById("GameSearchCheckbox").checked=(true)}
                else{
                    document.getElementById("GameSearchCheckbox").checked=(false)}
                break;
            case 'Player':
                setPlayerFilter(event.target.checked)
                if(!anyTrue()){
                    document.getElementById("GameSearchCheckbox").checked=(true)}
                else{
                    document.getElementById("GameSearchCheckbox").checked=(false)}
                break;
            case 'Game':
                setFilters(!event.target.checked)                
                document.getElementById("AllSearchCheckbox").checked=(!event.target.checked)
                document.getElementById("TournamentSearchCheckbox").checked=(!event.target.checked)                
                document.getElementById("TeamSearchCheckbox").checked=(!event.target.checked)                
                document.getElementById("PlayerSearchCheckbox").checked=(!event.target.checked)
                break;
            default:
              // code block
          }
    }

    const noClose = (event) => {
        event.stopPropagation();
      };

    document.addEventListener( 'click', noClose);

    return (
        <>
            <form className="form-inline my-2 my-lg-0">
                <div className="col-md-5 mx-auto">
                    <div className="input-group">
                        <div className="input-group-btn dropdown" >
                            <button type="button" className="ms-n0 btn btn-outline-secondary bg-white border-bottom-0 border btn btn-secondary" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-sort-down"/> 
                            </button>
                            <ul className="dropdown-menu" id="searchFilters" aria-labelledby="dropdownMenuButton1" onClick={noClose}>
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
                        </div>
                        <input className="form-control border-end-0 border rounded-pill " type="search" value={searchValue} onChange={handleSearchChange} placeholder="Buscar..." id="search-input" onKeyDown={handleEnter}/>
                        <span className="input-group-append" >
                            <button className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5" type="button" onClick={handleSearch} id="search-button" style={{textAlign: 'center'}}>
                                <i className="fa-solid fa-magnifying-glass"/>
                            </button>
                        </span>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchBar;