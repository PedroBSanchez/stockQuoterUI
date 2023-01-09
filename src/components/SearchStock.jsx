import React from "react";
import { FormControl } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";

import "./SearchStock.css";

const SearchStock = () => {
  //Requisição para adicionar ação e retornar sweetAlert
  //Receber como prop a função para atualizar o usuário

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-9">
          <FormControl placeholder="Stock" />
        </div>
        <div className="col-1">
          <BsFillPlusSquareFill size={36} color={"#222"} />
        </div>
      </div>
    </>
  );
};

export default SearchStock;
