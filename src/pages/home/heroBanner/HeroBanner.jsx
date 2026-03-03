import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/popular");

  console.log(data);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <div className="layer"></div>
          <Img src={background} />
          {/* <img src={background} alt="heroBanner" /> */}
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Discover Your Next Favorite.</span>
          <span className="subTitle">
            Immerse yourself in cinematic excellence with MoviePulse. Explore
            millions of movies, TV shows, and hidden gems.
          </span>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
