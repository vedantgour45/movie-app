import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch, HiOutlineLogout } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { MdBookmark } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { signInWithGoogle, logout } from "../../utils/firebase";
import LogoutModal from "../logoutModal/LogoutModal";
import toast from "react-hot-toast";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import ThemeToggle from "../themeToggle/ThemeToggle";
import avatarFallback from "../../assets/avatar.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Welcome to MoviePulse!");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutModal(false);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to log out");
    }
  };

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // 300ms matches the animation duration in style.scss
    }
  }, [showSearch]);

  useEffect(() => {
    // When we change the page i.e the location then the next page should always start from top
    window.scrollTo(0, 0);

    // Keep search bar open if we are on the search page
    if (location.pathname.startsWith("/search/")) {
      setShowSearch(true);
      const urlQuery = location.pathname.split("/")[2];
      setQuery(decodeURI(urlQuery || ""));
    } else {
      setShowSearch(false);
    }
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    // Best practice to remove the event listners
    // This will act as componentWillUnmount
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if (type === "tv") {
      navigate("/explore/tv");
    } else if (type === "watchlist") {
      navigate("/watchlist");
    }
    setMobileMenu(false);
    setShowSearch(false);
  };

  useEffect(() => {
    if (query.trim().length > 0) {
      const delayDebounceFn = setTimeout(() => {
        navigate(`/search/${query}`);
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [query]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  return (
    <>
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={() => navigate("/")}>
            <span className="logo-text gradient-text">MoviePulse</span>
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={() => navigationHandler("movie")}>
              Movies
            </li>
            <li className="menuItem" onClick={() => navigationHandler("tv")}>
              TV Shows
            </li>
            <li className={`searchItem ${showSearch ? "active" : ""}`}>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search..."
                  ref={searchInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
              <HiOutlineSearch onClick={openSearch} />
            </li>
            <li className="menuItem themeItem">
              <ThemeToggle />
            </li>
            <li className="menuItem profileItem">
              {user ? (
                <div className="profileContainer">
                  <div className="profileIcon" onClick={() => navigate("/profile")}>
                    <img 
                      src={user.photoURL || avatarFallback} 
                      alt="Profile" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src = avatarFallback;
                      }}
                    />
                  </div>
                  <div className="logoutBtn" title="Logout" onClick={() => setShowLogoutModal(true)}>
                    <HiOutlineLogout />
                  </div>
                </div>
              ) : (
                <button className="loginBtn" onClick={handleLogin}>
                  Login
                </button>
              )}
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            <ThemeToggle />
            {user ? (
              <div className="profileIcon mobile" onClick={() => navigate("/profile")}>
                <img 
                  src={user.photoURL || avatarFallback} 
                  alt="Profile" 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.src = avatarFallback;
                  }}
                />
              </div>
            ) : (
              <button className="loginBtn mobile" onClick={handleLogin}>
                Login
              </button>
            )}
            {user && (
               <div className="logoutBtn mobile" onClick={() => setShowLogoutModal(true)}>
                <HiOutlineLogout />
              </div>
            )}
            {mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </ContentWrapper>
      </header>
      <LogoutModal 
        show={showLogoutModal} 
        setShow={setShowLogoutModal} 
        onConfirm={handleLogout} 
      />
    </>
  );
};

export default Header;