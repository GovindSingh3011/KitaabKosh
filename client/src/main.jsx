import { createRoot } from "react-dom/client";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/home.jsx";
import Dashboard from "./routes/dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>,
);
