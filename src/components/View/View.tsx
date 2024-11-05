import React, { useEffect, useState } from "react";

import "./View.css";
import { useParams } from "react-router-dom";
import { firestore } from "../../config/firebase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { Item } from "../../model/userTypes";
function View() {
  const { id } = useParams();
  const [data, setData] = useState<null | Item>(null);
  console.log(id);
  useEffect(() => {
    async function fetchDataById(id: string) {
      try {
        const docRef = doc(firestore, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = docSnap.data() as Item;
          console.log("Document data:", itemData);
          setData(itemData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    if (id) fetchDataById(id); // Fetch data only if `id` exists
  }, [id]);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={data?.images[0] ? data.images[0] : ""} alt="imagee" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; j </p>
          <span>{data?.selectedCategory}</span>
          <p>{data?.subCategoryName}</p>
          <span>Tue May 04 2021</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{data?.seller.name}</p>
          <p>{data?.seller.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
