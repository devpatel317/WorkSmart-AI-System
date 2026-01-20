import { Outlet, NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography
} from "@mui/material";

const ManagerLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          borderRight: "1px solid",
          borderColor: "divider",
          p: 2
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          WorkSmart AI
        </Typography>

        <List>
          {[
            { label: "Tasks", path: "/manager/tasks" },
            { label: "Assign Task", path: "/manager/assign" },
            { label: "Insights", path: "/manager/insights" }
          ].map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 1,
                "&.active": {
                  bgcolor: "action.selected",
                  fontWeight: 600
                }
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ManagerLayout;
