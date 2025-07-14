import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Typography } from '@mui/material';
import { shortenUrl } from '../store/actions/urlActions';

const ShortenForm = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      dispatch(shortenUrl(url));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Сократить ссылку
      </Typography>
      <TextField
        fullWidth
        label="Введите URL"
        variant="outlined"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        required
        sx={{ mb: 2 }}
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        size="large"
      >
        Сократить
      </Button>
    </Box>
  );
};

export default ShortenForm;