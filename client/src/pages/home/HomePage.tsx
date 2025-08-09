import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import UrlForm from '../../components/urlForm/UrlForm';
import UrlResult from '../../components/urlResult/UrlResult';
import { shortenUrlThunk, reset } from '../../store/slice/urlSlice';

import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { shortUrl, statsUrl, loading, error } = useAppSelector((state) => state.url);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleSubmit = (url: string) => {
    dispatch(shortenUrlThunk(url));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Сократить ссылку</h1>
      <div className={styles.card}>
        {!shortUrl ? (
          <>
            <UrlForm onSubmit={handleSubmit} loading={loading} />
            {error && <div className={styles.error}>{error}</div>}
          </>
        ) : (
          <UrlResult
            shareLink={shortUrl}
            statsLink={statsUrl || ''}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;