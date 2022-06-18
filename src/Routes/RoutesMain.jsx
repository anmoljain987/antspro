import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import ErrorNotFound from "../components/ErrorPage/ErrorNotFound";
import ErrorUnAuthorised from "../components/ErrorPage/ErrorUnAuthorised";
import { Todolist } from "../components/TodoList/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";
function RoutesMain({ dataSource, setDataSource }) {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === "null") {
      token = null;
    }
    if (token) {
      dispatch(authActions.login());
    }
  }, [dispatch, isAuth]);
  return (
    <Routes>
      <Route element={<AuthRoutes isAuth={isAuth} />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoutes isAuth={isAuth} />}>
        <Route
          path="/todolist"
          element={<Todolist dataSource={dataSource || null} setDataSource={setDataSource} />}
        ></Route>
      </Route>

      <Route element={<ErrorUnAuthorised />} path="/logoutfirst"></Route>
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}
export default RoutesMain;
