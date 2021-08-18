import React, { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../store/auth-context";
import { Room } from "@material-ui/icons";

function MainNavigation() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.setUsername(null);
    authContext.setCurrentUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-content"]}>
        <div className={classes.logo}>
          <Room style={{ fontSize: "1.8rem" }} />
          Map pin
        </div>
        <div className={classes["user-actions"]}>
          {authContext.currentUsername ? (
            <button
              className={`${classes.button} ${classes.logout}`}
              onClick={() => handleLogout()}
            >
              Log out
            </button>
          ) : (
            <>
              <button
                className={`${classes.button} ${classes.login}`}
                onClick={() => authContext.setShowLogin(true)}
              >
                Log in
              </button>
              <button
                className={`${classes.button} ${classes.signup}`}
                onClick={() => authContext.setShowRegister(true)}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;
