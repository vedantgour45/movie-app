import React from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="infoText">
          MoviePulse is built for movie lovers who want more than just browsing.
          Powered by The Movie Database (TMDb) API, it delivers real-time
          ratings, trending titles, genres, and cast insights in a sleek,
          user-friendly experience. Discover what&apos;s hot, explore
          what&apos;s timeless, and stay connected to the pulse of
          entertainment.
        </div>
        <div className="creditText">
          Made by{" "}
          <span>
            <a href="https://portfolio-vedant-gour.netlify.app/">Vedant Gour</a>
          </span>
        </div>
        <div className="socialIcons">
          <a href="https://github.com/vedantgour45">
            <span className="icon">
              <FaGithub />
            </span>
          </a>
          <a href="https://www.linkedin.com/in/vedantgour45">
            <span className="icon">
              <FaLinkedin />
            </span>
          </a>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
