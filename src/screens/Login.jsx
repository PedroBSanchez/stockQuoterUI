import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";

import "./Login.css";

const Login = () => {
  const [newLogin, setNewLogin] = useState();
  const navigate = useNavigate();
  const navigateHome = (userInfo) => {
    localStorage.clear();
    localStorage.setItem("tokenApi", userInfo.token);
    navigate("/home");
  };

  return (
    <div className="login-background">
      <div className="container-fluid">
        <div className="posicao-xesque">
          <div className="offset-lg-6 col-lg-4 offset-md-5 col-md-6">
            <LoginCard navigateHome={navigateHome} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
