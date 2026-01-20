import React from 'react'
import { useState } from 'react'
import { Box, Button, CircularProgress, Grid, Card, CardContent, Typography, skeletonClasses } from '@mui/material'
import { API } from '../api/auth.api'
import BurnoutReportSection from './BurnoutReportSection'

const BurnoutAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const res = await API.get("/analyze/analyzeBurnout")
      console.log("res", res)
      setData(res.data.analyzed_data)
    } catch (err) {
      alert("Anlaysis failed")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h6" gutterBottom>
        Employee Burnout Analysis
      </Typography>

      {/* Run Analysis Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={runAnalysis}
        disabled={loading}
        sx={{ mb: 3 }}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Analyzing...
          </>
        ) : (
          "Run Burnout Analysis"
        )}
      </Button>

      {/* No Data Yet */}
      {!data && !loading && (
        <Card sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Click <strong>Run Burnout Analysis</strong> to evaluate employee
            workload and well-being using AI insights.
          </Typography>
        </Card>
      )}

      {/* Analysis Result */}
      {data && <BurnoutReportSection data={data} />}
    </Box>
  )
}

export default BurnoutAnalysis