import React from 'react';
import { Button, Box, Typography, Grid, Link, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useDispatch } from 'react-redux';
import { resetUrlState } from '../store/actions/urlActions';

const LinkResult = ({ shareLink, statsLink }) => {
  const dispatch = useDispatch();
  const extractShortCode = (link) => {
    const parts = link.split('/');
    return parts[parts.length - 1];
  };
  const shortCode = extractShortCode(statsLink || shareLink);
  const pageStatsLink = `http://localhost:3000/stats/${shortCode}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleNewLink = () => {
    dispatch(resetUrlState());
  };

  return (
    <Box sx={{ mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Ваши ссылки:
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Для шаринга:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={shareLink} target="_blank" rel="noopener">
              {shareLink}
            </Link>
            <IconButton onClick={() => copyToClipboard(shareLink)} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Статистика (API):</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={statsLink} target="_blank" rel="noopener">
              {statsLink}
            </Link>
            <IconButton onClick={() => copyToClipboard(statsLink)} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Страница статистики:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={pageStatsLink} target="_blank" rel="noopener">
              {pageStatsLink}
            </Link>
            <IconButton onClick={() => copyToClipboard(pageStatsLink)} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      
      <Button 
        variant="outlined" 
        color="primary"
        onClick={handleNewLink}
      >
        Создать новую ссылку
      </Button>
    </Box>
  );
};

export default LinkResult;