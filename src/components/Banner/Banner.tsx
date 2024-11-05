import React, { useEffect, useState } from "react";

import "./Banner.css";
import Arrow from "../../assets/Arrow";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
function Banner() {
  const [categoryies, SetCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = await getDocs(collection(firestore, "posts"));
        const items = query.docs.map((doc) => doc.data().subCategoryName);
        SetCategories(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow>
          </div>
          <div className="otherQuickOptions">
            {categoryies.map((category) => (
              <span onClick={() => navigate(`/${category}`)} key={category}>
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
