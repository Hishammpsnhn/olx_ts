import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import L from "leaflet";
import { Item } from "../../model/userTypes";
import "./View.css";
import Map from "../Map/Map";

function View() {
  const { id } = useParams();
  const [data, setData] = useState<null | Item>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDataById(id: string) {
      setLoading(true);
      try {
        const docRef = doc(firestore, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = docSnap.data() as Item;
          setData(itemData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDataById(id);
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={data?.images[0] || ""} alt="Product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {data?.price}</p>
          <span>{data?.selectedCategory}</span>
          <p>{data?.subCategoryName}</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{data?.seller.name}</p>
          <p>{data?.seller.email}</p>
          <p>{data?.seller.phone}</p>
        </div>
        {data?.location?.latitude && data.location?.longitude && (
          <Map location={data.location} />
        )}
      </div>
    </div>
  );
}

export default View;
