import React from "react";
import { Box, Typography } from "@mui/material";
import { useResult } from "../../App";
import BackgroundImage from "../../components/BackgroundImage";
import { motion } from "framer-motion";

const Page5 = () => {
  const { result } = useResult();

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
          maxHeight: "93vh",
          height: "100vh",
          color: "var(--green)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 8,
          paddingBottom: 0,
          overflow: "hidden",
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
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 5, fontSize: "2.5rem" }}
            >
              {result.top_five_exercises.exercise_title[0]}
            </Typography>
          </motion.div>

          {/* Subheading Animation */}
          <motion.div {...fadeInVariants(0.8)}>
            <Typography
              variant="body1"
              sx={{ marginBottom: 4, fontSize: "1.2rem" }}
            >
              kept you coming back to the gym
            </Typography>
          </motion.div>

          {/* Image Animation */}
          <motion.div {...fadeInVariants(1.0)}>
            <Box sx={{ mb: 8 }}>
              <img src="./assets/workouts_4.png" width="100%" />
            </Box>
          </motion.div>

          {/* Statistics with Animation */}
          <motion.div {...fadeInVariants(1.2)}>
            <Typography
              variant="h1"
              sx={{ fontSize: "1.2rem", marginBottom: 5 }}
            >
              you completed{" "}
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: "var(--pink)",
                  fontSize: "1.2rem",
                }}
              >
                {result.top_five_exercises.total_sets[0]}{" "}
              </Typography>{" "}
              sets with a total volume of{" "}
              <Typography
                component="span"
                sx={{
                  fontWeight: "bold",
                  color: "var(--pink)",
                  fontSize: "1.2rem",
                }}
              >
                {Math.round(
                  result.top_five_exercises.total_volume[0]
                ).toLocaleString()}{" "}
              </Typography>
              kg!
            </Typography>
          </motion.div>

          {/* Conclusion Animation */}
          <motion.div {...fadeInVariants(1.4)}>
            <Typography variant="h1" sx={{ fontSize: "1.2rem" }}>
              that is outrageous!
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Page5;
