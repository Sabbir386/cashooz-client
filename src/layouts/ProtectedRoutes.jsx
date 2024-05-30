import { useAppDispatch, useAppSelector } from "../redux/features/hooks";

import { logOut, useCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";

const ProtectedRoutes = ({ children ,role}) => {
  const token = useAppSelector(useCurrentToken);
  console.log(token);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoutes;
