import React from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, Grid, Card, CardContent, Typography, skeletonClasses } from '@mui/material'
import { API } from '../api/auth.api'

const BurnoutAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await API.get("/analyze/analyzeBurnout")
      console.log("res", res)
      setData(res.data)
    } catch (err) {
      alert("Anlaysis failed")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>
        AI Workload Analysis
      </Typography>

      <Button
        variant="contained"
        onClick={runAnalysis}
        disabled={loading}
      >
        Run Analysis
      </Button>

      {loading && (
        <Box mt={2}>
          <CircularProgress />
        </Box>
      )}

      {data && (
        <>
          {data.burnout_detected ? (
            // <Grid container spacing={2} mt={2}>
            //   <Grid item xs={12} md={3}>
            //     <Card>
            //       <CardContent>
            //         <Typography>Total Tasks</Typography>
            //         <Typography variant="h5">{data.total_tasks}</Typography>
            //       </CardContent>
            //     </Card>
            //   </Grid>

            //   <Grid item xs={12} md={3}>
            //     <Card>
            //       <CardContent>
            //         <Typography>Burnout Score</Typography>
            //         <Typography variant="h5" color="error">
            //           {data.burnout_score}
            //         </Typography>
            //       </CardContent>
            //     </Card>
            //   </Grid>

            //   <Grid item xs={12} md={3}>
            //     <Card>
            //       <CardContent>
            //         <Typography>Risk Level</Typography>
            //         <Typography variant="h5">
            //           {data.risk_level}
            //         </Typography>
            //       </CardContent>
            //     </Card>
            //   </Grid>

            //   <Grid item xs={12} md={3}>
            //     <Card>
            //       <CardContent>
            //         <Typography>Affected Employees</Typography>
            //         <Typography variant="h5">
            //           {data.affected_employees}
            //         </Typography>
            //       </CardContent>
            //     </Card>
            //   </Grid>
            // </Grid>
            <div>Analyzed data</div>
          ) : (
            <Box mt={3}>
              <Card sx={{ bgcolor: "#222422" }}>
                <CardContent>
                  <Typography variant="h6" color="success.main">
                    ✅ Team Workload is Healthy
                  </Typography>

                  <Typography mt={1}>
                    Our analysis indicates that the team workload is well balanced.
                    No burnout risks were detected at this time.
                  </Typography>

                  <Typography mt={1} color="text.secondary">
                    Keep up the good work and continue monitoring regularly.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </>
      )}

    </Box>
  )
}

export default BurnoutAnalysis