import React from 'react';
import Logo from '../../olx-logo.png';
import style from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={style.signupParentDiv}>
        <img className={style.logo} width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form>
          <label htmlFor="name">Username</label>
          <input
            className={style.input}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your username"
          />
          <label htmlFor="email">Email</label>
          <input
            className={style.input}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
          <label htmlFor="phone">Phone</label>
          <input
            className={style.input}
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
          <button className={style.button} type="submit">Signup</button>
        </form>
        <span className={style.link} onClick={() => navigate('/login')}>Already have an account? Login</span>
      </div>
    </div>
  );
}
