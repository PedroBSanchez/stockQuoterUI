import React, { useState } from "react";
import { Button, FormControl, InputGroup, Row, Col } from "react-bootstrap";

import "./LoginCard.css";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-card p-4">
      <p className="login-label-login">Email</p>
      <FormControl className="login-input-login" />
      <p className="login-label-login mt-4">Password</p>
      <FormControl className="login-input-login" />
      <Row className="mt-4">
        <Col>
          <p>Register</p>
        </Col>
        <Col />
        <Col md={3} sm={2}>
          <Button variant="success">Login</Button>
        </Col>
      </Row>
    </div>
  );
};

export default LoginCard;
