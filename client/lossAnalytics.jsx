import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const LossAnalytics = ({ socket }) => {

  const [ lossData, setLossData ] = useState();
  const [ lossMethod, setlossMethod ] = useState();


  useEffect(() => {
    socket.on('sentLossDataAnalytics', (lossData, lossMethod) => {
      if (!lossData.length) {
        setLossData('Ø');
        setlossMethod('Ø');
        return;
      }
      setLossData(lossData[lossData.length - 1].loss.toFixed(6).toString().slice(1));
      setlossMethod(lossMethod)
    });
    return () => {
      socket.off('sentLossDataAnalytics');
    }
  }, []);
    
    return (
      <AnalyticsTile style={{ marginLeft: ".5rem"}} info={
        {
          type:'Loss',
          value: lossData,
          description: ` shows how well your algorithm models your data ${lossMethod}.`,
          color: '#F4B400',
          boldName: 'Loss'}}/>
    );
};

export default LossAnalytics;