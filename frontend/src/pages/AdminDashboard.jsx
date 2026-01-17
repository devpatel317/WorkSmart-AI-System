import React, { useEffect, useState } from 'react'
import { logout } from '../utils/auth'
import CreateUserForm from '../components/CreateUserForm'
import AdminUserTable from '../components/AdminUserTable'
import { API } from '../api/auth.api'

const AdminDashboard = () => {
  const [users,setUsers] = useState([])
  useEffect(() => {
    loadUsers();
  },[])

  const loadUsers = async() => {
    const res = await API.get("/admin/users")
    setUsers(res.data.users)
  }

  return (
    <>
        <h2>AdminDashboard</h2>
        <CreateUserForm/>
        <AdminUserTable users={users} />
        <button onClick={logout}>Logout</button>
    </>
    
  )
}

export default AdminDashboard