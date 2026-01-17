import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import ActiveTasksTable from '../components/ActiveTasksTable'
import WorkHistoryTable from '../components/WorkHistoryTable'
import { getMyTask, updateTaskStatus, getWorkHistory } from '../services/taskService'
import { useState, useEffect } from 'react'

const EmployeeDashboard = () => {
    const [tasks,setTasks] = useState([])
    const [history, setHistory] = useState([])
  
    useEffect(() => {
          loadData();
    },[])
  
    const loadData = async () => {
          const taskRes = await getMyTask();
          const historyRes = await getWorkHistory();
          console.log("taskRes",taskRes)
          setTasks(taskRes.data)
          setHistory(historyRes.data)
    }

    const handleDone = async (id) => {
      await updateTaskStatus(id)
      loadData();
    }
  
   return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Employee Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Active Tasks
        </Typography>
        <ActiveTasksTable tasks={tasks} onDone={handleDone}/>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Work History
        </Typography>
        <WorkHistoryTable rows={history}/>
      </Paper>
    </Box>
  );
}

export default EmployeeDashboard