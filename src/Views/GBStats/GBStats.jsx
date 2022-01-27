import axios from "axios";
import React, { useEffect, useState } from "react";
import ODoughnutChart from "../Overall/charts/ODoughnut";
import OVerticalBarChart from "../Overall/charts/OVerticalBarChart";
import _ from "lodash";
import objRef,{parsedInstituteStudentDataFormatCampusWise} from "./APIKeys.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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



  useEffect(()=>{
   getStatsData()
  },[])
  return(
    <Box p={5} className='overall_box'>
      <Grid container spacing={5} >
          <h1 className="gradHeading">UG+PG</h1>
          {statsData && statsData["PG"] && statsData["UG"]?
          <Grid container>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                title={`Student Details`}
                data={DoughnutUGPGSD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                title={`Placement Details`}
                data={DoughnutUGPGPD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={5} className="shadow">
              <OVerticalBarChart
                title={`Salary Details`}
                data={VerticalBarChartUGPG}
                options={chartOptions.VerticalBarChart1}
              />
            </Grid>
          </Grid>:null}
        
          <h1 className="gradHeading">Undergraduate</h1>
          {statsData && statsData["UG"]?
          <Grid container>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                data={DoughnutUGSD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                data={DoughnutUGPD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={5} className="shadow">
              <OVerticalBarChart
                data={VerticalBarChartUG}
                options={chartOptions.VerticalBarChart1}
              />
          </Grid>
            </Grid>:null}
         
          <h1 className="gradHeading">PostGraduate</h1>
          {statsData && statsData["PG"]?
          <Grid container>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                data={DoughnutPGSD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                data={DoughnutPGPD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={5} className="shadow">
              <OVerticalBarChart
                data={VerticalBarChartPG}
                options={chartOptions.VerticalBarChart1}
              />
            </Grid>
          </Grid>:null}
        </Grid>
    </Box>
  )
}

export default GBStats;
