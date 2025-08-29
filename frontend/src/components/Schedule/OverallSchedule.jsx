import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { dateRangeQuery } from '../../loaders/scheduleLoader';

function OverallSchedule() {
  const { data } = useQuery(dateRangeQuery());

  console.log(data);

  return <div>OverallSchedule</div>;
}

export default OverallSchedule;
