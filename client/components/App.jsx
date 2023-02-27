import React from 'react';
import '../style/App.scss';
import socketIO from 'socket.io-client';
import VerticalTabNav from './VerticalTabNav.jsx';

//const socket = socketIO.connect('http://localhost:3333');


function App() {

  return (
    <div className="App">
      <div className='Dashboard'>
          <VerticalTabNav sx={{ width: "100%", height: "100%"}} />
      </div>
    </div>
  );
}

export default App;
