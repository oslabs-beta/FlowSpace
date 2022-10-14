//DevClient side
//imports socketIO client with connection
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3333');

export class HandShake {
  constructor(model) {
    this.model = model;
    this.socket = socket;
    this.socket.emit('modelData', this.model);
    this.lossCallback = this.lossCallback.bind(this);
  }

  lossCallback(epoch, log) {
    let x = this.model.layers
    const allWeights = [];
    const allAbsMax = [];
    const allBiasAbsMax = [];
    // Let's get the max of each layer
    for (let i = 0; i < x.length; i++) { 
      // This gets the weights in each layer and returns an array of weights
      let arr = x[i].getWeights()[0].dataSync()
      // allWeights is an array that contains the weights of all the layers
      // allWeights is used to help in rendering the connection thickness
      allWeights.push(...Array.from(arr))
      // We then find the max and min values in the array
      let max = Math.max(...arr)
      let min = Math.min(...arr)
      // The maximum absolute value is then stored in allAbsMax
      if(Math.abs(max) < Math.abs(min)) {
        allAbsMax.push(min)
      } else {
        allAbsMax.push(max)
      }
    }

    for (let i = 0; i < x.length; i++) { 
      // This gets the weights in each layer and returns an array of weights
      let biasArr = x[i].getWeights()[1].dataSync()
      // We then find the max and min values in the array
      let max = Math.max(...biasArr)
      let min = Math.min(...biasArr)
      // The maximum absolute value is then stored in allAbsMax
      if(Math.abs(max) < Math.abs(min)) {
        allBiasAbsMax.push(min)
      } else {
        allBiasAbsMax.push(max)
      }
    }

    const biasResult = allBiasAbsMax.reduce(
      (prev, current) => Math.abs(current) > Math.abs(prev) ? current : prev
    , 0);

    // Result will be the max of node weights of all the layers
    const result = allAbsMax.reduce(
      (prev, current) => Math.abs(current) > Math.abs(prev) ? current : prev
    , 0);

    // find the absolute minimum to normalize
    let minimum = Infinity;
    for(let weight = 0; weight < allWeights.length; weight++) {
      minimum = Math.min(minimum, Math.abs(allWeights[weight]))
    }
    const normalizedData = []
    for(let weight = 0; weight < allWeights.length; weight++) {
      // normalized the data between 0.8 and 10
      let normalizedWeight = 0.8 + ( ((Math.abs(allWeights[weight]) - minimum) * (10 - 0.8)) / Math.abs(result) - minimum)
      normalizedData.push(normalizedWeight) 
    }
    console.log("allAbsMax -> ", allAbsMax);
    console.log("allBiasAbsMax -> ", biasResult);
    console.log("max of allAbsMax -> ", result);
    console.log('hiiiiiii', normalizedData)
    socket.emit('modelInfo', this.model.loss, this.model.optimizer, biasResult, result, { epoch, loss: log.loss } )
    socket.emit('modelData', this.model, normalizedData)

  }

}