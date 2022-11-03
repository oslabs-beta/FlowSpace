<!-- style -->
<!-- <style>
    b { font-size: 15px;
    font-weight: 700}
</style> -->

<!-- FlowSpace Readme -->
<h1 align="center">
<br/>
<img height= "200" src="https://raw.githubusercontent.com/oslabs-beta/FlowSpace/dev/client/assets/readme%20logo%20(2).png">

<h2 align= "center">

An all in one data visualization tool for [TensorFlow.js](https://www.tensorflow.org/js) developers

![GitHub top language](https://img.shields.io/github/languages/top/oslabs-beta/FlowSpace) &nbsp;
![GitHub package.json version](https://img.shields.io/github/package-json/v/oslabs-beta/flowspace) &nbsp;
![npm](https://img.shields.io/npm/v/flowspace.js) &nbsp;
![GitHub](https://img.shields.io/github/license/oslabs-beta/flowspace) &nbsp;
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/oslabs-beta/flowspace/dev) &nbsp;
![GitHub contributors](https://img.shields.io/github/contributors/oslabs-beta/flowspace) &nbsp;
![GitHub Repo stars](https://img.shields.io/github/stars/oslabs-beta/FlowSpace?style=social) &nbsp;

</h2>
</h1>

<!-- <details open>
    <summary><b>FlowSpace</b></summary>
    <ol>
        <li>
            <a href = "#problem"> Problem </a>
        </li>
        <li>
            <a href = "#solution"> Solution </a>
        </li>
    </ol>
</details> -->

<hr>
<h3> <b>About FlowSpace</b> </h3><br/>

<b> Problem </b><a name="problem"></a>

Despite the fact that machine learning plays a crucial part in advancing the tech industry, many developers view it as intimidating due to its complexity, which consequently discourages many developers from engaging with it. To address the problem, Google’s Brain Team developed TensorFlow.js in 2018 to help bring machine learning to JavaScript developers with little to no experience in machine learning. While TensorFlow.js is simplified, it lacks direct support for Tensorboard, the visualization tool for its counterpart, TensorFlow.

<b> Solution </b><a name="solution"></a>

<p>Our team’s core mission was to develop a real time model and data visualization tool for TensorFlow.js that requires minimal set-up by the developer while simultaneously providing them with all the necessary information required to fully comprehend their machine learning model. This allows the developer to make well informed decisions in regards to how they need to alter their model to improve accuracy while lowering the required number of epochs per training cycle.
This led the team to develop FlowSpace, a light-weight npm package that generates highly valuable data and intuitive visuals whilst remaining effortless to set-up.

FlowSpace is developed using agile methodology in collaboration with the tech accelerator OS Labs (opensourcelabs.io)</p>

</details>

---

<!--Table of Contents Here-->
<details open>
    <summary><b>Table of Contents</b></summary>
    <ol>
        <li>
            <a href = "#techStack"> Tech-Stack </a>
        </li>
        <li>
            <a href = "#installAndSetup"> Install and Set-up </a>
        </li> 
        <li>
            <a href = "#usingFlowSpace"> Using FlowSpace Features </a>
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
        <img height = "40" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-jest-can-collect-code-coverage-information-from-entire-projects-logo-shadow-tal-revivo.png"/>
    </code> <br>
    </div>

</details>

<details open> 
    <summary><b> Install and Set-up </b></summary> <a name="installAndSetup"></a>

<br/>

1. Install our npm package in your terminal.

```sh
npm install flowspace.js
```

2. Import HandShake class from the FlowSpace node_modules.

```sh
import { HandShake } from "flowspace";
```

3. Declare your variable for the TensorFlow createModel function.

```sh
const model = createModel();
```

4. Instantiate a new instance of the HandShake class, passing in your model object.

```sh
const visualizer = new HandShake(model);
```

5. Ensure when training the model, pass the lossCallback method from the HandShake instance into the fit method.

```sh
    ## Example below ##

    model.fit(trainingFeatureTensor, trainingLabelTensor, {
		epochs: 20,
		callbacks: {
			onEpochEnd: visualizer.lossCallback
		},
	});
```

6. When ready, simply run the FlowSpace functionality in your terminal.

```sh
npx flowspace
```

</details>

<details open> 
    <summary><b> Using FlowSpace Features </b></summary> <a name="usingFlowSpace"></a><br/>

<div align=center>
    <img style="width:35.4347%; height:auto" src="https://github.com/oslabs-beta/FlowSpace/raw/npmPackage/client/assets/graphing_panel.gif"/>
    <img style="width:35.4347%; height:auto" src="https://github.com/oslabs-beta/FlowSpace/raw/npmPackage/client/assets/model_architecture.gif"/>
<div>
</details>

<!-- ## Credits (Contributors) <a name = "credits"></a>
Give credits to the team here, we can make list if needed -->

<details open> 
    <summary><b> License </b></summary> <a name="license"></a>

MIT License

Copyright (c) 2022 OSLabs Beta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

</details>

<details open> 
    <summary><b> The Team </b></summary> <a name="contacts"></a>

- [Mark Alexander](https://github.com/MarkA772)
- [Saif Beiruty](https://github.com/saifbeiruty)
- [Laurence Diarra](https://github.com/ld17282)
- [Mike Oakes](https://github.com/MOakes7)
- [Sabre Nguyen](https://github.com/klsabren)

</details>
