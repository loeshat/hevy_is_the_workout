import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useResult } from "../../App";
import BackgroundImage from "../../components/BackgroundImage";
import GoBackButton from "../../components/GoBackButton";
import SummaryBox from "../../components/SummaryBox";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import html2canvas from "html2canvas";
import { motion } from "framer-motion"; // Added for smooth transitions

// Page 8, also the final summary page
const SummaryPage = () => {
  const { result } = useResult();
  const printableRef = useRef();

  const firstName = result.name.split(" ")[0];
  const capitalizedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  const handleDownload = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!printableRef.current) {
      console.error("Reference to printableRef is missing.");
      return;
    }

    const originalStyle = printableRef.current.style.borderRadius;
    printableRef.current.style.borderRadius = "0";

    try {
      const canvas = await html2canvas(printableRef.current, {
        useCORS: true, // Handle cross-origin issues
        scale: 2, // Higher quality by scaling
      });
      const dataUrl = canvas.toDataURL("image/png");

      // Create a download link and trigger it
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "screenshot.png";
      link.click();
    } catch (error) {
      console.error("Failed to generate screenshot:", error);
    } finally {
      // Restore the original border-radius
      printableRef.current.style.borderRadius = originalStyle;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "var(--green)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: { xs: "left", md: "center" },
          textAlign: "left",
          padding: 4,
          overflowX: "hidden",
          maxHeight: "93vh",
          position: "relative",
        }}
      >
        <BackgroundImage
          component="dumbbell_green"
          left={{ xs: "15%", sm: "35%", md: "50%", lg: "50%" }}
          top="10vh"
          transform="rotate(20deg)"
        />
        <BackgroundImage
          component="dumbbell_green"
          left={{ xs: "0%", sm: "0%", md: "15%", lg: "20%" }}
          top="65vh"
          transform="rotate(-20deg)"
        />
        <Box sx={{ marginTop: "20px" }} />
        <GoBackButton colour="blue" backgroundColour="green" url="/" />
        <Box sx={{ zIndex: 1, color: "var(--blue)" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 5, fontSize: "2.5rem" }}
            >
              Well done, {capitalizedFirstName}!
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography variant="h6" sx={{ mb: 4 }}>
              Download your summary now!
            </Typography>
          </motion.div>
          <Box
            ref={printableRef}
            sx={{
              borderRadius: "10px",
              backgroundColor: "var(--blue)",
              alignItems: "center",
              display: "flex",
              width: "95%",
              maxWidth: "400px",
              aspectRatio: "1",
              padding: 1,
              color: "var(--green)",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <SummaryBox />
          </Box>
          <Box
            onClick={handleDownload}
            sx={{
              backgroundColor: "var(--blue)",
              maxWidth: "400px",
              mt: 2,
              mb: 2,
              display: "flex",
              justifyContent: "center",
              borderRadius: "25px",
              padding: 1.5,
            }}
          >
            <Typography sx={{ color: "var(--green)", fontWeight: "bold" }}>
              DOWNLOAD
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SummaryPage;
