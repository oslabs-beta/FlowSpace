import React, { useCallback, useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const OptimizerAnalytics = ({ socket }) => {

  const [ optimizerData, setOptimizerData ] = useState('Ø');
  const [ optimizerLearningRate, setoptimizerLearningRate ] = useState('Ø');

  useEffect(() => {
    socket.on('sentOptimizerData', (optimizerIterations, optimizerLearningRate) => {
        if (!optimizerIterations) {
        setOptimizerData('Ø');
        setoptimizerLearningRate('Ø')
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
          type:'Max Weight',
          value: optimizerData,
          description: ` Optimizer Ø. ${optimizerLearningRate}`,
          color: '#68C1E5',
          boldName: 'Weight'}}/>
    );
};

export default OptimizerAnalytics;