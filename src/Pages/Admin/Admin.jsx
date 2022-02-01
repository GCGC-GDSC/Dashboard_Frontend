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
import "./Admin.styles.scss";
function Admin() {
  const user = useContext(UserContext);
  const [campus, setCampus] = useState(user.user.campus[0]);
  const [institute, setInstitute] = useState("");
  const [grad, setGrad] = useState("");
  const ariaLabel = { "aria-label": "description" };
  console.log(user);
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "campus") setCampus(value);
    else if (name === "institute") setInstitute(value);
    else if (name === "grad") setGrad(value);
  };
  return (
    <Box p={10}>
      <div className="form-container">
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
              <MenuItem value={campusName}>{campusName.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
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
                <MenuItem value={instName}>{instName.name}</MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>

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
            <MenuItem value={"Undergraduate"}>Undergraduate</MenuItem>
            <MenuItem value={"Postgraduate"}>Postgraduate</MenuItem>
          </Select>
        </FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          className="secondBox"
        >
            
          <Input
            placeholder="total_students
"
            value={grad}
            label="Enter this and that field"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="total_students
"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="total_higher_study_and_pay_crt
"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="total_opted_for_higher_studies_only
"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="total_not_intrested_in_placment
"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="Placeholder"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="Placeholder"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="Placeholder"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="Placeholder"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="Placeholder"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
          <Input
            placeholder="Placeholder"
            value={grad}
            label="grad"
            name="grad"
            onChange={handleChange}
            inputProps={ariaLabel}
          />
        </Box>
      </div>
    </Box>
  );
}
export default Admin;
