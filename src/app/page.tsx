// src/app/page.tsx または src/app/layout.tsx
import React from 'react';
import Calendar from '../components/Calendar';

const Page: React.FC = () => {
  return (
    <div>
      <h2>Welcome to My Calendar App</h2>
      <Calendar />
    </div>
  );
}

export default Page;
