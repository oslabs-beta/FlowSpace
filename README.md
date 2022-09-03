<h1 align="center">FlowState - all in one visual tool for TensorFlow.js developers</h1>

<h2>The Problem</h2>

We set out to solve an accessibility problem. Due to its complexity, many developers are discouraged from engaging with Machine Learning. TensorFlow.js is a Javascript machine learning library intended to bring ML to developers with little experience in it. Despite its simplicity, it lacks direct support for a visualization tool.

<br />

<h2>Our Solution</h2>

Our solution is to develop a model and data visualization tool for TensorflowJS through the utilization of React-flow, the D3 Visualization library, React Frontend and Socket.io

We created a npm package that offers visualization of machine learning model architecture and contextualization of model metrics. It includes an interactive architecture as well as real time visuals of data such as loss over each epoch.

Once a developer installs our npm package, all they have to do is import our library and pass their model into our flowState method. Upon running their application, an independent visual bridge is created that utilizes Socket.IO. This allows the two applications to speak to one another, thus creating a bidirectional connection for data to pass seamlessly between the two environments in real-time. At any time, the developer can change the number of nodes in a layer or altering the number of layers in the model and this would update in real-time on our front-end.

<br />
<br />

<p align="center">
<img src="client/assets/Logo.jpg" height=500/>
</p>
