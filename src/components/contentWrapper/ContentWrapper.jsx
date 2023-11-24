import React from "react";
import "./style.scss";

//Higher Order Component which will center out content

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
