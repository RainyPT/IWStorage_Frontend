import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.js";
import Register from "./Pages/Register.js";
import Dashboard from "./Pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNotFound from "./Pages/PageNotFound";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "./Pages/Profile";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
