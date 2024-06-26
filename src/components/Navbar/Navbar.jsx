import "./Navbar.css";

import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { useRef, useContext } from "react";
import { useEffect } from "react";
import { logout } from "../../firebase";
import { AppContext } from "../../Context/AppContext";

const Navbar = () => {
  const navRef = useRef();
  const { userData } = useContext(AppContext);
  console.log("userData", userData);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="Search icon" className="icons" />
        <p>{userData.displayName ? userData.displayName : "User"}</p>
        <img src={bell_icon} alt="Bell icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile icon" className="profile" />
          <img src={caret_icon} alt="Caret icon" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
