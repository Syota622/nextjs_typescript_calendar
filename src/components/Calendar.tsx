import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isToday } from 'date-fns'; // isTodayを追加
import styles from '../styles/Calendar.module.css';

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
      {/* 現在の月を表示 */}
      <h1>{format(currentMonth, 'MMMM yyyy')}</h1>
      <button onClick={handlePrevMonth}>前月</button>
      <button onClick={handleNextMonth}>翌月</button>
      <div className={styles.calendarContainer}>
        {days.map(day => (
          <div key={format(day, 'yyyy-MM-dd')} className={`${styles.day} ${isToday(day) ? styles.today : ''}`}>
            {format(day, 'EEE, dd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
