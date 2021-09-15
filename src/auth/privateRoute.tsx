import { Route, Navigate, useParams } from "react-router-dom";
import { useAuth } from "./auth.context";

interface Props {
  path?: string | undefined;
  [key: string]: any;
}

const PrivateRoute = ({ path, ...props }: Props) => {
  const { id } = useParams();
  const { user: { loggedIn } } = useAuth();
  
  return loggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path?.replace(":id", id) }} replace to="/login" />
  );
};

export default PrivateRoute;
