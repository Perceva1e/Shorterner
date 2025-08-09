import React from 'react';
import type { Click } from '../../types/types';
import styles from './ClickTable.module.css';

interface ClickTableProps {
  clicks: Click[];
}

const ClickTable: React.FC<ClickTableProps> = ({ clicks }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Дата</th>
            <th className={styles.th}>IP</th>
            <th className={styles.th}>Регион</th>
            <th className={styles.th}>Браузер</th>
            <th className={styles.th}>ОС</th>
            <th className={styles.th}>Источник</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {clicks.map((click) => (
            <tr key={click.id} className={styles.tr}>
              <td className={styles.td}>
                {new Date(click.timestamp).toLocaleString()}
              </td>
              <td className={styles.td}>{click.ipAddress}</td>
              <td className={styles.td}>{click.region || 'Неизвестно'}</td>
              <td className={styles.td}>
                {click.browser} {click.browserVersion}
              </td>
              <td className={styles.td}>{click.os}</td>
              <td className={styles.td}>
                {click.referrer === 'direct' ? 'Прямой переход' : click.referrer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClickTable;