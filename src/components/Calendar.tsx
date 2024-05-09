// src/components/Calendar.tsx
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const Calendar: React.FC = () => {
  const startDate = startOfMonth(new Date()); // 今月の最初の日
  const endDate = endOfMonth(new Date()); // 今月の最後の日

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div>
      <h1>{format(new Date(), 'MMMM yyyy')}</h1>
      <div>
        {days.map(day => (
          <div key={format(day, 'yyyy-MM-dd')}>
            {format(day, 'EEE, dd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
