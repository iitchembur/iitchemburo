import { useState, useEffect } from 'react';

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
      console.log('Clock timer cleaned up');
    };
  }, []);

  return currentTime;
}