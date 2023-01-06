import React from "react";

import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const testeNavigation = () => {
    navigate("/home");
  };

  return (
    <div className="login-background">
      <div className="container-fluid">
        <div className="posicao-xesque">
          <div className="offset-md-7 col-md-3">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
