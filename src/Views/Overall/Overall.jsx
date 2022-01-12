import React, { useEffect, useState } from "react";
import ODoughnutChart from "./charts/ODoughnut";
import axios from "axios";
import OVerticalBarChart from "./charts/OVerticalBarChart";
import "./Overall.styles.scss";
import OverallFetcher from "./OverallFetcher.component";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
var _ = require("lodash");
function Overall() {
  let arr1 = [
    "#115f9a",
    "#1984c5",
    "#22a7f0",
    "#48b5c4",
    "#76c68f",
    "#a6d75b",
    "#c9e52f",
    "#d0ee11",
    "#d0f400",
  ];
  let arr2 = ["#F66D44", "#FEAE65", "#E6F69D", "#AADEA7", "#64C2A6", "#2D87BB"];

  const hostname = "https://gcgc-dashboard.herokuapp.com";
  const [stream, setStream] = useState("");
  const [streamData, setStreamData] = useState({});
  const streamsList = [
    "engineering",
    "management",
    "sciences",
    "pharmacy",
    "statistics",
  ];

  const parseData = () => {};
  const chartOptions = {
    Doughnut: {
      onClick: function (evt, item) {
        if (item[0]) {
          setStream(streamsList[item[0].index]);
        }
      },
      rotation: Math.PI * 0.5,
    },
    VerticalBarChart1: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
    },
    VerticalBarChart2: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
    },
    VerticalBarChart3: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
    },
  };
  const chartData = {
    Doughnut: {
      labels: streamsList,
      datasets: [
        {
          label: "Number of Students",
          data: [100, 230, 234, 454, 234, 232],
          backgroundColor: arr2,
          borderColor: arr2,
          borderWidth: 2,
        },
      ],
    },
    VerticalBarChart1: {
      labels: ["Eligible for Placements", "Backlogs", "Higher Studies"], // Object.getKeys(result)
      datasets: [
        {
          label: "GIT",
          data: [102, 103, 105], // fetchData(stream,git)
          backgroundColor: ["#F66D44"],
          borderColor: ["#F66D44"],
          borderWidth: 2,
        },
        {
          label: "SoTH",
          data: [232, 403, 105], // fetchData(stream,SoTH)
          backgroundColor: ["#FEAE65"],
          borderColor: ["#FEAE65"],
          borderWidth: 2,
        },
        {
          label: "SoTB",
          data: [302, 403, 205], // fetchData(stream,SoTB)
          backgroundColor: ["#E6F69D"],
          borderColor: ["#E6F69D"],
          borderWidth: 2,
        },
      ],
    },
    VerticalBarChart2: {
      labels: [
        "Eligible for Placements",
        "Total Offers",
        "Multiple Offers",
        "Placed(Single Offer)",
        "Yet to be placed",
      ], // Object.getKeys(result)
      datasets: [
        {
          label: "GIT",
          data: [102, 103, 105, 244, 342], // fetchData(stream,git)
          backgroundColor: ["#6050DC"],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 2,
        },
        {
          label: "SoTH",
          data: [232, 403, 105, 321, 465], // fetchData(stream,SoTH)
          backgroundColor: ["#FF2E7E"],
          borderColor: ["#6050DC"],
          borderWidth: 2,
        },
        {
          label: "SoTB",
          data: [302, 403, 205, 645, 323], // fetchData(stream,SoTB)
          backgroundColor: ["#FFAB05"],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 2,
        },
      ],
    },
    VerticalBarChart3: {
      labels: ["Highest", "Lowest", "Average"], // Object.getKeys(result)
      datasets: [
        {
          label: "GIT",
          data: [32, 2, 12], // fetchData(stream,git)
          backgroundColor: ["#6050DC"],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 2,
        },
        {
          label: "SoTH",
          data: [23, 3, 15], // fetchData(stream,SoTH)
          backgroundColor: ["#FF2E7E"],
          borderColor: ["#6050DC"],
          borderWidth: 2,
        },
        {
          label: "SoTB",
          data: [14, 4, 5], // fetchData(stream,SoTB)
          backgroundColor: ["#FFAB05"],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 2,
        },
      ],
    },
  };
  const getData = (stream) => {
    if (stream.length > 0) {
      axios.get(`${hostname}/students/overall/${stream}/`).then((resp) => {
        var responseData = _.get(resp, ["data", "result"]);
        // console.log(responseData)
        setStreamData(responseData);
      });
    }
  };
  return (
    <Box p={7}>
      <h2>Overall University Statistics</h2>
      {/* <section className='overall-layout'>
                <div className="chartsContainer">
                    <div className='row1'>
                        <div className='overall_charts' id='c1'>
                            <ODoughnutChart data={chartData.Doughnut} options={chartOptions.Doughnut}/> 
                        </div>
                        <div className="overall_charts" id="c2">
                            <h2>{stream}</h2>
                            <OVerticalBarChart data={chartData.VerticalBarChart1} options={chartOptions.VerticalBarChart1}/>
                        </div>
                    </div>
                    <div className='row2'>
                        <div className="overall_charts" id="c3">
                            <h2>{stream}</h2>
                            <OVerticalBarChart data={chartData.VerticalBarChart2} options={chartOptions.VerticalBarChart2}/>
                        </div>
                        <div className="overall_charts" id="c4">
                            <h2>{stream}</h2>
                            <OVerticalBarChart data={chartData.VerticalBarChart3} options={chartOptions.VerticalBarChart3}/>
                        </div>
                    </div>
                </div>
            </section> */}

      <Grid container spacing={10} p={5}>
        <Grid item xs={5}>
        <ODoughnutChart data={chartData.Doughnut} options={chartOptions.Doughnut}/>
        </Grid>
        <Grid item xs={7} mt={10}>
        <OVerticalBarChart data={chartData.VerticalBarChart1} options={chartOptions.VerticalBarChart1}/>
        </Grid>
        <Grid item xs={6}>
        <OVerticalBarChart data={chartData.VerticalBarChart3} options={chartOptions.VerticalBarChart3}/>
        </Grid>
        <Grid item xs={6}>
        <OVerticalBarChart data={chartData.VerticalBarChart2} options={chartOptions.VerticalBarChart2}/>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Overall;
