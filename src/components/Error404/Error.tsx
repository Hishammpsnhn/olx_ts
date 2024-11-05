import React from "react";
import errImg from "../../assets/404.webp";
import './Error.css'
const Error = () => {
  return (
    <div className="error-container">
      <div>
        <h1>Error 404: Page Not Found</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          aspernatur eius dolores dicta earum ducimus
        </p>
      </div>
      <img src={errImg} alt="error" />
    </div>
  );
};

export default Error;
