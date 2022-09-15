import React, { useContext, useState } from "react";
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
import { unstable_batchedUpdates } from "react-dom";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
function Compare() {
  const user = useContext(UserContext);
  const compareYears = [2021, 2022, 2023];
  const campusList = user.user.campus;
  const CampusNames = {
    vskp: "Visakhapatnam",
    hyd: "Hyderabad",
    blr: "Bengaluru",
  };
  const [year1, setYear1] = useState(compareYears[0]);
  const [campus, setCampus] = useState(user.user.campus[0]);
  const [institute, setInstitute] = useState(null);
  const [year2, setYear2] = useState(compareYears[1]);
  const [tableData,setTableData] = useState([])
  const handleChange = (event) => {
    setShowTables(false);
    const { name, value } = event.target;
    if (name === "year1") setYear1(value);
    else if (name === "year2") setYear2(value);
    else if (name === "campus") {
      unstable_batchedUpdates(()=>{
        setCampus(value);
        setInstitute(null)
      })
    }
    else if (name === "institute") setInstitute(value);
  };
  const [showTables, setShowTables] = useState(false);  
  const processDataAndStore = (data)=>{
    const branches = Object.keys(data[year1])
    const output = {}
    branches.forEach(branch=>{
      const branchData = {}
      branchData[year1] = {...data[year1][branch]}
      branchData[year2] = {...data[year2][branch]}
      output[branch] = {...branchData}
      output[branch]["year1"] = year1
      output[branch]["year2"] = year2
      output[branch]["keys"] = Object.keys(data[year1][branch])
    })
    unstable_batchedUpdates(()=>{
      setTableData(output)
      setShowTables(true);
    })
  }
  const handleCompare = () => {
    axios.get(`${REACT_APP_API_URL}students/compare/${year1}/${year2}/${campus.name.toLowerCase()}/${institute.name.toLowerCase()}`,{
        headers: {
          Authorization: `Token ${user.user.token.key}`,
        },
    })
    .then(resp=>{
      processDataAndStore(resp.data.result)
    });
  }

  const getCombinedData = (data)=>{
    const newData = {}
    const keys = Object.keys(data['UG'][year1])
    const year1Data = {}
    const year2Data = {}
    keys.forEach(key=>{
      year1Data[key] = parseFloat(data['UG'][year1][key]) + parseFloat(data['PG'][year1][key])
      year2Data[key] = parseFloat(data['UG'][year2][key]) + parseFloat(data['PG'][year2][key])
    })
    newData[year1] = year1Data
    newData[year2] = year2Data
    return newData
  }
  return (
    <Box flexgrow={1} className="compare">
      <Grid container px={4} className="year_container">
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
                {compareYears.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={4}>
            <Grid>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 140 }}
                style={{ width: "140px" }}
              >
                <InputLabel> Campus</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={campus}
                  label="campus"
                  name="campus"
                  onChange={handleChange}
                >
                  {campusList.map((campusName) => (
                    <MenuItem value={campusName}>
                      {CampusNames[campusName.name]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 80 }}
                style={{ width: "80px" }}
              >
                <InputLabel> Institute</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={institute}
                  label="institute"
                  name="institute"
                  onChange={handleChange}
                >
                  {user.user.institute.map((instName) =>
                    campus.name === instName.campus ? (
                      <MenuItem value={instName}>
                        {instName.name.toUpperCase()}
                      </MenuItem>
                    ) : null
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <ThemeProvider theme={theme1}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<DifferenceIcon />}
                  disabled={!(year1 && year2 && campus && institute)}
                  onClick={handleCompare}
                  style={{ width: "50%", marginTop: "1rem", fontSize: "1rem" }}
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
                {compareYears.map(
                  (year) =>
                    year > year1 && <MenuItem value={year}>{year}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
      </Grid>
      </Grid>  
      {showTables ? <Grid container className="tables_container_compare">
         {institute.name.toLowerCase() === "gst" ?
        Object.keys(tableData).map(branch=>
          <Table
          data={tableData[branch]} branchName={branch}  keys={tableData[branch]["keys"]}  year1={year1} year2={year2}
        />
        ):
        <>
          <Table
          data={tableData["UG"]} branchName={"UG"}  keys={tableData["UG"]["keys"]}  year1={year1} year2={year2}
          />
          <Table
          data={tableData["PG"]} branchName={"PG"}  keys={tableData["PG"]["keys"]}  year1={year1} year2={year2}
          />
          <Table
          data={getCombinedData(tableData)} branchName={"ug + pg"}  keys={tableData['PG']["keys"]}  year1={year1} year2={year2}
          />
          </>
        }
        
      </Grid>:
      <CompareSVG/>}
    </Box>
  )
}

export default Compare