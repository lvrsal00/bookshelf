import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  // eslint-disable-next-line
  const [name, setName] = useCookies("ime");
  const [isLogin, setLogin] = useState(true);

  let history = useHistory();

  useEffect(() => {
    if (token["mytoken"]) {
      history.push("/profile");
    }
  }, [token, history]);

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => {
        setToken("mytoken", resp.token);
        setName("ime", username);
      })
      .catch((error) => {
        /*  window.alert("ne valja"); */
        console.log(error);
      });
  };

  const RegisterBtn = () => {
    APIService.RegisterUser({ username, password })
      .then(() => loginBtn())
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div className="Left_side">Bookshelf</div>

      <div className="Right_side">
        <br />
        <br />
        {isLogin ? <h1>Please Login </h1> : <h1>Please Register </h1>}

        <br />
        <br />

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Please Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Please Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isLogin ? (
          <button onClick={loginBtn}>Login</button>
        ) : (
          <button onClick={RegisterBtn}>Register</button>
        )}

        <div className="mb-3">
          <br />
          {isLogin ? (
            <h5>
              If You Don't Have Account, please{" "}
              <button onClick={() => setLogin(false)}>Register</button>
            </h5>
          ) : (
            <h5>
              If You Have Account, please
              <button onClick={() => setLogin(true)}>Login</button>
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
