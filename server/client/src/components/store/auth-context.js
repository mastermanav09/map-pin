import React, { useState } from "react";

const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [currentUsername, setCurrentUsername] = useState(
    localStorage.getItem("userId")
  );
  const [showRegister, setRegister] = useState(false);
  const [showLogin, setLogin] = useState(false);

  const authContext = {
    currentUsername: currentUsername,
    showRegister: showRegister,
    showLogin: showLogin,

    setUsername: (value) => setCurrentUsername(value),
    setShowLogin: (value) => setLogin(value),
    setShowRegister: (value) => setRegister(value),
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
