import { Box } from "@mui/material";
import { motion } from "framer-motion";

const BackgroundImage = ({ component, left, top, transform }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: top,
        left: left,
        backgroundSize: "contain",
        zIndex: 0,
      }}
    >
      <motion.img
        src={`./assets/${component}.png`}
        style={{
          width: "80vw",
          maxWidth: "400px",
          transform: transform,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      />
    </Box>
  );
};

export default BackgroundImage;
