import React, {useEffect,useState}  from 'react';
import '../../css/GOAT.css';

const Player = () => {

  const [nickName, setNickName] = useState("");
  const [known, setKnown] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
        const usr = await fetch('/api/users/'+ token)
            .then((res) => res.json())
        setNickName(usr.nickName)
        setKnown(usr.known)
    }
    fetchUsers()
  }, [setKnown, token]);

  return (
    <div className="App-header">
        <div className="App-title">
          {nickName}
        </div>
  </div>
  )
}
export default Player;