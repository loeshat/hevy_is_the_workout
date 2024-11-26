import { Box } from "@mui/material";

const Dumbbell = ({ colour, left, top, transform }) => {
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
      <img
        src={`../src/assets/dumbbell_${colour}.png`}
        style={{
          width: "80vw",
          maxWidth: "400px",
          transform: transform,
        }}
      />
    </Box>
  );
};

export default Dumbbell;
