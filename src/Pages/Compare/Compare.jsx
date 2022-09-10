// import React, { useContext, useState } from "react";
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { UserContext } from "../../context/context";
// import axios from 'axios';
// import Table from './Table'
// import Button from '@mui/material/Button';
// import DifferenceIcon from '@mui/icons-material/Difference';
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import {ReactComponent as CompareSVG }  from "../../assets/compareSVG.svg";
// import './Compare.scss'
// import { ThemeProvider} from '@mui/material/styles'
// import theme1 from "../../MuiThemes/themes"
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import GolfCourseIcon from '@mui/icons-material/GolfCourse';
// import SchoolIcon from '@mui/icons-material/School';
// import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
// import EventNoteIcon from '@mui/icons-material/EventNote';
// // import { style, width } from "@mui/system";
// const REACT_APP_API_URL = process.env.REACT_APP_API_URL
// function Compare() {
//   const user = useContext(UserContext);
//   const compareYears= [2021,2022,2023]
//   const campusList = user.user.campus 
//   const CampusNames = {
//     vskp: "Visakhapatnam",
//     hyd: "Hyderabad",
//     blr: "Bengaluru",
//   };
//   // const [courseList,setCourseList] =  useState([]);
//   const gradTypeList= ["UG","PG"];
//   const [year1, setYear1] = useState(compareYears[0]);
//   const [campus, setCampus] = useState(user.user.campus[0]);
//   const [institute, setInstitute] = useState(user.user.institute[0]);
//   const [year2, setYear2] = useState(compareYears[1]);
//   const [course,setCourse] = useState("ALL");
//   const [gradType,setGradType] = useState("ug");
//   const [yearData_ug, setYearData_ug] = useState(null);
//   const [yearData_pg, setYearData_pg] = useState(null);
//   const [sum_ug_pg,setSum_ug_pg]=useState(null)
//   const [showTables,setShowTables] = useState(false)
//   const [comparision,setComparision] = useState(false);
//   const handleChange = (event) => {
//     setShowTables(false)
//     const { name, value } = event.target;
//     if (name === "year1") setYear1(value);
//     else if (name === "year2") setYear2(value);
//     else if (name === "course") setCourse(value);
//     else if (name === "gradType") setGradType(value);
//     else if (name === "campus") setCampus(value)
//     else if (name === "institute") setInstitute(value);
//   };
//     // const parsedValues=(arr)=>{
//     //   return ["Number of Companies","Number of students Placed","Highest Package","Number of off campus placements"]
//     // }
//   const handleCompare =()=>{
//     // api call.....
//   //  alert("comparing")
//   const courseValue = course.toLowerCase() === "all"? "null": course.toLowerCase()
//   // const gradValue =  gradType.toLowerCase()
//   //  gradType.toLowerCase() === "all"? "null": gradType.toLowerCase()
//   const routeUG = `${REACT_APP_API_URL}students/compare/${year1}/${year2}/${campus.name.toLowerCase()}/${institute.name.toLowerCase()}/${courseValue}/ug`
//   const routePG = `${REACT_APP_API_URL}students/compare/${year1}/${year2}/${campus.name.toLowerCase()}/${institute.name.toLowerCase()}/${courseValue}/pg`

//   const getUGResponse = axios.get(routeUG,{
//     headers: {
//       'Authorization': `Token ${user.user.token.key}`
//     }
//   })
//   const getPGResponse = axios.get(routePG,{
//     headers: {
//       'Authorization': `Token ${user.user.token.key}`
//     }
//   })
//     axios.all([getUGResponse,getPGResponse]).then(
//       axios.spread((...allData) => {
//         const getUGData = allData[0]
//         const getPGData = allData[1]
//         let ug_obj1 = {}
//         ug_obj1 = getUGData.data.result[year1]
//         let ug_obj2 = {}
//         ug_obj2 = getUGData.data.result[year2]
//         ug_obj1.name = year1
//         ug_obj2.name = year2
//         const ug_data = {"year1":ug_obj1,"year2":ug_obj2}
//         setYearData_ug(ug_data)

//         let pg_obj1 = {}
//         pg_obj1 = getPGData.data.result[year1]
//         let pg_obj2 ={}
//         pg_obj2 = getPGData.data.result[year2]
//         pg_obj1.name = year1
//         pg_obj2.name = year2
//         const pg_data = {"year1":pg_obj1,"year2":pg_obj2}
//         console.log(pg_data)
//         setYearData_pg(pg_data)

//        const sum_ug_pg_year1 = sumObjectsByKey(ug_data.year1,pg_data.year1)
//        const sum_ug_pg_year2 = sumObjectsByKey(ug_data.year2,pg_data.year2)

//        sum_ug_pg_year1["name"] = ug_data.year1["name"]
//        sum_ug_pg_year1["average_salary"] = Math.max(ug_data.year1["average_salary"],ug_data.year1["average_salary"])
//        sum_ug_pg_year1["highest_salary"] = Math.max(ug_data.year1["highest_salary"],ug_data.year1["highest_salary"])

//        sum_ug_pg_year2["name"] = ug_data.year2["name"]
//        sum_ug_pg_year2["average_salary"] = Math.max(ug_data.year2["average_salary"],ug_data.year2["average_salary"])
//        sum_ug_pg_year2["highest_salary"] = Math.max(ug_data.year2["highest_salary"],ug_data.year2["highest_salary"])
//        setSum_ug_pg({"year1":sum_ug_pg_year1,"year2":sum_ug_pg_year2})

//        setComparision(true)
//        setShowTables(true)
        
//       })
//     )
//     function sumObjectsByKey(...objs) {
//       return objs.reduce((a, b) => {
//         for (let k in b) {
//           if (b.hasOwnProperty(k))
//             a[k] = (a[k] || 0) + b[k];
//         }
//         return a;
//       }, {});
//     }
//     // .then(resp=>{
//     //   let obj1={}
//     //   let obj2 = {}
//     //   obj1 = resp.data.result[year1]
//     //   obj2 = resp.data.result[year2]
//     //   obj1.name = year1
//     //   obj2.name = year2
//     //   const data = {"year1":obj1,"year2":obj2}
//     //   setYearData(data)
//     //   setComparision(true)
//     // })
//   }
//   return (
//     <Box flexgrow={1} className='compare'>
//         <Grid container px={4} className='year_container'>
//             <Grid container className="year_selectors">
//               <Grid xs={12} md={4} className="left">
//                 <FormControl
//                   variant="standard"
//                   sx={{ m: 1, minWidth: 100 }}
//                   style={{ width: "160px" }}>
//                   <InputLabel> Academic Year-1 </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={year1}
//                     label="year1"
//                     name="year1"
//                     onChange={handleChange}
//                   >
//                     {compareYears.map(year=> <MenuItem value={year}>{year}</MenuItem>)
//                     }
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid xs={12} md={4} >
//                 <Grid>
//                 <FormControl
//                   variant="standard"
//                   sx={{ m: 1, minWidth: 140 }}
//                   style={{ width: "140px" }}>
//                   <InputLabel> Campus</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={campus}
//                     label="campus"
//                     name="campus"
//                     onChange={handleChange}
//                   >
//                     {campusList.map(campusName=> <MenuItem value={campusName}>{CampusNames[campusName.name]}</MenuItem>)
//                     }

//                   </Select>
//                 </FormControl>

//                 <FormControl
//                   variant="standard"
//                   sx={{ m: 1, minWidth: 80 }}
//                   style={{ width: "80px" }}>
//                   <InputLabel> Institute</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={institute}
//             label="institute"
//             name="institute"
//                     onChange={handleChange}
//                   >
//                    {user.user.institute.map((instName) =>
//                   campus.name === instName.campus ? (
//                   <MenuItem value={instName}>{instName.name.toUpperCase()}</MenuItem>
//               ) : null
//             )}
//                   </Select>
//                 </FormControl>
//                 {institute && institute.name && institute.name.toLowerCase() !== "gst" &&
//                 <FormControl
//                   variant="standard"
//                   sx={{ m: 1, minWidth: 100 }}
//                   style={{ width: "100px" }}>
//                   <InputLabel> Course</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={course}
//                     label="course"
//                     name="course"
//                     onChange={handleChange}
//                   >
//                     <MenuItem key={"all-coureses"} value={"ALL"}
//                       >ALL</MenuItem>
//                      {
//                     user.user.institute.map(instObj=> 
//                       {
//                         return(
//                         instObj.name === institute.name &&  instObj.campus === campus.name &&
//                       instObj.programs.map(courseObj=> courseObj.is_ug === (gradType === "UG") &&
//                       <MenuItem key={courseObj.name} value={courseObj.name}
//                       >{courseObj.name.toUpperCase()}</MenuItem>)
//                     )
//                       })
//                   }
//                   </Select>
//                 </FormControl>
//                 }
//                   {/* Commenting the below FormControl becuz we are already making seperate calls for UG and PG data independant of this form input value */}
//                   <FormControl
//                   variant="standard"
//                   sx={{ m: 1, minWidth: 80 }}
//                   style={{ width: "80px" }}>
//                   <InputLabel> Graduation Type</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={gradType}
//                     label="gradType"
//                     name="gradType"
//                     onChange={handleChange}
//                   >

//                     {
//                       gradTypeList.map(grad=> <MenuItem value={grad}>{grad}</MenuItem>)
//                     }

//                   </Select>
//                 </FormControl>
//                 </Grid>

//                 <Grid>
//                   <ThemeProvider theme={theme1}>
//                     <Button variant="outlined" color="primary" startIcon={<DifferenceIcon />}
//                     disabled={!(year1 && year2 && campus && institute && course)}
//                     onClick={handleCompare}
//                     style={{width:"50%",marginTop:"1rem",fontSize:"1rem"}}
//                     >
//                       Compare
//                   </Button>
//                     </ThemeProvider>
//                 </Grid>
              
//               </Grid>
              
//               <Grid xs={12} md={4} className="right">
            
//               <FormControl
//                   variant="standard"
//                   sx={{ m: 1, minWidth: 100 }}
//                   style={{ width: "160px" }}>
//                   <InputLabel> Academic Year-2 </InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={year2}
//                     label="year2"
//                     name="year2"
//                     onChange={handleChange}
//                   >
//                     {compareYears.map(year=> (year > year1) && <MenuItem value={year}>{year}</MenuItem>)
//                     }

//                   </Select>
//                 </FormControl>
//               </Grid>

         
//             </Grid>
//             {showTables ?
//         <div className="formInformation" style={{margin:"auto"}}>
//            <EventNoteIcon color="primary"/><h4>{year1} <ArrowRightIcon/></h4>
//           <BookmarkAddIcon color="primary"/><h4>{campus.name}<ArrowRightIcon/></h4>
//           <BookmarkAddIcon color="primary"/><h4>{institute.name}<ArrowRightIcon/></h4>
//           <AccountBalanceIcon  color="primary"/><h4>{course} <ArrowRightIcon/></h4>
//           <GolfCourseIcon color="primary"/><h4>{gradType}<ArrowRightIcon/></h4>
//           <SchoolIcon color="primary"/> <h4>{year2}</h4>
//         </div>:null}

//             {!comparision?
//               <CompareSVG className='compareSVG' />:
//               <div container className="year_data">
//                 <h3>UG DATA</h3>
//               <Table 
//                   data={yearData_ug}
//                   keys={['total_offers','total_multiple_offers','highest_salary','average_salary']}
//                     />
//                     <h3>PG DATA</h3>
//                   <Table 
//                   data={yearData_pg}
//                   keys={['total_offers','total_multiple_offers','highest_salary','average_salary']}
//                     />
//                     <h3>UG and PG DATA COMBINED</h3>
//                     <Table 
//                   data={sum_ug_pg}
//                   keys={['total_offers','total_multiple_offers','highest_salary','average_salary']}
//                     />
//             </div>}
//         </Grid>
//     </Box>
//   )
// }

// export default Compare