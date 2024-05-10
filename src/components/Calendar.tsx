import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, addMonths, isToday, startOfWeek, endOfWeek, addWeeks } from 'date-fns';
import styles from '../styles/Calendar.module.css';
import EventModal from './EventModal';
import { format, toDate } from 'date-fns-tz';

interface Event {
    title: string;
    date: string;
}

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startDate = viewMode === 'month' ? startOfMonth(currentMonth) : startOfWeek(currentMonth);
  const endDate = viewMode === 'month' ? endOfMonth(currentMonth) : endOfWeek(currentMonth);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  // Calendar.tsx 内の handleDayClick 関数を修正
  const handleDayClick = (day: Date) => {
    const timeZone = 'Asia/Tokyo';
    const localDate = toDate(day, { timeZone });
    setSelectedDate(localDate);
    setModalVisible(true);
  };

  // date-fns-tz の format 関数を使用して日付を文字列に変換
  const saveEvent = (title: string, date: Date) => {
    const timeZone = 'Asia/Tokyo';
    const localDateString = format(date, 'yyyy-MM-dd', { timeZone });
    setEvents(prevEvents => [...prevEvents, { title, date: localDateString }]);
  };

  return (
    <div>
      <h1>{format(currentMonth, 'MMMM yyyy')}</h1>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>{viewMode === 'month' ? '前月' : '前週'}</button>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>{viewMode === 'month' ? '翌月' : '翌週'}</button>
      <button onClick={() => setViewMode(prevMode => prevMode === 'month' ? 'week' : 'month')}>表示切替: {viewMode === 'month' ? '週' : '月'}</button>
      <div className={styles.calendarContainer}>
        {days.map(day => (
          <div key={format(day, 'yyyy-MM-dd')} className={`${styles.day} ${isToday(day) ? styles.today : ''}`} onClick={() => handleDayClick(day)}>
            {format(day, 'EEE, dd')}
            <ul>
              {events.filter(event => event.date === format(day, 'yyyy-MM-dd')).map(event => (
                <li key={event.title}>{event.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {modalVisible && <EventModal date={selectedDate} onClose={() => setModalVisible(false)} onSave={saveEvent} />}
    </div>
  );
};

export default Calendar;
