import { createRoot } from "react-dom/client";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/home.jsx";
import Dashboard from "./routes/dashboard.jsx";
import { Toaster } from "./components/ui/sonner";
import About from "./routes/about";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
    </Routes>
    <Toaster richColors />
  </BrowserRouter>,
);
