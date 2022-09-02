import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const LossAnalytics = (props) => {

  const [ lossData, setLossData ] = useState();

  useEffect(() => {
    props.socket.on('sentLossData', (lossData) => {
      setLossData(lossData.loss.toFixed(10).toString().slice(1));
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