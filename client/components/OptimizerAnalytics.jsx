import React, { useState, useEffect } from 'react';
import AnalyticsTile from './AnalyticsTile.jsx';

const OptimizerAnalytics = ({ socket }) => {

  // hooks for setting the value of optimizerData and optimizerLearningRate in state
  const [ optimizerData, setOptimizerData ] = useState();
  const [ optimizerLearningRate, setOptimizerLearningRate ] = useState('');

  useEffect(() => {
    // listening for sentOptimizerData event 
    socket.on('sentOptimizerData', (optimizerIterations, optimizerLearningRate) => {
        if (!optimizerIterations) {
        // display when data is not available 
        setOptimizerData('Ø');
        return;
      }
      setOptimizerData(optimizerIterations);
      setOptimizerLearningRate(optimizerLearningRate);
    });
    return () => {
      // stop listening for events 
      socket.off('sentOptimizerData');
    }
  }, []);
    
    return (
      <AnalyticsTile info={
        {
          type:'Optimizer', // for conditional rendering of icon, see AnalyticsTile.jsx
          value: optimizerData,
          description: ` iteratively improve the accuracy of a model, decreasing error. The learning rate: ${optimizerLearningRate}`,
          color: '#FF00B8',
          boldName: 'Optimizers'}}/>
    );
};

export default OptimizerAnalytics;