import React, { useEffect, useState } from "react";
import Logo from "../../olx-logo.png";
import style from "./Login.module.css";
import { Navigate, replace, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { UserInfo } from "../../model/userTypes";
import { disabledBtn } from "../../utils/inlineStyle";
import ErrorMessage from "../Error/ErrorMsg";
import { validateLoginForm } from "../../utils/FormValidation";

function Login() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, loading, setLoading } = useAuth();
  const [email, setEmail] = useState("one@gmail.com");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("9656753610");

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (error) setError(null);
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateLoginForm({email,password})
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError(null);
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
      setError("invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  console.log(currentUser);
  return (
    <>
      {/* {currentUser && <Navigate to={'/'} replace={true}/>} */}
      <div className={style.loginParentDiv}>
        <img className={style.logo} src={Logo} alt="OLX Logo" width="150px" />
        {error && <ErrorMessage message={error} />}
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
          <button
            type="submit"
            className={style.button}
            disabled={loading}
            style={loading ? { ...disabledBtn } : {}}
          >
            {loading ? "loading..." : "Login"}
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
