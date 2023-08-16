import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAuth from "../Hooks/useAuth";
import useClient from "../Hooks/useClient";

const ClientRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isClient, isClientLoading] = useClient();
  if (loading || isClientLoading) {
    return <Loader></Loader>;
  }
  if (user && isClient) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default ClientRoute;
