import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import ReactDOM correctly
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "../context/authProvider";

const root = createRoot(document.getElementById("root")); // ✅ Correct method

root.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
