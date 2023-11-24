import React from "react";
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Movix is crafted with passion and powered by The Movie Database (TMDb)
          API, ensuring an immersive cinematic experience. Discover and enjoy
          your favorite movies and TV shows with Movix, where the magic of
          entertainment comes to life through cutting-edge technology and a
          user-friendly interface.
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
