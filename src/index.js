import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import ApolloServerComp from "./graphql/ApolloServer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloServerComp>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloServerComp>
  </React.StrictMode>
);
