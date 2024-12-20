import React, { useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { Item, Post } from "../../model/userTypes";
import { useNavigate } from "react-router-dom";
import Skelition from "../card-skeliton/Skelition";

function Posts() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(firestore, "posts"));
        const items: Item[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Item, "id">), // Spread the data without 'id'
          id: doc.id, // Add 'id' explicitly here
        }));
        console.log(items);
        setData(items.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {loading ? (
            <div className="card-skeleton">
              <Skelition />
              <Skelition />
              <Skelition />
              <Skelition />
              <Skelition />
              <Skelition />
              <Skelition />
            </div>
          ) : (
            <>
              {data.map((item) => (
                <div
                  className="card"
                  key={item.id}
                  onClick={() => navigate(`/view/${item.id}`)}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img
                      loading="lazy"
                      src={item.images[0] ? item.images[0] : ""}
                      alt="imaage"
                    />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {item.price}</p>
                    <span className="kilometer">{item.selectedCategory}</span>
                    <p className="name"> {item.subCategoryName}</p>
                  </div>
                  {/* <div className="date">
                    <span>Tue May 04 2021</span>
                  </div> */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
          {data.slice(0, 5).map((item) => (
            <div
              className="card"
              key={item.id}
              onClick={() => navigate(`/view/${item.id}`)}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img
                  loading="lazy"
                  src={item.images[0] ? item.images[0] : ""}
                  alt="imaage"
                />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {item.price}</p>
                <span className="kilometer">{item.selectedCategory}</span>
                <p className="name"> {item.subCategoryName}</p>
              </div>
              <div className="date">
                <span>Tue May 04 2021</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
