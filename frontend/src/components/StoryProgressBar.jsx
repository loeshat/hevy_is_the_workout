import React from "react";
import { useParams } from "react-router-dom";
import { Box, LinearProgress, styled } from "@mui/material";

const StoryProgressBar = () => {
  const { id } = useParams();
  const totalSlides = 8; // Total number of slides

  const currentSlide = parseInt(id, 10) || 1;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 3,
        left: -10,
        width: "100%",
        zIndex: 100,
        padding: "0 10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "4px",
          width: "100%",
          padding: "0 5px",
        }}
      >
        {[...Array(totalSlides)].map((_, index) => {
          const isActive = index < currentSlide;
          return (
            <Box
              key={index}
              sx={{
                flexGrow: 1,
                height: "100%",
                backgroundColor: isActive ? "#ffffff" : "#CBCBCB",
                marginRight: index < totalSlides - 1 ? "5px" : "0",
                transition: "background-color 0.3s ease",
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default StoryProgressBar;
