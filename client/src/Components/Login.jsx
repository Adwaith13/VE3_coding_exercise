import { useState } from "react";
import { userLogin } from "../api/userLogin";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email_id: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(loginData);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
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
          type="password"
          name="password"
          value={loginData.password}
          placeholder="password"
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
