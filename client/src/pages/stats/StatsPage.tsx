import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchStats } from '../../store/slice/statsSlice';
import StatsSummary from '../../components/statsSummary/StatsSummary';
import ClickTable from '../../components/clickTable/ClickTable';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import type { RootState } from '../../store/store';
import styles from './StatsPage.module.css';

const StatsPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const dispatch = useAppDispatch();
  
  const { data, loading, error } = useAppSelector((state: RootState) => state.stats);
  
  useEffect(() => {
    if (shortCode) {
      dispatch(fetchStats(shortCode));
    }
  }, [dispatch, shortCode]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Загрузка данных...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h2 className={styles.errorHeading}>Ошибка</h2>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (!data || !data.statsData) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h2 className={styles.errorHeading}>Ошибка</h2>
          <p className={styles.errorMessage}>Данные статистики недоступны</p>
        </div>
      </div>
    );
  }

  const transformChartData = (entries: [string, unknown][]) => {
    return entries
      .filter(([, value]) => typeof value === 'number' && value > 0)
      .map(([name, value]) => ({
        name,
        value: value as number,
      }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Статистика ссылки</h1>
          <a 
            href={data.originalUrl} 
            className={styles.originalUrl}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {data.originalUrl}
          </a>
        </div>

        <StatsSummary stats={data.statsData} />
        
        <div className={styles.grid}>
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>География переходов</h2>
            {Object.keys(data.statsData.byCountry).length > 0 ? (
              <BarChart 
                data={transformChartData(Object.entries(data.statsData.byCountry))}
                color="#3b82f6"
              />
            ) : (
              <p className={styles.noData}>Нет данных по географии</p>
            )}
          </div>
          
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>Браузеры</h2>
            {Object.keys(data.statsData.byBrowser).length > 0 ? (
              <PieChart 
                data={transformChartData(Object.entries(data.statsData.byBrowser))}
              />
            ) : (
              <p className={styles.noData}>Нет данных по браузерам</p>
            )}
          </div>
          
          <div className={styles.chartCard}>
            <h2 className={styles.chartTitle}>Операционные системы</h2>
            {Object.keys(data.statsData.byOS).length > 0 ? (
              <PieChart 
                data={transformChartData(Object.entries(data.statsData.byOS))}
              />
            ) : (
              <p className={styles.noData}>Нет данных по ОС</p>
            )}
          </div>
        </div>

        <div className={styles.tableCard}>
          <h2 className={styles.tableTitle}>Детализация переходов</h2>
          <ClickTable clicks={data.clicks} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;