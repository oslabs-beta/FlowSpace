#!/usr/bin/env node

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:8080", "http://localhost:8081"]
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(__dirname + '/build/bundle.js');
});

// model must be doubly parsed prior to using this function
const parseModel = (model) => {
  model = JSON.parse(model);
 
  let layer = {};
 
  for (let i = 0; i < model.config.layers.length; i++) {
 
    // check if it's the first layer or not to set input shape 
    model.config.layers[i].config.batch_input_shape ?
    input_shape = model.config.layers[i].config.batch_input_shape[1]
    : input_shape = model.config.layers[i-1].config.units;

    // set output shape
    output_shape = model.config.layers[i].config.units;

    // calculate layer height 
    const layer_height_px = 80 + ((output_shape - 1) * 100)

    // calculate connections
    params = (input_shape * output_shape) + output_shape;


    layer[i] = 
    {
      layer_number: i,
      layer_type: model.config.layers[i].config.name.includes('dense') ? 'DENSE' : 'NOT DENSE',
      input_shape,
      output_shape,
      layer_height_px,
      params
    }
  }
  return layer;
}

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on('modelData', (data) => {
    const d = parseModel(data);
    io.sockets.emit('incomingData', d);
  });

  socket.on('lossData', (data) => {
    console.log(data);
    io.sockets.emit('sentLossData', data);
  });

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
});

server.listen(3333, () => {
  console.log('Server listening on 3333');
});
