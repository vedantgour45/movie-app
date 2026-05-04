import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist, toggleFavorite } from "../../store/watchlistSlice";
import { MdBookmark, MdBookmarkBorder, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import LoginModal from "../loginModal/LoginModal";
import toast from "react-hot-toast";
import "./style.scss";

const WatchlistActions = ({ item, mediaType }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const { watchlist, favorites } = useSelector((state) => state.watchlist);
  const { user } = useSelector((state) => state.auth);

  const isInWatchlist = watchlist?.some((w) => Number(w.id) === Number(item.id));
  const isInFavorites = favorites?.some((f) => Number(f.id) === Number(item.id));

  const itemData = {
    id: Number(item.id),
    title: item.title || item.name || "",
    poster_path: item.poster_path || null,
    vote_average: item.vote_average || 0,
    release_date: item.release_date || item.first_air_date || "",
    genre_ids: item.genre_ids || item.genres?.map((g) => g.id) || [],
    media_type: mediaType || item.media_type || "movie",
    overview: item.overview || "",
  };

  const handleAction = async (e, isWatchlist) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (isWatchlist) {
      dispatch(toggleWatchlist({ item: itemData, uid: user.uid, isAdding: !isInWatchlist }));
      toast.success(isInWatchlist ? "Removed from Watchlist" : "Added to Watchlist");
    } else {
      dispatch(toggleFavorite({ item: itemData, uid: user.uid, isAdding: !isInFavorites }));
      toast.success(isInFavorites ? "Removed from Favorites" : "Added to Favorites");
    }
  };

  return (
    <>
      <div className="watchlistActions">
        <button
          className={`actionBtn watchlistBtn ${isInWatchlist ? "active" : ""}`}
          onClick={(e) => handleAction(e, true)}
          title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isInWatchlist ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
        <button
          className={`actionBtn favoriteBtn ${isInFavorites ? "active" : ""}`}
          onClick={(e) => handleAction(e, false)}
          title={isInFavorites ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isInFavorites ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
      </div>
      <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
    </>
  );
};

export default WatchlistActions;
