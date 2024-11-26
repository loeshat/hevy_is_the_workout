// src/functions/ResultContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState(() => {
    try {
      const savedResult = localStorage.getItem("result");
      return savedResult ? JSON.parse(savedResult) : {}; // Default to an empty object if not found
    } catch (error) {
      console.error("Failed to parse result from localStorage:", error);
      return {}; // Fallback to an empty object in case of error
    }
  });

  useEffect(() => {
    if (result && Object.keys(result).length > 0) {
      localStorage.setItem("result", JSON.stringify(result));
    }
  }, [result]);

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used within a ResultProvider");
  }
  return context;
};

useEffect(() => {
  if (result && Object.keys(result).length > 0) {
    localStorage.setItem("result", JSON.stringify(result));
  }
}, [result]);
