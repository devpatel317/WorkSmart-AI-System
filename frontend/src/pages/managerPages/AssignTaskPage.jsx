import { Typography } from "@mui/material";
import {AssignTaskform} from "../../components/AssignTaskform";

const AssignTaskPage = () => {
  return (
    <>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Assign New Task
      </Typography>

      <AssignTaskform />
    </>
  );
};

export default AssignTaskPage;
