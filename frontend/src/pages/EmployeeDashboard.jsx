import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'

import ActiveTasksTable from '../components/ActiveTasksTable'
import WorkHistoryTable from '../components/WorkHistoryTable'
import {
  getMyTask,
  updateTaskStatus,
  getWorkHistory
} from '../services/taskService'

const EmployeeDashboard = () => {
  const [activeView, setActiveView] = useState('tasks')
  const [tasks, setTasks] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const taskRes = await getMyTask()
    const historyRes = await getWorkHistory()

    setTasks(taskRes.data)
    setHistory(historyRes.data)
  }

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status)
    loadData()
  }

  return (
    <Box display="flex" height="100vh">
      {/* 🔹 LEFT SIDEBAR */}
      <Paper
        elevation={3}
        sx={{
          width: 240,
          p: 2,
          borderRadius: 0
        }}
      >
        <Typography variant="h6" mb={2} fontWeight="bold">
          Employee Panel
        </Typography>

        <List>
          <ListItemButton
            selected={activeView === 'tasks'}
            onClick={() => setActiveView('tasks')}
          >
            <ListItemText primary="My Tasks" />
          </ListItemButton>

          <ListItemButton
            selected={activeView === 'history'}
            onClick={() => setActiveView('history')}
          >
            <ListItemText primary="Work History" />
          </ListItemButton>
        </List>
      </Paper>

      {/* 🔹 RIGHT CONTENT */}
      <Box flex={1} p={3}>
        {activeView === 'tasks' && (
          <>
            <Typography variant="h5" mb={3} fontWeight="bold">
              My Tasks
            </Typography>

            <Paper sx={{ p: 3 }}>
              <ActiveTasksTable
                tasks={tasks}
                onStatusChange={handleStatusChange}
              />
            </Paper>
          </>
        )}

        {activeView === 'history' && (
          <>
            <Typography variant="h5" mb={3} fontWeight="bold">
              Work History
            </Typography>

            <Paper sx={{ p: 3 }}>
              <WorkHistoryTable rows={history} />
            </Paper>
          </>
        )}
      </Box>
    </Box>
  )
}

export default EmployeeDashboard
