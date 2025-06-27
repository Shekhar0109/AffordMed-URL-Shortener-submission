import React, { useState } from 'react';
import {
  Typography, TextField, Button, Grid, Paper
} from '@mui/material';
import Logger from '../context/Logger';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([
    { longUrl: '', validity: '', shortcode: '', result: null, error: '' },
  ]);

  const handleInputChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleAddField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '', result: null, error: '' }]);
    }
  };

  const handleShorten = () => {
    const updated = urls.map((urlData) => {
      const { longUrl, validity, shortcode } = urlData;

      if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        Logger.error('Invalid URL format', { input: longUrl });
        return { ...urlData, error: 'Invalid URL format' };
      }

      const shortCode = shortcode || Math.random().toString(36).substring(2, 7);
      const now = new Date();
      const validMinutes = parseInt(validity) || 30;
      const expires = new Date(now.getTime() + validMinutes * 60000);

      // Save to localStorage
      localStorage.setItem(
        `short-${shortCode}`,
        JSON.stringify({
          longUrl,
          expiresAt: expires.toISOString(),
          createdAt: now.toISOString(),
        })
      );

      Logger.info('Short link created', {
        shortUrl: `http://localhost:3000/${shortCode}`,
        validMinutes,
      });

      return {
        ...urlData,
        result: {
          short: `http://localhost:3000/${shortCode}`,
          expires: expires.toISOString(),
        },
        error: '',
      };
    });

    setUrls(updated);
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((url, index) => (
        <Paper key={index} style={{ padding: 16, marginBottom: 16 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Long URL"
                fullWidth
                value={url.longUrl}
                onChange={(e) => handleInputChange(index, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Validity (mins)"
                type="number"
                fullWidth
                value={url.validity}
                onChange={(e) => handleInputChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={url.shortcode}
                onChange={(e) => handleInputChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
            {url.result && (
              <Grid item xs={12}>
                <Typography>
                  Short URL: <a href={url.result.short}>{url.result.short}</a>
                </Typography>
                <Typography>Expires At: {new Date(url.result.expires).toLocaleString()}</Typography>
              </Grid>
            )}
            {url.error && (
              <Grid item xs={12}>
                <Typography color="error">{url.error}</Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}
      <Button onClick={handleAddField} disabled={urls.length >= 5}>
        Add URL Field
      </Button>
      <Button onClick={handleShorten} variant="contained" color="primary" style={{ marginLeft: 12 }}>
        Shorten
      </Button>
    </div>
  );
};

export default ShortenerPage;
