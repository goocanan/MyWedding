import { useState, useEffect } from 'react';

/**
 * Live countdown to a target date.
 * Returns { days, hours, minutes, seconds, isExpired }
 */
export function useCountdown(targetDateString) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDateString));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDateString));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateString]);

  return timeLeft;
}

function calculateTimeLeft(targetDateString) {
  const target = new Date(targetDateString).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  };
}
