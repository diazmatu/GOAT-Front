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
import LiveGame from "./model/LiveGame"

const GOAT = () => {
  
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App-header">
        <Routes>
          <Route index element={<Home/>} />
          <Route path = "/Home" element={<Home/>} />
          <Route path = "/SearchResult/:searchValue" element={<SearchResult/>}/>
          <Route path = "/Player/:playerDni" element={<Player/>}/>
          <Route path = "/Team/:teamId" element={<Team/>}/>
          <Route path = "/Tournament/:tournamentId" element={<Tournament/>}/>
          <Route path = "/LiveGame/:gameId" element={<LiveGame/>}/>
          <Route path = "/Game/:gameId" element={<Game/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default GOAT;
