// import { node } from '@tensorflow/tfjs-node';
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, ReactFlowProvider} from 'react-flow-renderer';

// create Node class 
class Node {
  constructor(layerInfo, nodeInfo) {
    this.layerInfo = layerInfo;
    this.nodeInfo = nodeInfo;
  }
}

// style object for nodes
const nodeStyle = {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    background: 'linear-gradient(to top, #DB4437, #EA8419, #F4B400)',
    color: '#fff',
    borderRadius: '50px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    boxShadow:'0 15px 30px rgb(179, 197, 234, .75)',
}

// declare arrays to hold mapped node and edge (connections) information
let nodeInfo = [];
let initialNodes = [];
let initialEdges = [];

// helper function to get the biggest layer height (most nodes) in the model
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


/**
 * @name parseLayer function to automatically parse any model into nodes and edges
 * @param {object} layerInfo 
 * @param {hook} setNodes for setting the node information in state
 * @param {hook} setEdges for setting the edge information in state
 * @param {array} allWeights all the weight data from the model. used for rendering line thicknesses 
 * @returns 
 */
function parseLayer(layerInfo, setNodes, setEdges, allWeights) {
  // break if socket hasn't recieved layerInfo 
  if (!layerInfo) return;

  // declare a varibale to store the biggest layer
  const maxHeight = getBiggestLayerHeight(layerInfo);

  // get the height of the input layer
  const inputHeight = 80 + (layerInfo[0].input_shape - 1) * 100;

  // populate input layer
  initialNodes = [];
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
        position: { x: 0, y: 100 * i },
        className: 'clay',
        style: nodeStyle,
      };
    } else {
      // modifier to correctly place node along y-axis
      let yHeight = (maxHeight - inputHeight) / 2;

      // populate node information
      nodeInfo = {
        id: `input${i + 1}`,
        sourcePosition: 'right',
        type: 'input',
        position: { x: 0, y: 100 * i + yHeight },
        className: 'clay',
        style: nodeStyle,
      };
    }

    // create new instance of Node class with corresponing layer and node info
    const node = new Node(layerInfo[0], nodeInfo);

    // push new Node instance into intial nodes array
    initialNodes.push(node);
  }

  // populate hidden layers
  for (let keys in layerInfo) {
    for (let i = 0; i < layerInfo[keys].output_shape; i++) {
      let nodeInfo = {};

      // check to see if the node is in the output layer (effects x-position)
      if (layerInfo[keys].layer_number === Object.keys(layerInfo).length - 1) {
        // populate node information
        if (layerInfo[keys].layer_height_px === maxHeight) {
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            targetPosition: 'left',
            type: 'output',
            position: { x: (Number(keys) + 1) * 300, y: 100 * i },
            style: nodeStyle,
          };
        } else {
          // modifier to correctly place node along y-axis
          let yHeight = (maxHeight - layerInfo[keys].layer_height_px) / 2;
          // populate node info
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            targetPosition: 'left',
            type: 'output',
            position: { x: (Number(keys) + 1) * 300, y: 100 * i + yHeight },
            style: nodeStyle,
          };
        }
      } else {
        // populate node information for hidden layers
        if (layerInfo[keys].layer_height_px === maxHeight) {
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: (Number(keys) + 1) * 300, y: 100 * i },
            style: nodeStyle,
          };
        } else {
          let yHeight = (maxHeight - layerInfo[keys].layer_height_px) / 2;
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            position: { x: (Number(keys) + 1) * 300, y: 100 * i + yHeight },
            style:nodeStyle,
          };
        }
      }

      // create new instance of Node class with corresponing layer and node info
      const node = new Node(layerInfo[keys], nodeInfo);

      // push new Node instance into intial nodes array
      initialNodes.push(node);
    }
  }


  // returs the shape of the next layer to the right 
  const getNextLayerShape = (initialNodes, layerNumber) => {
    let nextLayerShape = 0;
    // loop through initial nodes until the first node of the next layer is identified
    for (let i = 0; i < initialNodes.length; i++) {
      if (initialNodes[i].layerInfo.layer_number === layerNumber + 1) {
        nextLayerShape = initialNodes[i].layerInfo.output_shape;
        break;
      }
    }
    return nextLayerShape;
  };

  // loop through nodes
  for (let nodeNum = 0; nodeNum < initialNodes.length; nodeNum++) {
    let currentLayerShape = 0;
    let nextLayerNumber = 0;
    let nextLayerShape = 0;

    // check if the current node is smaller than the first layer's input shape 
    // i.e if current node is within the first layer
    if (nodeNum < layerInfo[0].input_shape) {
      currentLayerShape = Number(initialNodes[nodeNum].layerInfo.output_shape);
      nextLayerShape = currentLayerShape;
      nextLayerNumber = initialNodes[nodeNum].layerInfo.layer_number + 1;
    } else {
      // if the current node is in the hidden layers 
      currentLayerShape = Number(initialNodes[nodeNum].layerInfo.output_shape);
      nextLayerShape = getNextLayerShape(initialNodes, initialNodes[nodeNum].layerInfo.layer_number);
      nextLayerNumber = initialNodes[nodeNum].layerInfo.layer_number + 2;
    }
    // used to track aand normalze the edge thickness based off Weight
    let counter = 0;

    // loop through entire layer and set edges
    for (let i = 0; i < nextLayerShape; i++) {
      // populate attributes of edge object
      const edge = {
        id: `${initialNodes[nodeNum].nodeInfo.id}-layer${nextLayerNumber}-node${i + 1}`,
        source: initialNodes[nodeNum].nodeInfo.id,
        type: 'simplebezier',
        target: `layer${nextLayerNumber}-node${i + 1}`,
        style: {
          stroke: '#F4B400',
          strokeWidth: allWeights ? allWeights[counter] : 1.5 // default thickness until weight data comes in
        },
      };

      counter++;

      initialEdges.push(edge);
    }
  }

  // set the nodeInfo arrayand setEdges array 
  nodeInfo = initialNodes.map((x) => x.nodeInfo);
  setNodes(nodeInfo);
  setEdges(initialEdges);
}


// NeuralNetwork functional component 
const NeuralNetwork = (props) => {
  /*
  ReactFlow helper hooks to create new local state for nodes and edges 
  Exposes a onNodesChange/onEdgesChange functions to be passed as props to the React Flow component
  */
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // onConnect handler function to add edges
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),[]
  );
  
  // onLoad handler function to fit the ReactFlow canvas to the 
  // neural network 
  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  }

  // lifecycle method for syncing component to external system (i.e. socket.io server)
  useEffect(() => {
    // listening for incomingData socket event from the socket-io server (see line 88 server.js)
    props.socket.on('incomingData', (data, allWeights) => {
      // parse data accordingly 
      parseLayer(data, setNodes, setEdges, allWeights);
    });
    return () => {
      // no longer listening for socket events
      props.socket.off('incomingData');
    }
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={-100}
        maxZoom={1000}
        onInit={onLoad}
        attributionPosition="bottom-left"
      ></ReactFlow>
    </ReactFlowProvider>
  );
};

export default NeuralNetwork;
