import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, element }) => {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return element;
};

export default ProtectedRoute;
