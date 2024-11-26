import React from "react";
import { Box, Typography } from "@mui/material";
import { useResult } from "../../App";
import StoryProgressBar from "../../components/StoryProgressBar";

import Waves from "../../components/Waves";
import Dumbbell from "../../components/Dumbbell";

const Page2 = () => {
  const { result } = useResult();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "var(--pink)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        overflowY: "hidden",
        overflowX: "hidden",
        maxHeight: "96vh",
      }}
    >
      <StoryProgressBar />
      <Box sx={{ marginTop: "200px" }} />
      <Dumbbell
        colour="pink"
        left={{ xs: "15%", md: "50%", lg: "50%" }}
        top="10vh"
        transform="rotate(20deg)"
      />
      <Dumbbell
        colour="pink"
        left={{ xs: "0%", md: "10%", lg: "25%" }}
        top="55vh"
        transform="rotate(-20deg)"
      />

      {/* Main Text */}
      <Box sx={{ zIndex: 1 }}>
        <Typography
          variant="h5"
          sx={{ color: "var(--blue)", fontWeight: "bold", textAlign: "center" }}
        >
          that is
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "var(--green)",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {result.total_workout_time_minutes.toLocaleString("en-US")}
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "var(--blue)", fontWeight: "bold", textAlign: "center" }}
        >
          minutes!
        </Typography>
        <Typography
          sx={{ color: "var(--blue)", textAlign: "center", marginTop: "20px" }}
        >
          You worked out on{" "}
          <strong>{Math.round(result.workout_percentage_days)}%</strong> of days
        </Typography>

        <Typography
          sx={{ color: "var(--blue)", textAlign: "center", marginTop: "20px" }}
        >
          with an average of{" "}
          <strong>{Math.round(result.average_workout_duration_minutes)}</strong>{" "}
          minutes per workout!
        </Typography>
      </Box>
      <Box sx={{ marginTop: "80px" }} />
      <Waves />
      <Waves />
    </Box>
  );
};

export default Page2;
