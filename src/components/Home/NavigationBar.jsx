import { Layout } from "antd";
import { Link } from "react-router-dom";
import { logoutFire } from "utils/utilis";
import { useSelector } from "react-redux";
const { Header } = Layout;
function NavigationBar() {
  const isAuth = useSelector((state) => state.isAuth);

  const authHandler = () => {
    logoutFire();
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
          {isAuth ? (
            <Link onClick={authHandler} style={{ color: "white" }} to={"/"}>
              Logout
            </Link>
          ) : null}

          {!isAuth ? (
            <>
              <Link style={{ color: "white" }} to={"/"}>
                SignIn
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
