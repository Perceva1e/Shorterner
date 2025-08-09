import React from 'react';
import { FiCopy } from 'react-icons/fi';
import styles from './UrlResult.module.css';

interface UrlResultProps {
  shareLink: string;
  statsLink: string;
  onReset: () => void;
}

const UrlResult: React.FC<UrlResultProps> = ({ shareLink, statsLink, onReset }) => {
  console.log('shareLink:', shareLink);
  console.log('statsLink:', statsLink);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className={styles.section}>
        <h3 className={styles.heading}>Ссылка для шаринга</h3>
        <div className={styles.linkWrapper}>
          <a
            href={shareLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {shareLink}
          </a>
          <button
            onClick={() => copyToClipboard(shareLink)}
            className={styles.copyBtn}
          >
            <FiCopy />
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.heading}>Статистика</h3>
        <div className={styles.linkWrapper}>
          <a
            href={statsLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {statsLink}
          </a>
          <button
            onClick={() => copyToClipboard(statsLink)}
            className={styles.copyBtn}
          >
            <FiCopy />
          </button>
        </div>
      </div>

      <button
        onClick={onReset}
        className={styles.resetBtn}
      >
        Создать новую ссылку
      </button>
    </div>
  );
};

export default UrlResult;
