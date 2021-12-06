import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Tasks from "../Tasks";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/login.js";
// import signIn from "../reducers/login";
const Login = () => {
  const state = useSelector((state) => {
    return {
      signIn: state.signIn,
    };
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reg = () => {
    navigate("/register");
  };

  const logIn = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    console.log("res.data.token", res.data.token);
    const data = {
      user: res.data.result,
      token: res.data.token,
    };

    dispatch(login({ data }));
  };

  return (
    <div className="login">
      {state.signIn.token ? (
        <Tasks />
      ) : (
        <>
          {" "}
          <h1>Login</h1>
          <form onSubmit={logIn}>
            <input
              className="inputVal"
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="inputVal"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="submit"
              value="Login"
              id="loginBtn"
              className="btn btn-primary"
            />
          </form>
          <p onClick={reg}>Not have an account ?</p>{" "}
        </>
      )}
    </div>
  );
};

export default Login;
