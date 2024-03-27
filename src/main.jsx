import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Context from "./Components/Context/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context>
    <Router>
      <App />
    </Router>
  </Context>
);
