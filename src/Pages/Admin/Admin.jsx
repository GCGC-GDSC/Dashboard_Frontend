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
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ReactComponent as FormSelect } from "../../assets/formSelect.svg"
import studentDetailsRef,{parsedStudentDetailsRef} from './StudentDetailsFormObj'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import SchoolIcon from '@mui/icons-material/School';
import SendIcon from '@mui/icons-material/Send';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./Admin.styles.scss";
function Admin() {
  const user = useContext(UserContext);
  const [campus, setCampus] = useState(user.user.campus[0]);
  const [viewCampus, setViewCampus] = useState(user.user.campus[0]);
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
  const downloadExcel  = ()=>{
    // window.alert("downloading excel")
    handleClose()
    axios.get(`https://gcgc-dashboard.herokuapp.com/students/download/${viewCampus.name}`,{
      method: 'GET',
      responseType: 'blob', // important
  })
    .then(response=>{
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${parsedStudentDetailsRef[viewCampus.name]} Career Fulfillment Statistics.xlsx`);
      document.body.appendChild(link);
      link.click();
    })
  }
  const updateInDataBase =()=>{
      const dataToSend = {}
      axios.patch(`https://gcgc-dashboard.herokuapp.com/students/update/${user.user.eid}/${instituteData.id}`,dataToSend).then((resp)=>{
        console.log(resp)
      })
  }
  const ariaLabel = { "aria-label": "description" };

const handleChangeCampus = (event)=>{
  const {name,value} = event.target
  setViewCampus(value)
}
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius:'10px',
    boxShadow: 24,
    p: 4,
  };
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  Confirmation
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you want to Download the Excel Sheet for {parsedStudentDetailsRef[viewCampus.name]} ?
                  </Typography>
                  <div className='modal_buttons_container'>
                      <button className='modal_buttons_container-btn-yes' onClick={downloadExcel}>
                          Yes
                      </button>
                      <button  className='modal_buttons_container-btn-no' onClick={handleClose}>
                          No
                      </button>
                  </div>
                  <Typography id="modal-modal-description" style={{fontSize:"8px"}} sx={{ mt: 2 }}>
                      (Your file will be downloaded shortly)
                  </Typography>
              </Box>
        </Modal>
      <div> 
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            style={{ width: "200px" }}
          >
            <InputLabel>View Data as Excel Sheet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={viewCampus}
              label="viewCampus"
              name="viewCampus"
              onChange={handleChangeCampus}
            >
              {user.user.campus.map((campusName) => (
                <MenuItem value={campusName} onClick={handleOpen}>{parsedStudentDetailsRef[campusName.name]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mainInput">
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
        </div>

        {edit?
        <div className="formInformation">
          <AccountBalanceIcon  color="primary"/><h4>{parsedStudentDetailsRef[campus.name]} <ArrowRightIcon/></h4>
          <GolfCourseIcon color="primary"/><h4>{institute.name.toUpperCase()} <ArrowRightIcon/></h4>
          <SchoolIcon color="primary"/> <h4>{grad.toUpperCase()}</h4>
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
            <div  className="formTable">
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
                    // onChange={handleChangeINP}
                    inputProps={ariaLabel}
                    />
                    </td>
                  </tr>
            )
          }
        </table>
        <Button variant="contained" endIcon={<SendIcon />}>
            Update
        </Button>
            </div>
            : 
            <div style={{opacity:"0.7",margin:"auto",marginTop:"30px",display:"flex",justifyContent:"center", flexDirection:"column",alignItems:"center"}}>
              <h4>Fill in all options and press on edit to lock in your options</h4>
              <FormSelect />
            </div>
} 
        
        </Box>

      </div>
    </Box>
  );
}
export default Admin;
