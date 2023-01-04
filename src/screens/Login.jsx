import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const testeNavigation = () => {
    navigate("/home");
  };

  return (
    <div className="login-background">
      <p>teste</p>
    </div>
  );
};

export default Login;
