import React from "react";
import { Box, Typography, Button, Container, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundImage from "../components/BackgroundImage";
import UploadFileModal from "../components/UploadFileModal";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: "var(--green)",
          maxWidth: "100%",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Fixed Background Dumbbells */}
        <BackgroundImage
          component="dumbbell_green"
          left={{ xs: "15%", md: "35%", lg: "50%" }}
          top="5%"
          transform="rotate(20deg)"
        />
        <BackgroundImage
          component="dumbbell_green"
          left={{ xs: "0%", md: "10%", lg: "25%" }}
          top="55vh"
          transform="rotate(330deg)"
        />
        <BackgroundImage
          component="kettlebell_green"
          left={{ xs: "40%", md: "40%", lg: "50%" }}
          top="90vh"
          transform="rotate(20deg)"
        />

        <Container
          sx={{
            color: "var(--blue-dark)",
            padding: "40px",
            position: "relative",
            zIndex: 1,
            textAlign: "left",
          }}
        >
          {/* Header */}
          <Box sx={{ minHeight: "20vh" }}>
            <motion.img
              src="../src/assets/hevy_icon.png"
              alt="Hevy Logo"
              style={{ width: "40px", height: "40px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </Box>

          {/* Main Content */}
          <Box sx={{ minHeight: "75vh" }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "4em",
                  margin: "0",
                  color: "black",
                  paddingBottom: "70px",
                  fontWeight: "bold",
                }}
              >
                Hevy <br />
                Wrapped
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1em",
                  color: "black",
                  paddingBottom: "30px",
                }}
              >
                Your workout habits, tracked and summarised to flex on your
                friends
              </Typography>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <UploadFileModal />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.9em",
                  color: "var(--blue)",
                  marginTop: "10px",
                  "&:hover": {
                    color: "var(--bright-pink)",
                  },
                }}
                onClick={() => {
                  navigate("/help");
                }}
              >
                where do I find my data?
              </Typography>
            </motion.div>
          </Box>

          {/* Footer */}
          <Box sx={{ marginTop: "30px" }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "1.2em",
                color: "black",
                fontWeight: "bold",
              }}
            >
              What is Hevy?
            </Typography>
            <Divider
              sx={{
                backgroundColor: "black",
                marginTop: "10px",
                marginBottom: "30px",
                maxWidth: { xs: "100vw", md: "40vw" },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.5em",
                margin: "5px 0",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Log Workouts
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.5em",
                color: "#0077FF",
                fontWeight: "bold",
                margin: "5px 0",
              }}
            >
              Get Stronger
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.5em",
                margin: "5px 0",
                color: "black",
                fontWeight: "bold",
                mb: 5,
              }}
            >
              Stay Motivated
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.9em",
                color: "black",
                mb: 10,
              }}
            >
              Hevy is a free workout tracker for iOS and Android. Build routines
              and track progress with friends.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.8em",
                color: "#6c6c6c",
                fontStyle: "italic",
              }}
            >
              Information taken from hevyapp.com
              <br />
              Made by Leo Shi, inspired by Spotify Wrapped
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default HomePage;
