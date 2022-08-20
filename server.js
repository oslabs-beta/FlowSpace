#!/usr/bin/env node

const io = require("socket.io");

const server = new io.Server({
  cors: {
    origin: "http://localhost:8080"
  }
});

server.on("connection", (socket) => {
  console.log("client connected");

  socket.on('test', (data) => {
    const d = JSON.parse(data);
    console.log(d.config.layers);
  });
  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
});

server.listen(3333, () => {
  console.log('Server listening on 3333');
});