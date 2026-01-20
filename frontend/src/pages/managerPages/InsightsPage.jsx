import { Typography } from "@mui/material";
import BurnoutAnalysis from "../../components/BurnoutAnalysis";

const InsightsPage = () => {
  return (
    <>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Team Health Insights
      </Typography>

      <BurnoutAnalysis />
    </>
  );
};

export default InsightsPage;
