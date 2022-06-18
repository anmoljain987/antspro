import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Store/index";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.min.css";

import ApolloServerComp from "./graphql/ApolloServer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloServerComp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloServerComp>
    </Provider>
  </React.StrictMode>
);
