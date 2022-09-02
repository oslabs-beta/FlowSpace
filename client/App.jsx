import React from 'react';
import socketIO from 'socket.io-client';
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';
import LossPlot from './LossPlot.jsx';
import LossBar from './LossBar.jsx';

const socket = socketIO.connect('http://localhost:3333');

function App() {
  return (
    <div className="App">
      <LossPlot socket={socket} />
      <LossBar socket={socket} />
      <header
        className="App-header"
        style={{ width: '100vw', height: '60vh' }}
      >
        <HorizontalFlow socket={socket} />
      </header>
    </div>
  );
}

export default App;
