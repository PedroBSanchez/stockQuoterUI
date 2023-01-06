import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./LoginCard.css";
import "../screens/Login.css";
import swal from "sweetalert";
import axios from "axios";

import { Button, FormControl } from "react-bootstrap";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [newlogin, setNewLogin] = useState();

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (emailText) => {
    if (emailText && emailText.match(isValidEmail)) {
      return true;
    }
    return false;
  };

  const handleLogin = () => {};

  const handleRegister = () => {
    const isValidEmail = validateEmail(newEmail);
    if (!isValidEmail) {
      return swal({
        title: "Email invalid",

        icon: "warning",
        dangerMode: true,
      });
    }
    if (!newEmail || newEmail == "" || !newPassword || newPassword == "") {
      return swal({
        title: "Required fields",
        icon: "warning",
        dangerMode: true,
      });
    }

    //Fazer requisição na api para registrar e verificar retorno
    const isValidResiter = register();

    if (isValidResiter) {
      console.log("ok");
      //Proxima página
    }
  };

  const register = async () => {
    await axios
      .post(`http://localhost:8000/api/users/create`, {
        email: newEmail,
        password: newPassword,
      })
      .then(function (response) {
        if (response.status == 200) {
          setNewEmail("");
          setNewPassword("");
          setNewLogin(response.data);
          console.log(response.data);
          return true;
        }
        swal({
          title: response.data.error ? response.data.error : "Error",
          icon: "warning",
          dangerMode: true,
        });
        return false;
      })
      .catch(function (error) {
        console.log(error);
        swal({
          title: "Error",
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  const login = async () => {};

  //Modal Settings
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="login-card p-4">
        <p className="login-label-login">Email</p>
        <input className="login-input-login" />
        <p className="login-label-login mt-3">Password</p>
        <input className="login-input-login" />
        <div className="row mt-3">
          <div className="col-md-3">
            <p className="login-register" onClick={handleShow}>
              Register
            </p>
          </div>
          <div className="offset-md-6 col-md-3">
            <button className="btn btn-success">Login</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Email"
            type="email"
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <FormControl
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
