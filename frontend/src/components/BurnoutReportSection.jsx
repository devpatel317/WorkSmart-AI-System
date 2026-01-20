import React from 'react'
import {
    Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Divider,
  Alert,
  Button,
  Drawer,
  Stack
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const riskColor = (risk) =>
  risk === "high" ? "error" : risk === "medium" ? "warning" : "success";

const BurnoutReportSection = ({ data }) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);

  if (!data.burnout_detected) {
    return (
      <Alert severity="success" sx={{ mt: 3 }}>
        No burnout risks detected. Team workload is healthy.
      </Alert>
    );
  }

  const highRiskCount = data.burnout_assessments.filter(
    (e) => e.risk_level === "high"
  ).length;


    return (
     <Box sx={{ mt: 3 }}>
      {/* Summary */}
      <Alert
        icon={<WarningAmberRoundedIcon />}
        severity="warning"
        sx={{ mb: 2 }}
      >
        {highRiskCount} employee{highRiskCount > 1 ? "s" : ""} at high burnout
        risk. Review recommended actions.
      </Alert>

      {/* Risk Rows */}
      {data.burnout_assessments.map((item) => {
        const snapshot = data.employee_snapshots.find(
          (e) => e.employee_id === item.employee_id
        );

        return (
          <Box key={item.employee_id}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ py: 1.5 }}
            >
              {/* Left */}
              <Stack spacing={0.5}>
                <Chip
                  size="small"
                  label={`${item.risk_level.toUpperCase()} RISK`}
                  color={riskColor(item.risk_level)}
                />

                <Typography variant="body2" fontWeight={500}>
                  Employee ID: {item.employee_id.slice(-6)}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {item.explanation}
                </Typography>
              </Stack>

              {/* Middle */}
              {snapshot && (
                <Stack direction="row" spacing={1}>
                  <Chip label={`Tasks: ${snapshot.total_tasks}`} size="small" />
                  <Chip
                    label={`Overdue: ${snapshot.overdue_tasks}`}
                    size="small"
                    color={
                      snapshot.overdue_tasks > 0 ? "error" : "success"
                    }
                  />
                </Stack>
              )}

              {/* Right */}
              <Button
                size="small"
                onClick={() => {
                  setSelected({ item, snapshot });
                  setOpen(true);
                }}
              >
                View details
              </Button>
            </Stack>

            <Divider />
          </Box>
        );
      })}

      {/* Detail Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        {selected && (
          <Box sx={{ width: 360, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Burnout Details
            </Typography>

            <Typography variant="body2" gutterBottom>
              {selected.item.explanation}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2">Workload Snapshot</Typography>
            <Stack spacing={1} mt={1}>
              <Chip
                label={`Total Tasks: ${selected.snapshot.total_tasks}`}
              />
              <Chip
                label={`In Progress: ${selected.snapshot.in_progress_tasks}`}
              />
              <Chip
                label={`Overdue Tasks: ${selected.snapshot.overdue_tasks}`}
                color={
                  selected.snapshot.overdue_tasks > 0 ? "error" : "success"
                }
              />
            </Stack>
          </Box>
        )}
      </Drawer>
    </Box>
    );
}

export default BurnoutReportSection