import { useState } from "react";
import { userLogin } from "../api/userLogin";
import loginStyles from "../styles/login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email_id: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(loginData);
      const loginToken = localStorage.getItem("loginToken");
      const registerToken = localStorage.getItem("registerToken");
      const token = loginToken || registerToken;
      if (token) {
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className={loginStyles.header}>Login</h1>
      <form className={loginStyles.form}>
        <input
          className={loginStyles.email}
          type="email"
          name="email_id"
          value={loginData.email_id}
          placeholder="email id"
          onChange={(e) => {
            setLoginData({ ...loginData, email_id: e.target.value });
          }}
        ></input>
        <br />
        <input
          className={loginStyles.password}
          type="password"
          name="password"
          value={loginData.password}
          placeholder="password"
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
        ></input>
        <br />
        <button type="submit" className={loginStyles.button} onClick={login}>
          Login
        </button>
        <p className={loginStyles.userLogin}>
          New User?
          <Link to="/register" className={loginStyles.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
