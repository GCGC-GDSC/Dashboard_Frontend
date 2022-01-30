import axios from "axios";
import React, { useEffect, useState } from "react";
import ODoughnutChart from "../Overall/charts/ODoughnut";
import OVerticalBarChart from "../Overall/charts/OVerticalBarChart";
import _ from "lodash";
import objRef,{parsedInstituteStudentDataFormatCampusWise} from "./APIKeys.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from "@mui/material/Typography";
import Table from "../../Components/Table/Table"

import "../CampusWise/CampusWise.styles.scss"
function GBStats() {
  const [statsData,setStatsData] =useState([])
  const chartOptions = {
    DoughnutUGPG: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
    },
    Doughnut4: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
    },
    VerticalBarChart1: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
    },
  };

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
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getStatsData = ()=>{
    axios.get("https://gcgc-dashboard.herokuapp.com/students/gbstats/")
    .then(resp=>{
      setStatsData(_.get(resp,["data",'result']))
    })
  }

  const combineArrays = (k, a1, a2, category) => {
    const arr = [];
    if (category === "salary") {
      for (let i = 0; i < k.length; i++) {
        arr.push(Math.max(a1[k[i]], a2[k[i]]));
      }
    } else {
      for (let i = 0; i < k.length; i++) {
        arr.push(a1[k[i]] + a2[k[i]]);
      }
    }
    return { keys: k, values: arr };
  };
  //  -------------------------------------------------DC ----------
  const getDataForDC = (graduate, keys, category) => {
    var arr = [];
    if (graduate == "UGPG") {
      const combinedObj = combineArrays(
        keys,
        statsData["UG"][category],
        statsData["PG"][category],
        category
      );
      arr = combinedObj.values;
    } else {
      var data;
      switch (graduate) {
        case "UG":
          data =statsData["UG"][category];
          break;
        default:
          data = statsData["PG"][category];
          break;
      }
      for (let i = 0; i < keys.length; i++) {
        arr.push(data[keys[i]]);
      }
    }
    const dataObj = [
      {
        label: "Salary in LPA",
        data: arr,
        backgroundColor: [
          "#fd7f6f",
          "#5ea1d2",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ]
        ,
        borderColor: [
          "#fd7f6f",
          "#5ea1d2",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ]
        ,
        borderWidth: 2,
      },
    ];
    return dataObj;
  };

    const getDataForVC = (graduate, keys, category) => {
      var arr = [];
      if (graduate == "UGPG") {
        const combinedObj = combineArrays(
          keys,
          statsData["PG"][category],
          statsData["UG"][category],
          category
        );
        arr = combinedObj.values;
      } else {
        var data;
        switch (graduate) {
          case "UG":
            data = statsData["UG"][category];
            break;
          default:
            data = statsData["PG"][category];
            break;
        }
        for (let i = 0; i < keys.length; i++) {
          arr.push(data[keys[i]]);
        }
      }
      const dataObj = [
        {
          label: "Salary in LPA",
          data: arr,
          backgroundColor: [
          "#fd7f6f",
          "#5ea1d2",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ]
          ,
          borderColor: [
          "#fd7f6f",
          "#5ea1d2",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ]
          ,
          borderWidth: 2,
        },
      ];
      return dataObj;
    };
    if(statsData && statsData["UG"])
   { var VerticalBarChartUG = {
      labels:parsedInstituteStudentDataFormatCampusWise["salary"],
      datasets: getDataForVC("UG", objRef["salary"], "salary"),
    };
    var DoughnutUGSD={ 
      labels:parsedInstituteStudentDataFormatCampusWise["student_details"],
        datasets: getDataForDC(
          "UG",
          objRef["student_details"],
          "student_details"
        ),
      };
      var DoughnutUGPD = {
        labels:parsedInstituteStudentDataFormatCampusWise["placement_details"],
        datasets: getDataForDC(
          "UG",
          objRef["placement_details"],
          "placement_details"
        ),
      };
    }
    if(statsData && statsData["PG"])
    { var VerticalBarChartPG = {
       labels:parsedInstituteStudentDataFormatCampusWise["salary"],
       datasets: getDataForVC("PG", objRef["salary"], "salary"),
     };
     var DoughnutPGSD={ 
       labels:parsedInstituteStudentDataFormatCampusWise["student_details"],
         datasets: getDataForDC(
           "PG",
           objRef["student_details"],
           "student_details"
         ),
       };
       var DoughnutPGPD = {
         labels:parsedInstituteStudentDataFormatCampusWise["placement_details"],
         datasets: getDataForDC(
           "PG",
           objRef["placement_details"],
           "placement_details"
         ),
       };
     }
     if(statsData && statsData["UG"] && statsData["PG"])
     { var VerticalBarChartUGPG = {
        labels:parsedInstituteStudentDataFormatCampusWise["salary"],
        datasets: getDataForVC("UGPG", objRef["salary"], "salary"),
      };
      var DoughnutUGPGSD={ 
        labels:parsedInstituteStudentDataFormatCampusWise["student_details"],
          datasets: getDataForDC(
            "UGPG",
            objRef["student_details"],
            "student_details"
          ),
        };
        var DoughnutUGPGPD = {
          labels:parsedInstituteStudentDataFormatCampusWise["placement_details"],
          datasets: getDataForDC(
            "UGPG",
            objRef["placement_details"],
            "placement_details"
          ),
        };
      }
       // Tables -------------------------------
 const TABLE_DATA = (code,gradType,category)=>{
  const getTableData = (code,category)=>{
    const keys = objRef[category]
    let arr = []
    if(code !== 10)
      {
        for(let i = 0;i < keys.length;i++){
          arr.push([statsData[gradType][category][keys[i]]])
          }
      }
    else{
      arr = combineArrays(keys,statsData["UG"][category],statsData["PG"][category],category).values
      arr = arr.map(item=>[item])
    }
    console.log(arr)
    return arr
  }

  const TableData ={
    column:[`${gradType} Data`],
    data :getTableData(code,category)
  }
  return TableData
}
  useEffect(()=>{
   getStatsData()
  },[])
  return(
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="UG + PG Data" {...a11yProps(0)} />
            <Tab label="UG Data" {...a11yProps(1)} />
            <Tab label="PG Data" {...a11yProps(2)} />
          </Tabs>
      </Box>
      <Grid container spacing={5} >
      <TabPanel value={value} index={0}>
          <h1 className="gradHeading">UG+PG</h1>
          {statsData && statsData["PG"] && statsData["UG"]?
          <Grid container>
            <Grid item xs={4} className="shadow">
              <ODoughnutChart
                title={`Student Details`}
                data={DoughnutUGPGSD}
                options={chartOptions.DoughnutUGPG}
              />
                <Table column={TABLE_DATA(10,"UGPG","student_details").column} 
                  data={TABLE_DATA(10,"UGPG","student_details").data} 
                  category={"Student Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["student_details"]}/>
            </Grid>
            <Grid item xs={4} className="shadow">
              <ODoughnutChart
                title={`Placement Details`}
                data={DoughnutUGPGPD}
                options={chartOptions.DoughnutUGPG}
              />
               <Table column={TABLE_DATA(10,"UGPG","placement_details").column} 
                  data={TABLE_DATA(10,"UGPG","placement_details").data} 
                  category={"Placement Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["placement_details"]}/>
            </Grid>
            <Grid item xs={4} className="shadow">
              <OVerticalBarChart
                title={`Salary Details`}
                data={VerticalBarChartUGPG}
                options={chartOptions.VerticalBarChart1}
              />
               <Table column={TABLE_DATA(10,"UGPG","salary").column} 
                  data={TABLE_DATA(10,"UGPG","salary").data} 
                  category={"Salary"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["salary"]}/>
            </Grid>
          </Grid>:null}
      </TabPanel>

      <TabPanel value={value} index={1}>
          <h1 className="gradHeading">Undergraduate</h1>
          {statsData && statsData["UG"]?
          <Grid container>
            <Grid item xs={4} className="shadow">
              <ODoughnutChart
                data={DoughnutUGSD}
                options={chartOptions.DoughnutUGPG}
              />
               <Table column={TABLE_DATA(0,"UG","student_details").column} 
                  data={TABLE_DATA(0,"UG","student_details").data} 
                  category={"Student Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["student_details"]}/>
            </Grid>
            <Grid item xs={4} className="shadow">
              <ODoughnutChart
                data={DoughnutUGPD}
                options={chartOptions.DoughnutUGPG}
              />
                <Table column={TABLE_DATA(0,"UG","placement_details").column} 
                  data={TABLE_DATA(0,"UG","placement_details").data} 
                  category={"Placement Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["placement_details"]}/>
            </Grid>
            <Grid item xs={4} className="shadow">
              <OVerticalBarChart
                data={VerticalBarChartUG}
                options={chartOptions.VerticalBarChart1}
              />
               <Table column={TABLE_DATA(0,"UG","salary").column} 
                  data={TABLE_DATA(0,"UG","salary").data} 
                  category={"Salary"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["salary"]}/>
          </Grid>
            </Grid>:null}
      </TabPanel>
      
      <TabPanel value={value} index={2}>   
          <h1 className="gradHeading">PostGraduate</h1>
          {statsData && statsData["PG"]?
          <Grid container>
            <Grid item xs={4} className="shadow">
              <ODoughnutChart
                data={DoughnutPGSD}
                options={chartOptions.DoughnutUGPG}
              />
              <Table column={TABLE_DATA(1,"PG","student_details").column} 
                data={TABLE_DATA(1,"PG","student_details").data} 
                category={"Student Details"} 
                keys={parsedInstituteStudentDataFormatCampusWise["student_details"]}/>
            </Grid>
            <Grid item xs={4} className="shadow">
              <ODoughnutChart
                data={DoughnutPGPD}
                options={chartOptions.DoughnutUGPG}
              />
               <Table column={TABLE_DATA(1,"PG","placement_details").column} 
                  data={TABLE_DATA(1,"PG","placement_details").data} 
                  category={"Placement Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["placement_details"]}/>
            </Grid>
            <Grid item xs={4} className="shadow">
              <OVerticalBarChart
                data={VerticalBarChartPG}
                options={chartOptions.VerticalBarChart1}
              />
               <Table column={TABLE_DATA(1,"PG","salary").column} 
                  data={TABLE_DATA(1,"PG","salary").data} 
                  category={"Salary"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["salary"]}/>
            </Grid>
          </Grid>:null}
          </TabPanel>

        </Grid>
    </Box>
  )
}

export default GBStats;
