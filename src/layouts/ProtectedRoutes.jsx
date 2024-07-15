import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { logOut, useCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";

const ProtectedRoutes = ({ children }) => {
  const token = useAppSelector(useCurrentToken);
  // console.log(token);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoutes;
