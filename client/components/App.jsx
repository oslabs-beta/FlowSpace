import React from 'react';
import '../style/App.scss';
import VerticalTabNav from './VerticalTabNav.jsx';


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
