import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Layout from "./components/Layout/Layout";
import { AuthContextProvider } from "./components/store/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <Layout>
      <App />
    </Layout>
  </AuthContextProvider>,
  document.getElementById("root")
);
