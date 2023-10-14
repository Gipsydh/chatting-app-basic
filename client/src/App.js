import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Chat'
const socket = io.connect('http://localhost:3001')
function App() {
  const [username, setUsername] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [room, setRoom] = useState('')
  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowMessage(true)
    }
  }
  return (
    <div className='App'>
      {!showMessage ? (
        <>
          <h3>Join A Chat</h3>
          <input
            type='text'
            placeholder='John...'
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
          <input
            type='text'
            placeholder='Room ID'
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          />
          <button onClick={joinRoom}>Join a room</button>
        </>
      ) : (
        <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  )
}

export default App
