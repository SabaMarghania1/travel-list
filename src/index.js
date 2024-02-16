import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const arr = Array.from({length: 20}, (_, i) => i + 1);
console.log(arr);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
