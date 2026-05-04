import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import BackButton from "../../components/backButton/BackButton";
import {
  MdBookmark,
  MdFavorite,
} from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import "./style.scss";

const Watchlist = () => {
  const { watchlist, favorites } = useSelector((state) => state.watchlist);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("watchlist");

  const currentList = activeTab === "watchlist" ? watchlist : favorites;
  const title = activeTab === "watchlist" ? "My Watchlist" : "My Favorites";
  const emptyMsg =
    activeTab === "watchlist"
      ? "Your watchlist is empty. Start adding movies and TV shows!"
      : "You haven't favorited anything yet. Show some love!";

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="watchlistPage">
        <ContentWrapper>
          <BackButton location="/" />
          <div className="emptyState loginPrompt">
            <div className="emptyIcon">
              <FaUserShield size={60} />
            </div>
            <h2>Authentication Required</h2>
            <p>Please log in to view and manage your Watchlist and Favorites.</p>
            <button className="loginBtn" onClick={handleLogin}>
              Log In with Google
            </button>
          </div>
        </ContentWrapper>
      </div>
    );
  }

  return (
    <div className="watchlistPage">
      <ContentWrapper>
        <BackButton location="/" />
        <div className="pageHeader">
          <h1 className="pageTitle">{title}</h1>
          <div className="tabs">
            <button
              className={`tab ${activeTab === "watchlist" ? "active" : ""}`}
              onClick={() => setActiveTab("watchlist")}
            >
              <MdBookmark />
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="count">{watchlist.length}</span>
              )}
            </button>
            <button
              className={`tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <MdFavorite />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="count">{favorites.length}</span>
              )}
            </button>
          </div>
        </div>

        {currentList.length > 0 ? (
          <div className="content">
            {currentList.map((item, index) => (
              <MovieCard
                key={`${item.id}-${index}`}
                data={item}
                mediaType={item.media_type || "movie"}
              />
            ))}
          </div>
        ) : (
          <div className="emptyState">
            <div className="emptyIcon">
              {activeTab === "watchlist" ? (
                <MdBookmark size={60} />
              ) : (
                <MdFavorite size={60} />
              )}
            </div>
            <p>{emptyMsg}</p>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Watchlist;
