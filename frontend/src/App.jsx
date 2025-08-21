import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import RecordPage from './pages/RecordPage';
import BoardPage from './pages/BoardPage';
import UserPage from './pages/UserPage';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/schedule', element: <SchedulePage /> },
      { path: '/record', element: <RecordPage /> },
      { path: '/board', element: <BoardPage /> },
      { path: '/my', element: <UserPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
