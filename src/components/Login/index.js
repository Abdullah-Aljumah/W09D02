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
  console.log(state);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let local = localStorage.getItem("token");
    setTokenLocal(local);
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tokenLocal, setTokenLocal] = useState("");
  const reg = () => {
    navigate("/register");
  };

  const logIn = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    // console.log(res.data.result);

    const data = {
      user: res.data.result,
      token: res.data.token,
    };
    console.log("data", data);
    dispatch(login({ data }));

    // if (res) {
    //   localStorage.setItem("role", res.data.result.role);
    //   localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("id", res.data.result._id);

    //   let local = localStorage.getItem("token");
    //   setTokenLocal(local);
    // }
  };

  return (
    <div className="login">
      {tokenLocal ? (
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
