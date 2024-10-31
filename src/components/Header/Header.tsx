import React, { useEffect, useState } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
function Header() {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const { currentUser,setCurrentUser } = useAuth();

  const handleLogout = ()=>{
    setCurrentUser(null);
    // navigate("/login");
    localStorage.removeItem('userInfo')
    setDropDown(false)
  }

  return (
    <>
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
          <div className="placeSearch">
            <Search></Search>
            <input type="text" />
            <Arrow></Arrow>
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Find car,mobile phone and more..."
              />
            </div>
            <div className="searchAction">
              <Search color="#ffffff"></Search>
            </div>
          </div>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow></Arrow>
          </div>
          {!currentUser ? (
            <div className="loginPage">
              <span onClick={() => navigate("/login")}>Login</span>
              <hr />
            </div>
          ) : (
            <>
              <div className="profile-section">
                <div
                  className="profileIcon"
                  onClick={() => navigate("/profile")}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div onClick={() => setDropDown((prev) => !prev)}>
                  <Arrow></Arrow>
                </div>
              </div>
              {dropDown && (
                <div className="dropdownMenu">
                  <div onClick={() => navigate("/profile")}>Profile</div>
                  <div onClick={handleLogout}>Logout</div>
                </div>
              )}
            </>
          )}

          <div className="sellMenu">
            <SellButton></SellButton>
            <div onClick={() => navigate("/post")} className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
