import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const BackButton = ({location}) => {
  const navigate = useNavigate();

  return (
    <div className="backButton" onClick={() => navigate(location)}>
      <HiArrowLeft />
      <span>Back</span>
    </div>
  );
};

export default BackButton;
