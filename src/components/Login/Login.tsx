import React from 'react';
import Logo from '../../olx-logo.png';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <div className={style.loginParentDiv}>
      <img className={style.logo} src={Logo} alt="OLX Logo" width="150px" />
      <form>
        <label htmlFor="email">Email</label>
        <input
          className={style.input}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        <label htmlFor="password">Password</label>
        <input
          className={style.input}
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
        />
        <button type="submit" className={style.button}>Login</button>
      </form>
      <span className={style.link} onClick={() => navigate('/signup')}>
        Don’t have an account? Signup
      </span>
    </div>
  );
}

export default Login;
