import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider
} from "@mui/material";
;
import { getManagerTask } from "../services/managerService";
import ManagerLayout from "../theme/ManagerLayout";

const ManagerDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getManagerTask();
    setTasks(res.data);
  };

  return (
    <ManagerLayout/>
  );
};

export default ManagerDashboard;
