import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function ProtectedRoutes() {
  let token = cookies.get("TOKEN") == null ? false : true;
  return <>{token ? <Outlet /> : <Navigate to="/user/login" />};</>;
}
