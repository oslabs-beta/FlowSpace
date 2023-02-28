import React, { useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const LossAnalytics = ({ socket }) => {

  const [ lossData, setLossData ] = useState();
  const [ lossMethod, setlossMethod ] = useState('');


  useEffect(() => {
    socket.on('sentLossDataAnalytics', (lossData, lossMethod) => {
      if (!lossData.length) {
        setLossData('Ø');
        return;
      }
      setLossData(lossData[lossData.length - 1].loss.toFixed(6).toString());
      setlossMethod(lossMethod)
    });
    return () => {
      socket.off('sentLossDataAnalytics');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Loss',
          value: lossData,
          description: ` shows how well your algorithm models your data. The loss function: ${lossMethod}.`,
          color: '#F4B400',
          boldName: 'Loss',
          lossMethod: lossMethod}}/>
    );
};

export default LossAnalytics;