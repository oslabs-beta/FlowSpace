#!/usr/bin/env node

import express from 'express';
const app = express();
import http  from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:8080", "http://localhost:8081"],
	},
});

app.get("/", (req, res) => {
	res.sendFile(path.dirname(__filename) + "/build/index.html");
});

app.get("/bundle.js", (req, res) => {
	res.sendFile(path.dirname(__filename) + "/build/bundle.js");
});

app.get("/export", (req, res) => {
  res.set({
    'Content-Type': 'application/json-attachment',
    'content-disposition': 'attachment; filename="export.json"'
  });
  res.send(JSON.stringify(lossData));
});

// model must be doubly parsed prior to using this function
const parseModel = (model) => {
	model = JSON.parse(model);

	let layer = {};
  let input_shape;
  let output_shape;
  let params;

	for (let i = 0; i < model.config.layers.length; i++) {
		// check if it's the first layer or not to set input shape
		model.config.layers[i].config.batch_input_shape
			? (input_shape = model.config.layers[i].config.batch_input_shape[1])
			: (input_shape = model.config.layers[i - 1].config.units);

		// set output shape
		output_shape = model.config.layers[i].config.units;

		// calculate layer height
		const layer_height_px = 80 + (output_shape - 1) * 100;

		// calculate connections
		params = input_shape * output_shape + output_shape;

		layer[i] = {
			layer_number: i,
			layer_type: model.config.layers[i].config.name.includes("dense")
				? "DENSE"
				: "NOT DENSE",
			input_shape,
			output_shape,
			layer_height_px,
			params,
		};
	}
	return layer;
};

let lossData = [];
let weightData;
let lossMethodHolder;
let savedModel;
const allWeightData = [];
let biasData;
let optimizerIterations;
let optimizerLearingRate;

io.on("connection", (socket) => {
	console.log("client connected");

	socket.on("modelData", (data, allWeights) => {
		const d = parseModel(data);
		savedModel = parseModel(data);
		allWeightData.push(allWeights);
		//console.log(allWeightData);
		io.sockets.emit("incomingData", d, allWeights);
	});

  socket.on("modelInfo", (lossMethod, optimizer, maxBias, maxWeight, loss) => {
    if (loss.epoch === 0) {
      lossData = [];
    }
		lossData.push(loss);
		io.sockets.emit("sentOptimizerData", optimizer.iterations_, optimizer.learningRate);
		io.sockets.emit("sentLossDataPlot", lossData);
		io.sockets.emit("sentLossDataAnalytics", lossData, lossMethod);
		io.sockets.emit("sentWeightData", maxWeight);
    io.sockets.emit('sentBiasData', maxBias)
	weightData = maxWeight;
    biasData = maxBias;
	optimizerIterations = optimizer.iterations_;
	optimizerLearingRate = optimizer.learningRate;
	lossMethodHolder = lossMethod
		//console.log(`weightData size is ${weightData.length}`);
	});
	
	socket.on("onClick", () => {
		io.sockets.emit("incomingData", savedModel, allWeightData[allWeightData.length - 1]);
		io.sockets.emit("sentLossDataPlot", lossData);
		io.sockets.emit("sentLossDataAnalytics", lossData, lossMethodHolder);
		io.sockets.emit("sentWeightData", weightData);
    	io.sockets.emit("sentBiasData", biasData);
		io.sockets.emit("sentOptimizerData", optimizerIterations, optimizerLearingRate);
	});

	socket.on("disconnect", () => {
		console.log("client disconnected");
	});
});

server.listen(3333, () => {
	console.log("Server listening on 3333");
});


