import React from "react";
import { Box, Typography } from "@mui/material";
import { useResult } from "../../App";
import BackgroundImage from "../../components/BackgroundImage";
import { motion } from "framer-motion";

const Page7 = () => {
  const { result } = useResult();
  const BLUE_WHALE_WEIGHT = 150000;

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
          backgroundColor: "var(--teal)",
          maxHeight: "100vh",
          height: "100vh",
          color: "var(--green)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          padding: 8,
          paddingTop: 0,
          paddingBottom: 0,
          position: "relative",
        }}
      >
        {/* Background Images */}
        <BackgroundImage
          component="dumbbell_teal"
          left={{ xs: "0%", md: "10%", lg: "25%" }}
          top="-5vh"
          transform="rotate(-20deg)"
        />
        <BackgroundImage
          component="kilogram_teal"
          left={{ xs: "35%", sm: "60%", md: "50%", lg: "55%" }}
          top="30vh"
          transform="rotate(5deg)"
        />
        <BackgroundImage
          component="kilogram_teal"
          left={{ xs: "-20%", sm: "0%", md: "10%", lg: "25%" }}
          top="70vh"
          transform="rotate(35deg)"
        />

        {/* Content */}
        <Box sx={{ zIndex: 1, color: "var(--light-green)" }}>
          {/* Lifted Weight Animation */}
          <motion.div {...fadeInVariants(0.6)}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 4,
                fontWeight: "bold",
              }}
            >
              you lifted
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bold" }}>
              {Math.round(result.total_volume_kgs).toLocaleString()}
              <Typography component="span" variant="h6">
                {" "}
                kgs
              </Typography>
            </Typography>
          </motion.div>

          {/* Whale Image Animation */}
          <motion.div {...fadeInVariants(0.8)}>
            <Box sx={{ mt: 5, mb: 5 }}>
              <img src="./assets/whale.png" width="80%" />
            </Box>
          </motion.div>

          {/* Blue Whale Equivalent Animation */}
          <motion.div {...fadeInVariants(1.0)}>
            <Typography variant="h6">
              that is the equivalent of{" "}
              <Typography component="span" variant="h6" fontWeight="bold">
                {(result.total_volume_kgs / BLUE_WHALE_WEIGHT).toFixed(2)}
              </Typography>{" "}
              adult blue whales!
            </Typography>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Page7;
