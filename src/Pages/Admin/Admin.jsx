import Box from '@mui/material/Box';
import React ,{useContext, useState} from 'react'
import LinaerStepper from "../../Components/Form/UpdateForm"
import { UserContext } from '../../context/context';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
function Admin()
{
    const user = useContext(UserContext)
    const [campus,setCampus] = useState("")
    const [institute,setInstitute] = useState("")
    const [checked, setChecked] = useState(user.user.grad.includes("ug"));
    console.log(user.user)
    const handleChange = (event) => {
        const {name,value} = event.target
        if(name==="campus")
            setCampus(value);
        else if(name==='institute')
            setInstitute(value)
        else if(name==="isUG")
        {
            if(checked &&user.user.grad.includes("pg"))
                setChecked(prev=>!prev)
            if(!checked &&user.user.grad.includes("ug"))
                setChecked(prev=>!prev)

        }
      };
    return(
    <Box p={10}>
        {/* <LinaerStepper user={user}/> */}
        {/* campus name */}
        <div className="form-container">            
            <FormControl
            variant="standard" sx={{ m: 1, minWidth: 120 }}
            style={{"width":"200px"}}>

                <InputLabel> Campus </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={campus}
                    label="campus"
                    name="campus"
                    onChange={handleChange}
                >
                    {/* <MenuItem value={"Select a campus"} >Select a campus</MenuItem> */}
                    {
                        user.user.campus.map(campusName=>
                            <MenuItem value={campusName}>{campusName.name}</MenuItem>
                            )
                    }
                </Select>
            </FormControl>
            <FormControl
            variant="standard" sx={{ m: 1, minWidth: 120 }}
            style={{"width":"200px"}}>
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
                    {/* <MenuItem value={"Select a campus"} >Select a campus</MenuItem> */}
                    {
                        user.user.institute.map(instName=>
                            <MenuItem value={instName}>{instName.name}</MenuItem>
                            )
                    }
                </Select>

            </FormControl>
            <FormGroup>
            <FormControlLabel control={
        <Switch
        checked={checked}
        onChange={handleChange}
        name="isUG"
        inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="UnderGraduate" />
            </FormGroup>
        </div>

        
    </Box>
    )
}
export default Admin