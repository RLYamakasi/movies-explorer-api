import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return JSON.parse(localStorage.getItem("LoggedIn")) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
