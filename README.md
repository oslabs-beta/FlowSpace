<!-- style -->
<!-- <style>
    b { font-size: 15px;
    font-weight: 700}
</style> -->

<!-- FlowState Readme -->
<h1 align="center">
FlowState
<br>
<img height= "200" src="https://github.com/oslabs-beta/FlowState/raw/README/client/assets/Logo.jpg"/>

<h2 align= "center">

An all in one data visualization tool for [TensorFlow.js](https://www.tensorflow.org/js) developers

![GitHub top language](https://img.shields.io/github/languages/top/oslabs-beta/FlowState) &nbsp;
![GitHub package.json version](https://img.shields.io/github/package-json/v/oslabs-beta/flowstate) &nbsp;
![npm](https://img.shields.io/npm/v/flowstate) &nbsp;
![GitHub](https://img.shields.io/github/license/oslabs-beta/flowstate) &nbsp;
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/oslabs-beta/flowstate/dev) &nbsp;
![GitHub contributors](https://img.shields.io/github/contributors/oslabs-beta/flowstate) &nbsp;
![GitHub Repo stars](https://img.shields.io/github/stars/oslabs-beta/FlowState?style=social) &nbsp;

</h2>
</h1>

<details open>
    <summary><b>FlowState JS</b></summary>
    <ol>
        <li>
            <a href = "#problem"> Problem </a>
        </li> 
        <li>
            <a href = "#solution"> Solution </a>
        </li> 
    </ol>
</details>
<hr>
<details open> 
    <summary><b> Problem </b></summary> <a name="problem"></a>

We set out to solve an accessibility problem. Due to its complexity, many developers are discouraged from engaging with Machine Learning. TensorFlow.js is a Javascript machine learning library intended to bring ML to developers with little experience in it. Despite its simplicity, it lacks direct support for a visualization tool.

</details>

<details open> 
    <summary><b> Solution </b></summary> <a name="solution"></a>

Our solution is to develop a model and data visualization tool for TensorflowJS through the utilization of React-flow, the D3 Visualization library, React Frontend and Socket.io

We created a npm package that offers visualization of machine learning model architecture and contextualization of model metrics. It includes an interactive architecture as well as real time visuals of data such as loss over each epoch.

Once a developer installs our npm package, all they have to do is import our library and pass their model into our flowState method. Upon running their application, an independent visual bridge is created that utilizes Socket.IO. This allows the two applications to speak to one another, thus creating a bidirectional connection for data to pass seamlessly between the two environments in real-time. At any time, the developer can change the number of nodes in a layer or altering the number of layers in the model and this would update in real-time on our front-end.

</details>

---

<!--Table of Contents Here-->
<details open>
    <summary><b>Table of Contents</b></summary>
    <ol>
        <li>
            <a href = "#aboutFlowState"> About Flow State </a>
        </li>
        <li>
            <a href = "#techStack"> Tech-Stack </a>
        </li>
        <li>
            <a href = "#installAndSetup"> Install and Set-up </a>
        </li> 
        <li>
            <a href = "#usingFlowState"> Using FlowState Features </a>
        </li> 
        <!-- <li>
            <a href = "#credits"> Credits and Contributors </a>
        </li>  -->
        <li>
            <a href = "#license"> License </a>
        </li> 
        <li>
            <a href = "#contacts"> Contacts </a>
        </li> 
    </ol>
</details>

<hr>

<details open> 
    <summary><b> About FlowState </b></summary> <a name="aboutFlowState"></a>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Mauris ultrices eros in cursus turpis massa. Porttitor massa id neque aliquam vestibulum morbi blandit. Amet tellus cras adipiscing enim. Eu volutpat odio facilisis mauris sit amet.

</details>

<details open> 
    <summary><b> Tech-Stack </b></summary> <a name="techStack"></a>
    <div align="center">
        <div align="center">
            <div align="center">
                <div align="center">
                    <code>
                        <img height= "40" src="https://img.icons8.com/color/48/000000/javascript--v1.png"/>
                    </code> <br>
                </div>
                <code>
                    <img height = "40" src="https://img.icons8.com/color/48/000000/html-5--v1.png"/>
                    <img height = "40" src="https://img.icons8.com/color/48/000000/css3.png"/>
                </code> <br>
            </div>
            <code>
                <img height = "40" src="https://img.icons8.com/color/48/000000/tensorflow.png"/>
                <img height = "40" src="https://img.icons8.com/bubbles/50/000000/react.png"/>
                <img height = "40" src="https://img.icons8.com/fluency/48/000000/node-js.png"/>
            </code><br>
        </div>
    <code>
        <img height = "40" src="https://cdn.icon-icons.com/icons2/2389/PNG/48/socket_io_logo_icon_144874.png"/>
        <img height = "40" src="https://reactflow.dev/img/logo.svg"/>
        <img height = "40" src="https://img.icons8.com/external-tal-revivo-duo-tal-revivo/50/000000/external-d3js-a-javascript-library-for-producing-dynamic-interactive-data-visualizations-in-web-browsers-logo-duo-tal-revivo.png"/>
        <img height = "40" src="https://img.icons8.com/color/48/000000/figma--v1.png"/>
    </code> <br>
    </div>

</details>

<details open> 
    <summary><b> Install and Set-up </b></summary> <a name="installAndSetup"></a>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Mauris ultrices eros in cursus turpis massa. Porttitor massa id neque aliquam vestibulum morbi blandit. Amet tellus cras adipiscing enim. Eu volutpat odio facilisis mauris sit amet.

</details>

<details open> 
    <summary><b> Using FlowState Features </b></summary> <a name="usingFlowState"></a>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Mauris ultrices eros in cursus turpis massa. Porttitor massa id neque aliquam vestibulum morbi blandit. Amet tellus cras adipiscing enim. Eu volutpat odio facilisis mauris sit amet.

</details>

<!-- ## Credits (Contributors) <a name = "credits"></a>
Give credits to the team here, we can make list if needed -->

<details open> 
    <summary><b> License </b></summary> <a name="license"></a>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra adipiscing at in tellus integer feugiat scelerisque varius. Mauris ultrices eros in cursus turpis massa. Porttitor massa id neque aliquam vestibulum morbi blandit. Amet tellus cras adipiscing enim. Eu volutpat odio facilisis mauris sit amet.

</details>

<details open> 
    <summary><b> The Team </b></summary> <a name="contacts"></a>

- [Mark Alexander](https://github.com/MarkA772)
- [Saif Beiruty](https://github.com/saifbeiruty)
- [Laurance Diarra](https://github.com/ld17282)
- [Mike Oakes](https://github.com/MOakes7)
- [Sabre Nguyen](https://github.com/klsabren)

</details>
