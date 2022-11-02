import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const WeightAnalytics = ({ socket }) => {

  const [ weightData, setWeightData ] = useState();

  useEffect(() => {
    socket.on('sentWeightData', (WeightData) => {
      if (!WeightData) {
        setWeightData('Ø');
        return;
      }
      setWeightData(WeightData.toFixed(5).toString());
    });
    return () => {
      socket.off('sentWeightData');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Max Weight',
          value: weightData,
          description: ' represents the strength of the connection between nodes. Larger weights indicate overfitting.',
          color: '#68C1E5',
          boldName: 'Weight'}}/>
    );
};

export default WeightAnalytics;