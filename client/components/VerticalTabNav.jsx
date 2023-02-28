import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Logo from './Logo.jsx';
import GraphIcon from './GraphIcon.jsx';
import NeuralNetwork from './ReactFlowNeuralNetwork.jsx';
import socketIO from 'socket.io-client';
import LossPlot from './LossPlot.jsx';
import LossAnalytics from './LossAnalytics.jsx';
import { createTheme } from '@mui/material/styles';
import WeightAnalytics from './WeightAnalytics.jsx';
import ExportButton from './ExportButton.jsx';
import BiasAnalytics from './BiasAnalytics.jsx';
import OptimizerAnalytics from './OptimizerAnalytics.jsx';

// connection to socket.io server on FlowSpace's backend 
const socket = socketIO.connect('http://localhost:3333');

// override MUI default theme to match FlowSpace UI
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

// event handler to emit socket information on click 
function clickEvent() {
  socket.emit("onClick");
}

// fuctional component to place the content of the respective tab
function TabPanel(props) {
  /* Default props 
    * @props children (node): component similar to the table row.
    * @props value (Object): The current panel, for toggling hidden/not hidden
    * @props index (number): The number of the panel order from 0+ 
   */
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {/* conditionally render panel only when it's index is strictly equal to value  */}
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

// set the typing and requirements for the props passed to TabPanel components
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// function to toggle the component's id attribute based on the index of the tab panel 
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// functional vertical tab component
export default function VerticalTabs() {
  // hook to set the value variable 
  const [value, setValue] = useState(0);

  // event handler to update value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // lifecylce method to syncronize component 
  useEffect(() => clickEvent(), []);

  return (
    <Box
      className='BOX'
      sx={{
        bgcolor: 'background.paper', 
        display: 'flex',
        height: '100%',
        width: '100%',
        borderRadius: '30px',
        boxShadow: '0 10px 20px rgb(179, 197, 234, .75)' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        indicatorColor={theme.palette.primary.main}
        sx={{ minWidth: '60px', maxWidth: '60px', float: 'left'}}
      >
        <Tab className='tabIcon' icon={<Logo />} style={{ textAlign:'center'}} {...a11yProps(0)} onClick={clickEvent}/>
        <Tab className='tabIcon' icon={<GraphIcon />} style={{ textAlign:'center' }} {...a11yProps(1)} onClick={clickEvent}/>
        <ExportButton className='tabIcon' />
      </Tabs>
      <TabPanel value={value} index={0} style={{ backgroundColor: '#FAFBFF',width:'95%',float: 'right',borderRadius: '0px 30px 30px 0px'}}>
          <div className='analytics-header' style={{ width: "100%", height: "7%", float: "right" }}> 
          <p>Welcome,</p>
          <h2>Model Architecture</h2>
        </div>
        <div className='analytics-architecture' style={{ width: "100%", height: "40%", float: "right" }}>
          <div className="react-flow-rectangle">
            <NeuralNetwork socket={socket} />
          </div>
        </div>
        <div id='front-overview-header' className='analytics-overview-header' style={{ width: "100%", height: "6%", float: "right" }}>
          <h2>At A Glance</h2>
        </div>
        <div className='analytics-tiles'>
              <LossAnalytics className='tile' socket={socket} />
              <BiasAnalytics className='tile' socket={socket} />
              <WeightAnalytics className='tile' socket={socket} />
              <OptimizerAnalytics className='tile' socket={socket} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: '#FAFBFF',width:'95%',float: 'right',borderRadius: '0px 30px 30px 0px' }}>
        <div className='graphPanelWrapper'>
          <LossPlot socket={socket} />
          <div id='graph-overview-header' className='analytics-overview-header' style={{ width: "100%", height: "6%", float: "right"}}>
            <h2>At A Glance</h2>
          </div>
          <div id='graph-tiles' className='analytics-tiles'>
                <LossAnalytics className='tile' socket={socket} />
                <BiasAnalytics className='tile' socket={socket} />
                <WeightAnalytics className='tile' socket={socket} />
                <OptimizerAnalytics className='tile' socket={socket} />
            </div>
        </div>
      </TabPanel>
    </Box>
  );
}
