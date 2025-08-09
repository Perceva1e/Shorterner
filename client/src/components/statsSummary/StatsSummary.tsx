import React from 'react';
import { FiMousePointer, FiGlobe, FiChrome, FiMonitor, FiLink2 } from 'react-icons/fi';
import type { StatsData } from '../../types/types';
import styles from './StatsSummary.module.css';

interface StatsSummaryProps {
  stats: StatsData;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  return (
    <div className={styles.container}>
      <div className={styles.statCard}>
        <FiMousePointer className={styles.icon} />
        <span className={styles.value}>{stats.totalClicks}</span>
        <span className={styles.label}>Всего переходов</span>
      </div>
      
      <div className={styles.statCard}>
        <FiGlobe className={styles.icon} />
        <span className={styles.value}>{Object.keys(stats.byCountry).length}</span>
        <span className={styles.label}>Стран</span>
      </div>
      
      <div className={styles.statCard}>
        <FiChrome className={styles.icon} />
        <span className={styles.value}>{Object.keys(stats.byBrowser).length}</span>
        <span className={styles.label}>Браузеров</span>
      </div>
      
      <div className={styles.statCard}>
        <FiMonitor className={styles.icon} />
        <span className={styles.value}>{Object.keys(stats.byOS).length}</span>
        <span className={styles.label}>ОС</span>
      </div>
      
      <div className={styles.statCard}>
        <FiLink2 className={styles.icon} />
        <span className={styles.value}>{Object.keys(stats.referrers).length}</span>
        <span className={styles.label}>Источников</span>
      </div>
      
      <div className={styles.statCard}>
        <FiMousePointer className={styles.icon} />
        <span className={styles.value}>{Math.max(...Object.values(stats.timeline))}</span>
        <span className={styles.label}>Макс. в час</span>
      </div>
    </div>
  );
};

export default StatsSummary;