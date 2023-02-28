import React from 'react';
import '../style/AnalyticsTile.scss';
import LossIcon from '../assets/Group 1.png';
import BiasIcon from '../assets/Group 2.png';
import WeightIcon from '../assets/Group 3.png';
import ActivationIcon from '../assets/Group 4.png';
import OptimizerIcon from '../assets/Group 6.png';

const AnalyticsTile = ({ info }) => {
    const {
        type,
        value,
        description,
        color,
        boldName,
      } = info;
    
    return (
        <div className='Analytics-Tile' style={{ width: "280px", height: "280px"}}>
            <div className='icon-header'>
                {type === 'Loss' && (
                    <img src={LossIcon}></img>
                )}
                {type === 'Bias' && (
                    <img src={BiasIcon}></img>
                )}
                {type === 'Max Weight' && (
                    <img src={WeightIcon}></img>
                )}
                {type === 'Optimizer' && (
                    <img src={OptimizerIcon}></img>
                )}
                {type === 'Activation' && (
                    <img src={ActivationIcon}></img>
                )}
            </div>
            <div className='tile-value' style={{color: `${color}`}}>
                {value}
            </div>
            <div className='tile-title'>
                {type}
            </div>
            <div className='tile-description'>
                <strong style={{color: `${color}`}}>{boldName}</strong>{description}
            </div>
        </div>
    );
};

export default AnalyticsTile;