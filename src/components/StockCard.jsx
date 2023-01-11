import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";
import { Modal, Button } from "react-bootstrap";

import "./StockCard.css";

const StockCard = ({ getUser, stock }) => {
  const [stockValue, setStockValue] = useState(200.55);
  const [stockHigh, setStockHigh] = useState(200.55);
  const [stockLow, setStockLow] = useState(200.55);
  const [stockVolume, setStockVolume] = useState(200.55);
  const [stockChange, setStockChange] = useState(200.55);
  const [stockPercent, setStockPercent] = useState("0.75");
  const [day, setDay] = useState(new Date());

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

  useEffect(() => {
    handleStockValue();
  }, []);

  //Implementar requisição na api third-party para pegar valor da ação

  const handleStockValue = async () => {
    await axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.toUpperCase()}&apikey=J8PZ950UIC8WF2R0`
      )
      .then((response) => {
        if (response.data["Global Quote"]["05. price"] != undefined) {
          setStockValue(
            parseFloat(response.data["Global Quote"]["05. price"]).toFixed(2)
          );
          setStockHigh(
            parseFloat(response.data["Global Quote"]["03. high"]).toFixed(2)
          );
          setStockLow(
            parseFloat(response.data["Global Quote"]["04. low"]).toFixed(2)
          );
          setStockVolume(
            parseFloat(response.data["Global Quote"]["06. volume"]).toFixed(2)
          );
          setStockPercent(response.data["Global Quote"]["10. change percent"]);

          setStockChange(
            parseFloat(response.data["Global Quote"]["09. change"]).toFixed(2)
          );

          let data = new Date(
            response.data["Global Quote"]["07. latest trading day"]
          );
          data.setDate(data.getDate() + 1);
          setDay(data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {stock} - {day.toLocaleDateString()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-4">
              <h5>Price: ${stockValue}</h5>
            </div>
            <div className="col">
              {stockChange > 0 && (
                <p className="stock-positive">
                  Change {stockChange} ({stockPercent.substring(0, 4)}%)
                </p>
              )}
              {stockChange < 0 && (
                <p className="stock-negative">
                  Change {stockChange} ({stockPercent.substring(1, 4)}%)
                </p>
              )}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-4">
              <p className="stock-high-low">Low: ${stockLow}</p>
            </div>
            <div className="col">
              <p className="stock-high-low">High: ${stockHigh}</p>
            </div>
          </div>
          <p className="stock-high-low">Volume: {stockVolume}</p>
        </Modal.Body>
      </Modal>{" "}
    </>
  );
};

export default StockCard;
