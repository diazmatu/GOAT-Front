import React, {useEffect, useState, createRef, useRef, ErrorBoundary}  from 'react';
import '../../css/model/LiveGame.css'

const Scoreboard = ({ home_score,
    away_score,
    home_label,
    away_label, }) => {

    return(
        <>
            <div className="scoreBoard">
                <div className="HomeTeam">{home_label}</div>
                <div className="ScoreHome">{home_score}</div>
                <div className="BlankSpace"></div>
                <div className="AwayTeam">{away_label}</div>
                <div className="ScoreAway">{away_score}</div>
            </div>
        </>
    )
}
export default Scoreboard