import React from "react";
import { AiFillStar } from "react-icons/ai";
import "./style.scss";

const CircleRating = ({ rating }) => {
  if (!rating || rating === "0.0") return null;

  const getRatingColor = (r) => {
    if (r < 5) return "#f43f5e";
    if (r < 7) return "#f59e0b";
    return "#10b981";
  };

  return (
    <div className="ratingBadge glass">
      <AiFillStar
        className="starIcon"
        style={{ color: getRatingColor(rating) }}
      />
      <span className="ratingValue">{rating}</span>
    </div>
  );
};

export default CircleRating;
