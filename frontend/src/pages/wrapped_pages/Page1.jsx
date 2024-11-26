import React from "react";
import { Box, Typography } from "@mui/material";
import { useResult } from "../../App";
import StoryProgressBar from "../../components/StoryProgressBar";

import Waves from "../../components/Waves";
import Dumbbell from "../../components/Dumbbell";

const Page1 = () => {
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
          You’ve worked out
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "var(--green)",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {result.total_workouts}
        </Typography>
        <Typography
          sx={{ color: "var(--blue)", fontWeight: "bold", textAlign: "center" }}
        >
          times! So strong!
        </Typography>
      </Box>
      <Box sx={{ marginTop: "175px" }} />
      <Waves />
      <Waves />
    </Box>
  );
};

export default Page1;
