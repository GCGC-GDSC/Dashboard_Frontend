import React, { useState} from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overall from '../../Views/Overall/Overall';
import CampusWise from '../../Views/CampusWise/CampusWise';
import GBStats from "../../Views/GBStats/GBStats"
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const [year,setYear] = useState(2022);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label ="Overall" {...a11yProps(0)} />
            <Tab label="Campus-Wise" {...a11yProps(1)} />
            <Tab label="GB statistics" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Overall year={year} setYear={setYear}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
         <CampusWise year={year} setYear={setYear}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
         <GBStats year={year} setYear={setYear}/>
        </TabPanel>
      </Box>
    );
  }