import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ colour, backgroundColour, url }) => {
  const navigate = useNavigate();

  const handleGoBackClick = (e) => {
    if (event) e.stopPropagation();
    navigate(url);
  };

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
        maxWidth: "130px",
        border: "none",
        cursor: "pointer",
        zIndex: 100,
        "&:hover": {
          backgroundColor: `var(--${backgroundColour}Hover)`,
        },
      }}
      onClick={handleGoBackClick}
    >
      <ArrowBackIcon sx={{ paddingRight: "5px" }} />
      Go Back
    </Button>
  );
};

export default GoBackButton;
