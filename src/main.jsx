import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
