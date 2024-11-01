import React, { Fragment } from "react";
import styles from "./Create.module.css";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

const Create = () => {
  const location = useLocation();
  const stateValue = location.state;
  return (
    <Fragment>
      {/* <Header /> */}

      <h2 className={styles.formMainTitle}>Post your Ad</h2>

      <div className={styles.centerDiv}>
        <h2 className={styles.formTitle}>Selected category</h2>
        <p className={styles.category}>
          {stateValue.selectedCategory}/{stateValue.subCategoryName}
        </p>
        <form>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="Name"
            placeholder="Enter item name"
          />

          <label htmlFor="Description" className={styles.label}>
            Category
          </label>
          <textarea
            className={styles.input}
            id="Description"
            name="Category"
            placeholder="Description"
            rows={4}
          ></textarea>

          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <input
            className={styles.input}
            type="number"
            id="price"
            name="Price"
            placeholder="Enter price in USD"
          />

          <label className={styles.label}>Upload Image</label>
          <input type="file" className={styles.fileInput} />

          <button type="submit" className={styles.uploadBtn}>
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
