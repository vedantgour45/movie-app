import React from "react";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";
import "./style.scss";

const LogoutModal = ({ show, setShow, onConfirm }) => {
  if (!show) return null;

  return (
    <div className={`logoutModal ${show ? "visible" : ""}`}>
      <div className="opacityLayer" onClick={() => setShow(false)}></div>
      <div className="modalContent">
        <span className="closeBtn" onClick={() => setShow(false)}>
          <VscChromeClose />
        </span>
        <div className="iconSection">
          <HiOutlineLogout />
        </div>
        <div className="textSection">
          <h2 className="title">Logging Out?</h2>
          <p className="description">
            Are you sure you want to log out of MoviePulse? You'll need to sign in again to access your watchlist and favorites.
          </p>
        </div>
        <div className="buttonSection">
          <button className="cancelBtn" onClick={() => setShow(false)}>
            Stay Logged In
          </button>
          <button className="confirmBtn" onClick={onConfirm}>
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
