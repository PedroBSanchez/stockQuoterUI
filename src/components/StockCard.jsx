import axios from "axios";
import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import swal from "sweetalert";
import { Modal, Button } from "react-bootstrap";

import "./StockCard.css";

const StockCard = ({ getUser, stock }) => {
  const [stockValue, setStockValue] = useState(200);

  //Modal config
  const [show, setShow] = useState(false);
  const [mouseOnTrash, setMouseOnTrash] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowModal = () => {
    if (!mouseOnTrash) {
      handleShow();
    }
  };

  //Implementar requisição na api third-party para pegar valor da ação

  const handleStockValue = async () => {};

  const handleRemoveStock = async () => {
    const options = {
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/api/users/removestock`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenApi")}`,
        "Content-Type": "application/json",
      },
      data: {
        stock: stock,
      },
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
        return swal({
          title: error.response.data?.error,
          icon: "error",
          button: false,
        });
      });
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-6 mt-5">
          <div className="stock-card p-2" onClick={handleShowModal}>
            <BsFillTrashFill
              size={18}
              className="stock-delete"
              onClick={handleRemoveStock}
              onMouseOver={() => setMouseOnTrash(true)}
              onMouseOut={() => setMouseOnTrash(false)}
            />
            <div className="row text-center mt-1">
              <p className="stock-text ">{stock}</p>
              <p className="stock-value">{`$${stockValue}`}</p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockCard;
