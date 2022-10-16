import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from './Logo.jsx';
import GraphIcon from './GraphIcon.jsx'
import { yellow } from '@mui/material/colors';
import './App.scss';
import HorizontalFlow from './ReactFlowTest.jsx';
import AnalyticsTile from './AnalyticsTile.jsx';
import socketIO from 'socket.io-client';
import LossPlot from './LossPlot.jsx';
import LossBar from './LossBar.jsx';
import LossAnalytics from './lossAnalytics.jsx';
import { createTheme } from '@mui/material/styles';
import WeightAnalytics from './weightAnalytics.jsx';
import ExportButton from './ExportButton.jsx';
import BiasAnalytics from './BiasAnalytics.jsx';
import OptimizerAnalytics from './OptimizerAnalytics.jsx';

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

const socket = socketIO.connect('http://localhost:3333');

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function clickEvent() {
  socket.emit("onClick");
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        sx={{ width: '5%', float: 'left'}}
      >
        <Tab className='tabIcon' icon={<Logo />} style={{ textAlign:'center'}} {...a11yProps(0)} onClick={clickEvent}/>
        <Tab className='tabIcon' icon={<GraphIcon />} style={{ textAlign:'center' }} {...a11yProps(1)} onClick={clickEvent}/>
      </Tabs>
      <TabPanel value={value} index={0} style={{backgroundColor: '#FAFBFF',width:'95%',float: 'right',borderRadius: '0px 30px 30px 0px'}}>
          <div className='analytics-header' style={{ width: "100%", height: "10%", float: "right" }}> 
          <p>Welcome,</p>
          <h2>Model Architecture</h2>
        </div>
        <div className='analytics-architecture' style={{ width: "100%", height: "40%", float: "right" }}>
          <div className="react-flow-rectangle">
            <HorizontalFlow socket={socket} />
          </div>
        </div>
        <div className='analytics-overview-header' style={{ width: "100%", height: "6%", float: "right" }}>
          <h2>At A Glance</h2>
        </div>
        <div className='analytics-tiles'>
              <LossAnalytics className='tile' socket={socket} />
              <BiasAnalytics className='tile' socket={socket} />
              <WeightAnalytics className='tile' socket={socket} />
              <OptimizerAnalytics className='tile' socket={socket} />
              <AnalyticsTile className='tile' info={
                {
                  type:'Activation',
                  value: 'Tahn',
                  description: ' decides whether or not a neuron should be activated. ',
                  color: '#FF00B8',
                  boldName: 'Activation'}}/>
          </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: '#FAFBFF',width:'95%',float: 'right',borderRadius: '0px 30px 30px 0px' }}>
         <LossPlot socket={socket} />
         <ExportButton />
      </TabPanel>
    </Box>
  );
}
