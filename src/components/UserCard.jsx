import React from "react";

import { FaUserCircle } from "react-icons/fa";

import "./UserCard.css";

const UserCard = ({ email }) => {
  return (
    <div className="user-card">
      <div className="row p-3">
        <div className="col-md-2 col-sm-1">
          <FaUserCircle size={30} color={"#222"} />
        </div>
        <div className="col-md-10 sol-sm-11">
          <p className="user-text">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
