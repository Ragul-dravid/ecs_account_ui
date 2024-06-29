import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { Toaster } from "react-hot-toast";
function Auth({ handleLogin }) {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Auth;