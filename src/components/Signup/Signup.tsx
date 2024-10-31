import React, { useContext, useEffect, useState } from "react";
import Logo from "../../olx-logo.png";
import style from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { User, UserInfo } from "../../model/userTypes";
import { useAuth } from "../../context/authContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";

const initialData: User = {
  email: "",
  name: "",
  phone: "",
  password: "",
};
export default function Signup() {
  const { currentUser, setCurrentUser } = useAuth();

  const [userData, setUserData] = useState<User>(initialData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const user = res.user;
      await updateProfile(user, {
        displayName: userData.name,
      });
      const userInfo: UserInfo = {
        email: user.email || "",
        name: userData.name,
        phone: userData.phone || "",
      };

      setCurrentUser(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className={style.signupParentDiv}>
        <img
          className={style.logo}
          width="200px"
          height="200px"
          src={Logo}
          alt="OLX Logo"
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <input
            className={style.input}
            type="text"
            id="name"
            value={userData.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter your username"
          />
          <label htmlFor="email">Email</label>
          <input
            className={style.input}
            value={userData.email}
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <label htmlFor="phone">Phone</label>
          <input
            className={style.input}
            value={userData.phone}
            onChange={handleChange}
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            value={userData.password}
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <button className={style.button} type="submit">
            Signup
          </button>
        </form>
        <span className={style.link} onClick={() => navigate("/login")}>
          Already have an account? Login
        </span>
      </div>
    </div>
  );
}
