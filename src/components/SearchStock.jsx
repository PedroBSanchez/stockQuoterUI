import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";

import "./SearchStock.css";

const SearchStock = ({ getUser }) => {
  const [newStock, setNewStock] = useState("");

  //Requisição para adicionar ação e retornar sweetAlert
  //Receber como prop a função para atualizar o usuário

  const handleAddStock = async () => {
    if (!validateStockInput()) {
      swal({
        title: "Required fields",
        icon: "warning",
        dangerMode: true,
      });
    }

    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/api/users/addstock`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenApi")}`,
        "Content-Type": "application/json",
      },
      data: { stock: newStock },
    };
    await axios
      .request(options)
      .then((response) => {
        swal({
          title: response.data?.success,
          icon: "success",
          button: false,
        });
        getUser();
      })
      .catch((error) => {
        console.log(error);
        return swal({
          title: error.response.data?.error,
          icon: "error",
          button: false,
        });
      });
  };

  const validateStockInput = () => {
    if (newStock == "" || newStock == null || newStock == null) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-9">
          <FormControl
            placeholder="New stock"
            onChange={(e) => {
              setNewStock(e.target.value);
            }}
          />
        </div>
        <div className="col-1">
          <BsFillPlusSquareFill
            size={36}
            onClick={handleAddStock}
            className="add-stock"
          />
        </div>
      </div>
    </>
  );
};

export default SearchStock;
