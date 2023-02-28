import React, { useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const LossAnalytics = ({ socket }) => {

  // hooks for setting the value of lossData and lossMethod in state
  const [ lossData, setLossData ] = useState();
  const [ lossMethod, setLossMethod ] = useState('');


  useEffect(() => {
    // listening for sentLossDataAnalytics event from socket.io server
    socket.on('sentLossDataAnalytics', (lossData, lossMethod) => {
      if (!lossData.length) {
        // display when data is not available 
        setLossData('Ø');
        return;
      }
      // set data accordingly 
      setLossData(lossData[lossData.length - 1].loss.toFixed(6).toString());
      setLossMethod(lossMethod);
    });
    return () => {
      // stop listening for events 
      socket.off('sentLossDataAnalytics');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Loss', // for conditional rendering of icon, see AnalyticsTile.jsx
          value: lossData,
          description: ` shows how well your algorithm models your data. The loss function: ${lossMethod}.`,
          color: '#F4B400',
          boldName: 'Loss',
          lossMethod: lossMethod}}/>
    );
};

export default LossAnalytics;