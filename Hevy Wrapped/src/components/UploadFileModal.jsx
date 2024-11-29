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
import { useResult } from "../App";
import { handleFileUpload } from "../functions/process_data.js";

const UploadFileModal = () => {
  const [open, setOpen] = useState(false);
  const [bodyWeight, setBodyWeight] = useState("");
  const [name, setName] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [progressText, setProgressText] = useState("");
  const { setResult } = useResult();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setUploadedFileName("");
    setUploadedFile(null);
    setBodyWeight("");
    setAlertMessage("");
    setProgressText("");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "text/csv") {
        setUploadedFileName(file.name);
        setUploadedFile(file);
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

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleUpload = async () => {
    if (!uploadedFileName) {
      setAlertMessage("Please upload a file first.");
      setAlertSeverity("error");
      return;
    }

    if (!name || name.trim() === "") {
      setAlertMessage("Please enter a valid full name.");
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

    try {
      const result = await handleFileUpload(uploadedFile, name, bodyWeight); // Wait for the Promise to resolve
      console.log(result);
      setResult(result);
    } catch (error) {
      console.error("Error during file upload:", error);
      setAlertMessage("Error processing file.");
      setAlertSeverity("error");
    } finally {
      navigate("/wrapped/1");
    }
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
                onChange={handleFileChange}
              />
            </Button>
            {uploadedFileName && (
              <Typography sx={{ mt: 1, color: "gray" }}>
                Uploaded File: {uploadedFileName}
              </Typography>
            )}
          </Box>
          <TextField
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
            sx={{ mb: 1 }}
          />
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
