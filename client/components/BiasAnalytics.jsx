import React, { useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const BiasAnalytics = ({ socket }) => {

  // hook for setting the value of biasData in state
  const [ biasData, setBiasData ] = useState();

  useEffect(() => {
    // listening for sentBiasData event from socket.io server
    socket.on('sentBiasData', (BiasData) => {
      if (!BiasData) {
        // display when data is not available 
        setBiasData('Ø');
        return;
      }
      // setBiasData
      setBiasData(BiasData.toFixed(5).toString());
    });
    return () => {
        // stop listening for events 
        socket.off('sentBiasData');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Bias', // for conditional rendering of icon, see AnalyticsTile.jsx
          value: biasData, 
          description: ' variables are utilized with the purpose of matching functions with a y-intercept other than zero.',
          color: '#6AD9A9',
          boldName: 'Bias'}}/>
    );
};

export default BiasAnalytics;



