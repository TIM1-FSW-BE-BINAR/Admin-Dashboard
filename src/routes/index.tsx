import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import AirlinesPage from '@/pages/airlines';
import AirportsPage from '@/pages/airports';
import NotificationsPage from '@/pages/notifications';
import SeatsPage from '@/pages/seats';
import DiscountsPage from '@/pages/discounts';
import FlightsPage from '@/pages/flights';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
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
          path: 'airports',
          element: <AirportsPage />
        },
        {
          path: 'flights',
          element: <FlightsPage />
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
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
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
