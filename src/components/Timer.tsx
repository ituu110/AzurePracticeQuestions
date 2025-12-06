import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialMinutes, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isActive, onTimeUp]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft < 60 ? 'red' : 'inherit', margin: '10px 0' }}>
      残り時間: {formatTime(timeLeft)}
    </div>
  );
};
