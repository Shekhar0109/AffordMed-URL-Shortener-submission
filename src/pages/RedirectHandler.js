import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Logger from '../context/Logger';

const RedirectHandler = () => {
  const { code } = useParams();

  useEffect(() => {
    const stored = localStorage.getItem(`short-${code}`);
    if (stored) {
      const data = JSON.parse(stored);
      const now = new Date();
      const expiry = new Date(data.expiresAt);

      if (now <= expiry) {
        Logger.info('Redirecting to original URL', { code });

        const statsKey = `clicks-${code}`;
        const oldStats = JSON.parse(localStorage.getItem(statsKey) || '[]');
        oldStats.push({
          timestamp: now.toISOString(),
          source: 'direct',
          location: 'Unknown',
        });
        localStorage.setItem(statsKey, JSON.stringify(oldStats));

        window.location.href = data.longUrl;
      } else {
        Logger.warn('Link expired', { code });
        alert('This short link has expired.');
      }
    } else {
      Logger.error('Short link not found', { code });
      alert('Short URL not found.');
    }
  }, [code]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
