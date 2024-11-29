import React from "react";
import { useResult } from "../../App";
import { Box, Typography, Stack } from "@mui/material";
import BackgroundImage from "../../components/BackgroundImage";
import { motion } from "framer-motion";

const Page4 = () => {
  const { result } = useResult();

  const sortedWorkouts = Object.entries(result.workouts_per_day_of_the_week)
    .sort(([, workoutsA], [, workoutsB]) => workoutsB - workoutsA)
    .map(([day, workouts]) => ({ day, workouts }));

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
          left={{ xs: "0%", md: "15%", lg: "20%" }}
          top="-5vh"
          transform="rotate(-20deg)"
        />
        <BackgroundImage
          component="moon_yellow"
          left={{ xs: "20%", sm: "40%", md: "40%", lg: "45%" }}
          top="60vh"
          transform="rotate(-90deg)"
        />

        {/* Content */}
        <Box
          sx={{
            zIndex: 1,
            maxWidth: { xs: "70%", sm: "50%", md: "30%", lg: "25%" },
          }}
        >
          {/* "With" text */}
          <motion.div {...fadeInVariants(0.6)}>
            <Typography variant="h6" fontWeight="bold">
              with
            </Typography>
          </motion.div>

          {/* Most frequent workout day */}
          <motion.div {...fadeInVariants(0.8)}>
            <Typography
              variant="h4"
              color="var(--bright-pink)"
              fontWeight="bold"
              sx={{ marginBottom: 2, marginTop: 5 }}
            >
              {result.most_frequent_day_of_week}
            </Typography>
          </motion.div>

          {/* Favourite day text */}
          <motion.div {...fadeInVariants(1.0)}>
            <Typography sx={{ mb: 5 }}>
              as your favourite day to workout!
            </Typography>
          </motion.div>

          {/* Image */}
          <motion.div {...fadeInVariants(1.2)}>
            <img
              src="/assets/day_2_muscle_pink.png"
              alt="Muscle icon"
              style={{ width: "50%", height: "auto" }}
            />
          </motion.div>

          {/* Ranking */}
          <motion.div {...fadeInVariants(1.4)}>
            <Stack spacing={1} mt={3}>
              {sortedWorkouts.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
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

export default Page4;
