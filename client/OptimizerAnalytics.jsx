import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const OptimizerAnalytics = ({ socket }) => {

  const [ optimizerData, setOptimizerData ] = useState();
  const [ optimizerLearningRate, setoptimizerLearningRate ] = useState('');

  useEffect(() => {
    socket.on('sentOptimizerData', (optimizerIterations, optimizerLearningRate) => {
        if (!optimizerIterations) {
        setOptimizerData('Ø');
        return;
      }
      setOptimizerData(optimizerIterations);
      setoptimizerLearningRate(optimizerLearningRate);
    });
    return () => {
        socket.off('sentOptimizerData');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Optimizer',
          value: optimizerData,
          description: ` Optimizer. ${optimizerLearningRate}`,
          color: '#FF00B8',
          boldName: 'Optimizer'}}/>
    );
};

export default OptimizerAnalytics;