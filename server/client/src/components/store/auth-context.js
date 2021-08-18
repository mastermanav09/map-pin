import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [currentUsername, setCurrentUsername] = useState(
    localStorage.getItem("username")
  );
  const [showRegister, setRegister] = useState(false);
  const [showLogin, setLogin] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(
    localStorage.getItem("userId")
  );

  const authContext = {
    currentUsername: currentUsername,
    showRegister: showRegister,
    showLogin: showLogin,
    currentUserId: currentUserID,

    setUsername: (value) => setCurrentUsername(value),
    setShowLogin: (value) => setLogin(value),
    setShowRegister: (value) => setRegister(value),
    setCurrentUserId: (value) => setCurrentUserID(value),
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
