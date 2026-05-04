import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pageNotFound">
      <div className="notFoundContent">
        <div className="glitchWrapper">
          <h1 className="errorCode" data-text="404">
            404
          </h1>
        </div>
        <h2 className="errorTitle">Lost in the Multiverse</h2>
        <p className="errorDesc">
          The page you're looking for doesn't exist or has been moved to another
          dimension.
        </p>
        <div className="errorActions">
          <button className="homeBtn" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="exploreBtn" onClick={() => navigate("/explore/movie")}>
            Explore Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;