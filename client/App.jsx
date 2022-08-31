import React from 'react';
import { Link } from 'react-router-dom'
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';
import AnalyticsTile from './AnalyticsTile.jsx';

function App() {
  return (
    <div className="App">
      <div className='Dashboard'>
        <div className='vertical-nav' style={{ width: "5%", height: "100%", float: "left" }}>
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
                  description: '',
                  color: '#F4B400'}}/>
              <AnalyticsTile info={
                {
                  type:'Accuracy',
                  value: 0.001,
                  description: '',
                  color: '#F4B400'}}/>
              <AnalyticsTile info={
                {
                  type:'Weight',
                  value: 0.001,
                  description: '',
                  color: '#F4B400'}}/>
              <AnalyticsTile info={
                {
                  type:'Activation',
                  value: 0.001,
                  description: '',
                  color: '#F4B400'}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
