#!/usr/bin/env node

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080"
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
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