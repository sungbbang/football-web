import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

function AuthRedirectRoute() {
  const { isAuthenticated } = useUser();

  // 아직 인증이 안됐을 때
  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Navigate to='/my' replace /> : <Outlet />;
}

export default AuthRedirectRoute;
