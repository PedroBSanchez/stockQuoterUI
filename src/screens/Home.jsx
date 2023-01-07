import React, { useState, useEffect } from "react";

const Home = () => {
  console.log(localStorage.getItem("token"));

  const [user, setUser] = useState();

  //Ao abrir página fazer requisição na api para buscar usuário trazendo suas informações

  useEffect(() => {}, []);

  const getUser = async () => {};

  return (
    <>
      <p>Home</p>
    </>
  );
};

export default Home;
