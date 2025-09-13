import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUser } from 'react-icons/fa';

const menuItems = [
  { path: '/', name: '홈' },
  { path: '/schedule', name: '일정' },
  { path: '/record', name: '순위' },
  { path: '/board', name: '게시판' },
];

function Navbar() {
  const location = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleSideMenu = () => {
    setIsOpenMenu(prev => !prev);
  };

  const handleClickLink = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className='fixed top-0 left-0 z-30 w-full bg-white text-black shadow-lg'>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4'>
        <div>
          <h1 className='text-2xl font-bold lg:text-3xl xl:text-4xl'>
            <Link to='/' onClick={handleClickLink}>
              Football-Web
            </Link>
          </h1>
        </div>

        <div className='hidden justify-center md:flex'>
          <ul className='flex gap-15 text-xl lg:text-2xl'>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-selected={
                    location.pathname.split('/')[1] === item.path.substring(1)
                  }
                  className='hover:text-blue-500 aria-selected:font-semibold aria-selected:text-blue-500'
                  onClick={handleClickLink}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li key='/my' className='flex items-center justify-center'>
              <Link
                to='/my'
                className='hover:text-blue-500 aria-selected:text-blue-500'
                aria-selected={
                  location.pathname.split('/')[1] === '/my'.substring(1)
                }
                onClick={handleClickLink}
              >
                <FaUser />
              </Link>
            </li>
          </ul>
        </div>

        <button
          className='text-2xl md:hidden'
          aria-label='메뉴'
          onClick={toggleSideMenu}
        >
          {isOpenMenu ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-white text-black transition-transform duration-300 ease-in-out ${
          isOpenMenu ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className='px-4'>
          <div className='flex h-20 justify-end'>
            <button className='text-2xl' onClick={toggleSideMenu}>
              <HiX />
            </button>
          </div>
          <ul className='clear-both space-y-10 pt-8 text-lg'>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-selected={
                    location.pathname.split('/')[1] === item.path.substring(1)
                  }
                  className='hover:text-blue-500 aria-selected:font-semibold aria-selected:text-blue-500'
                  onClick={() => {
                    handleClickLink();
                    toggleSideMenu();
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li key='/my'>
              <Link
                to='/my'
                className='hover:text-blue-500 aria-selected:text-blue-500'
                aria-selected={location.pathname === '/my'}
                onClick={() => {
                  handleClickLink();
                  toggleSideMenu();
                }}
              >
                마이페이지
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
