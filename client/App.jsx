import React from 'react';
import { Link } from 'react-router-dom'
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';
import AnalyticsTile from './AnalyticsTile.jsx';
import vertivalNavHome from './assets/verticalNav-home.png';
import vertivalNavGraph from './assets/verticalNav-graph.png';

function App() {
  return (
    <div className="App">
      <div className='Dashboard'>
        <div className='vertical-nav' style={{ width: "5%", height: "100%", float: "left" }}>
          <img src={vertivalNavHome} style={{marginTop: '2rem'}}></img>
          <img src={vertivalNavGraph}></img>
        </div>
        <div className='analytics' style={{ width: "90%", height: "100%", float: "right" }}>
          <div className='analytics-header' style={{ width: "100%", height: "10%", float: "right" }}> 
            <p>Welcome,</p>
            <h2>Model Architecture</h2>
          </div>
          <div className='analytics-architecture' style={{ width: "100%", height: "40%", float: "right" }}>
            <div className="react-flow-rectangle">
              <HorizontalFlow />
            </div>
          </div>
          <div className='analytics-overview-header' style={{ width: "100%", height: "8%", float: "right" }}>
            <h2>Analytics Overview</h2>
          </div>
          <div className='analytics-overview' style={{ width: "100%", height: "42%", float: "right" }}>
            <div className='analytics-tiles'>
              <AnalyticsTile info={
                {
                  type:'Loss',
                  value: 0.001,
                  description: ' quantifies the difference between the expected outcome and the outcome produced by the model.',
                  color: '#F4B400',
                  boldName: 'Loss'}}/>
              <AnalyticsTile info={
                {
                  type:'Accuracy',
                  value: '70%',
                  description: ' determines which model is best for identifying relationships between variables.',
                  color: '#6AD9A9',
                  boldName: 'Accuracy'}}/>
              <AnalyticsTile info={
                {
                  type:'Max Weight',
                  value: 0.067,
                  description: ' represents the strength of the connection between nodes. Large weights are a sign of overfitting.',
                  color: '#68C1E5',
                  boldName: 'Weight'}}/>
              <AnalyticsTile info={
                {
                  type:'Activation',
                  value: 'Tahn',
                  description: ' functions decide whether a neuron should be activated or not. ',
                  color: '#FF00B8',
                  boldName: 'Activation'}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
