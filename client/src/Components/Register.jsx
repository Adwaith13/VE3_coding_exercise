import { useState } from "react";
import { userRegister } from "../api/userRegister";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    email_id: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await userRegister(registerData);
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
      <h1>Register</h1>
      <form onSubmit={register}>
        <input
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
          type="password"
          name="password"
          value={registerData.password}
          placeholder="password"
          onChange={(e) => {
            setRegisterData({ ...registerData, password: e.target.value });
          }}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
