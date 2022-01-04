import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.css";
import DashboardInfo from "./components/DashboardInfo";
import { Container } from "react-bootstrap";
import NotFound from "./components/NotFound.js";

const App = () => {
  return (
    <div>
      <nav className="navbar bg-light navbar-expand-lg">
        <ul className="navbar-nav mt-auto font-monospace ms-3">
          <li className="navbar-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="SignUp" className="nav-link">
              SignUp
            </Link>
          </li>
        </ul>
      </nav>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "800px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/dashboard" element={<DashboardInfo />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </Container>
    </div>
  );
};

export default App;
