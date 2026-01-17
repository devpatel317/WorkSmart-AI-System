import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography
} from "@mui/material";
import axios from "axios"; 
import { API } from "../api/auth.api";
import { createTask } from "../services/taskService";



export const AssignTaskform = () => {
    const internalKey = import.meta.env.VITE_INTERNAL_API_KEY;
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        title : "",
        description : "",
        priority : "",
        deadline : "",
        assignedTo : ""
    })

    useEffect(() => {
       API.get("/users/employees", {
        headers : {
            "x-internal-key" : internalKey
        }
       }).then(res => {
        setEmployees(res.data)
       })
    },[])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        }) 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        await createTask(form)
        alert("Task assigned Successfully")
        setForm({
            title : "",
            description : "",
            priority : "",
            deadline : "",
            assignedTo : ""
        })
    }

  return (
     <Box sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "background.paper" }}>
      <Typography variant="h6" mb={2}>
        Assign New Task
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          label="Task Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          value={form.description}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        <TextField
          type="date"
          label="Deadline"
          name="deadline"
          InputLabelProps={{ shrink: true }}
          value={form.deadline}
          onChange={handleChange}
        />

        <TextField
          select
          label="Assign To"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          required
        >
          {employees.map(emp => (
            <MenuItem key={emp.id} value={emp.id}>
              {emp.name} ({emp.email})
              {/* {emp.name} */}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained">
          Assign Task
        </Button>
      </Box>
    </Box>
  )
}
