import { useEffect } from 'react';

const TabDetector = ({ isEnabled }) => {
  useEffect(() => {
    if (!isEnabled) return;

    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '🚨 GET BACK TO WORK!';
      } else {
        alert('👀 Caught you slacking! Stay focused! 📚');
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = originalTitle;
    };
  }, [isEnabled]);

  return null;
};

export default TabDetector;