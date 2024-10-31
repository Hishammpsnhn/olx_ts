import React, { Fragment } from 'react';
import styles from './Create.module.css';
import Header from '../Header/Header';

const Create = () => {
  return (
    <Fragment>
      {/* <Header /> */}
      <div className={styles.centerDiv}>
        <h2 className={styles.formTitle}>Sell Your Item</h2>
        <form>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="Name"
            placeholder="Enter item name"
          />

          <label htmlFor="category" className={styles.label}>Category</label>
          <input
            className={styles.input}
            type="text"
            id="category"
            name="Category"
            placeholder="Enter item category"
          />

          <label htmlFor="price" className={styles.label}>Price</label>
          <input
            className={styles.input}
            type="number"
            id="price"
            name="Price"
            placeholder="Enter price in USD"
          />

          <label className={styles.label}>Upload Image</label>
          <input type="file" className={styles.fileInput} />

          <button type="submit" className={styles.uploadBtn}>Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
