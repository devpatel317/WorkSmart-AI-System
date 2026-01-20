import React, { useEffect, useState } from "react";
import ManagerTaskTable from "../../components/ManagerTaskTable";
import { getManagerTask } from "../../services/managerService";
import { Typography } from "@mui/material";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getManagerTask();
    setTasks(res.data);
  };

  return (
    <>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Assigned Tasks
      </Typography>

      <ManagerTaskTable rows={tasks} />
    </>
  );
};

export default TasksPage;
