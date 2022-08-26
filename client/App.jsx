import React from 'react';
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3333');

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ width: '100vw', height: '100vh' }}
      >
        <HorizontalFlow socket={socket} />
      </header>
    </div>
  );
}

export default App;
