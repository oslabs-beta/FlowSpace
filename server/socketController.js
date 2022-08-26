const socketController = {};

function parseLayer(layerInfo) {
  // input layer
  for (let i = 0; i < layerInfo[0].input_shape; i++) {
    // populate node information
    const nodeInfo = {
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
        // populate node information
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
  console.log('these are our nodes', initialNodes);
  console.log('these are our edges', initialEdges);
}
