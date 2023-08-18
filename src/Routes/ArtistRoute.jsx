import React from "react";
import useAuth from "../Hooks/useAuth";
import useArtist from "../Hooks/useArtist";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";

const ArtistRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isArtist, isArtistLoading] = useArtist();
  const location = useLocation();
  if (loading || isArtistLoading) {
    return <Loader></Loader>;
  }
  if (user && isArtist) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default ArtistRoute;
