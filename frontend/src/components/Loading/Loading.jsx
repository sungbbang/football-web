import React from 'react';

function Loading() {
  return (
    <div className='flex h-32 items-center justify-center'>
      <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
    </div>
  );
}

export default Loading;
