import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const WeightAnalytics = ({ socket }) => {

  const [ weightData, setWeightData ] = useState();

  useEffect(() => {
    socket.on('sentWeightData', (WeightData) => {
      setWeightData(WeightData.toFixed(6).toString());
    });
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Max Weight',
          value: weightData,
          description: ' represents the strength of the connection between nodes. Large weights are a sign of overfitting.',
          color: '#68C1E5',
          boldName: 'Weight'}}/>
    );
};

export default WeightAnalytics;