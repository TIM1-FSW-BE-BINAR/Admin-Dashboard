import React, { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import AirlinesPage from '@/pages/airlines';
import NotificationsPage from '@/pages/notifications';
import SeatsPage from '@/pages/seats';
import AirportsPage from '@/pages/airports';
import DiscountsPage from '@/pages/discounts';
import FlightsPage from '@/pages/flights';
import { RootState } from '../redux/store';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));

// ----------------------------------------------------------------------

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useSelector((state: RootState) => state);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'airlines',
          element: <AirlinesPage />
        },
        {
          path: 'notifications',
          element: <NotificationsPage />
        },
        {
          path: 'seats',
          element: <SeatsPage />
        },
        {
          path: 'flights',
          element: <FlightsPage />
        },
        {
          path: 'airports',
          element: <AirportsPage />
        },
        {
          path: 'notifications',
          element: <NotificationsPage />
        },
        {
          path: 'seats',
          element: <SeatsPage />
        },
        {
          path: 'discount',
          element: <DiscountsPage />
        },
        {
          path: 'form',
          element: <FormPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
