import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../../../utils/api";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import CircleRating from "../../../components/circleRating/CircleRating";
import Genres from "../../../components/genres/Genres";
import PosterFallback from "../../../assets/no-poster.png";
import { HiSparkles } from "react-icons/hi2";
import { IoReload } from "react-icons/io5";
import "./style.scss";

const SurpriseMe = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const fetchRandomMovie = async () => {
    setLoading(true);
    setIsRevealed(false);

    try {
      // Get a random page between 1-500 (TMDB max)
      const randomPage = Math.floor(Math.random() * 100) + 1;
      const mediaType = Math.random() > 0.3 ? "movie" : "tv";

      const data = await fetchDataFromApi(`/discover/${mediaType}`, {
        page: randomPage,
        sort_by: "popularity.desc",
        "vote_count.gte": 100,
        "vote_average.gte": 6,
      });

      if (data?.results?.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const selected = { ...data.results[randomIndex], media_type: mediaType };
        setMovie(selected);

        // Reveal with a small delay for animation
        setTimeout(() => {
          setIsRevealed(true);
        }, 300);
      }
    } catch (err) {
      console.error("Surprise me error:", err);
    } finally {
      setLoading(false);
    }
  };

  const posterUrl = movie?.poster_path
    ? url.poster + movie.poster_path
    : PosterFallback;

  const backdropUrl = movie?.backdrop_path
    ? url.backdrop + movie.backdrop_path
    : null;

  return (
    <div className="surpriseMe">
      <ContentWrapper>
        <div className="surpriseContent">
          {!movie ? (
            <div className="initialState">
              <div className="sparkleIcon">
                <HiSparkles />
              </div>
              <h2>Can't Decide What to Watch?</h2>
              <p>Let us pick something amazing for you!</p>
              <button
                className="surpriseBtn"
                onClick={fetchRandomMovie}
                disabled={loading}
              >
                {loading ? (
                  <span className="btnLoading">Finding magic...</span>
                ) : (
                  <>
                    <HiSparkles />
                    <span>Surprise Me!</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className={`resultState ${isRevealed ? "revealed" : ""}`}>
              {backdropUrl && (
                <div className="resultBackdrop">
                  <Img src={backdropUrl} />
                </div>
              )}
              <div className="resultContent">
                <div className="resultPoster">
                  <Img className="posterImg" src={posterUrl} />
                </div>
                <div className="resultInfo">
                  <span className="mediaTag">
                    {movie.media_type === "tv" ? "TV Show" : "Movie"}
                  </span>
                  <h3
                    className="resultTitle"
                    onClick={() =>
                      navigate(`/${movie.media_type}/${movie.id}`)
                    }
                  >
                    {movie.title || movie.name}
                  </h3>
                  {movie.overview && (
                    <p className="resultOverview">{movie.overview}</p>
                  )}
                  <div className="resultMeta">
                    <CircleRating rating={movie.vote_average?.toFixed(1)} />
                    <Genres data={movie.genre_ids?.slice(0, 3)} />
                  </div>
                  <div className="resultActions">
                    <button
                      className="viewBtn"
                      onClick={() =>
                        navigate(`/${movie.media_type}/${movie.id}`)
                      }
                    >
                      View Details
                    </button>
                    <button
                      className="rerollBtn"
                      onClick={fetchRandomMovie}
                      disabled={loading}
                    >
                      <IoReload />
                      <span>Try Again</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SurpriseMe;
