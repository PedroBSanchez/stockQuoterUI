import React from "react";
import { Col, Container, Row } from "react-bootstrap";
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
      <Container fluid>
        <Row className="login-position">
          <Col md={3} />
          <Col md={4} />
          <Col md={4}>
            <LoginCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
