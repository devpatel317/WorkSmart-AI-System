import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const RoleSelector = ({role , setRole}) => {
  return (
        <ToggleButtonGroup value={role} exclusive onChange={(e,value) => value && setRole(value)} fullWidth sx={{mb : 2}}>
            <ToggleButton value="employee">Employee</ToggleButton>
            <ToggleButton value="manager">Manager</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default RoleSelector