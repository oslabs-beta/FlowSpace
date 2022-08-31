// import { node } from '@tensorflow/tfjs-node';
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from 'react-flow-renderer';
import socketIO from 'socket.io-client';
import './App.scss';

const socket = socketIO.connect('http://localhost:3333');

class Node {
  constructor(layerInfo, nodeInfo) {
    this.layerInfo = layerInfo;
    this.nodeInfo = nodeInfo;
  }
}


// const layerInfo = {
//   0: {
//     layer_number: 0,
//     layer_type: 'DENSE',
//     input_shape: 2,
//     output_shape: 11,
//     layer_height_px: 1080,
//     params: 33,
//   },
//   1: {
//     layer_number: 1,
//     layer_type: 'DENSE',
//     input_shape: 11,
//     output_shape: 5,
//     layer_height_px: 480,
//     params: 60,
//   },
//   2: {
//     layer_number: 2,
//     layer_type: 'DENSE',
//     input_shape: 5,
//     output_shape: 2,
//     layer_height_px: 180,
//     params: 12,
//   },
//   3: {
//     layer_number: 3,
//     layer_type: 'DENSE',
//     input_shape: 2,
//     output_shape: 7,
//     layer_height_px: 680,
//     params: 21,
//   },
//   4: {
//     layer_number: 4,
//     layer_type: 'DENSE',
//     input_shape: 7,
//     output_shape: 3,
//     layer_height_px: 280,
//     params: 24,
//   },
// };

let nodeInfo = [];
let initialEdges = [];

function parseLayer(layerInfo, setNodes, setEdges) {

  // write function to get the biggest layer height (most nodes) in the model
  const getBiggestLayerHeight = (layerInfo) => {
    // get the height of the input layer
    let height = 80 + (layerInfo[0].input_shape - 1) * 100;

    // loop through to find the largest height amongst the layers
    for (let keys in layerInfo) {
      height = Math.max(height, layerInfo[keys].layer_height_px);
    }

    // return the height
    return height;
  };

  // declare a varibale to store the biggest layer
  const maxHeight = getBiggestLayerHeight(layerInfo);

  // get the height of the input layer
  const inputHeight = 80 + (layerInfo[0].input_shape - 1) * 100;

  // input layer
  const initialNodes = [];
  initialEdges = [];
  for (let i = 0; i < layerInfo[0].input_shape; i++) {
    let nodeInfo;

    // check if the input layer has the most nodes
    if (inputHeight === maxHeight) {
      // populate node information
      nodeInfo = {
        id: `input${i + 1}`,
        sourcePosition: 'right',
        type: 'input',
        data: { label: `Input-${i + 1}` },
        position: { x: 0, y: 100 * i },
        className: 'clay',
        style: {
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          fontWeight: 'bold',
          border: 'none',
          padding: '2rem .5rem',
          fontFamily: 'inherit',
          backgrounBlendMode: 'multiply',
          color: 'rgb(235, 234, 234)',
          background: 'linear-gradient(225deg, #181818, #2e2e2e)',
          boxShadow: '5px 5px 10px #191919, 5px -5px 10px #292929',
        },
      };
    } else {
      let yHeight = (maxHeight - inputHeight) / 2;

      // populate node information
      nodeInfo = {
        id: `input${i + 1}`,
        sourcePosition: 'right',
        type: 'input',
        data: { label: `Input-${i + 1}` },
        position: { x: 0, y: 100 * i + yHeight },
        className: 'clay',
        style: {
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          fontWeight: 'bold',
          border: 'none',
          padding: '2rem .5rem',
          fontFamily: 'inherit',
          backgrounBlendMode: 'multiply',
          color: 'rgb(235, 234, 234)',
          background: 'linear-gradient(225deg, #181818, #2e2e2e)',
          boxShadow: '5px 5px 10px #191919, 5px -5px 10px #292929',
        },
      };
    }

    // create new instance of Node class with corresponing layer and node info
    const node = new Node(layerInfo[0], nodeInfo);

    // push new Node instance into intial nodes array
    initialNodes.push(node);
  }

  // hidden layers
  for (let keys in layerInfo) {
    for (let i = 0; i < layerInfo[keys].output_shape; i++) {
      let nodeInfo = {};

      // check to see if the node is in the output layer
      if (layerInfo[keys].layer_number === Object.keys(layerInfo).length - 1) {
        // populate node information
        if (layerInfo[keys].layer_height_px === maxHeight) {
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            targetPosition: 'left',
            type: 'output',
            data: { label: `Output-${i + 1}` }, //`Layer${Number(keys)+1}-Node-${i+1}`
            position: { x: (Number(keys) + 1) * 300, y: 100 * i },
            style: {
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              fontWeight: 'bold',
              border: 'none',
              padding: '2rem .5rem',
              fontFamily: 'inherit',
              backgrounBlendMode: 'multiply',
              color: 'rgb(235, 234, 234)',
              background: 'linear-gradient(225deg, #181818, #2e2e2e)',
              boxShadow: '5px 5px 10px #191919, 5px -5px 10px #292929',
            },
          };
        } else {
          let yHeight = (maxHeight - layerInfo[keys].layer_height_px) / 2;
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            targetPosition: 'left',
            type: 'output',
            data: { label: `Output-${i + 1}` }, //`Layer${Number(keys)+1}-Node-${i+1}`
            position: { x: (Number(keys) + 1) * 300, y: 100 * i + yHeight },
            style: {
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              fontWeight: 'bold',
              border: 'none',
              padding: '2rem .5rem',
              fontFamily: 'inherit',
              backgrounBlendMode: 'multiply',
              color: 'rgb(235, 234, 234)',
              background: 'linear-gradient(225deg, #181818, #2e2e2e)',
              boxShadow: '5px 5px 10px #191919, 5px -5px 10px #292929',
            },
          };
        }
      } else {
        // populate node information for hidden layers
        if (layerInfo[keys].layer_height_px === maxHeight) {
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `Layer${Number(keys) + 1}-Node-${i + 1}` },
            position: { x: (Number(keys) + 1) * 300, y: 100 * i },
            style: {
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              fontWeight: 'bold',
              border: 'none',
              padding: '2rem .5rem',
              fontFamily: 'inherit',
              backgrounBlendMode: 'multiply',
              color: 'rgb(235, 234, 234)',
              background: 'linear-gradient(225deg, #181818, #2e2e2e)',
              boxShadow: '5px 5px 10px #191919, 5px -5px 10px #292929',
            },
          };
        } else {
          let yHeight = (maxHeight - layerInfo[keys].layer_height_px) / 2;
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            data: { label: `Layer${Number(keys) + 1}-Node-${i + 1}` },
            position: { x: (Number(keys) + 1) * 300, y: 100 * i + yHeight },
            style: {
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              fontWeight: 'bold',
              border: 'none',
              padding: '2rem .5rem',
              fontFamily: 'inherit',
              backgrounBlendMode: 'multiply',
              color: 'rgb(235, 234, 234)',
              background: 'linear-gradient(225deg, #181818, #2e2e2e)',
              boxShadow: '5px 5px 10px #191919, 5px -5px 10px #292929',
            },
          };
        }
      }

      // create new instance of Node class with corresponing layer and node info
      const node = new Node(layerInfo[keys], nodeInfo);

      // push new Node instance into intial nodes array
      initialNodes.push(node);
    }
  }

  const getNextLayerShape = (initialNodes, layerNumber) => {
    let nextLayerShape = 0;
    for (let i = 0; i < initialNodes.length; i++) {
      if (initialNodes[i].layerInfo.layer_number === layerNumber + 1) {
        nextLayerShape = initialNodes[i].layerInfo.output_shape;
        break;
      }
    }
    return nextLayerShape;
  };

  for (let nodeNum = 0; nodeNum < initialNodes.length; nodeNum++) {
    let currentLayerShape = 0;
    let nextLayerNumber = 0;
    let nextLayerShape = 0;

    if (nodeNum < layerInfo[0].input_shape) {
      currentLayerShape = Number(initialNodes[nodeNum].layerInfo.output_shape);
      nextLayerShape = currentLayerShape;
      nextLayerNumber = initialNodes[nodeNum].layerInfo.layer_number + 1;
    } else {
      currentLayerShape = Number(initialNodes[nodeNum].layerInfo.output_shape);
      nextLayerShape = getNextLayerShape(
        initialNodes,
        initialNodes[nodeNum].layerInfo.layer_number
      );
      nextLayerNumber = initialNodes[nodeNum].layerInfo.layer_number + 2;
    }

    for (let i = 0; i < nextLayerShape; i++) {
      const edge = {
        id: `${initialNodes[nodeNum].nodeInfo.id}-layer${nextLayerNumber}-node${
          i + 1
        }`,
        source: initialNodes[nodeNum].nodeInfo.id,
        type: 'simplebezier',
        target: `layer${nextLayerNumber}-node${i + 1}`,
      };

      initialEdges.push(edge);
    }
  }
  nodeInfo = initialNodes.map((x) => x.nodeInfo);
  console.log('these are our nodes', initialNodes);
  console.log('these are our edges', initialEdges);
  setNodes(nodeInfo);
  setEdges(initialEdges);
}

const HorizontalFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  useEffect(() => {
    console.log('use is Effected');
    socket.on('incomingData', (data) => {
      parseLayer(data, setNodes, setEdges);
    });
    socket.on('sentLossData', (data) => {
      console.log(data);
    });
  }, []);

  //SocketIO State
  // const [model, setModel] = useState([]);

  // useEffect(() => {
  //   socket.on('incomingData', (data) => {
  //     console.log(data);
  //     setModel([...model, data]);
  //   });
  // }, [socket, model]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
    </ReactFlowProvider>
  );
};

export default HorizontalFlow;
