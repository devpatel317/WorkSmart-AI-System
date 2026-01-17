import {
  Box,
  Button,
  TextField,
  Typography,
  Paper
} from "@mui/material";
import { useState } from "react";
import RoleSelector from "../components/RoleSelector";


const Register = () => {
  const [role, setRole] = useState("employee");

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ p: 4, width: 380 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Register – WorkSmart AI
        </Typography>

        <RoleSelector role={role} setRole={setRole} />

        <TextField fullWidth label="Name" margin="normal" />
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />

        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Register as {role}
        </Button>
      </Paper>
    </Box>
  );
}

export default Register