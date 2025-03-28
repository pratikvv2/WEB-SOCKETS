import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import Chats from './Chats';

const socket = io.connect("http://localhost:3001");
function App() {

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if(userName !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
    { !showChat ?
      (<div className='joinChatContainer'>
        <h1>Chat App</h1>
        <input type="text" onChange={(event) => { setUserName(event.target.value); }} placeholder="Name.."/>
        <input type="text" onChange={(event) => { setRoom(event.target.value); }} placeholder="Room.."/>
        <button onClick={joinRoom}>Join</button>
      </div>)
     :
      (<Chats socket={socket} username={userName} room={room} />)
      }
    </div>
  );
}

export default App;
