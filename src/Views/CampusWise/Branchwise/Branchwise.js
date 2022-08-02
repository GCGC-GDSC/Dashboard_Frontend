// import axios from "axios";
// import React, { useState,useContext,useEffect } from "react";
// import { unstable_batchedUpdates } from "react-dom";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import PropTypes from "prop-types";
// import ColorPallet, {colors} from "../../ColorAssets/colorPallet";
// import ODoughnutChart from "../../Overall/charts/ODoughnut";
// import { UserContext } from "../../../context/context";
// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// function Branchwise({ campus, institute, year }) {
//   const user = useContext(UserContext)
//   const [courseName, setCourseName] = useState("");
//   const [gradTypeBranchwise, setgradTypeBranchwise] = useState("ug");
//   const [dataObject,setDataObject] = useState({})
//   const [courseList,setCourseList] = useState([])
//   const fetchCourseData = () => {
//     axios
//       .get(
//         `${REACT_APP_API_URL}students/${year}/select/${courseName}/${institute.name}/${gradTypeBranchwise}/${campus.name}`
//       )
//       .then((resp) => {
//         console.log(resp);
//       });
//   };
//   const fillCoursesDoughnut= {
//     DoughnutOptions: {
//       onClick: function (evt, item) {
//         if (item[0]) {
//           const itemIndex = item[0].index
//           alert(itemIndex)
//         }
//       },
//       rotation: Math.PI * 5,
//       plugins: {
//         legend: {
//           position: "left",
//         },
//       },
//     },
//     ug:{
//       labels: courseList.map((item) => item),
//       datasets: [
//         {
//           label: "Courses",
//           data: courseList.map((item) => 1),
//           backgroundColor:colors,
//           borderColor: colors,
//           borderWidth: 1,
//         },
//       ],
//     },
//     pg:{
//       labels: courseList.map((item) => item),
//       datasets: [
//         {
//           label: "Courses",
//           data: courseList.map((item) => 1),
//           backgroundColor:colors,
//           borderColor: colors,
//           borderWidth: 1,
//         },
//       ],
//     }
//   }
//   const handleChange = (event, newValue) => {
//     unstable_batchedUpdates(() => {
//       setgradTypeBranchwise(newValue == 1 ? "pg" : "ug");
//       setValue(newValue);
//     });
//   };
//   function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box sx={{ p: 3 }}>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }
//   TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };
//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       "aria-controls": `simple-tabpanel-${index}`,
//     };
//   }
//   const [value, setValue] = useState(0);

// const fetchCourseList=()=>{
//   const courseArr = user.user.institute.map(instObj=> 
//       {
//         return(
//         instObj.name === institute.name &&  instObj.campus === campus.name &&
//       instObj.programs.map(courseObj=> courseObj.is_ug === (gradTypeBranchwise === "UG") &&
//       courseObj.name.toUpperCase())
//     )
//       });

//     setCourseList(courseArr)
// }
// console.log(fillCoursesDoughnut,courseList)
// useEffect(() => {
//   fetchCourseList()
// }, [gradTypeBranchwise]);
//   return (
//     <Grid>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//           textColor="primary"
//           indicatorColor="primary"
//           variant="fullWidth"
//           centered
//         >
//           <Tab label="UG" {...a11yProps(0)} />
//           <Tab label="PG" {...a11yProps(1)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={value} index={0} style={{ width: "100%" }}>
//         {gradTypeBranchwise}
//         <ODoughnutChart
//           title={"Courses"}
//           data={fillCoursesDoughnut[gradTypeBranchwise]}
//           options={fillCoursesDoughnut.DoughnutOptions}
//         />
//       </TabPanel>
//       <TabPanel value={value} index={1} style={{ width: "100%" }}>
//         <ODoughnutChart
//             title={"Courses"}
//             data={fillCoursesDoughnut[gradTypeBranchwise]}
//             options={fillCoursesDoughnut.DoughnutOptions}
//           />
//       </TabPanel>
//     </Grid>
//   );
// }

// export default Branchwise;
