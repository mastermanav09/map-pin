import React, { useContext } from "react";
import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import AuthContext from "../store/auth-context";
import classes from "./Login.module.css";

export default function Login() {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const focusHandler = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);

      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("username", res.data.username);
      authContext.setUsername(res.data.username);
      authContext.setCurrentUserId(localStorage.getItem("userId"));

      authContext.setShowLogin(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <section className={classes.loginpage}>
      <form
        className={classes["auth-in"]}
        onSubmit={handleSubmit}
        onFocus={focusHandler}
        noValidate
      >
        <h1 className={classes["title"]}>
          <b>Login</b>
        </h1>

        <div className={classes["form-control"]}>
          <label htmlFor="auth-username"></label>
          <input
            type="username"
            placeholder="Username"
            className={classes["auth-username"]}
            ref={usernameRef}
          />
          <label htmlFor="auth-password"></label>
          <input
            type="password"
            placeholder="Password"
            className={classes["auth-password"]}
            ref={passwordRef}
          />
        </div>

        <button type="submit" className={classes.loginSubmitBtn}>
          <b>login</b>
        </button>
        <Cancel
          className={classes.loginCancel}
          onClick={() => authContext.setShowLogin(false)}
        />
        {error && <span className={classes.failure}>User not found!</span>}
      </form>
    </section>
  );
}
