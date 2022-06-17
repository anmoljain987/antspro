import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes({ isAuth }) {
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
}

export default PrivateRoutes;
