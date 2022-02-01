import Box from "@mui/material/Box";
import React, { useContext, useState } from "react";
import LinaerStepper from "../../Components/Form/UpdateForm";
import { UserContext } from "../../context/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import "./Admin.styles.scss";
import {ReactComponent as FormSelect } from "../../assets/formSelect.svg"
import studentDetailsRef,{parsedStudentDetailsRef} from './StudentDetailsFormObj'
function Admin() {
  const user = useContext(UserContext);
  const [campus, setCampus] = useState(user.user.campus[0]);
  const [institute, setInstitute] = useState("");
  const [studentDetails, setStudentDetails] = useState({})
  const [grad, setGrad] = useState("");
  const [edit,setEdit] = useState(false)
  const [instituteData,setInstituteData] = useState({})
  const initiateEdit = ()=>{
    axios.get(`https://gcgc-dashboard.herokuapp.com/students/select/${institute.name}/${grad}`)
    .then(resp=>{
      setInstituteData(resp.data.result[0])
    })
    setEdit(true)
  }

  const updateInDataBase =()=>{

  }
  const ariaLabel = { "aria-label": "description" };
  console.log(user);
  const handleChange = (event) => {
    setEdit(false)
    const { name, value } = event.target;
    if (name === "campus") setCampus(value);
    else if (name === "institute") setInstitute(value);
    else if (name === "grad") setGrad(value);
  };
  return (
    <Box p={10}>
      <div className="form-container">

        {/* campus input */}
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{ width: "200px" }}
        >
          <InputLabel> Campus </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={campus}
            label="campus"
            name="campus"
            onChange={handleChange}
          >
            {user.user.campus.map((campusName) => (
              <MenuItem value={campusName}>{parsedStudentDetailsRef[campusName.name]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* institute input */}
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{ width: "200px" }}
        >
          {/* institute name */}
          <InputLabel> Institute </InputLabel>
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
                <MenuItem value={instName}>{instName.name.toUpperCase()}</MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>
            {/* grad type as input */}
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{ width: "200px" }}
        >
          <InputLabel> Graduation Type </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
          >
            <MenuItem value={"ug"}>Undergraduate</MenuItem>
            <MenuItem value={"pg"}>Postgraduate</MenuItem>
          </Select>
        </FormControl>

        {/* edit button icons */}
        <Button variant="outlined" startIcon={<EditIcon />} 
        disabled={!(campus && institute && grad)}
        onClick={initiateEdit }>
          EDIT
        </Button>

        {edit?
        <div>
          <h1>{parsedStudentDetailsRef[campus.name]}</h1>
          <h1>{institute.name.toUpperCase()}</h1>
          <h6>{grad}</h6>
        </div>:null
}
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          className="secondBox"
        >
            
              {edit&& instituteData && instituteData["under_campus_name"]?
            <div>
              <table>
              {
                studentDetailsRef.map(key=>
                  <tr>
                    <td>
                    <label>
                      {parsedStudentDetailsRef[key]} :
                    </label>
                    </td>
                    <td>

                  <Input
                    placeholder={key}
                    value={
                          key==="under_campus_name"?parsedStudentDetailsRef[instituteData[key]]:
                          key==="under_institute_name"?instituteData[key].toUpperCase():
                        instituteData[key]}
                    label="Enter this and that field"
                    name={key}
                    onChange={handleChange}
                    inputProps={ariaLabel}
                    />
                    </td>
                  </tr>
            )
          }
        </table>
            </div>
            : 
            <div>
              <h2> Fill in all options and press on Edit to lock in your options</h2>
              <FormSelect/>
            </div>
} 
        </Box>
        {/* <div>
          <button onClick={updateInDataBase}>
            Update in Database
          </button>
          </div> */}
      </div>
    </Box>
  );
}
export default Admin;
