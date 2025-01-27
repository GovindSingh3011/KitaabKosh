import { createRoot } from "react-dom/client";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./routes/home.jsx";
import Dashboard from "./routes/dashboard.jsx";
import { Toaster } from "./components/ui/sonner";
import About from "./routes/about";
import { AuthProvider } from "./components/auth-context";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Toaster richColors />
    </BrowserRouter>
  </AuthProvider>,
);
