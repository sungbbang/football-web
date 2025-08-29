import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import RecordPage from './pages/RecordPage';
import BoardPage from './pages/BoardPage';
import UserPage from './pages/UserPage';
import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/LoginPage';
import { scheduleLoader } from './loaders/scheduleLoader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      { path: '/record', element: <RecordPage /> },
      { path: '/board', element: <BoardPage /> },
      { path: '/my', element: <UserPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
