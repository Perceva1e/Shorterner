import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import StatsPage from './pages/stats/StatsPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stats/:shortCode" element={<StatsPage />} />
    </Routes>
  );
};

export default App;
