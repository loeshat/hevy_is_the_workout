import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useResult } from "../../App";
import BackgroundImage from "../../components/BackgroundImage";
import { motion } from "framer-motion";

const Page3 = () => {
  const { result } = useResult();

  const sortedWorkouts = Object.entries(result.workouts_per_time_of_day)
    .sort(([, workoutsA], [, workoutsB]) => workoutsB - workoutsA)
    .map(([day, workouts]) => ({ day, workouts }))
    .slice(0, 5);

  const timeOfDayTitles = {
    "early morning": "Sunrise Sprinter",
    morning: "Morning Mover",
    afternoon: "Afternoon Ace",
    evening: "Evening Enthusiast",
    "late night": "Late Night Hustler",
  };

  const title =
    timeOfDayTitles[result.most_active_time_of_day.toLowerCase()] ||
    "Go-Getter";

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const fadeInVariants = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6 },
  });

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: "#D3F970",
          maxHeight: "96vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflowY: "hidden",
          overflowX: "hidden",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Background Images */}
        <BackgroundImage
          component="sun_yellow"
          left={{ xs: "0%", md: "10%", lg: "25%" }}
          top="-5vh"
          transform="rotate(-20deg)"
        />
        <BackgroundImage
          component="moon_yellow"
          left={{ xs: "20%", md: "10%", lg: "25%" }}
          top="60vh"
          transform="rotate(-90deg)"
        />

        {/* Content */}
        <Box sx={{ zIndex: 1 }}>
          {/* "You're a ..." */}
          <motion.div {...fadeInVariants(0.6)}>
            <Typography variant="h6" color="textPrimary" fontWeight="bold">
              you're a
            </Typography>
          </motion.div>

          <motion.div {...fadeInVariants(0.8)}>
            <Typography
              variant="h4"
              color="var(--bright-pink)"
              fontWeight="bold"
              sx={{ marginBottom: 5, marginTop: 5 }}
            >
              {title}
            </Typography>
          </motion.div>

          {/* Icon */}
          <motion.div {...fadeInVariants(1.0)}>
            <img
              src="../src/assets/day_1_pink.png"
              style={{ width: "50%", height: "auto" }}
            />
          </motion.div>

          {/* Statistic */}
          <motion.div {...fadeInVariants(1.2)}>
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
                {result.most_active_time_of_day.toLowerCase()}
              </Typography>{" "}
              😲
            </Typography>
          </motion.div>

          {/* Ranking */}
          <motion.div {...fadeInVariants(1.4)}>
            <Stack spacing={2} mt={5}>
              {sortedWorkouts.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  {/* Number column */}
                  <Typography
                    sx={{
                      color: "var(--bright-pink)",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      minWidth: "40px",
                      textAlign: "right",
                    }}
                  >
                    #{index + 1}
                  </Typography>

                  {/* Text column */}
                  <Typography>
                    <strong>{item.day}</strong>{" "}
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.8rem",
                      }}
                    >
                      (
                      <strong style={{ color: "#ff00ff" }}>
                        {item.workouts}
                      </strong>{" "}
                      workouts)
                    </Typography>
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Page3;
