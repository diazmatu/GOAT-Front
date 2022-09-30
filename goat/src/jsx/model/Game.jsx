import React, { useState, useEffect } from 'react';
import '../../css/model/Game.css';
import '../../css/GOAT.css';

const Game = () => {
    
    const [known, setKnown] = useState([]);
    const [unknown, setUnknown] = useState([]);
    
    const token = localStorage.getItem('token');

	useEffect(() => {
        const fetchKnown = async () => {
            setKnown('knw')
            setUnknown('difference')
        }
        fetchKnown()
    }, [setUnknown, token])


    return(
    <div className="App-header" > 
        <div className="btn-group-vertical">
            <br/>Unknown
            {unknown.map(uknw => (
                <div key={uknw._id}>
                    <button type="button"  className="btn btn-light buttonFollower" value= {uknw._id}>
                        {uknw.nickName}
                    </button>
                    <button type="button" className="btn btn-success buttonFollower" onClick= {setKnown} value= {uknw._id} name={uknw.nickName}>
                        ADD
                    </button>
                </div>
                ))
            }
        </div>
        <div className="btn-group-vertical">
            <br/>Known
            {known.map(knw => (
                <div key={knw._id}>
                    <button type="button"  className="btn btn-light buttonFollower" value= {knw._id}>
                        {knw.nickName}
                    </button>
                    <button type="button" className="btn btn-danger buttonFollower" onClick= {setKnown} value= {knw._id} name={knw.nickName}>
                        QUIT
                    </button>
                </div>
                ))
            }
        </div>
    </div>
    );
}

export default Game;