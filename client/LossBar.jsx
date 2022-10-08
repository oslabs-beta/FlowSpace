import React, { useState, useEffect } from "react";
import { scaleBand, scaleLinear, max } from 'd3';
import './barChart.css';

const height = 500;
const width = 960;
const margin = {top: 20, right: 20, bottom: 40, left: 60}

const BarChart = (props) => {

    // const [data, setData] = useState([{epoch: 1, loss: 1}, {epoch: 2, loss: .5}, {epoch: 3, loss: .3}, {epoch: 4, loss: .2}, {epoch: 5, loss: .15}, {epoch: 6, loss: .1}, {epoch: 7, loss: .05}])
    const [data, setData] = useState([]);

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    useEffect(() => {
      props.socket.on('sentLossDataPlot', (lossData) => {
        setData(data => [...data, lossData]);
      });
    }, []);

    const yScale = scaleBand()
        .domain(data.map(d => d.epoch))
        .range([0, innerHeight])
        .paddingInner(0.15)

    const xScale = scaleLinear()
        .domain([0, max(data, d => d.loss)])
        .range([0, innerWidth])


    return (
        <svg width = {width} height = {height} >
            <g transform = {`translate(${margin.left}, ${margin.top})`}>

                {xScale.ticks().map(tickValue => (
                    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line y2={innerHeight} />
                    <text style={{textAnchor: "middle"}} dy=".71em" y={innerHeight + 3}>{tickValue}</text>
                    </g> 
                ))}
                <text className="xAxisLabel" y={innerHeight + 38} x={innerWidth/2}>Loss</text>

                {yScale.domain().map(tickValue => (
                    <g className="tick">
                    <text key={tickValue} style={{textAnchor: "end"}} dy=".32em" x={-3} y={yScale(tickValue) + yScale.bandwidth() / 2}>{tickValue}</text>
                    </g>
                ))} 
                <text className="yAxisLabel" x={-innerHeight/2} style={{textAnchor: "center"}} y={-20}>Epoch</text>

                 { data.map(d => <rect className="mark" key={d.epoch} x={0} y={yScale(d.epoch)} width={xScale(d.loss)} height={yScale.bandwidth()} />) }

            </g>
        </svg>
    )
}

export default BarChart