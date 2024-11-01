import React, { useState } from "react";
import styles from "./Category.module.css";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  subCategories: string[];
}

const categories: Category[] = [
  { name: "Car", subCategories: ["SUV", "Sedan", "Hatchback", "Convertible"] },
  {
    name: "Properties",
    subCategories: ["Apartments", "Villas", "Offices", "Land"],
  },
  {
    name: "Mobile",
    subCategories: ["Mobile Accessory", "Tablet", "Smartphone", "Smartwatch"],
  },
  {
    name: "Laptop",
    subCategories: ["Gaming Laptop", "Ultrabook", "2-in-1", "MacBook"],
  },
];

const Category = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };
  const handleSubCategoryClick = (subCategoryName: string): void => {
   
    navigate('/post/attribute',{state:{selectedCategory,subCategoryName}})
  };

  return (
    <>
      <h3 className={styles.headingCategory}>Post your Ad</h3>
      <div className={styles.categoryContainer}>
        <h3 className={styles.chooseCategory}>Choose a category</h3>
        <div style={{ display: "flex" }}>
          <div className={styles.categoryList}>
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`${styles.categoryItem} ${
                  selectedCategory === category.name
                    ? styles.activeCategory
                    : ""
                }`}
              >
                <h3 className={`${styles.categoryName} `}>{category.name}</h3>
              </div>
            ))}
          </div>
          {selectedCategory && (
            <div className={styles.subCategoryContainer}>
              <>
                <ul className={styles.subCategoryList}>
                  {categories
                    .find((category) => category.name === selectedCategory)
                    ?.subCategories.map((subCategory, subIndex) => (
                      <li
                        key={subIndex}
                        className={styles.categoryItem}
                        onClick={() => handleSubCategoryClick(subCategory)}
                      >
                        {subCategory}
                      </li>
                    ))}
                </ul>
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
