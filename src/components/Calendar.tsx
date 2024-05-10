import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isToday, startOfWeek, endOfWeek, addWeeks } from 'date-fns'; // addWeeksを追加
import styles from '../styles/Calendar.module.css';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month'); // 表示モードの状態

  // 初日と最終日を取得する処理
  const startDate = viewMode === 'month' ? startOfMonth(currentMonth) : startOfWeek(currentMonth);
  const endDate = viewMode === 'month' ? endOfMonth(currentMonth) : endOfWeek(currentMonth);

  // 月または週の全日を取得
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // 前月または前週へ移動する処理
  const handlePrev = () => {
    if (viewMode === 'month') {
      setCurrentMonth(prevMonth => addMonths(prevMonth, -1));
    } else {
      setCurrentMonth(prevWeek => addWeeks(prevWeek, -1));
    }
  };

  // 次月または次週へ移動する処理
  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
    } else {
      setCurrentMonth(prevWeek => addWeeks(prevWeek, 1));
    }
  };

  // 表示モードの切り替え
  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'month' ? 'week' : 'month');
  };

  return (
    <div>
      <h1>{format(currentMonth, 'MMMM yyyy')}</h1>
      <button onClick={handlePrev}>{viewMode === 'month' ? '前月' : '前週'}</button>
      <button onClick={handleNext}>{viewMode === 'month' ? '翌月' : '翌週'}</button>
      <button onClick={toggleViewMode}>表示切替: {viewMode === 'month' ? '週' : '月'}</button>
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
