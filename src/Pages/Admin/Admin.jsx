import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider} from '@mui/material/styles'
import theme1 from "../../MuiThemes/themes"
import Input from "@mui/material/Input";
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ReactComponent as FormSelect } from "../../assets/formSelect.svg"
import {parsedStudentDetailsRef,DBUpdateKeys,DBPreviewKeys,DBDisabledKeys} from './StudentDetailsFormObj'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import SchoolIcon from '@mui/icons-material/School';
import { unstable_batchedUpdates } from "react-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import courseReferrenceObject from "./InstituteCourseRefObj"
// accordian
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import EventNoteIcon from '@mui/icons-material/EventNote';

import "./Admin.styles.scss";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
function Admin() {
  const user = useContext(UserContext);
  const [campus, setCampus] = useState(user.user.campus[0]);
  const [viewCampus, setViewCampus] = useState(user.user.campus[0]);
  const [institute, setInstitute] = useState(user.user.institute[0]);
  const [year, setYear] = useState(2022);
  const [grad, setGrad] = useState("ug");
  const [isCourseType,setIsCourseType] = useState('Institute Only');
  const [course, setCourse] = useState("null");
  const [edit,setEdit] = useState(false)
  const [instituteData,setInstituteData] = useState({})
  const [dataObject,setDataObject] = useState({})
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  // const [logs,setLogs] = useState([])
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
    console.log(course);
    setDataObject({})
    setInstituteData({})
    axios.get(`${REACT_APP_API_URL}students/${year}/select/${course.toLowerCase()}/${institute.name}/${grad}/${campus.name}`,{
      headers: {
        'Authorization': `Token ${user.user.token.key}`
      }
    })
    .then(resp=>{
      let dataObj = resp.data.result[0]
      const newDataObj = {}
      newDataObj["self_percent_opted_hs_final"] = ((dataObj["total_opted_for_higher_studies_only"] / dataObj["total_final_years"]) * 100).toFixed(2)
      newDataObj["self_percent_back_final"] = ((dataObj["total_backlogs"] / dataObj["total_final_years"]) * 100).toFixed(2)
      newDataObj["self_percent_eligible_final"] = ((dataObj["total_students_eligible"] / dataObj["total_final_years"]) * 100).toFixed(2)
      newDataObj["self_percent_yet_to_place_eligible"] = ((dataObj["total_yet_to_place"] / dataObj["total_students_eligible"]) * 100).toFixed(2)
      dataObj = {...dataObj,...newDataObj}
      unstable_batchedUpdates(()=>{
        setInstituteData(dataObj)
        setDataObject(dataObj)
      })
    })
  
    setEdit(true)
  }


  const downloadExcel  = ()=>{
    handleClose()
    alert("functionality currently not available")
  //   axios.get(`${REACT_APP_API_URL}students/${year}/download/${viewCampus.name}`,{
  //     headers: {
  //       'Authorization': `Token ${user.user.token.key}`,
  //       'content-type': 'application/msexcel' ,
  //     },
  //     "responseType" :"blob"
  //   }
  //   )
  //   .then(response=>{
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', `${parsedStudentDetailsRef[viewCampus.name]} Career Fulfillment Statistics.xlsx`);
  //     document.body.appendChild(link);
  //     link.click();
  // })
  }
  const updateInDataBase =()=>{
    setConfirmUpdate(false)
    const dataToSend = {}
    let flag = false  
    DBUpdateKeys.forEach((key)=>{
      dataToSend[key] = dataObject[key]
      if(dataToSend[key] === undefined || dataToSend[key] === "") flag = true
    })
    var config = {
      method: 'put',
      url: `${REACT_APP_API_URL}students/${year}/update/${instituteData.id}`,
      headers: { 
        'Authorization': `Token ${user.user.token.key}`, 
        'Content-Type': 'application/json'
      },
      data:dataToSend
    };
    var config2 = {
      method: 'put',
      url: `${REACT_APP_API_URL}students/${year}/updateprograms/${instituteData.id}`,
      headers: { 
        'Authorization': `Token ${user.user.token.key}`, 
        'Content-Type': 'application/json'
      },
      data:dataToSend
    };
    
    if(flag){
        window.alert("Inputs can not contain null values")
    }

      else{
        let configFinal = config
        if (course !== "null")
        {
          configFinal = config2
        }
        try{
        axios(configFinal)
        .then(resp=>{
          // update the dataObject 
          console.log('hello')
          if(resp.data.status.toLowerCase() === "ok")
          { 
            unstable_batchedUpdates(()=>{
              setDataObject(resp.data.result)
              setOpenPreview(true)
            })
          }
          else{
            alert("data could not be updated")
          }
        })
        .catch(err=>{
          console.log(err)
        })
      }
      catch(err){
        console.log("hello",err)
      }
      }
      return;
  }
  const ariaLabel = { "aria-label": "description" };

const handleChangeCampus = (event)=>{
  const {value} = event.target
  setViewCampus(value)
}
// --------update form ...
const checkDependentValueUpdates = (kvp)=>{
  const {name,value} = kvp
  const newRefObj = dataObject ;
  newRefObj[name] = value ;
  // const newDataObj = {};
  newRefObj["total_backlogs"] = 0;
  ["total_backlogs_opted_for_placements",
  "total_backlogs_opted_for_higherstudies",
  "total_backlogs_opted_for_other_career_options"].forEach(key =>{
    newRefObj["total_backlogs"] += parseInt(newRefObj[key]);
  })

  newRefObj["total_students_eligible"]  = newRefObj["total_final_years"] ;

  ["total_higher_study_and_pay_crt", 
  "total_opted_for_higher_studies_only",
  "total_not_intrested_in_placments",
  "total_backlogs_opted_for_placements"].forEach(key=>
    {
  newRefObj["total_students_eligible"] -= parseInt(newRefObj[key]);
  })
 
  //swaped
  newRefObj["total_yet_to_place"] = newRefObj["total_students_eligible"] - (newRefObj["total_offers"] - newRefObj["total_multiple_offers"]);    

  newRefObj["total_placed"] = newRefObj["total_offers"] - newRefObj["total_multiple_offers"];
  
  newRefObj["self_percent_opted_hs_final"] = ((newRefObj["total_opted_for_higher_studies_only"] / newRefObj["total_final_years"]) * 100).toFixed(2)
  newRefObj["self_percent_back_final"] = ((newRefObj["total_backlogs"] / newRefObj["total_final_years"]) * 100).toFixed(2)
  newRefObj["self_percent_eligible_final"] = ((newRefObj["total_students_eligible"] / newRefObj["total_final_years"]) * 100).toFixed(2)
  newRefObj["self_percent_yet_to_place_eligible"] = ((newRefObj["total_yet_to_place"] / newRefObj["total_students_eligible"]) * 100).toFixed(2)

  setDataObject({...newRefObj})
}
const handleChangeTableInput = (event) =>{
  const {name,value} = event.target
  setDataObject({...dataObject,[name]:value})
  checkDependentValueUpdates(event.target)
}

  const handleChange = (event) => {
    setEdit(false)
    const { name, value } = event.target;
    if (name === "campus") setCampus(value);
    else if (name === "institute") setInstitute(value);
    else if (name === "grad") setGrad(value);
    else if (name === "course") setCourse(value)
    else if (name === 'courseType') 
    {
      if (value == "Institute Only"){
        setCourse("null")
      }
      setIsCourseType(value)
    }
    else if (name === 'year') setYear(value)

  };
  const previewStyle = {
    // background: "#D3CCE3", 
    // background: "-webkit-linear-gradient(to right, #E9E4F0, #D3CCE3)",  
    background:" linear-gradient(to right, #E9E4F0, #D3CCE3)", 
  }
  // const fetchLogs = ()=>{
  //   axios.get(`${REACT_APP_API_URL}students/logs`,{
  //     headers: {
  //       'Authorization': `Token ${user.user.token.key}`
  //     }
  //   })
  //   .then(resp=>{
  //       setLogs(resp.data.result)
  //   })
  // }
  useEffect(()=>{
    // const fetchLogs = ()=>{
    //   axios.get(`${REACT_APP_API_URL}students/logs`,{
    //     headers: {
    //       'Authorization': `Token ${user.user.token.key}`
    //     }
    //   })
    //   .then(resp=>{
    //       setLogs(resp.data.result)
    //   })
    // }
  //  fetchLogs()
  },[user])
  return (
    <Box px={10}>
      <div className="form-container">
        {/* Preview Modal */}
        <Modal
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
            open={openPreview}
            onClose={()=>setOpenPreview(false)} 
          >
              <Box sx={stylePreview} style={previewStyle}>
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
                DBPreviewKeys.map(key=>
                  <tr>
                    <td> 
                      <label>
                        {parsedStudentDetailsRef[key] ? parsedStudentDetailsRef[key]: key} :
                      </label>
                    </td>
                    <td>
                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 90 }}
                        style={{ width: "120px"}}
                      >
                  <Input
                    placeholder={key}
                    disabled = "true"
                    value={
                          key==="under_campus_name"?parsedStudentDetailsRef[dataObject[key]]:
                          key==="under_institute_name"?dataObject[key]: //.toUpperCase was here
                        dataObject[key]}
                    label="Enter this field"
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
            style={{ width: "160px" }}>
            <InputLabel>Download CF Statistics</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={viewCampus}
              label="viewCampus"
              name="viewCampus"
              onChange={handleChangeCampus}
              variant="standard"

            >
              {user.user.campus.map((campusName) => (
                <MenuItem value={campusName} onClick={handleOpen}>{parsedStudentDetailsRef[campusName.name]}</MenuItem>
              ))}
              {user.user.campus.length>1?<MenuItem value={{name:"overall"}} onClick={handleOpen}>GCGC Overall</MenuItem>
              :null}
            </Select>
          </FormControl>
        </div>
        <div className="mainInput">
          {/* year select  */}
          <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 80 }}
          style={{ width: "80px" }}
        >
          <InputLabel> Year </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="year"
            name="year"
            onChange={handleChange}
          >
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
          </Select>
        </FormControl>
        {/* campus input */}
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 100 }}
          style={{ width: "160px" }}
        >
          <InputLabel> View </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isCourseType}
            label="courseType"
            name="courseType"
            onChange={handleChange}
          >
              <MenuItem value="Institute Only">Institute Only</MenuItem>
              <MenuItem value="Branchwise View">Branchwise View</MenuItem>

          </Select>
        </FormControl>
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
        {
        isCourseType !== "Institute Only" &&    
        <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 80 }}
        style={{ width: "90px" }}
      >
        {/* course name */}
        <InputLabel> Course </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          label="course"
          name="course"
          onChange={handleChange}
        >
            {
              courseReferrenceObject[campus.name][institute.name][grad].map(program=>
                <MenuItem key={program.program_name} value={program.program_name}>{program.program_name}</MenuItem> 
                )
            }

        </Select>
      </FormControl>
        }
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
        <FormControl
          variant="standard"
          sx={{ m: 0, minWidth: 80 }}
          style={{ width: "80px" }}
        >
          <ThemeProvider theme={theme1}>
          <Button variant="outlined" startIcon={<EditIcon />} 
          disabled={isCourseType==="Institute Only"?!(campus && institute && grad):!(campus && institute && grad && course)}
          onClick={initiateEdit }>
            EDIT
          </Button>
        </ThemeProvider>
        </FormControl>
        </div>
        {edit?
        <div className="formInformation">
           <EventNoteIcon color="primary"/><h4>{year} <ArrowRightIcon/></h4>
          <BookmarkAddIcon color="primary"/><h4>{isCourseType}<ArrowRightIcon/></h4>
          <AccountBalanceIcon  color="primary"/><h4>{parsedStudentDetailsRef[campus.name]} <ArrowRightIcon/></h4>
          <GolfCourseIcon color="primary"/><h4>{institute.name.toUpperCase()}<ArrowRightIcon/></h4>
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
                DBUpdateKeys.map(key=>
                  <tr>
                    <td>
                    <label>
                      {parsedStudentDetailsRef[key]} :
                    </label>
                    </td>
                    <td>
                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                        style={{ width: "130px" }}
                      >
                  <Input
                    placeholder={key}
                    required
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    disabled= {(DBDisabledKeys.includes(key))}
                    value={
                          key==="under_campus_name"?parsedStudentDetailsRef[dataObject[key]]:
                          key==="under_institute_name"?dataObject[key]:
                          dataObject[key]
                      }
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
        <ThemeProvider theme={theme1}>
        <Button variant="contained" endIcon={<UpgradeIcon style={{ fontSize: 30 }}/>} onClick={()=>setConfirmUpdate(true)} className="updateButton">
            Update
        </Button>
        </ThemeProvider>
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
        <Accordion className="accordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>LOGS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {/* <Logs logs={logs}/> */}
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
      </div>
    </Box>
  );
}
export default Admin;