import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/', name: '홈' },
  { path: '/schedule', name: '일정' },
  { path: '/record', name: '순위' },
  { path: '/board', name: '게시판' },
];

function Footer() {
  const location = useLocation();

  return (
    <footer className='mt-20 bg-gray-100'>
      <div className='container mx-auto space-y-10 px-4 py-12'>
        <div className='flex sm:justify-center'>
          <ul className='grid grid-cols-1 gap-8 text-lg font-semibold text-gray-400 sm:grid-cols-4 sm:text-center'>
            {menuItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-selected={
                    location.pathname.split('/')[1] === item.path.substring(1)
                  }
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className='hover:text-blue-500 aria-selected:font-bold aria-selected:text-blue-500'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='space-y-4 sm:text-center'>
          <p>해외축구 좋아하는 사람이 만들었습니다.</p>
          <p>&copy; 2025 All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
