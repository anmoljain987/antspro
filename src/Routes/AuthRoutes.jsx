import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoutes({ isAuth }) {
  return isAuth ? <Navigate to={"/todolist"} /> : <Outlet />;
}

export default AuthRoutes;
