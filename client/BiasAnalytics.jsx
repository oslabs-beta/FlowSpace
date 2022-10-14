import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const BiasAnalytics = ({ socket }) => {

  const [ biasData, setBiasData ] = useState();

  useEffect(() => {
    socket.on('sentBiasData', (BiasData) => {
      if (!BiasData) {
        setBiasData('Ø');
        return;
      }
      setBiasData(BiasData.toFixed(5).toString());
    });
    return () => {
        socket.off('sentBiasData');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Max Weight',
          value: biasData,
          description: ' max bias placeholder Ø.',
          color: '#68C1E5',
          boldName: 'Weight'}}/>
    );
};

export default BiasAnalytics;