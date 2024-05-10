import React, { useState } from 'react';

// EventModalProps型を作成
interface EventModalProps {
    date: Date;
    onClose: () => void;
    onSave: (title: string, date: Date) => void;
}

// EventModalコンポーネントを作成
const EventModal: React.FC<EventModalProps> = ({ date, onClose, onSave }) => {
    const [title, setTitle] = useState('');

    // フォームの送信処理
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(title, date);
        onClose();
    };

    return (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', zIndex: 1000 }}>
            <h2>Add Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <button type="submit">Save Event</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default EventModal;