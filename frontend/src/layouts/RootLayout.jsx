import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

function RootLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4'>
        <Navbar />
        <main className='flex-1 pt-20'>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
export default RootLayout;
