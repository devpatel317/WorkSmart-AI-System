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

const rows = [
  {
    id: 1,
    title: "Database cleanup",
    completedOn: "2026-01-05",
    timeTaken: "3h"
  },
  {
    id: 2,
    title: "UI bug fixes",
    completedOn: "2026-01-03",
    timeTaken: "5h"
  }
];

const columns = [
  { field: "title", headerName: "Task", flex: 1 },
  { field: "completedOn", headerName: "Completed On", flex: 1 },
  { field: "timeTaken", headerName: "Time Taken", flex: 1 }
];


const WorkHistoryTable = ({rows}) => {
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
      renderCell: () => (
        <Chip label="Completed" color="success" size="small" />
      )
    },
    // {
    //   field: "completedAt",
    //   headerName: "Completed On",
    //   width: 160,
    //   valueFormatter: (params) =>
    //     params.value
    //       ? new Date(params.value).toLocaleDateString()
    //       : "-"
    // }
  ];

 return (
     <Box sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Work History
      </Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
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

export default WorkHistoryTable