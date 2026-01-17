import React, { useEffect, useState } from 'react'
import { AssignTaskform } from '../components/AssignTaskform'
import ManagerTaskTable from '../components/ManagerTaskTable'
import { getManagerTask } from '../services/managerService';
import BurnoutAnalysis from '../components/BurnoutAnalysis';


const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  },[])

  const loadTasks = async () => {
    const res = await getManagerTask();
    console.log("res",res)
    setTasks(res.data)
  }

  return (
    <>
      <AssignTaskform/>
      <ManagerTaskTable rows={tasks}/>
      <BurnoutAnalysis/>
    </>  
  )
}

export default ManagerDashboard