import React from 'react';
import { Link } from 'react-router-dom'
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';

function App() {
  return (
    <div className="App">
      <div className='Dashboard'>
        <div className='vertical-nav' style={{ width: "5%", height: "100%", float: "left" }}>
        </div>
        <div className='analytics' style={{ width: "90%", height: "100%", float: "right" }}>
          <div className="react-flow-rectangle">
            <HorizontalFlow />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
