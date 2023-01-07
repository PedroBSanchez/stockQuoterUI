import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./LoginCard.css";
import "../screens/Login.css";
import swal from "sweetalert";
import axios from "axios";

import { Button, FormControl } from "react-bootstrap";

const LoginCard = ({ navigateHome }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  let newLogin;

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (emailText) => {
    if (emailText && emailText.match(isValidEmail)) {
      return true;
    }
    return false;
  };

  const handleLogin = () => {
    const isValidEmail = validateEmail(email);

    if (!email || email == "" || !password || password == "") {
      return swal({
        title: "Required fields",
        icon: "warning",
        dangerMode: true,
      });
    }
    if (!isValidEmail) {
      return swal({
        title: "Invalid email",

        icon: "warning",
        dangerMode: true,
      });
    }

    login();
  };

  const handleRegister = () => {
    const isValidEmail = validateEmail(newEmail);

    if (!newEmail || newEmail == "" || !newPassword || newPassword == "") {
      return swal({
        title: "Required fields",
        icon: "warning",
        dangerMode: true,
      });
    }

    if (!isValidEmail) {
      return swal({
        title: "Invalid email",

        icon: "warning",
        dangerMode: true,
      });
    }

    //Fazer requisição na api para registrar e verificar retorno
    register();
  };

  const register = async () => {
    await axios
      .post(`http://localhost:8000/api/users/create`, {
        email: newEmail,
        password: newPassword,
      })
      .then(function (response) {
        if (response.status == 200) {
          navigateHome(response.data);
        }
      })
      .catch(function (error) {
        setNewEmail("");
        setNewPassword("");
        swal({
          title: error.response.data ? error.response.data : "Error",
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  const login = async () => {
    await axios
      .post(`http://localhost:8000/api/users/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.status == 200) {
          navigateHome(response.data);
        }
      })
      .catch(function (error) {
        swal({
          title: error.response.data ? error.response.data : "Error",
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  //Modal Settings
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="login-card p-4">
        <p className="login-label-login">Email</p>
        <input
          type={"email"}
          className="login-input-login"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="login-label-login mt-3">Password</p>
        <input
          type={"password"}
          className="login-input-login"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="row mt-3">
          <div className="col-md-3">
            <p className="login-register" onClick={handleShow}>
              Register
            </p>
          </div>
          <div className="offset-md-6 col-md-3">
            <button className="btn btn-success" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="email"
            placeholder="Email"
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <FormControl
            type="password"
            placeholder="Password"
            className="mt-3"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleRegister}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginCard;
