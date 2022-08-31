import React, { useCallback, useState, useEffect } from 'react';
import './AnalyticsTile.scss';

const AnalyticsTile = ({ info }) => {
    const {
        type,
        value,
        description,
        color
      } = info;
    
    return (
        <div className='Analytics-Tile'style={{ width: "280px", height: "330px"}}>
            <div className='icon-header'>
                {type === 'Loss' && (
                    <svg src='./assets/LossIcon.svg'></svg>
                )}
                {type === 'Accuracy' && (
                    <svg src="./assets/AccuracyIcon.svg"></svg>
                )}
                {type === 'Weight' && (
                    <svg src="./assets/WeightIcon.svg"></svg>
                )}
                {type === 'Activation' && (
                    <svg src="./assets/ActivationIcon.svg"></svg>
                )}
            </div>
        </div>
    );
};

export default AnalyticsTile;