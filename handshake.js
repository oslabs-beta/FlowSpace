//DevClient side
//imports socketIO client with connection
import { io } from 'socket.io-client';


class HandShake {
  constructor(model) {
    this.model = model;
    this.connect();
  }

  connect() {
    const socket = io('http://localhost:3333');
    socket.emit('test', this.model);
    
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
  }

  // sendData(e) {
  //   // e.preventDefault();
  //   socket.emit('incomingData', {
  //     text: data
  //   });
  // }
}






export default HandShake;