import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import ErrorNotFound from "../components/ErrorPage/ErrorNotFound";
import ErrorUnAuthorised from "../components/ErrorPage/ErrorUnAuthorised";
import { Todolist } from "../components/TodoList/TodoList";
import { useSelector } from "react-redux";
function RoutesMain({ dataSource, setDataSource }) {
  const isAuth = useSelector((state) => state.isAuth);
  return (
    <Routes>
      <Route element={<AuthRoutes isAuth={isAuth} />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoutes isAuth={isAuth} />}>
        <Route
          path="/todolist/"
          element={<Todolist dataSource={dataSource || null} setDataSource={setDataSource} />}
        ></Route>
      </Route>
      <Route element={<ErrorUnAuthorised />}></Route>
      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}
export default RoutesMain;
