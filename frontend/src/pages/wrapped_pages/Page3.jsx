import React from "react";
import StoryProgressBar from "../../components/StoryProgressBar";
import { Box, Typography, Grid } from "@mui/material";
import { useResult } from "../../App";

const Page3 = () => {
  const { result } = useResult();

  // Map most_active_time_of_day to a dynamic title
  const timeOfDayTitles = {
    "early morning": "Sunrise Sprinter",
    morning: "Morning Mover",
    afternoon: "Afternoon Ace",
    evening: "Evening Enthusiast",
    "late night": "Late Night Hustler",
  };

  // Get the appropriate title based on result.most_active_time_of_day
  const title =
    timeOfDayTitles[result.most_active_time_of_day.toLowerCase()] ||
    "Go-Getter";

  return (
    <>
      <StoryProgressBar />
      <Box
        sx={{
          backgroundColor: "#D3F970",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          padding: "30px",
        }}
      >
        {/* Content */}
        <Box sx={{ zIndex: 1 }}>
          {/* "You're a ..." */}
          <Typography variant="h6" color="textPrimary" fontWeight="bold">
            you're a
          </Typography>
          <Typography
            variant="h4"
            color="var(--bright-pink)"
            fontWeight="bold"
            sx={{ marginBottom: 5, marginTop: 5 }}
          >
            {title}
          </Typography>

          {/* Icon */}
          <img
            src="../src/assets/day_1_pink.png"
            style={{
              width: "40vw",
              maxWidth: "400px",
            }}
          />
          {/* Statistic */}
          <Typography
            variant="h6"
            color="textPrimary"
            sx={{ marginBottom: 1, marginTop: 3 }}
          >
            <Typography
              component="span"
              variant="h6"
              color="var(--bright-pink)"
              sx={{ fontWeight: "bold" }}
            >
              {result.percentage_most_active_time_of_day}
            </Typography>
            % of your workouts were <br /> in the{" "}
            <Typography
              component="span"
              color="var(--bright-pink)"
              variant="h6"
              sx={{ fontWeight: "bold" }}
            >
              {" "}
              {result.most_active_time_of_day.toLowerCase()}
            </Typography>{" "}
            😲
          </Typography>

          {/* Ranking */}
          <Grid
            container
            spacing={1}
            direction="column"
            sx={{
              maxWidth: "300px",
              margin: "0 auto",
              borderRadius: "8px",
              padding: 2,
              marginTop: 2,
            }}
          >
            {[
              // Ranking items
              { time: "Mornings", workouts: 160, color: "var(--bright-pink)" },
              { time: "Afternoon", workouts: 20, color: "#000000" },
              { time: "Late Night", workouts: 16, color: "#000000" },
            ].map((item, index) => (
              <Grid
                item
                key={index}
                sx={{
                  color: item.color,
                }}
              >
                <Typography
                  sx={{ fontSize: "1rem", marginBottom: "1%" }}
                  fontWeight="bold"
                >
                  #{index + 1} {item.time} ({item.workouts} workouts)
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Page3;
