import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useResult } from "../App"; // Import the useResult hook from App

const UploadFileModal = () => {
  const [open, setOpen] = useState(false);
  const [bodyWeight, setBodyWeight] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [progressText, setProgressText] = useState("");
  const { setResult } = useResult(); // Get setResult from the context
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUploadedFileName("");
    setBodyWeight("");
    setAlertMessage("");
    setProgressText("");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
    setOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        setUploadedFileName(file.name);
        setAlertMessage("");
      } else {
        setAlertMessage("Please upload a valid CSV file.");
        setAlertSeverity("error");
      }
    }
  };

  const handleBodyWeightChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0) {
      setBodyWeight(value);
      setAlertMessage("");
    } else {
      setAlertMessage("Please enter a valid number for body weight.");
      setAlertSeverity("error");
    }
  };

  const handleUpload = async () => {
    if (!uploadedFileName) {
      setAlertMessage("Please upload a file first.");
      setAlertSeverity("error");
      return;
    }

    if (!bodyWeight || isNaN(bodyWeight) || bodyWeight <= 0) {
      setAlertMessage("Please enter a valid body weight.");
      setAlertSeverity("error");
      return;
    }

    setAlertMessage("");
    setProgressText("Generating Wrapped...");
    setLoading(true);

    // Simulate a 3-second loading process
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append(
          "file",
          document.querySelector('input[type="file"]').files[0]
        );
        formData.append("body_weight", bodyWeight);

        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        setLoading(false);
        setProgressText("");

        if (response.ok) {
          const result = await response.json();
          console.log("Processed User Info:", result);

          // Save result to context
          setResult(result);

          setAlertMessage("File processed successfully!");
          setAlertSeverity("success");
          navigate("/wrapped/1");
        } else {
          const error = await response.text();
          setAlertMessage(`Error: ${error}`);
          setAlertSeverity("error");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
        setProgressText("");
        setAlertMessage("An error occurred while uploading the file.");
        setAlertSeverity("error");
      }
    }, 3000); // Simulated delay
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: "var(--blue-dark)",
          color: "white",
          fontSize: "1.2em",
          fontWeight: "bold",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "var(--blue)",
          },
        }}
      >
        Get Wrapped
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "70%", sm: "50%", md: "40%", lg: "25%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "12px",
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Upload Your Data
          </Typography>

          <Box sx={{ mb: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              component="label"
              sx={{
                width: "100%",
                backgroundColor: "var(--blue-dark)",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--blue)",
                },
                textTransform: "none",
              }}
            >
              Upload File
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
            {uploadedFileName && (
              <Typography sx={{ mt: 1, color: "gray" }}>
                Uploaded File: {uploadedFileName}
              </Typography>
            )}
          </Box>

          <TextField
            label="Enter Your Body Weight (kg)"
            variant="outlined"
            value={bodyWeight}
            onChange={handleBodyWeightChange}
            fullWidth
            sx={{ mb: 3 }}
          />

          {loading && (
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <CircularProgress />
              <Typography sx={{ mt: 1 }}>{progressText}</Typography>
            </Box>
          )}
          {alertMessage && (
            <Alert severity={alertSeverity} sx={{ mb: 2 }}>
              {alertMessage}
            </Alert>
          )}
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{
                flex: 1,
                backgroundColor: "var(--blue-dark)",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "var(--blue)",
                },
                textTransform: "none",
              }}
              disabled={loading}
            >
              Get Wrapped
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                flex: 1,
                borderColor: "var(--blue-dark)",
                color: "var(--blue-dark)",
                fontWeight: "bold",
                textTransform: "none",
              }}
              disabled={loading}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default UploadFileModal;
