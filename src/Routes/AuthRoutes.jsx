import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoutes({ isAuth }) {
  return !isAuth ? <Outlet /> : <Navigate to={"logoutFirst"} />;
}

export default AuthRoutes;
