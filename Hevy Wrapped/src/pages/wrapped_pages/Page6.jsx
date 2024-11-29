import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useResult } from "../../App";
import BackgroundImage from "../../components/BackgroundImage";
import { motion } from "framer-motion";

const Page6 = () => {
  const { result } = useResult();
  const topFiveExercises = result.top_five_exercises; // Now this is an array

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
          backgroundColor: "var(--blue)",
          maxHeight: "96.5vh",
          height: "100vh",
          color: "var(--green)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: 4,
          paddingBottom: 0,
          position: "relative",
        }}
      >
        {/* Background Images */}
        <BackgroundImage
          component="dumbbell_blue"
          left={{ xs: "0%", md: "10%", lg: "25%" }}
          top="-5vh"
          transform="rotate(-20deg)"
        />
        <BackgroundImage
          component="kettlebell_blue"
          left={{ xs: "25%", sm: "50%", md: "50%", lg: "55%" }}
          top="50vh"
          transform="rotate(20deg)"
        />

        {/* Content */}
        <Box sx={{ zIndex: 1 }}>
          {/* Title Animation */}
          <motion.div {...fadeInVariants(0.6)}>
            <Typography
              variant="h1"
              sx={{ marginBottom: 4, fontSize: "2.5rem", fontWeight: "bold" }}
            >
              Your Top 5 Exercises
            </Typography>
          </motion.div>

          {/* Exercises List Animation */}
          <motion.div {...fadeInVariants(0.8)}>
            <Grid container direction="column" spacing={1}>
              {topFiveExercises.map((exercise, index) => (
                <Grid
                  item
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "space-between",
                    color: "#dcdde1",
                  }}
                >
                  {/* Left Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "var(--green)" }}
                    >
                      #{index + 1}
                    </Typography>
                  </Box>
                  {/* Right Section */}
                  <Box
                    sx={{
                      flex: 1,
                      color: "var(--green)",
                      textAlign: "left",
                      marginLeft: 3,
                    }}
                  >
                    <Typography variant="h6">
                      {exercise.exerciseTitle}
                    </Typography>
                    <Typography variant="body2">
                      <Box
                        component="span"
                        sx={{ color: "var(--pink)", fontWeight: "bold" }}
                      >
                        {exercise.totalSets}
                      </Box>{" "}
                      sets,{" "}
                      <Box
                        component="span"
                        sx={{ color: "var(--pink)", fontWeight: "bold" }}
                      >
                        {exercise.totalVolume.toLocaleString()}
                      </Box>{" "}
                      kg volume
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Image Animation */}
          <motion.div {...fadeInVariants(1.0)}>
            <img src="/assets/workouts_4.png" width="100%" />
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Page6;
