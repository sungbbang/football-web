import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import RecordPage from './pages/RecordPage';
import BoardPage from './pages/BoardPage';
import UserPage from './pages/UserPage';
import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/LoginPage';
import { scheduleLoader } from './loaders/scheduleLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { recordLoader } from './loaders/recordLoader';
import { boardLoader } from './loaders/postLoader';
import { UserProvider } from './contexts/UserContext';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/schedule',
        element: <SchedulePage />,
        loader: scheduleLoader(queryClient),
      },
      {
        path: '/record',
        loader: () => redirect('/record/epl', { replace: true }),
      },
      {
        path: '/record/:league',
        element: <RecordPage />,
        loader: recordLoader(queryClient),
      },
      {
        path: '/board',
        element: <BoardPage />,
        loader: boardLoader(queryClient),
      },
      { path: '/my', element: <UserPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
