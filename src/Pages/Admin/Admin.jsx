import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
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
import studentDetailsRef,{parsedStudentDetailsRef,DBUpdateKeys} from './StudentDetailsFormObj'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import SchoolIcon from '@mui/icons-material/School';
import SendIcon from '@mui/icons-material/Send';
import { unstable_batchedUpdates } from "react-dom";
import Logs from "./Logs.component"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
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
  const [dataObject,setDataObject] = useState({})
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [logs,setLogs] = useState([])
  const [confirmUpdate, setConfirmUpdate] = useState(false);
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
    const stylePreview = {
      position: 'absolute',
      fontSize:"12px",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      maxHeight:"70vh",
      overflow:"auto",
      bgcolor: 'background.paper',
      border: '2px solid #000',
      borderRadius:'10px',
      boxShadow: 24,
      p: 4,
    };
  const initiateEdit = ()=>{
    axios.get(`https://gcgc-dashboard.herokuapp.com/students/select/${institute.name}/${grad}`)
    .then(resp=>{
      unstable_batchedUpdates(()=>{
        setInstituteData(resp.data.result[0])
        setDataObject(resp.data.result[0])
      })
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
    setConfirmUpdate(false)
      let flag = false
      const dataToSend = {}
      DBUpdateKeys.forEach((key)=>{
        dataToSend[key] = dataObject[key]
        if(dataToSend[key] === undefined || dataToSend[key] === "") flag = true
      })
      if(flag){
        window.alert("Values can not contain null values")
      }
      else{
        axios.patch(`https://gcgc-dashboard.herokuapp.com/students/update/${user.user.eid}/${instituteData.id}`,dataToSend)
        .then(resp=>{
          // update the dataObject 
          if(resp.data.status.toLowerCase() === "ok")
         { 
           axios.get(`https://gcgc-dashboard.herokuapp.com/students/select/${institute.name}/${grad}`)
                .then(resp=>{
                  unstable_batchedUpdates(()=>{
                    console.log(resp)
                    setDataObject(resp.data.result[0])
                    setOpenPreview(true)
                  })
                })
            fetchLogs()
          }
          else{
            window.alert("data  couldnot be updated")
          }
          // setDataObject()
          // show modal
        })
      }
  }
  const ariaLabel = { "aria-label": "description" };

const handleChangeCampus = (event)=>{
  const {name,value} = event.target
  setViewCampus(value)
}

const handleChangeTableInput = (event) =>{
  const {name,value} = event.target
  setDataObject({...dataObject,[name]:value})
}

  const handleChange = (event) => {
    setEdit(false)
    const { name, value } = event.target;
    if (name === "campus") setCampus(value);
    else if (name === "institute") setInstitute(value);
    else if (name === "grad") setGrad(value);
  };

  const fetchLogs = ()=>{
    axios.get("https://gcgc-dashboard.herokuapp.com/students/logs")
    .then(resp=>{
        setLogs(resp.data.result)
    })
  }
  useEffect(()=>{
   fetchLogs()
  },[])
  return (
    <Box p={10}>
      <div className="form-container">
        {/* Preview Modal */}
        <Modal
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
            open={openPreview}
            onClose={()=>setOpenPreview(false)}
            
          >
              <Box sx={stylePreview} style={{backgroundColor: "#eec0c6",
              backgroundImage: "linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%)"
              }}>
                  <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
                    Preview Mode
                  </Typography>
                  <div>
                    <span style={{position:"absolute",top:"10px", right:"10px",fontSize:"18px",cursor:"pointer"}}
                    onClick={()=>setOpenPreview(false)}
                    >
                      X
                    </span>
                  </div>
                <hr></hr>
                <table style={{width:"70%",backgroundColor:"white"}}>
                  
              {
                studentDetailsRef.map(key=>
                  <tr>
                    <td>
                    <label>
                      {parsedStudentDetailsRef[key]} :
                    </label>
                    </td>
                    <td>
                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 90 }}
                        style={{ width: "100px"}}
                      >
                  <Input
                    placeholder={key}
                    disabled = "true"
                    value={
                          key==="under_campus_name"?parsedStudentDetailsRef[dataObject[key]]:
                          key==="under_institute_name"?dataObject[key].toUpperCase():
                        dataObject[key]}
                    label="Enter this and that field"
                    name={key}
                    style={{fontSize:"12px"}}
                    onChange={handleChangeTableInput}
                    inputProps={ariaLabel}
                    />
                    </FormControl>
                    </td>
                  </tr>
            )
          }
                </table>
              </Box>
        </Modal> 
        {/* download confirmation modal */}
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
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <p  style={{fontSize:"12px"}}>
                      <b>Note:</b> Please enable editing option in the downloaded Excel Sheet to view all columns
                      <p  style={{fontSize:"10px"}}>
                        (Your file will be downloaded soon)
                      </p>
                      </p>
                  </Typography>
              </Box>
        </Modal>
        {edit ?
        <Modal
          open={confirmUpdate}
          onClose={()=>setConfirmUpdate(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
              <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                  Confirmation
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Are you sure you want to update the data for {parsedStudentDetailsRef[campus.name]} - {institute.name.toUpperCase()} ?
                  </Typography>
                  <div className='modal_buttons_container'>
                      <button className='modal_buttons_container-btn-yes' onClick={updateInDataBase}>
                          Yes
                      </button>
                      <button  className='modal_buttons_container-btn-no' onClick={()=>setConfirmUpdate(false)}>
                          No
                      </button>
                  </div>
              </Box>
        </Modal>:null}
        
        <div> 
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            style={{ width: "160px" }}
          >
            <InputLabel>Download Data as Excel Sheet</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={campus}
              label="viewCampus"
              name="viewCampus"
              onChange={handleChangeCampus}
              variant="standard"

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
          sx={{ m: 1, minWidth: 100 }}
          style={{ width: "160px" }}
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
          sx={{ m: 1, minWidth: 80 }}
          style={{ width: "90px" }}
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
          style={{ width: "160px" }}
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
            
              {edit&& dataObject && dataObject["under_campus_name"]?
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
                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 90 }}
                        style={{ width: "100px" }}
                      >
                  <Input
                    placeholder={key}
                    required
                    value={
                          key==="under_campus_name"?parsedStudentDetailsRef[dataObject[key]]:
                          key==="under_institute_name"?dataObject[key].toUpperCase():
                        dataObject[key]}
                    label="Enter this and that field"
                    name={key}
                    onChange={handleChangeTableInput}
                    inputProps={ariaLabel}
                    size="small"
                    />
                    </FormControl>
                    </td>
                  </tr>
            )
          }
        </table>
        <Button variant="contained" endIcon={<SendIcon />} onClick={()=>setConfirmUpdate(true)}>
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
        <hr></hr>
        <div className="Logs-container">
          <h4>Logs</h4>
          <Logs logs={logs}/>
        </div>
      </div>
    </Box>
  );
}
export default Admin;
