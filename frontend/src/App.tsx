import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin/admin";
import LoginPage from "./pages/loginAndRegister/login";
import RegisterPage from "./pages/loginAndRegister/register";

import Home from "./pages/home/home";
import Rules from "./pages/rule";
import Knowledges from "./pages/knowledge";

import Dashboard from "./pages/dashboard";
import Account from "./pages/user/account";
import Profile from "./pages/user/profile";
import CreateRules from "./pages/rule/createRule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/knowledge" element={<Knowledges />} />
        <Route path="/rule" element={<Rules />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/rule/createRule" element={< CreateRules/>} /> */}
        {/* <Route path="/rule/createRule/:id" element={<CreateRules />} />\ */}
        <Route path="/rule/createRule/:id" element={<Knowledges />} />
      </Routes>
    </Router>
  );
}

export default App;