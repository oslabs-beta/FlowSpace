import React, { useState, useEffect } from "react";
import { scaleLinear, max, min, extent } from 'd3';
import './barChart.css';

const height = 500;
const width = 960;
const margin = {top: 20, right: 20, bottom: 50, left: 80}

const ScatterPlot = (props) => {

    // const [data, setData] = useState([{epoch: 1, loss: 1}, {epoch: 2, loss: .5}, {epoch: 3, loss: .3}, {epoch: 4, loss: .2}, {epoch: 5, loss: .15}, {epoch: 6, loss: .1}, {epoch: 7, loss: .05}])
    const [data, setData] = useState([])

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    useEffect(() => {
      props.socket.emit('graphTab');
      props.socket.on('sentLossData', (lossData) => {
        setData(data => [...data, lossData]);
      });
    }, []);

    const yScale = scaleLinear()
        .domain([0, max(data, d => d.loss)])
        .range([innerHeight, 0])

    const xScale = scaleLinear()
        .domain([min(data, d => d.epoch), max(data, d => d.epoch)])
        .range([0, innerWidth])
        .nice();


    return (
        <svg width = {width} height = {height} >
            <g transform = {`translate(${margin.left}, ${margin.top})`}>

                {xScale.ticks().map(tickValue => (
                    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={innerHeight} />
                    <text style={{textAnchor: "middle"}} dy=".71em" y={innerHeight + 3}>{tickValue}</text>
                    </g> 
                ))}
                <text className="xAxisLabel" y={innerHeight + 45} x={innerWidth/2}>Epoch</text>

                {yScale.ticks().map(tickValue => (
                    <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}>
                    <line x2={innerWidth} />
                    <text key={tickValue} style={{textAnchor: "end"}} dy=".32em" x={-3} >{tickValue}</text>
                    </g>
                ))} 
                <text className="yAxisLabel" x={-innerHeight/2} style={{textAnchor: "center"}} y={-35}>Loss</text>

                 { data.map(d => <circle className="mark"  cx={xScale(d.epoch)} cy={yScale(d.loss)} r={10} />) }

            </g>
        </svg>
    )
}

export default ScatterPlot;