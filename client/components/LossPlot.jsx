import React, { useState, useEffect } from "react";
import { scaleLinear, max, min, extent } from 'd3';
import '../style/barChart.css';

const height = '350';
const width = '950';
const margin = {top: 20, right: 20, bottom: 50, left: 80}

const ScatterPlot = (props) => {
    const [data, setData] = useState([])

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    useEffect(() => {
      props.socket.emit('onClick');
      props.socket.on('sentLossDataPlot', (lossData) => {
        setData(lossData);
      });
      return () => {
        props.socket.off('sentLossDataPlot');
      }
    }, []);

    const yScale = scaleLinear()
        .domain([0, max(data, d => d.loss)])
        .range([innerHeight, 0])

    const xScale = scaleLinear()
        .domain([min(data, d => d.epoch), max(data, d => d.epoch)])
        .range([0, innerWidth])
        .nice();


    return (
        <div className="graphWrapper" style={{ width: "100%", height: "40%", float: "right" }}>
            <svg className='d3Graph' width = {width} height = {height} >
                <g transform = {`translate(${margin.left}, ${margin.top})`}>

                    {xScale.ticks().map(tickValue => (
                        <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                        <line y2={innerHeight} />
                        <text style={{textAnchor: "middle"}} dy=".71em" y={innerHeight + 10}>{tickValue}</text>
                        </g> 
                    ))}
                    <text className="xAxisLabel" y={innerHeight + 45} x={innerWidth/2 - 30}>Epoch</text>

                    {yScale.ticks().map(tickValue => (
                        <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}>
                        <line x2={innerWidth} />
                        <text key={tickValue} style={{textAnchor: "end"}} dy=".32em" x={-3} >{tickValue}</text>
                        </g>
                    ))} 
                    <text className="yAxisLabel" x={-innerHeight/2} style={{textAnchor: "center"}} y={-70}>Loss</text>

                    { data.map(d => <circle className="mark"  cx={xScale(d.epoch)} cy={yScale(d.loss)} r={10} />) }

                </g>
                <defs>
                    <linearGradient id="MarkGradient" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop offset="0%" stopColor="#f4b400"/>
                        <stop offset="17%" stopColor="#f1a50e"/>
                        <stop offset="51%" stopColor="#ea8419"/>
                        <stop offset="67.33%" stopColor="#e3722a"/>
                        <stop offset="100%" stopColor="#db4437"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}

export default ScatterPlot;
