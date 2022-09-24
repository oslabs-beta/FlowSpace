import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';
import AnalyticsTile from './AnalyticsTile.jsx';
import vertivalNavHome from './assets/verticalNav-home.png';
import vertivalNavGraph from './assets/verticalNav-graph.png';
import LogoFS from './assets/Logo.png';
import socketIO from 'socket.io-client';
import LossPlot from './LossPlot.jsx';
import LossBar from './LossBar.jsx';
import LossAnalytics from './lossAnalytics.jsx';
import VerticalTabNav from './VerticalTabNav.jsx';

const socket = socketIO.connect('http://localhost:3333');


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
