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
  DialogContent
} from "@mui/material"  


const ActiveTasksTable = ({tasks,onDone}) => {
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
      renderCell: (params) => (
        <Chip label={params.value} color="info" size="small" />
      )
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
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={() => 
            // console.log("task done")
            onDone(params.row.id)
        }
        >
          Mark Done
        </Button>
      )
    }
  ];


  return (
   <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Active Tasks
      </Typography>

      <DataGrid
        rows={tasks}
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