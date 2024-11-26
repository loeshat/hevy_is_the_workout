import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GoBackButton from "../components/GoBackButton";

const HelpPage = () => {
  const navigate = useNavigate();

  // Define the motion variants for the transition
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: "var(--blue)",
          maxWidth: "100vw",
          overflowX: "hidden",
          color: "var(--green)",
          padding: "20px",
          paddingTop: "80px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: { xs: "15%", md: "45%", lg: "50%" },
            backgroundSize: "contain",
            zIndex: 0,
          }}
        >
          <img
            src="../src/assets/dumbbell_blue.png"
            style={{
              width: "70vw",
              maxWidth: "400px",
              transform: "rotate(40deg)",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "65%",
            left: { xs: "-10%", md: "10%", lg: "25%" },
            backgroundSize: "contain",
            zIndex: 0,
          }}
        >
          <img
            src="../src/assets/water_bottle_blue.png"
            style={{
              width: "80vw",
              maxWidth: "400px",
              transform: "rotate(-20deg)",
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "120%",
            left: { xs: "30%", md: "45%", lg: "50%" },
            backgroundSize: "contain",
            zIndex: 0,
          }}
        >
          <img
            src="../src/assets/kettlebell_blue.png"
            style={{
              width: "60vw",
              maxWidth: "400px",
              transform: "rotate(20deg)",
            }}
          />
        </Box>
        <Container
          maxWidth="sm"
          sx={{
            padding: "40px",
            position: "relative",
            zIndex: 1,
            textAlign: "left",
          }}
        >
          <GoBackButton colour="blue" backgroundColour="green" />
          {/* Main Heading */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
            Where do I export my data?
          </Typography>

          {/* Step-by-Step Guide */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              1. Head to your settings via the profile tab.
            </Typography>
            <img
              src="../src/assets/help1.png"
              style={{
                width: "90%",
                borderRadius: "15px",
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              2. Navigate to "Export & Import Data".
            </Typography>
            <img
              src="../src/assets/help2.png"
              style={{
                width: "90%",
                borderRadius: "15px",
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              3. Navigate to "Export Data".
            </Typography>
            <img
              src="../src/assets/help3.png"
              style={{
                width: "90%",
                borderRadius: "15px",
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              4. Export Workouts and save the csv document to your device.
            </Typography>
            <img
              src="../src/assets/help4.png"
              style={{
                width: "90%",
                borderRadius: "15px",
              }}
            />
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HelpPage;
