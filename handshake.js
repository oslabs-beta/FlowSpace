//DevClient side
//imports socketIO client with connection
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3333');

export class HandShake {
  constructor(model) {
    this.model = model;
    this.socket = socket;
    // this.x = model.layers[0].getWeights()[0].dataSync()
    // this.socket = this.connect();
    this.socket.emit('modelData', this.model);
    this.lossCallback = this.lossCallback.bind(this);
  }

  lossCallback(epoch, log) {
    let x = this.model.layers //[0].getWeights()[0].dataSync() //.getWeights()  //.layers
    const allAbsMax = [];
    // Let's get the max of each layer
    for (let i = 0; i < x.length; i++) { 
      let arr = x[i].getWeights()[0].dataSync()
      // console.log(arr, Math.max(...arr))
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
    console.log("allAbsMax -> ", allAbsMax);
    console.log("max of allAbsMax -> ", result);
    //   let holder = x[i].getWeights()[0].dataSync()[0]
    //   max = Math.max(Math.abs(holder), max)
    // }
    // console.log(x);
    //console.log(arr)
    socket.emit('lossData', this.model, { epoch, loss: log.loss } )
    // socket.emit('hey', x)
  }

}

//this.model, { epoch, loss: log.loss }
  // connect() {
  //   return socketIO.connect('http://localhost:3333');
  // }

    
    // socketServer side
    // socketIO.on('connection', (socket) => {
    //   //handshake between DevClient <=> socketServer
    //   console.log(`Dev Client {socket.id} connected...`);
    
    //   //event listener for incomingData from DevClient
    //   socket.on('test', (data) => {
    //     console.log(data);
      
    //   //emit event to send data to FlowState frontend
    //     socketIO.emit('graphData', data);
    //   });
    
    //   socket.on('disconnect', () => {
    //     console.log('Dev Client disconnected')
    //   });
    // });

  // sendData(e) {
  //   // e.preventDefault();
  //   socket.emit('incomingData', {
  //     text: data
  //   });
  // }


// export function lossCallback(epoch, log) {
//   socket.emit('lossData', {epoch, loss: log.loss});
// }