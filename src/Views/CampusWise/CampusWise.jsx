import axios from "axios";
import React, { useEffect, useState } from "react";
import ODoughnutChart from "../Overall/charts/ODoughnut";
import OVerticalBarChart from "../Overall/charts/OVerticalBarChart";
import _ from "lodash";
import PropTypes from "prop-types";
import { unstable_batchedUpdates } from "react-dom";
import objRef from "./APIKeys.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./CampusWise.styles.scss";
const CampusNames = {
  vskp: "Visakhapatnam",
  hyd: "Hyderabad",
  blr: "Bengaluru",
};

function CampusWise() {
  const [campusData, setCampusData] = useState({});
  const [instData, setInstData] = useState([]);
  const [instList, setInstList] = useState([]);
  const [campusList, setCampusList] = useState([]);
  const [campusName, setCampusName] = useState("");
  const [showD2, setShowD2] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const VChartColors = [
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

  const replaceUnderscoreWithSpace = (anArray) => {
    let newArr = [];
    anArray.forEach((label) => {
      let newLabel = label.replace("total_", "");
      newLabel = newLabel.replace(/_/g, " ");
      newArr.push(newLabel);
    });
    return newArr;
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

  const chartOptions = {
    Doughnut: {
      onClick: function (evt, item) {
        if (item[0]) {
          // console.log('ask data for',campusList[item[0].index])
          getData(campusList[item[0].index][0]);
        }
      },
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
    Doughnut2: {
      onClick: function (evt, item) {
        if (item[0]) {
          getDataInst(instList[item[0].index]);
        }
      },
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
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

  // data for the initial University campus wise doughnut
  var dataDoughnut = {
    labels: campusList.map((item) => CampusNames[item[0]]),
    datasets: [
      {
        label: "Number of Institute",
        data: campusList.map((item) => item[1]),
        backgroundColor: [
          "#fd7f6f",
          "#7eb0d5",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ],
        borderColor: [
          "#fd7f6f",
          "#7eb0d5",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ],
        borderWidth: 2,
      },
    ],
  };

  //  data for the Institutions in campus doughnut
  if (showD2) {
    var dataDoughnut2 = {
      labels: instList.map((item) => item.toUpperCase()),
      datasets: [
        {
          label: `Institutes in Campus`,
          data: instList.map((item) => 1),
          backgroundColor: [
            "#fd7f6f",
            "#7eb0d5",
            "#b2e061",
            "#bd7ebe",
            "#ffb55a",
            "#ffee65",
            "#beb9db",
            "#fdcce5",
            "#8bd3c7",
          ],
          borderColor: [
            "#fd7f6f",
            "#7eb0d5",
            "#b2e061",
            "#bd7ebe",
            "#ffb55a",
            "#ffee65",
            "#beb9db",
            "#fdcce5",
            "#8bd3c7",
          ],
          borderWidth: 2,
        },
      ],
    };
  }

  if (showCharts) {
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
          instData.data[0][category],
          instData.data[1][category],
          category
        );
        arr = combinedObj.values;
      } else {
        var data;
        switch (graduate) {
          case "UG":
            data = instData.data[0][category];
            break;
          default:
            data = instData.data[1][category];
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
            "#D52DB7",
            "#FFAB05",
            "#FF2E7E",
            "#FF6B45",
            "#6050DC",
            "rgba(255, 159, 64, 1)",
          ],
          borderColor: VChartColors,
          borderWidth: 2,
        },
      ];
      return dataObj;
    };

    var DoughnutUGSD = {
      labels: replaceUnderscoreWithSpace(objRef["student_details"]),
      datasets: getDataForDC(
        "UG",
        objRef["student_details"],
        "student_details"
      ),
    };
    var DoughnutPGSD = {
      labels: replaceUnderscoreWithSpace(objRef["student_details"]),
      datasets: getDataForDC(
        "PG",
        objRef["student_details"],
        "student_details"
      ),
    };
    var DoughnutUGPGSD = {
      labels: replaceUnderscoreWithSpace(objRef["student_details"]),
      datasets: getDataForDC(
        "UGPG",
        objRef["student_details"],
        "student_details"
      ),
    };

    var DoughnutUGPD = {
      labels: replaceUnderscoreWithSpace(objRef["placement_details"]),
      datasets: getDataForDC(
        "UG",
        objRef["placement_details"],
        "placement_details"
      ),
    };
    var DoughnutPGPD = {
      labels: replaceUnderscoreWithSpace(objRef["placement_details"]),
      datasets: getDataForDC(
        "PG",
        objRef["placement_details"],
        "placement_details"
      ),
    };
    var DoughnutUGPGPD = {
      labels: replaceUnderscoreWithSpace(objRef["placement_details"]),
      datasets: getDataForDC(
        "UGPG",
        objRef["placement_details"],
        "placement_details"
      ),
    };
    //  -------------------DC --------------------------

    //  ----------------------------------------------------------VC ----------
    const getDataForVC = (graduate, keys, category) => {
      var arr = [];
      if (graduate == "UGPG") {
        const combinedObj = combineArrays(
          keys,
          instData.data[0][category],
          instData.data[1][category],
          category
        );
        arr = combinedObj.values;
      } else {
        var data;
        switch (graduate) {
          case "UG":
            data = instData.data[0][category];
            break;
          default:
            data = instData.data[1][category];
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
          backgroundColor: VChartColors[1],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 2,
        },
      ];
      return dataObj;
    };
    var VerticalBarChartUG = {
      labels: replaceUnderscoreWithSpace(objRef["salary"]),
      datasets: getDataForVC("UG", objRef["salary"], "salary"),
    };
    var VerticalBarChartPG = {
      labels: replaceUnderscoreWithSpace(objRef["salary"]),
      datasets: getDataForVC("PG", objRef["salary"], "salary"),
    };
    var VerticalBarChartUGPG = {
      labels: replaceUnderscoreWithSpace(objRef["salary"]),
      datasets: getDataForVC("UGPG", objRef["salary"], "salary"),
    };
    //  --------------------------------------/VC --------------------
  }

  const getDataInst = (instName) => {
    axios
      .get(`https://gcgc-dashboard.herokuapp.com/students/${instName}`)
      .then((resp) => {
        var arr = _.get(resp, ["data", "result"]);
        console.log({ name: instName, data: [...arr] });
        unstable_batchedUpdates(() => {
          setInstData({ name: instName, data: [...arr] });
          setShowCharts(true);
        });
      });
  };
  // getting the list of campuses in each
  const getData = (campusName) => {
    const arr = _.without(
      campusData.map((item) =>
        item.name === campusName ? item.institutes : null
      ),
      null
    );
    console.log("institutes for the campus", campusName, ...arr);
    unstable_batchedUpdates(() => {
      setCampusName(CampusNames[campusName]);
      setInstList(...arr);
      setShowD2(true);
    });
  };
  const getCampus = () => {
    axios
      .get("https://gcgc-dashboard.herokuapp.com/organization/campus/")
      .then((resp) => {
        var arr = _.get(resp, ["data", "result"]).map((item) => [
          item.name,
          item.inst_count,
        ]);
        // console.log(arr)
        unstable_batchedUpdates(() => {
          setCampusList(arr);
          setCampusData(_.get(resp, ["data", "result"]));
        });
      });
  };
  useEffect(() => {
    getCampus();
  }, []);
  return (
    <Box className="overall-layout">
      <Grid container spacing={2} className="firstItem">
        <Grid item xs={5}>
          <ODoughnutChart
            title={"Campus Wise Overview"}
            data={dataDoughnut}
            options={chartOptions.Doughnut}
          />
        </Grid>
        {showD2 ? (
          <Grid item xs={5}>
            <ODoughnutChart
              title={`${campusName} Institute Overview`}
              data={dataDoughnut2}
              options={chartOptions.Doughnut2}
            />
          </Grid>
        ) : null}
      </Grid>

      {showCharts ? (
        <Grid container spacing={5} className="secondSection">
          <h1 className="gradHeading">UG+PG</h1>
          <Grid container>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                title={`${instData.name.toUpperCase()} Student Details`}
                data={DoughnutUGPGSD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={3.5} className="shadow">
              <ODoughnutChart
                title={`${instData.name.toUpperCase()} Placement Details`}
                data={DoughnutUGPGPD}
                options={chartOptions.DoughnutUGPG}
              />
            </Grid>
            <Grid item xs={5} className="shadow">
              <OVerticalBarChart
                title={`${instData.name.toUpperCase()} Salary Details`}
                data={VerticalBarChartUGPG}
                options={chartOptions.VerticalBarChart1}
              />
            </Grid>
          </Grid>
        
          <h1 className="gradHeading">UG</h1>
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
          </Grid>
         
          <h1 className="gradHeading">PG</h1>
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
          </Grid>
        </Grid>
      ) : null}

      <h1>The End</h1>

      {showCharts ? (
        <div>
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
                {/* <Tab label="UG + PG Data" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="row2">
                <div>
                  <ODoughnutChart
                    title={`${instData.name.toUpperCase()} Student Details`}
                    data={DoughnutUGPGSD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </div>
                <div>
                  <ODoughnutChart
                    title={`${instData.name.toUpperCase()} Placement Details`}
                    data={DoughnutUGPGPD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </div>
                <div className="overall_charts" id="c4">
                  <OVerticalBarChart
                    title={`${instData.name.toUpperCase()} Salary Details`}
                    data={VerticalBarChartUGPG}
                    options={chartOptions.VerticalBarChart1}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className="row2">
                <div>
                  <ODoughnutChart
                    title={`${instData.name.toUpperCase()} Student Details`}
                    data={DoughnutUGSD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </div>
                <div>
                  <ODoughnutChart
                    title={`${instData.name.toUpperCase()} Placement Details`}
                    data={DoughnutUGPD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </div>
                <div className="overall_charts" id="c4">
                  <OVerticalBarChart
                    title={`${instData.name.toUpperCase()} Salary Details`}
                    data={VerticalBarChartUG}
                    options={chartOptions.VerticalBarChart1}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="row2">
                <div>
                  <ODoughnutChart
                    title={`${instData.name.toUpperCase()} Student Details`}
                    data={DoughnutPGSD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </div>
                <div>
                  <ODoughnutChart
                    title={`${instData.name.toUpperCase()} Placement Details`}
                    data={DoughnutPGPD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </div>
                <div className="overall_charts" id="c4">
                  <OVerticalBarChart
                    title={`${instData.name.toUpperCase()} Salary Details`}
                    data={VerticalBarChartPG}
                    options={chartOptions.VerticalBarChart1}
                  />
                </div>
              </div>
            </TabPanel>
          </Box>
        </div>
      ) : null}
    </Box>
  );
}

export default CampusWise;
