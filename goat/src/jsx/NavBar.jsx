import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import '../css/GOAT.css';
import SearchBar from "./SearchBar";


const NavBar = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="Home">
                    <img src="/Logo.ico" width="30" height="30" className="d-inline-block align-top" alt="Logo"/>
                    GOAT
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="http://localhost:3000/Home">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/Tournament">Tournaments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/Team">Teams</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/Player">Players</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/Game">Games</a>
                        </li>
                    </ul>
                    <SearchBar id="searchBar"/>                    
                </div>
            </nav>
        </>
    )
}

export default NavBar;