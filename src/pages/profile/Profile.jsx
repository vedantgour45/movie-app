import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { doc, getDoc } from "firebase/firestore";
import { db, logout } from "../../utils/firebase";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import avatarFallback from "../../assets/avatar.png";
import "./style.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { watchlist, favorites } = useSelector((state) => state.watchlist);
  const [joinedDate, setJoinedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setJoinedDate(userSnap.data().joinedOn);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <div className="profilePage">
      <ContentWrapper>
        <div className="profileContent">
          <div className="profileHeader">
            <div className="profileImg">
              <img src={user.photoURL || avatarFallback} alt={user.displayName} />
            </div>
            <div className="profileInfo">
              <h1 className="name">{user.displayName}</h1>
              <span className="email">{user.email}</span>
              {joinedDate && (
                <span className="joined">
                  Joined {dayjs(joinedDate).format("MMMM D, YYYY")}
                </span>
              )}
            </div>
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="statsGrid">
            <div className="statCard" onClick={() => navigate("/watchlist")}>
              <h3>Watchlist</h3>
              <span className="count">{watchlist?.length || 0}</span>
              <span className="label">Movies & Shows</span>
            </div>
            <div className="statCard" onClick={() => navigate("/watchlist")}>
              <h3>Favorites</h3>
              <span className="count">{favorites?.length || 0}</span>
              <span className="label">Loved Items</span>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Profile;
