import { HandShake } from "./handshake";
import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import * as tf from "@tensorflow/tfjs";


describe("testing functionality of socket.io in handshake class", () => {
  let handshakeInstance;
  let io;
  let model;
  let serverSocket;
  
  beforeAll(() => {
    io = new Server(server);
    io.on('connection', (socket) => {
      serverSocket = socket;
    });
    model = tf.sequential();
    model.add(
      tf.layers.dense({
        units: 1,
        inputShape: [1],
        activation: "linear",
        useBias: true,
      })
    );
    model.add(tf.layers.dense({ units: 10, activation: "linear", useBias: true }));
    model.add(tf.layers.dense({ units: 4, activation: "linear", useBias: true }));
    model.add(tf.layers.dense({ units: 1, activation: "linear", useBias: true }));
    const optimizer = tf.train.sgd(0.1);
    model.compile({ optimizer, loss: "meanSquaredError" });
  });
  
  afterAll(() => {
    io.close();
    handshakeInstance.socket.close();
  });
  
  
  test("checks initial data", (done) => {
    io.on("connection", () => {
      serverSocket.on("modelData", (modelData, allWeights) => {
        modelData = JSON.parse(modelData);
        expect(typeof modelData).toBe('object');
        expect(modelData.class_name).toBe('Sequential');
        done();
      });
    });
    handshakeInstance = new HandShake(model);
  });
  
  test("checks model type from lossCallback", (done) => {
    serverSocket.on("modelData", (modelData, allWeights) => {
      modelData = JSON.parse(modelData);
      expect(modelData.class_name).toBe('Sequential');
      done();
    });
    handshakeInstance.lossCallback(1, {loss: 4});
  });
  
  test("checks number of weight data points from lossCallback", (done) => {
    serverSocket.on("modelData", (modelData, allWeights) => {
      expect(allWeights.length).toBe(55);
      done();
    });
    handshakeInstance.lossCallback(1, {loss: 4});
  });
  
  test("checks normalization of weight data from lossCallback is between 0.8 and 10", (done) => {
    serverSocket.on("modelData", (modelData, allWeights) => {
      expect(Math.round(Math.max(...allWeights))).toBe(10);
      expect(Math.round(Math.min(...allWeights) * 10)).toBe(8);
      done();
    });
    handshakeInstance.lossCallback(1, {loss: 4});
  });
  
  test("checks correct data types from lossCallback", (done) => {
    serverSocket.on('modelInfo', (loss, optimizer, biasResult, result, epochLossData) => {
      expect(loss).toBe('meanSquaredError');
      expect(typeof biasResult).toBe('number');
      expect(typeof result).toBe('number');
      done();
    });
    handshakeInstance.lossCallback(4, {loss: 7});
  });
  
  test("checks model learning rate from lossCallback", (done) => {
    serverSocket.on('modelInfo', (loss, optimizer, biasResult, result, epochLossData) => {
      expect(optimizer.learningRate).toBe(0.1);
      done();
    });
    handshakeInstance.lossCallback(4, {loss: 7});
  });
  
  test("checks epoch loss data from lossCallback", (done) => {
    serverSocket.on('modelInfo', (loss, optimizer, biasResult, result, epochLossData) => {
      expect(epochLossData.epoch).toBe(4);
      expect(epochLossData.loss).toBe(7);
      done();
    });
    handshakeInstance.lossCallback(4, {loss: 7});
  });

  server.listen(3333);
})
