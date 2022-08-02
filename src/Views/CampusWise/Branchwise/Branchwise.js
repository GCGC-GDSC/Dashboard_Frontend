import axios from "axios";
import React, { useState,useContext,useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import InstituteStudentDataFormatCampusWise from '../APIKeys'
import  {colors} from "../../ColorAssets/colorPallet";
import ODoughnutChart from "../../Overall/charts/ODoughnut";
import OVerticalBarChart from "../../Overall/charts/OVerticalBarChart";
import { UserContext } from "../../../context/context";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
function Branchwise({ campus, institute, year }) {
  const user = useContext(UserContext)
  const [courseName, setCourseName] = useState("");
  const [gradTypeBranchwise, setgradTypeBranchwise] = useState("ug");
  const [courseList,setCourseList] = useState([])
  const [unlockCharts,setUnlockCharts] = useState(false)
  const [courseDataObject,setCourseDataObject] = useState({})
  const fetchCourseData = (courseName) => {
    axios
      .get(
        `${REACT_APP_API_URL}students/${year}/select/${courseName}/${institute}/${gradTypeBranchwise}/${campus}`
        ,{
          headers: {
            'Authorization': `Token ${user.user.token.key}`
          }
        })
      .then((resp) => {
        setCourseDataObject(resp.data.result[0])
      });
  };
  const fillCoursesDoughnut= {
    DoughnutOptions: {
      onClick: function (evt, item) {
        if (item[0]) {
          const itemIndex = item[0].index
          unstable_batchedUpdates(() => {
            setCourseName(courseList[itemIndex])
            fetchCourseData(courseList[itemIndex])
            setUnlockCharts(true)
          })
         
        }
      },
      rotation: Math.PI * 5,
      plugins: {
        legend: {
          position: "left",
        },
      },
    },
    ug:{
      labels: courseList.map((item) => item),
      datasets: [
        {
          label: "Courses",
          data: courseList.map((item) => 1),
          backgroundColor:colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    },
    pg:{
      labels: courseList.map((item) => item),
      datasets: [
        {
          label: "Courses",
          data: courseList.map((item) => 1),
          backgroundColor:colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    }
  }
  const getDataForVC = (keys,category) => {
    const dataArray = []
    keys.forEach(key=>{
      // dataArray.push(courseDataObject[key]+ Math.floor((Math.random() * 1000) + 1))
      // const p = courseDataObject[key]
      // dummy remove it later ##
      courseDataObject["blank"] = "_" + courseName
      dataArray.push(Math.floor((Math.random() * 1000) + 1))

    })
    return dataArray
}
    const fillCharts = {
      verticalChartOptions:{
        onClick: function (evt, item) {
          if (item[0]) {
          }
        },
      },
      ug:{
        doughnut1:{
          labels:InstituteStudentDataFormatCampusWise["student_details"],
          // datasets :getDataForVC(InstituteStudentDataFormatCampusWise["student_details"],"student_details")
          datasets : [
            {
              label: "student_details",
              data: getDataForVC(InstituteStudentDataFormatCampusWise["student_details"],"student_details"),
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],

        },
        doughnut2:{
          labels:InstituteStudentDataFormatCampusWise["placement_details"],
          datasets : [
            {
              label: "student_details",
              data: getDataForVC(InstituteStudentDataFormatCampusWise["placement_details"],"placement_details"),
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        },
        vc:{
          labels:InstituteStudentDataFormatCampusWise["salary"],
          datasets : [
            {
              label: "student_details",
              data: getDataForVC(InstituteStudentDataFormatCampusWise["salary"],"salary"),
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        },
      },
      pg:{
        doughnut1:{
          labels:InstituteStudentDataFormatCampusWise["student_details"],
          // datasets :getDataForVC(InstituteStudentDataFormatCampusWise["student_details"],"student_details")
          datasets : [
            {
              label: "student_details",
              data: getDataForVC(InstituteStudentDataFormatCampusWise["student_details"],"student_details"),
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],

        },
        doughnut2:{
          labels:InstituteStudentDataFormatCampusWise["placement_details"],
          datasets : [
            {
              label: "student_details",
              data: getDataForVC(InstituteStudentDataFormatCampusWise["placement_details"],"placement_details"),
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        },
        vc:{
          labels:InstituteStudentDataFormatCampusWise["salary"],
          datasets : [
            {
              label: "student_details",
              data: getDataForVC(InstituteStudentDataFormatCampusWise["salary"],"salary"),
              backgroundColor:colors,
              borderColor: colors,
              borderWidth: 1,
            },
          ],
        },
      }
    }
  const handleChange = (event, newValue) => {
    unstable_batchedUpdates(() => {
      setgradTypeBranchwise(newValue === 1 ? "pg" : "ug");
      setValue(newValue);
      setUnlockCharts(false)
    });
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
  // const fetchCourseList=()=>{
  //   const courseArr = []
  //   user.user.institute.forEach(instObj=> 
  //       {
  //         if (instObj.name === institute &&  instObj.campus === campus)
  //           instObj.programs.forEach(courseObj=> {
  //             if (courseObj.is_ug === (gradTypeBranchwise === "ug"))
  //             courseArr.push(courseObj.name) })
  //       });
  //     setCourseList(courseArr)
  // }
  // console.log(fillCharts)
  useEffect(() => {
    // console.log("😎😎",courseName)
    const fetchCourseList=()=>{
      const courseArr = []
      user.user.institute.forEach(instObj=> 
          {
            if (instObj.name === institute &&  instObj.campus === campus)
              instObj.programs.forEach(courseObj=> {
                if (courseObj.is_ug === (gradTypeBranchwise === "ug"))
                courseArr.push(courseObj.name) })
          });
        setCourseList(courseArr)
    }
  fetchCourseList()   
},[gradTypeBranchwise,institute,campus, user.user.institute]);
  return (
    <Grid>
      {
          // console.log("🤩",courseName)

      }
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="UG" {...a11yProps(0)} />
          <Tab label="PG" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{ width: "100%" }}>
        {gradTypeBranchwise}
        <Grid xs={6} md={4}>
        <ODoughnutChart
            title={"Courses"}
            data={fillCoursesDoughnut[gradTypeBranchwise]}
            options={fillCoursesDoughnut.DoughnutOptions}
            />
          {
          unlockCharts&&
        <Grid>
          <ODoughnutChart
            data={fillCharts[gradTypeBranchwise]["doughnut1"]}
            options={fillCharts.verticalChartOptions}
          />
           <ODoughnutChart
            data={fillCharts[gradTypeBranchwise]["doughnut2"]}
            options={fillCharts.verticalChartOptions}
          />
           <OVerticalBarChart
            data={fillCharts[gradTypeBranchwise]["vc"]}
            options={fillCharts.verticalChartOptions}
          />
        </Grid>
        }
      </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} style={{ width: "100%" }}>
      {gradTypeBranchwise}
        <Grid xs={6} md={4}>
        <ODoughnutChart
            title={"Courses"}
            data={fillCoursesDoughnut[gradTypeBranchwise]}
            options={fillCoursesDoughnut.DoughnutOptions}
            />
          {
          unlockCharts&&
        <Grid>
          <ODoughnutChart
            data={fillCharts[gradTypeBranchwise]["doughnut1"]}
            options={fillCharts.verticalChartOptions}
          />
           <ODoughnutChart
            data={fillCharts[gradTypeBranchwise]["doughnut2"]}
            options={fillCharts.verticalChartOptions}
          />
           <OVerticalBarChart
            data={fillCharts[gradTypeBranchwise]["vc"]}
            options={fillCharts.verticalChartOptions}
          />
        </Grid>
}
      </Grid>
      </TabPanel>
    </Grid>
  );
}

export default Branchwise;
