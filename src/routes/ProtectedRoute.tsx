import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { authService } from '@/services/auth';
import { setToken, setUsers } from '@/redux/slices';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.token);
  const tokenLocal = localStorage.getItem('token');

  useEffect(() => {
    const checkUser = async () => {
      if (!token && tokenLocal) {
        try {
          const userData = await authService.getCurrentUser();
          if (userData?.role === 'ADMIN') {
            dispatch(setToken(tokenLocal));
            dispatch(setUsers(userData));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkUser();
  }, [token, tokenLocal, dispatch]);

  if (!token && !tokenLocal) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
