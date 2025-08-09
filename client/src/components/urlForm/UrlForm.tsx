import React, { useState } from 'react';
import styles from './UrlForm.module.css';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className={styles.input}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Сокращение...' : 'Сократить'}
        </button>
      </div>
    </form>
  );
};

export default UrlForm;
