import React, { Fragment, useState } from "react";
import styles from "./Create.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import camImage from "../../assets/camera.jpg";
import { Post } from "../../model/userTypes";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { validatePost } from "../../utils/FormValidation";
import ErrorMessage from "../Error/ErrorMsg";
import { disabledBtn } from "../../utils/inlineStyle";

const Create = () => {
  const location = useLocation();
  const { selectedCategory, subCategoryName } = location.state;
  const navigate = useNavigate();

  const initialValue: Post = {
    name: "",
    description: "",
    price: "",
    selectedCategory: selectedCategory,
    subCategoryName: subCategoryName,
    images: [null, null, null],
  };

  const [post, setPost] = useState(initialValue);
  const [loading, setLoading] = useState([false, false, false]);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "olx_clone_ts");

      // Set loading state for this index
      setLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = true;
        return newLoading;
      });

      try {
        // Upload to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dhs8o9scz/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        const imageUrl = data.secure_url;

        const newImages = [...post.images];
        newImages[index] = imageUrl;
        setPost((prev) => ({ ...prev, images: newImages }));
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        // Reset loading state for this index
        setLoading((prevLoading) => {
          const newLoading = [...prevLoading];
          newLoading[index] = false;
          return newLoading;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validatePost(post)
    if(err){
      setError(err);
      return;
    }
    console.log(post);
    setFormLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        ...post,
      });
      console.log("Document written with ID: ", docRef.id);
      setError(null)
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to create post");
    } finally {
      setFormLoading(false);

    }
  };

  return (
    <Fragment>
      <h2 className={styles.formMainTitle}>Post your Ad</h2>
      <div className={styles.centerDiv}>
        <h2 className={styles.formTitle}>Selected category</h2>
        <p className={styles.category}>
          {selectedCategory}/{subCategoryName}
        </p>
      {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            className={styles.input}
            value={post.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Enter item name"
          />

          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            className={styles.input}
            value={post.description}
            onChange={handleChange}
            id="description"
            name="description"
            placeholder="Description"
            rows={4}
          ></textarea>

          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <input
            className={styles.input}
            value={post.price}
            onChange={handleChange}
            type="number"
            id="price"
            name="price"
            placeholder="Enter price in USD"
          />

          <label className={styles.label}>Upload Images</label>
          <div className={styles.imageContainer}>
            {post.images.map((image, index) => (
              <div key={index} className={styles.imageBox}>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={(e) => handleImageChange(e, index)}
                />
                {loading[index] ? (
                  <div className={styles.loadingIndicator}>Loading...</div> // Display loading indicator
                ) : image ? (
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className={styles.imagePreview}
                  />
                ) : (
                  <img
                    src={camImage}
                    alt={`Preview ${index + 1}`}
                    className={styles.imagePreview}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className={styles.uploadBtn}
            style={formLoading ? { ...disabledBtn } : {}}
            disabled={loading[0] || loading[1] || loading[2] || formLoading}
          >
            { formLoading ? "loading..." : "Submit"}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
