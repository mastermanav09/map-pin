import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState, useContext } from "react";
import "./Signup.module.css";
import AuthContext from "../store/auth-context";
import classes from "./Signup.module.css";

export default function Register() {
  const authContext = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const focusHandler = () => {
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.put("http://localhost:8080/api/users/signup", newUser);
      setError(false);
      setSuccess(true);
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
          <b>Signup</b>
        </h1>

        <div className={classes["form-control"]}>
          <label htmlFor="auth-username"></label>
          <input
            type="username"
            placeholder="Username"
            className={classes["auth-username"]}
            ref={usernameRef}
          />

          <label htmlFor="auth-email"></label>
          <input
            type="email"
            placeholder="Email"
            className={classes["auth-email"]}
            ref={emailRef}
          />

          <label htmlFor="auth-password"></label>
          <input
            type="password"
            placeholder="Password"
            className={classes["auth-password"]}
            ref={passwordRef}
          />
        </div>

        <button type="submit" className={classes.signupSubmitBtn}>
          <b>signup</b>
        </button>
        <Cancel
          className={classes.signupCancel}
          onClick={() => authContext.setShowRegister(false)}
        />
        {success && (
          <span className={classes.success}>
            Successfull. You can login now!
          </span>
        )}
        {error && (
          <span className={classes.failure}>
            Either user exists or incorrect details! Username should be at least
            3 characters long and password 6 characters long.
          </span>
        )}
      </form>
    </section>
  );
}