import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import ErrorNotFound from "../components/ErrorPage/ErrorNotFound";
import { Todolist } from "../components/TodoList/TodoList";
function RoutesMain({ dataSource, setDataSource }) {
  return (
    <Routes>
      <Route element={<AuthRoutes isAuth={false} />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoutes isAuth={false} />}>
        <Route
          path="/todolist"
          element={<Todolist dataSource={dataSource || null} setDataSource={setDataSource} />}
        />
      </Route>

      <Route path="*" element={<ErrorNotFound />} />
    </Routes>
  );
}
export default RoutesMain;
