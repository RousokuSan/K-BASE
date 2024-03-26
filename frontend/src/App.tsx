import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/admin/admin";
import LoginPage from "./pages/loginAndRegister/login";
import RegisterPage from "./pages/loginAndRegister/register";

import Home from "./pages/home/home";
import Knowledges from "./pages/knowledge";

// import Dashboard from "./pages/dashboard";
import Account from "./pages/user/account";
import Profile from "./pages/user/profile";

import CreateRulesPage from "./pages/rule/createRule";

import CreateFact from "./pages/fact/createFact";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* แก้เป็น "/register" */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/knowledge" element={<Knowledges />} />
        <Route path="/createRule/:id" element={<CreateRulesPage />} /> {/* แก้เป็น element */}
        <Route path="/createFact" element={<CreateFact />} /> {/* แก้เป็น CreateFact ตามชื่อ component */}

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
