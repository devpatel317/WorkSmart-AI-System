import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Chip,
  Button,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  TextField
} from "@mui/material"  


const ActiveTasksTable = ({tasks,onStatusChange}) => {
    const [open, setOpen] = React.useState(false);
    const [fullDesc, setFullDesc] = React.useState("");

    const handleOpenDesc = (desc) => {
        setFullDesc(desc);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFullDesc("");
    };

    
  const columns = [
    {
      field: "title",
      headerName: "Task",
      flex: 1,
      minWidth: 150
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 250,
      renderCell: (params) => {
        const text = params.value || "";
        const short = text.length > 60 ? text.slice(0, 60) + "..." : text;

        return (
          <Tooltip title="Click to view full description">
            <Typography
              variant="body2"
              sx={{ cursor: "pointer", color: "primary.main" }}
              onClick={() => handleOpenDesc(text)}
            >
              {short}
            </Typography>
          </Tooltip>
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
          params.value === "completed"
            ? "success"
            : params.value === "in_progress"
            ? "warning"
            : "info";

        return(
          <Chip label={params.value.replace("_"," ")} color={color} size="small" />
        )
      }
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 140,
      valueFormatter: (params) =>
        params.value
          ? new Date(params.value).toLocaleDateString()
          : "-"
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      align : "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        const row = params?.row;

    if (!row) return null;

    const { status, id } = row;

    if (status === "completed") {
      return <Chip label="Completed" color="success" size="small" />;
    }

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <Select
          size="small"
          value=""
          displayEmpty
          onChange={(e) => onStatusChange(id, e.target.value)}
          sx={{
            minWidth: 140,
            height: 32,
            borderRadius: "16px",
            "& fieldset": { border: "none" },
            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 12px"
            }
          }}
          renderValue={() =>
            status === "pending" ? "Pending" : "In Progress"
          }
        >
          {status === "pending" && (
            <MenuItem value="in_progress">In Progress</MenuItem>
          )}
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </Box>
    );
  
      }
    }
  ];


  return (
   <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Active Tasks
      </Typography>

      <DataGrid
        rows={tasks}
        // getRowId={(row) => row._id}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } }
        }}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2
        }}
      />

      {/* Description Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Task Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{fullDesc}</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ActiveTasksTable