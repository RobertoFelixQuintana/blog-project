import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
