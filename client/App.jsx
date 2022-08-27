import React from 'react';
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ width: '100vw', height: '100vh' }}
      >
        <HorizontalFlow />
      </header>
    </div>
  );
}

export default App;
