import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Header } = Layout;

function NavigationBar() {
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",

          justifyContent: "space-between",
          gap: "50px",
          fontSize: "20px",
        }}
      >
        <div style={{ color: "white" }}>Logo</div>
        <div
          style={{
            display: "flex",

            justifyContent: "end",
            gap: "50px",
            fontSize: "20px",
          }}
        >
          <Link style={{ color: "white" }} to={"/"}>
            SignIn
          </Link>
          <Link style={{ color: "white" }} to={"signup"}>
            SignUp
          </Link>
        </div>
      </Header>
    </Layout>
  );
}

export default NavigationBar;
