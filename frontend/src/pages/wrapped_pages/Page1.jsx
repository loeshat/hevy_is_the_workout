import React from "react";
import { Box, Typography } from "@mui/material";
import { useResult } from "../../App";
import Waves from "../../components/Waves";
import BackgroundImage from "../../components/BackgroundImage";
import { motion } from "framer-motion";

const Page1 = () => {
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
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.5 }}
      >
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
            position: "relative",
          }}
        >
          <Box sx={{ marginTop: "200px" }} />

          {/* Animated Background Images */}
          <BackgroundImage
            component="dumbbell_pink"
            left={{ xs: "15%", sm: "35%", md: "50%", lg: "50%" }}
            top="10vh"
            transform="rotate(20deg)"
          />

          <BackgroundImage
            component="dumbbell_pink"
            left={{ xs: "0%", sm: "0%", md: "15%", lg: "20%" }}
            top="55vh"
            transform="rotate(-20deg)"
          />

          {/* Animated Main Text */}
          <Box sx={{ zIndex: 1 }}>
            <motion.div {...fadeInVariants(0.6)}>
              <Typography
                variant="h5"
                sx={{
                  color: "var(--blue)",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                You’ve worked out
              </Typography>
            </motion.div>

            <motion.div {...fadeInVariants(0.8)}>
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
            </motion.div>

            <motion.div {...fadeInVariants(1.0)}>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--blue)",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                times! So strong!
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ marginTop: "215px" }} />
          <Waves />
          <Waves />
        </Box>
      </motion.div>
    </>
  );
};

export default Page1;
