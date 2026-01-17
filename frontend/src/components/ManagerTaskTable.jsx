import React from 'react'
import {
  Box,
  Chip,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ManagerTaskTable = ({rows}) => {
    console.log("rows",rows)
    const [open, setOpen] = React.useState(false);
    const [desc, setDesc] = React.useState("");

    const openDesc = (text) => {
        setDesc(text);
        setOpen(true);
    };

    const closeDesc = () => {
        setOpen(false);
        setDesc("");
    };

    const columns = [
    { field: "title", headerName: "Task", flex: 1 },

    {
      field: "description",
      headerName: "Description",
      flex: 2,
      renderCell: (params) => {
        const text = params.value || "";
        const short =
          text.length > 60 ? text.slice(0, 60) + "..." : text;

        return (
          <Tooltip title="Click to view full description">
            <Typography
              sx={{ cursor: "pointer", color: "primary.main" }}
              onClick={() => openDesc(text)}
            >
              {short}
            </Typography>
          </Tooltip>
        );
      }
    },

    {
      field: "employee",
      headerName: "Employee",
      width: 200,
    //   valueGetter: (params) =>
    //     `${params.row.assignedTo?.name} (${params.row.assignedTo?.email})`
     renderCell: (params) => {
        console.log("params",params)
        const emp = params.row.assignedTo; // assignedTo
        if (!emp) return "-";

        return (
        <Typography variant="body2">
            {emp.name} ({emp.email})
        </Typography>
        );
    }
    },

    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      renderCell: (params) => {
        const color =
          params.value === "high"
            ? "error"
            : params.value === "medium"
            ? "warning"
            : "success";
        return <Chip label={params.value} color={color} size="small" />;
      }
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        const color =
          params.value === "done"
            ? "success"
            : params.value === "in_progress"
            ? "warning"
            : "info";
        return <Chip label={params.value} color={color} size="small" />;
      }
    },

    {
      field: "deadline",
      headerName: "Deadline",
      width: 140,
      renderCell: (params) =>
        params.value
        ? new Date(params.value).toLocaleDateString()
        : "-"
    }
  ];

    return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Assigned Tasks
      </Typography>

      <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        sx={{ bgcolor: "background.paper", borderRadius: 2 }}
      />

      <Dialog open={open} onClose={closeDesc} maxWidth="sm" fullWidth>
        <DialogTitle>Task Description</DialogTitle>
        <DialogContent>
          <Typography>{desc}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
    )
}

export default ManagerTaskTable