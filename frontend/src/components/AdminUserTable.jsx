import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Chip } from "@mui/material";


const AdminUserTable = ({users}) => {

    const columns = [
    { field: "name", headerName: "Name", flex: 1 },

    { field: "email", headerName: "Email", flex: 1.5 },

    {
      field: "role",
      headerName: "Role",
      width: 140,
      renderCell: (params) => {
        const color =
          params.value === "admin"
            ? "error"
            : params.value === "manager"
            ? "warning"
            : "success";

        return <Chip label={params.value} color={color} size="small" />;
      }
    },

    {
      field: "createdAt",
      headerName: "Created",
      width: 150,
      valueFormatter: (params) =>
        params.value
          ? new Date(params.value).toLocaleDateString()
          : "-"
    }
  ];

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        All Users
      </Typography>

      <DataGrid
        rows={users}
        getRowId={(row) => row._id}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default AdminUserTable