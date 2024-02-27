import React, { useState } from "react";
import logo from "../images/Logo ICON.svg";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideProfile from "./sideProfile";
import { Outlet } from "react-router-dom";
import "./sidebar.css";
import StarsComponent from "./StarsComponent";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const profileClick = () => {
    setProfile(!profile);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mainContentStyle = {
    marginLeft: isSidebarOpen ? "250px" : "0",
    transition: "margin-left 0.3s ease",
    backgroundColor: "#ebf3e8",
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}  `}>
        <div className="sidebar-div">
          <StarsComponent />
        </div>
      </div>
      <nav className="navbar py-1 px-3">
        <div className="d-flex flex-row align-items-center">
          <button className="hamburger" type="button" onClick={toggleSidebar}>
            <MenuIcon />
          </button>
          <img src={logo} alt="" className="" width="35px" />
          <p className="my-1 stud">Study</p>
          <p className="my-1 bud">Buddy</p>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          {/* <Link to={`home`} className="tabs">
            Home
          </Link>
          <Link to={`notebooks`} className="tabs">
            Notes
          </Link>
          <Link to={`tasks`} className="tabs">
            Tasks
          </Link> */}
        </div>
        <div>
          <Avatar sx={{ width: 35, height: 35 }} onClick={() => profileClick()}>
            A
          </Avatar>
        </div>
      </nav>

      {profile && <SideProfile />}

      <div className="p-3" style={mainContentStyle}>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
