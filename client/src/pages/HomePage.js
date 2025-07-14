import React from 'react';
import { useSelector } from 'react-redux';
import ShortenForm from '../components/ShortenForm';
import LinkResult from '../components/LinkResult';
import { Container } from '@mui/material';

const HomePage = () => {
  const { loading, error, result } = useSelector(state => state.url);

  return (
    <Container maxWidth="md">
      <ShortenForm />
      
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      {result && <LinkResult {...result} />}
    </Container>
  );
};

export default HomePage;