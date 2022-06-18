import { Layout } from "antd";
import { Link } from "react-router-dom";
import { logoutFire } from "utils/utilis";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";
const { Header } = Layout;
function NavigationBar() {
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  const authHandler = () => {
    logoutFire();
    dispatch(authActions.logout());
    localStorage.setItem("token", "null");
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",

          justifyContent: "space-between",
          gap: "20px",
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
          {isAuth ? (
            <Link onClick={authHandler} style={{ color: "white" }} to={"/"}>
              Logout
            </Link>
          ) : null}

          {!isAuth ? (
            <>
              <Link style={{ color: "white" }} to={"/"}>
                Login
              </Link>
              <Link style={{ color: "white" }} to={"signup"}>
                SignUp
              </Link>
            </>
          ) : null}
        </div>
      </Header>
    </Layout>
  );
}

export default NavigationBar;
