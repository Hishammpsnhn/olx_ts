import React, { useEffect, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";

function Header() {
  const [dropDown, setDropDown] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("userInfo");
    setDropDown(false);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value && value.length > 2) {
      try {
        const productsRef = collection(firestore, "posts");
        const q = query(
          productsRef,
          where("name", ">=", value),
          where("name", "<=", value + "\uf8ff")
        );

        const querySnapshot = await getDocs(q);
        const filteredData = querySnapshot.docs.map((doc) => doc.data().name);
        console.log(filteredData);

        setSuggestions(filteredData);
      } catch (error) {
        console.error("Error fetching search data from Firebase:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <>
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName" onClick={() => navigate("/")}>
            <OlxLogo />
          </div>
          <div className="placeSearch">
            <Search />
            <input type="text" />
            <Arrow />
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Find car, mobile phone and more..."
                value={search}
                onChange={handleChange}
              />
            </div>
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="suggestionsDropdown">
                {suggestions.map((item: any, index: any) => (
                  <div key={index} className="suggestionItem">
                    {item}
                  </div>
                ))}
              </div>
            )}
            <div className="searchAction">
              <Search color="#ffffff" />
            </div>
          </div>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow />
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
                  <Arrow />
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
            <SellButton />
            <div
              onClick={() =>
                currentUser ? navigate("/post") : navigate("/login")
              }
              className="sellMenuContent"
            >
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
