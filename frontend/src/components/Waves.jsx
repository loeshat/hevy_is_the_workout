import { Box } from "@mui/material";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RowingIcon from "@mui/icons-material/Rowing";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const Waves = () => {
  return (
    <>
      <Box
        sx={{
          width: "130%",
          backgroundColor: "var(--green)",
          padding: "20px 0",
          position: "relative",
          marginBottom: "50px",
          transform: "rotate(-20deg)",
        }}
      >
        {/* Icons Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <DirectionsRunIcon sx={{ fontSize: 50, color: "#123456" }} />
          <RowingIcon sx={{ fontSize: 50, color: "#123456" }} />
          <SportsGymnasticsIcon sx={{ fontSize: 50, color: "#123456" }} />
          <SportsHandballIcon sx={{ fontSize: 50, color: "#123456" }} />
          <FitnessCenterIcon sx={{ fontSize: 50, color: "#123456" }} />
        </Box>
      </Box>
    </>
  );
};

export default Waves;
