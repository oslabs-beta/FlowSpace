import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const BiasAnalytics = ({ socket }) => {

  const [ biasData, setBiasData ] = useState();

  useEffect(() => {
    socket.on('sentBiasData', (BiasData) => {
      setBiasData(BiasData.toFixed(6).toString());
    });
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Max Weight',
          value: biasData,
          description: ' represents the strength of the connection between nodes.',
          color: '#68C1E5',
          boldName: 'Weight'}}/>
    );
};

export default BiasAnalytics;