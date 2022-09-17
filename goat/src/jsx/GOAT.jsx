//import logo from './logo.svg';
//<img src={logo} className="App-logo" alt="logo" />
import '../css/GOAT.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  //Redirect
} from "react-router-dom";
import SearchResult from "./SearchResult"
import NavBar from "./NavBar"
import Home from "./Home"

import Player from "./model/Player"
import Team from "./model/Team"
import Tournament from "./model/Tournament"
import Game from "./model/Game"

const GOAT = () => {
  
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App-header">
        <Routes>
          <Route index element={<Home/>} />
          <Route path = "/SearchResult" element={<SearchResult/>}/>
          <Route path = "/Home" element={<Home/>} />
          <Route path = "/Player" element={<Player/>}/>
          <Route path = "/Team" element={<Team/>}/>
          <Route path = "/Tournament" element={<Tournament/>}/>
          <Route path = "/Game" element={<Game/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default GOAT;
