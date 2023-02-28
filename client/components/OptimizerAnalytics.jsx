import React, { useState, useEffect } from 'react';
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
          description: ` iteratively improve the accuracy of a model, decreasing error. The learning rate: ${optimizerLearningRate}`,
          color: '#FF00B8',
          boldName: 'Optimizers'}}/>
    );
};

export default OptimizerAnalytics;