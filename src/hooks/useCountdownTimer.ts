import { useState, useEffect } from 'react';

interface UseCountdownTimerProps {
  startTime: number;
  duration?: number; // duration in milliseconds, default is 5 minutes
}

const useCountdownTimer = ({ startTime, duration = 300000 }: UseCountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (startTime === undefined) return;

    const calculateTimeLeft = () => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const remainingTime = Math.max(duration - elapsedTime, 0); // Calculate remaining time
      setTimeLeft(remainingTime);
      if (remainingTime === 0) {
        setIsTimerRunning(false);
      }
    };

    calculateTimeLeft(); // Initial calculation

    const interval = setInterval(() => {
      if (isTimerRunning) {
        calculateTimeLeft();
      } else {
        clearInterval(interval);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, [startTime, isTimerRunning, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return { timeLeft, isTimerRunning, formatTime };
};

export default useCountdownTimer;
