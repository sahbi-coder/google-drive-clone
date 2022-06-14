import React, { useState  } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function User() {
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

 

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("auth/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar />
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/dashboard" className="btn btn-primary w-100 mt-3">
            go to dashboard
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
