import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store/store";

interface RequireAuthProps {
  allowedRoles: string[]; // Define the expected type for allowedRoles
}

function RequireAuth({ allowedRoles }: RequireAuthProps) {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  return isLoggedIn && allowedRoles.includes(role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
