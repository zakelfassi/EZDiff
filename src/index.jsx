import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TextDiffApp from "./App";

// Register the service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch((err) => console.log('Service Worker registration failed:', err));
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TextDiffApp />
  </React.StrictMode>
);
