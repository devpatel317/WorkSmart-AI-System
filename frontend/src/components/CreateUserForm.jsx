import React from 'react'
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography
} from "@mui/material";
import { API } from '../api/auth.api';

const CreateUserForm = () => {

    const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("User created successfully");
    setForm({
      name: "",
      email: "",
      password: "",
      role: "employee"
    });
  };

  return (
   <Box sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "background.paper" }}>
      <Typography variant="h6" mb={2}>
        Create User
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <TextField
          label="Temporary Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          {/* <MenuItem value="admin">Admin</MenuItem> */}
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">
          Create User
        </Button>
      </Box>
    </Box>
  )
}

export default CreateUserForm