import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi2";
import "./style.scss";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`themeToggle ${theme}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="toggleTrack">
        <HiSun className="sunIcon" />
        <HiMoon className="moonIcon" />
        <div className="toggleThumb" />
      </div>
    </button>
  );
};

export default ThemeToggle;
