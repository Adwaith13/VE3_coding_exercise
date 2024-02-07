import { useState } from "react";
import { userRegister } from "../api/userRegister";
import loginStyles from "../styles/login.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    email_id: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await userRegister(registerData);
      const loginToken = localStorage.getItem("loginToken");
      const registerToken = localStorage.getItem("registerToken");
      const token = loginToken || registerToken;
      if (token) {
        navigate("/");
      }
      console.log(user);
      setRegisterData({
        email_id: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className={loginStyles.header}>Register</h1>
      <form className={loginStyles.form}>
        <input
          className={loginStyles.email}
          type="email"
          name="email_id"
          value={registerData.email_id}
          placeholder="email"
          onChange={(e) => {
            setRegisterData({ ...registerData, email_id: e.target.value });
          }}
        ></input>
        <br />
        <input
          className={loginStyles.password}
          type="password"
          name="password"
          value={registerData.password}
          placeholder="password"
          onChange={(e) => {
            setRegisterData({ ...registerData, password: e.target.value });
          }}
        ></input>
        <br />
        <button type="submit" className={loginStyles.button} onClick={register}>
          Register
        </button>
        <p className={loginStyles.user}>
          Already Registered?
          <Link to="/login" className={loginStyles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
