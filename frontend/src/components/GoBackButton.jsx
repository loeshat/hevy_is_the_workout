import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ colour, backgroundColour }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: `var(--${backgroundColour})`,
        color: `var(--${colour})`,
        fontSize: "1em",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "40px",
        marginBottom: "20px",
        border: "none",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: `var(--${backgroundColour}Hover)`,
        },
      }}
      onClick={() => navigate(-1)}
    >
      <ArrowBackIcon sx={{ paddingRight: "5px" }} />
      Go Back
    </Button>
  );
};

export default GoBackButton;
