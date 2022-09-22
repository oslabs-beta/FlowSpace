import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const LossAnalytics = ({ socket }) => {

  const [ lossData, setLossData ] = useState();

  useEffect(() => {
    socket.on('sentLossData', (lossData) => {
      setLossData(lossData.loss.toFixed(6).toString().slice(1));
    });
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Loss',
          value: lossData,
          description: ' quantifies the difference between the expected outcome and the outcome produced by the model.',
          color: '#F4B400',
          boldName: 'Loss'}}/>
    );
};

export default LossAnalytics;