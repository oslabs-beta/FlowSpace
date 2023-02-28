import React, { useState, useEffect } from 'react';
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
          type:'Bias',
          value: biasData,
          description: ' variables are utilized with the purpose of matching functions with a y-intercept other than zero.',
          color: '#6AD9A9',
          boldName: 'Bias'}}/>
    );
};

export default BiasAnalytics;



