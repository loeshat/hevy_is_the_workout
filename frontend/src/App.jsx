import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";
import WrappedPage from "./pages/WrappedPage";
import "./index.css";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "'Inter'",
  },
});

// Create the context
const ResultContext = createContext();

// Custom hook to access the context
export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used within a ResultProvider");
  }
  return context;
};

const App = () => {
  // Initialize `result` with data from localStorage, if available
  const [result, setResult] = useState(() => {
    const savedResult = localStorage.getItem("result");
    return savedResult ? JSON.parse(savedResult) : {}; // Default to empty object if not found
  });

  // Store `result` in localStorage whenever it changes
  useEffect(() => {
    if (result && Object.keys(result).length > 0) {
      localStorage.setItem("result", JSON.stringify(result));
    }
  }, [result]);

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      <ThemeProvider theme={theme}>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/wrapped/:id" element={<WrappedPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ResultContext.Provider>
  );
};

export default App;
