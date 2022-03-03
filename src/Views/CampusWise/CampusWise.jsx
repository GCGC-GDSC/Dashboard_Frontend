import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ODoughnutChart from "../Overall/charts/ODoughnut";
import OVerticalBarChart from "../Overall/charts/OVerticalBarChart";
import _ from "lodash";
import PropTypes from "prop-types";
import { unstable_batchedUpdates } from "react-dom";
import objRef,{parsedInstituteStudentDataFormatCampusWise} from "./APIKeys.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';
import "./CampusWise.styles.scss";
import {colors} from "../ColorAssets/colorPallet.js";
import Table from "../../Components/Table/Table"
import SnackbarContent from '@mui/material/SnackbarContent';
import { UserContext } from '../../context/context';
import {instMap} from "../../Pages/Admin/StudentDetailsFormObj"

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
const CampusNames = {
  vskp: "Visakhapatnam",
  hyd: "Hyderabad",
  blr: "Bengaluru",
};

function CampusWise() {
  const user = useContext(UserContext)
  const [userMultiAccess,setUserMultiAccess] = useState(false)
  const [campusData, setCampusData] = useState({});
  const [instData, setInstData] = useState([]);
  const [instList, setInstList] = useState([]);
  const [campusList, setCampusList] = useState([]);
  const [campusName, setCampusName] = useState("");
  const [showD2, setShowD2] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
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
          const itemIndex = item[0].index
          if(userMultiAccess || campusList[itemIndex][0] === user.user.campus[0].name )
              getData(campusList[itemIndex][0]);
          else{
            setOpen(true)
          }
        }
      },
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "left",
        },
      },
    },
    Doughnut2: {
      onClick: function (evt, item) {
        if (item[0]) {
          // window.alert("you have clicked :",instList[item[0].index])
          getDataInst(instList[item[0].index]);
        }
      },
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
    DoughnutUGPG: {
      onClick: function (evt, item) {
        if (item[0]) {
        }
      },
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "left",
        },
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
    DoughnutUG:{
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "left",
        },
      },
    },
    DoughnutPG:{
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "left",
        },
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
        backgroundColor:colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  //  data for the Institutions in campus doughnut
  if (showD2) {
    var dataDoughnut2 = {
      labels: instList.map((item) => instMap[item]),
      datasets: [
        {
          label: `Institutes in Campus`,
          data: instList.map((item) => 1),
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 2,
        },
      ],
    };
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
    if (graduate === "UGPG") {
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
        backgroundColor: colors,
        borderColor:colors
        ,
        borderWidth: 2,
      },
    ];
    return dataObj;
  };
  
  if (showCharts) {

    // ----------------------------DC----
    var DoughnutUGSD={ 
    labels:parsedInstituteStudentDataFormatCampusWise["student_details"],
      datasets: getDataForDC(
        "UG",
        objRef["student_details"],
        "student_details"
      ),
    };
    var DoughnutPGSD = {
      labels:parsedInstituteStudentDataFormatCampusWise["student_details"],
      datasets: getDataForDC(
        "PG",
        objRef["student_details"],
        "student_details"
      ),
    };
    var DoughnutUGPGSD = {
      labels:parsedInstituteStudentDataFormatCampusWise["student_details"],
      datasets: getDataForDC(
        "UGPG",
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
    var DoughnutPGPD = {
      labels:parsedInstituteStudentDataFormatCampusWise["placement_details"],
      datasets: getDataForDC(
        "PG",
        objRef["placement_details"],
        "placement_details"
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
    //  -------------------DC --------------------------

    //  ---------------VC-------------------------------------------VC ----------
    const getDataForVC = (graduate, keys, category) => {
      var arr = [];
      if (graduate === "UGPG") {
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
          backgroundColor: colors
          ,
          borderColor: colors
          ,
          borderWidth: 2,
        },
      ];
      return dataObj;
    };
    var VerticalBarChartUG = {
      labels:parsedInstituteStudentDataFormatCampusWise["salary"],
      datasets: getDataForVC("UG", objRef["salary"], "salary"),
    };
    var VerticalBarChartPG = {
      labels:parsedInstituteStudentDataFormatCampusWise["salary"],
      datasets: getDataForVC("PG", objRef["salary"], "salary"),
    };
    var VerticalBarChartUGPG = {
      labels:parsedInstituteStudentDataFormatCampusWise["salary"],
      datasets: getDataForVC("UGPG", objRef["salary"], "salary"),
    };
    //  --------------------------------------/VC --------------------
   
  }
 // Tables -------------------------------
 const TABLE_DATA = (code,gradType,category)=>{
  const getTableData = (code,category)=>{
    const keys = objRef[category]
    let arr = []
    if(code !== 10)
      {
        for(let i = 0;i < keys.length;i++){
          arr.push([instData.data[code][category][keys[i]]])
          }
      }
    else{
      arr = combineArrays(keys,instData.data[0][category],instData.data[1][category],category).values
      arr = arr.map(item=>[item])
    }
    return arr
  }

  const TableData ={
    column:[instMap[instData.name]],
    data :getTableData(code,category)
  }
  return TableData
}
//  -------------- TABLES----------------
  const getDataInst = (instName) => {
    axios
      .get(`${REACT_APP_API_URL}students/inst/${instName}`,{
        headers: {
          'Authorization': `Token ${user.user.token.key}`
        }
      })
      .then((resp) => {
        var arr = _.get(resp, ["data", "result"]);
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
    unstable_batchedUpdates(() => {
      setCampusName(CampusNames[campusName]);
      setInstList(...arr);
      setShowD2(true);
    });
  };
  
  

  useEffect(() => {
    const getCampus = () => {
      axios
        .get(`${REACT_APP_API_URL}organization/campus/`,{
          headers: {
            'Authorization': `Token ${user.user.token.key}`
          }
        })
        .then((resp) => {
          var arr = _.get(resp, ["data", "result"]).map((item) => [
            item.name,
            item.inst_count,
          ]);
          unstable_batchedUpdates(() => {
            setCampusList(arr);
            setCampusData(_.get(resp, ["data", "result"]));
          });
        });
    };
    const checkMultiUser = () =>{
      if(user.user.campus.length>1)
        setUserMultiAccess(true)
    }
    checkMultiUser()
    getCampus();
    // getData(user.user.campus.name)
  }, [user]);
  return (
    <>
     <Snackbar
        anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        autoHideDuration={3000}
        open={open}
        onClose={handleClose}
        message={`Sorry! You do not have access`}
    >
        <SnackbarContent style={{
            backgroundColor:'orange',
          }}
          message={`Sorry! You do not have access`}
        />
      </Snackbar>
    <Box className="overall-layout">
      <Grid container spacing={2} className="firstContainer" alignItems="center" >
      {/* {userMultiAccess? */}
        <Grid item xs={5.7} style={{marginTop:"-80px"}}>
          <ODoughnutChart
            title={"Campus Wise Overview"}
            data={dataDoughnut}
            options={chartOptions.Doughnut}
          />
        </Grid>
      {showD2? (
        <>
          <Grid item xs={5.5} p={3} ml={5}  style={{marginTop:"-60px"}}>
          <div className="headings campusWiseSecondDoughnutChart" id={`stream`} >
                <div className="sub">
          {`${campusName} Institute Overview`}
                </div>
                </div>
            <ODoughnutChart
              // title={`${campusName} Institute Overview`}
              data={dataDoughnut2}
              options={chartOptions.Doughnut2}
            />
          </Grid>
          </>
        ) : null}
        
      </Grid>
    </Box>
      {showCharts ? (
        <div>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }} mt={5}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            centered
                aria-label="basic tabs example"
              >
                <Tab label="UG and PG" {...a11yProps(0)} />
                <Tab label="UnderGraduate" {...a11yProps(1)} />
                <Tab label="PostGraduate" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <Grid container className="firstItem" alignItems="center">
            <TabPanel value={value} index={0} style={{width:"100%"}}>
              
              <Grid container spacing={9} alignItems="center" justifyContent="space-around" mt={2} >
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${campusName}`} 
                </div>
                </div>
                <div className="headings" id={`stream`}  style={{marginTop:"20px",marginBottom:"-100px"}}>
                  <div className="sub">
                  {`${instMap[instData.name]} Student Details`}
                  </div>
                </div>
                <Grid item xs={6} >
                  <ODoughnutChart
                  isCampus={true}
                    // title={`${instData.name} Student Details`}
                    data={DoughnutUGPGSD}
                    options={chartOptions.DoughnutUGPG}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Table column={TABLE_DATA(10,"UGPG","student_details").column} 
                  data={TABLE_DATA(10,"UGPG","student_details").data} 
                  category={"Student Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["student_details"]}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center"  justifyContent="space-around" px={7}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Placement Details`}

                </div>
                </div>
              <Grid item xs={5} >
                
                <ODoughnutChart
                isCampus={true}
                  // title={`${instData.name} Placement Details`}
                  data={DoughnutUGPGPD}
                  options={chartOptions.DoughnutUGPG}
                />
              </Grid>
              <Grid item xs={5} ml={15}>
                  <Table column={TABLE_DATA(10,"UGPG","placement_details").column} 
                  data={TABLE_DATA(10,"UGPG","placement_details").data} 
                  category={"Placement Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["placement_details"]}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center"  justifyContent="space-around" px={7}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Package Details`}
                </div>
                </div>
                <Grid item xs={5} >
                  <OVerticalBarChart
                  isCampus={true}
                    // title={`${instData.name} Package Details`}
                    data={VerticalBarChartUGPG}
                    options={chartOptions.VerticalBarChart1}
                  />
                </Grid>
                <Grid item xs={5} ml={15}>
                  <Table column={TABLE_DATA(10,"UGPG","salary").column} 
                  data={TABLE_DATA(10,"UGPG","salary").data} 
                  category={"Package(LPA)"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["salary"]}/>
                </Grid>
              </Grid>
            </TabPanel>


            <TabPanel value={value} index={1} style={{width:"100%"}}>
            <Grid container spacing={9} alignItems="center" justifyContent="space-around" mt={2}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${campusName}`}
                </div>
                </div>
                <div className="headings" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Student Details`}
                </div>
                </div>
                <Grid item xs={6}>
                
                  <ODoughnutChart
                  isCampus={true}
                    // title={`${instData.name} Student Details`}
                    data={DoughnutUGSD}
                    options={chartOptions.DoughnutUG}
                  />
                </Grid>
                <Grid item xs={5} >
                  <Table column={TABLE_DATA(0,"UG","student_details").column} 
                  data={TABLE_DATA(0,"UG","student_details").data} 
                  category={"Student Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["student_details"]}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center"  justifyContent="space-around" px={7}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Placement Details`}
                </div>
                </div>
              <Grid item xs={5}>
                <ODoughnutChart
                isCampus={true}
                  // title={`${instData.name} Placement Details`}
                  data={DoughnutUGPD}
                  options={chartOptions.DoughnutUG}
                />
              </Grid>
              <Grid item xs={6} ml={9}>
                  <Table column={TABLE_DATA(0,"UG","placement_details").column} 
                  data={TABLE_DATA(0,"UG","placement_details").data} 
                  category={"Placement Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["placement_details"]}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center"  justifyContent="space-around" px={7}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Package Details`}
                </div>
                </div>
                <Grid item xs={5}>
                  <OVerticalBarChart
                  isCampus={true}
                    // title={`${instData.name} Package Details`}
                    data={VerticalBarChartUG}
                    options={chartOptions.VerticalBarChart1}
                  />
                </Grid>
                <Grid item xs={5} >
                  <Table column={TABLE_DATA(0,"UG","salary").column} 
                  data={TABLE_DATA(0,"UG","salary").data} 
                  category={"Package(LPA)"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["salary"]}/>
                </Grid>
              </Grid>
            </TabPanel>


            <TabPanel value={value} index={2} style={{width:"100%"}}>
            <Grid container spacing={9} alignItems="center"  justifyContent="space-around" mt={2}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${campusName}`}
                </div>
                </div>
                <div className="headings cardtitles" id={`stream`}>
                <div className="sub">
                {`${instMap[instData.name]} Student Details`}
                </div>
                </div>
                <Grid item xs={6}>
                  <ODoughnutChart
                  isCampus={true}
                    // title={`${instData.name} Student Details`}
                    data={DoughnutPGSD}
                    options={chartOptions.DoughnutPG}
                  />
                </Grid>
                <Grid item xs={6} >
                  <Table column={TABLE_DATA(1,"PG","student_details").column} 
                  data={TABLE_DATA(1,"PG","student_details").data} 
                  category={"Student Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["student_details"]}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center"  justifyContent="space-around" px={7}>
              <div className="headings cardtitles" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Placement Details`}
                </div>
                </div>
              <Grid item xs={5}>
                <ODoughnutChart
                isCampus={true}
                  // title={`${instData.name} Placement Details`}
                  data={DoughnutPGPD}
                  options={chartOptions.DoughnutPG}
                />
              </Grid>
              <Grid item xs={6} ml={10}>
                  <Table column={TABLE_DATA(1,"PG","placement_details").column} 
                  data={TABLE_DATA(1,"PG","placement_details").data} 
                  category={"Placement Details"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["placement_details"]}/>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center"  justifyContent="space-around" px={7}>
              <div className="headings" id={`stream`} >
                <div className="sub">
                {`${instMap[instData.name]} Package Details`}
                </div>
                </div>
                <Grid item xs={6}>
                  <OVerticalBarChart
                  isCampus={true}
                    // title={`${instData.name} Package Details`}
                    data={VerticalBarChartPG}
                    options={chartOptions.VerticalBarChart1}
                  />
                </Grid>
                <Grid item xs={6} >
                  <Table column={TABLE_DATA(1,"PG","salary").column} 
                  data={TABLE_DATA(1,"PG","salary").data} 
                  category={"Package(LPA)"} 
                  keys={parsedInstituteStudentDataFormatCampusWise["salary"]}/>
                </Grid>
              </Grid>
            </TabPanel>
            </Grid>
          </Box>
        </div>
      ) : null}
      
      </>
  )}
export default CampusWise;
