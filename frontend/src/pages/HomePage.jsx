import React from 'react';
import ScheduleCover from '../components/Cover/ScheduleCover';
import RecordCover from '../components/Cover/RecordCover';
import BoardCover from '../components/Cover/BoardCover';

function HomePage() {
  return (
    <div className='mt-15 space-y-20'>
      <ScheduleCover />
      <RecordCover />
      <BoardCover />
    </div>
  );
}

export default HomePage;
