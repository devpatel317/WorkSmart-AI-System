import React, { useEffect, useState } from 'react'
import { Box, Paper, List, ListItemButton, ListItemText, Typography, Button } from '@mui/material'
import { logout } from '../utils/auth'
import CreateUserForm from '../components/CreateUserForm'
import AdminUserTable from '../components/AdminUserTable'
import { API } from '../api/auth.api'

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('create')
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const res = await API.get('/admin/users')
    setUsers(res.data.users)
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
          Admin Panel
        </Typography>

        <List>
          <ListItemButton
            selected={activeView === 'create'}
            onClick={() => setActiveView('create')}
          >
            <ListItemText primary="Create User" />
          </ListItemButton>

          <ListItemButton
            selected={activeView === 'users'}
            onClick={() => setActiveView('users')}
          >
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </List>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 3 }}
          onClick={logout}
        >
          Logout
        </Button>
      </Paper>

      {/* 🔹 RIGHT CONTENT */}
      <Box flex={1} p={3}>
        {activeView === 'create' && (
          <>
            <Typography variant="h5" mb={3} fontWeight="bold">
              Create User
            </Typography>
            <CreateUserForm onUserCreated={loadUsers} />
          </>
        )}

        {activeView === 'users' && (
          <>
            <Typography variant="h5" mb={3} fontWeight="bold">
              Manage Users
            </Typography>
            <AdminUserTable users={users} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AdminDashboard
