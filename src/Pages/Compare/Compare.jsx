import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { UserContext } from "../../context/context";
import axios from 'axios';
import Table from './Table'
import Button from '@mui/material/Button';
import DifferenceIcon from '@mui/icons-material/Difference';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {ReactComponent as CompareSVG }  from "../../assets/compareSVG.svg";
import './Compare.scss'
import { ThemeProvider} from '@mui/material/styles'
import theme1 from "../../MuiThemes/themes"
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
function Compare() {
  const user = useContext(UserContext);
  const compareYears= [2019,2020,2021,2022,2023]
  const gradTypeList= ["UG","PG"];
  const courseList = ["CSE","Mech","CSBS","Civil","ECE","EEE"]
  const [year1, setYear1] = useState(null);
  const [year2, setYear2] = useState(null);
  const [course,setCourse] = useState(null);
  const [gradType,setGradType] = useState(null);
  const [yearData, setYearData] = useState(null);
  const [comparision,setComparision] = useState(false)
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "year1") setYear1(value);
    else if (name === "year2") setYear2(value);
    else if (name === "course") setCourse(value);
    else if (name === "gradType") setGradType(value);

  };
  const parsedValues=(arr)=>{
    return ["Number of Companies","Number of students Placed","Highest Package","Number of off campus placements"]
  }
  const handleCompare =()=>{
    // api call.....
    console.log(year1,year2,course,gradType)
    axios.get(`${REACT_APP_API_URL}students/compare/${year1}/${year2}/${course.toLowerCase()}/${gradType.toLowerCase()}}`,{
      headers: {
        'Authorization': `Token ${user.user.token.key}`
      }
    })
    .then(resp=>console.log(resp))
    const obj1 = {
      name:year1,
      companies:"140",
      placed:"1400",
      highestPackage:"15",
      off:"120",
     }
     const obj2 = { 
        name:year2,
         companies:"240",
         placed:"1100",
         highestPackage:"35",
         off:"10",
        }
    const data = {"year1":obj1,"year2":obj2}
    setComparision(true)
    setYearData(data)
  }
  return (
    <Box flexgrow={1} className='compare'>
        <Grid container px={4} className='year_container'>
            <Grid container className="year_selectors">
              <Grid xs={12} md={4} className="left">
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 100 }}
                  style={{ width: "160px" }}>
                  <InputLabel> Academic Year-1 </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year1}
                    label="year1"
                    name="year1"
                    onChange={handleChange}
                  >
                    {compareYears.map(year=> <MenuItem value={year}>{year}</MenuItem>)
                    }

                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} md={4} >
                <Grid>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 100 }}
                  style={{ width: "100px" }}>
                  <InputLabel> Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label="course"
                    name="course"
                    onChange={handleChange}
                  >
                    {courseList.map(year=> <MenuItem value={year}>{year}</MenuItem>)
                    }

                  </Select>
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 100 }}
                  style={{ width: "100px" }}>
                  <InputLabel> Graduation Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gradType}
                    label="gradType"
                    name="gradType"
                    onChange={handleChange}
                  >
                    {
                    gradTypeList.map(year=> <MenuItem value={year}>{year}</MenuItem>)
                    }

                  </Select>
                </FormControl>
                </Grid>
                <Grid>
                  <ThemeProvider theme={theme1}>
                    <Button variant="outlined" color="primary" startIcon={<DifferenceIcon />}
                    disabled={!(year1 && year2)}
                    onClick={handleCompare}
                    >
                      Compare
                  </Button>
                    </ThemeProvider>
                </Grid>

              </Grid>
              <Grid xs={12} md={4} className="right">
              <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 100 }}
                  style={{ width: "160px" }}>
                  <InputLabel> Academic Year-2 </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year2}
                    label="year2"
                    name="year2"
                    onChange={handleChange}
                  >
                    {compareYears.map(year=> (year!=year1) && <MenuItem value={year}>{year}</MenuItem>)
                    }

                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {!comparision?
              <CompareSVG className='compareSVG' />:
              <Grid container className="year_data">
              <Table 
                  data={yearData}
                  keys={['companies','placed','highestPackage','off']}
                    />
            </Grid>}
        </Grid>
    </Box>
  )
}

export default Compare