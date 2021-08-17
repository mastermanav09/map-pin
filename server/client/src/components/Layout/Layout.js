import React from "react";
import MainNavigation from "./MainNavigation";

function Layout(props) {
  return (
    <>
      <MainNavigation />
      {props.children}
    </>
  );
}

export default Layout;
