import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths } from 'date-fns';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 初日と最終日を取得
  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  // 月の日数を取得
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // 前月のボタンをクリックしたときの処理
  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
  };
  // 翌月のボタンをクリックしたときの処理
  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  return (
    <div>
      <h1>{format(currentMonth, 'MMMM yyyy')}</h1>
      <button onClick={handlePrevMonth}>前月</button>
      <button onClick={handleNextMonth}>翌月</button>
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
