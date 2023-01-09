import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Home.css";
import { Container } from "react-bootstrap";
import UserCard from "../components/UserCard";
import SearchStock from "../components/SearchStock";

const Home = () => {
  const [user, setUser] = useState();

  //Ao abrir página fazer requisição na api para buscar usuário trazendo suas informações

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/users/getuser`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const logOut = async () => {};

  return (
    <>
      <div className="home-background">
        <Container fluid>
          <div className="row mt-2">
            <div className="col-lg-2 col-md-4 col-sm-6">
              <UserCard email={user?.email} />
            </div>
          </div>
          <div className="row text-center justify-content-center mt-5">
            <div className="col-md-8">
              <SearchStock />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
