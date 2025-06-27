import Logger from '../context/Logger';
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid } from '@mui/material';

const StatsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith('short-'));
    const list = keys.map((key) => {
      const code = key.replace('short-', '');
      const record = JSON.parse(localStorage.getItem(key));
      const clicks = JSON.parse(localStorage.getItem(`clicks-${code}`) || '[]');
      return {
        code,
        ...record,
        clicks,
      };
    });
    setData(list);
    Logger.info('Stats page loaded');

  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener Stats
      </Typography>
      {data.map((item) => (
        <Paper key={item.code} style={{ padding: 16, marginBottom: 16 }}>
          <Typography>
            Short URL:{' '}
            <a href={`http://localhost:3000/${item.code}`}>
              http://localhost:3000/{item.code}
            </a>
          </Typography>
          <Typography>Original: {item.longUrl}</Typography>
          <Typography>Expires At: {new Date(item.expiresAt).toLocaleString()}</Typography>
          <Typography>Total Clicks: {item.clicks.length}</Typography>
          <br />
          {item.clicks.map((click, idx) => (
            <Grid container key={idx}>
              <Grid item xs={4}>
                Time: {new Date(click.timestamp).toLocaleString()}
              </Grid>
              <Grid item xs={4}>Source: {click.source}</Grid>
              <Grid item xs={4}>Location: {click.location}</Grid>
            </Grid>
          ))}
        </Paper>
      ))}
    </div>
  );
};

export default StatsPage;
