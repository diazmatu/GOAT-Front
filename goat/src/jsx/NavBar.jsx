import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import '../css/GOAT.css';
import userService from "../service/SearchService";


const NavBar = () => {
    
  const navigate = useNavigate();

    const handleKeyDown = async (event) => {   
        if (event.key === 'Enter') {
            localStorage.setItem("search", event.target.value)
            navigate("/SearchResult");
            window.location.reload();
        }
        /*
            fetch('http://localhost:8080/search/'+ event.target.value,{
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Accept': 'application/json, text/plain, *',
                    'Content-Type': 'application/json'},
                'credentials': 'same-origin'
            })
            .then(res=> { 
                if (res.status===201){
                    //setNotifySuccess(true)
                } else {
                    console.log('Ocurrio un error')
                }
            }) 
        }*/ 
    }

    return (
        <div className="main-nav">
			<div className="logo"></div>
			<div className="tabs">
                {/*
				<div className="tab equipos">Equipos</div>
				<div className="tab partido">Partido</div>
                <div className="tab estadisticas">Estadísticas</div>*/}
                <input type="text" className="tab searchbar" placeholder="Buscar..." onKeyDown={handleKeyDown}></input>
			</div>
		</div>
        /*<nav className="navBar">
            <div className="nav-container">
                <NavLink exact to="/" className="nav-logo">
                    <img src="Logo-Back.png" className="nav-logo" alt="GOAT"/>
                </NavLink>

                <div className="nav-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <div id="logged" hidden={logged} onClick={handleClick}>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink exact to="/Player" activeClassName="active" className="nav-links" onClick={handleClick}>
                                Player
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/EventForm" activeClassName="active" className="nav-links" onClick={handleClick} >
                                New Event
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/SearchResult" activeClassName="active" className="nav-links" onClick={handleClick} >
                                Calendar
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/CovidReport" activeClassName="active" className="nav-links" onClick={handleClick} >
                                Health Report
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/Notifications" activeClassName="active" className="nav-links" onClick={handleClick} >
                                Notifications
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/Game" activeClassName="active" className="nav-links" onClick={handleClick} >
                                Game   
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleLogout} >
                                LogOut   
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div id="toLog" hidden={!logged} onClick={handleClick}>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink exact to="/Login" activeClassName="active" className="nav-links" onClick={handleClick}>
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/Register" activeClassName="active" className="nav-links" onClick={handleClick} >
                                Register
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>*/
    )
}

export default NavBar;