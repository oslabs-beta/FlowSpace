import React, { useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const WeightAnalytics = ({ socket }) => {

  // hook for setting the value of weightData in state
  const [ weightData, setWeightData ] = useState();

  useEffect(() => {
    // listening for sentWeightData event from socket.io server
    socket.on('sentWeightData', (WeightData) => {
      if (!WeightData) {
         // display when data is not available 
        setWeightData('Ø');
        return;
      }
      // setWeightData
      setWeightData(WeightData.toFixed(5).toString());
    });
    return () => {
      // stop listening for events 
      socket.off('sentWeightData');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Max Weight', // for conditional rendering of icon, see AnalyticsTile.jsx
          value: weightData,
          description: ' represents the strength of the connection between nodes. Larger weights indicate overfitting.',
          color: '#68C1E5',
          boldName: 'Weight'}}/>
    );
};

export default WeightAnalytics;