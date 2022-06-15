import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../Store/index";
const { Header } = Layout;
function NavigationBar() {
  const auth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  const authHandler = () => {
    dispatch(authActions.logout());
  };
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
        <div style={{ color: "white" }}>Todo-List</div>
        <div
          style={{
            display: "flex",

            justifyContent: "end",
            gap: "50px",
            fontSize: "20px",
          }}
        >
          {auth && (
            <Link onClick={authHandler} style={{ color: "white" }} to={auth && "/"}>
              Logout
            </Link>
          )}

          {auth || (
            <Link style={{ color: "white" }} to={"/"}>
              SignIn
            </Link>
          )}
          {auth || (
            <Link style={{ color: "white" }} to={"signup"}>
              SignUp
            </Link>
          )}
        </div>
      </Header>
    </Layout>
  );
}

export default NavigationBar;
