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
    // Let's get the max of each layer
    for (let i = 0; i < x.length; i++) { 
      let arr = x[i].getWeights()[0].dataSync()
      allWeights.push(...Array.from(arr))
      let max = Math.max(...arr)
      let min = Math.min(...arr)
      if(Math.abs(max) < Math.abs(min)) {
        allAbsMax.push(min)
      } else {
        allAbsMax.push(max)
      }
    }

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
    console.log("max of allAbsMax -> ", result);
    console.log('hiiiiiii', normalizedData)
    socket.emit('modelInfo', result, { epoch, loss: log.loss } )
    socket.emit('modelData', this.model, normalizedData)

  }

}