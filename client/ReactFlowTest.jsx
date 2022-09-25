// import { node } from '@tensorflow/tfjs-node';
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  ZoomTo,
  FitView
} from 'react-flow-renderer';
import './App.scss';


class Node {
  constructor(layerInfo, nodeInfo) {
    this.layerInfo = layerInfo;
    this.nodeInfo = nodeInfo;
  }
}

const diam = '5rem';

let nodeInfo = [];
let initialEdges = [];

function parseLayer(layerInfo, setNodes, setEdges, allWeights) {

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
        // data: { label: `Input-${i + 1}` },
        position: { x: 0, y: 100 * i },
        className: 'clay',
        style: {
          width: diam,
          height: diam,
          borderRadius: '50%',
          background: 'linear-gradient(to top, #DB4437, #EA8419, #F4B400)',
          color: '#fff',
          borderRadius: '50px',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          boxShadow:'0 15px 30px rgb(179, 197, 234, .75)',
        },
      };
    } else {
      let yHeight = (maxHeight - inputHeight) / 2;

      // populate node information
      nodeInfo = {
        id: `input${i + 1}`,
        sourcePosition: 'right',
        type: 'input',
        // data: { label: `Input-${i + 1}` },
        position: { x: 0, y: 100 * i + yHeight },
        className: 'clay',
        style: {
          width: diam,
          height: diam,
          borderRadius: '50%',
          background: 'linear-gradient(to top, #DB4437, #EA8419, #F4B400)',
          color: '#fff',
          borderRadius: '50px',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          boxShadow:'0 15px 30px rgb(179, 197, 234, .75)',
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
            // data: { label: `Output-${i + 1}` }, //`Layer${Number(keys)+1}-Node-${i+1}`
            position: { x: (Number(keys) + 1) * 300, y: 100 * i },
            style: {
              width: diam,
              height: diam,
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
            // data: { label: `Output-${i + 1}` }, //`Layer${Number(keys)+1}-Node-${i+1}`
            position: { x: (Number(keys) + 1) * 300, y: 100 * i + yHeight },
            style: {
              width: diam,
              height: diam,
              borderRadius: '50%',
              background: 'linear-gradient(to top, #DB4437, #EA8419, #F4B400)',
              color: '#fff',
              borderRadius: '50px',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              boxShadow:'0 15px 30px rgb(179, 197, 234, .75)',
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
            // data: { label: `Layer${Number(keys) + 1}-Node-${i + 1}` },
            position: { x: (Number(keys) + 1) * 300, y: 100 * i },
            style: {
              width: diam,
              height: diam,
              borderRadius: '50%',
              background: 'linear-gradient(to top, #DB4437, #EA8419, #F4B400)',
              color: '#fff',
              borderRadius: '50px',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              boxShadow:'0 15px 30px rgb(179, 197, 234, .75)',
            },
          };
        } else {
          let yHeight = (maxHeight - layerInfo[keys].layer_height_px) / 2;
          nodeInfo = {
            id: `layer${Number(keys) + 1}-node${i + 1}`,
            sourcePosition: 'right',
            targetPosition: 'left',
            // data: { label: `Layer${Number(keys) + 1}-Node-${i + 1}` },
            position: { x: (Number(keys) + 1) * 300, y: 100 * i + yHeight },
            style: {
              width: diam,
              height: diam,
              borderRadius: '50%',
              background: 'linear-gradient(to top, #DB4437, #EA8419, #F4B400)',
              color: '#fff',
              borderRadius: '50px',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              boxShadow:'0 15px 30px rgb(179, 197, 234, .75)',
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

  // used to track the edge thickness based off Weight
  let counter = 0;
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
    let layerNumber;

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
      console.log(initialNodes[nodeNum].nodeInfo.id)
      const edge = {
        id: `${initialNodes[nodeNum].nodeInfo.id}-layer${nextLayerNumber}-node${
          i + 1
        }`,
        source: initialNodes[nodeNum].nodeInfo.id,
        type: 'simplebezier',
        target: `layer${nextLayerNumber}-node${i + 1}`,
        style: {
          stroke: '#F4B400',
          strokeWidth: allWeights[counter]
        },
      };
      console.log(allWeights[counter])
      counter++

    

      initialEdges.push(edge);
    }
  }
  nodeInfo = initialNodes.map((x) => x.nodeInfo);
  console.log('these are our nodes', initialNodes);
  console.log('these are our edges', initialEdges);
  setNodes(nodeInfo);
  setEdges(initialEdges);
}

const HorizontalFlow = (props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
}

  useEffect(() => {
    props.socket.on('incomingData', (data, allWeights) => {
      parseLayer(data, setNodes, setEdges, allWeights);
    })
  }, []);

  //SocketIO State
  // const [model, setModel] = useState([]);

  // useEffect(() => {
  //   props.socket.on('incomingData', (data) => {
  //     console.log(data);
  //     setModel([...model, data]);
  //   });
  // }, [props.socket, model]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // defaultZoom={50}
        // defaultPosition={[50,50]}
        minZoom={-100}
        maxZoom={1000}
        onInit={onLoad}
        attributionPosition="bottom-left"
      ></ReactFlow>
    </ReactFlowProvider>
  );
};

export default HorizontalFlow;
