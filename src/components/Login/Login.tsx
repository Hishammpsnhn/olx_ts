import React, { useEffect, useState } from "react";
import Logo from "../../olx-logo.png";
import style from "./Login.module.css";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { UserInfo } from "../../model/userTypes";
import { userInfo } from "os";

function Login() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      const userInfo: UserInfo = {
        email: user.email || "",
        name: user.displayName || "",
        phone: user.phoneNumber || "",
      };
      setCurrentUser(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  console.log(currentUser);
  return (
    <>
      {/* {currentUser && <Navigate to={'/'} replace={true}/>} */}
      <div className={style.loginParentDiv}>
        <img className={style.logo} src={Logo} alt="OLX Logo" width="150px" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className={style.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit" className={style.button}>
            Login
          </button>
        </form>
        <span className={style.link} onClick={() => navigate("/signup")}>
          Don’t have an account? Signup
        </span>
      </div>
    </>
  );
}

export default Login;
