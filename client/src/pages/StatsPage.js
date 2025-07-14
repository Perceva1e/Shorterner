import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../services/api';
import StatsTable from '../components/StatsTable';
import { Container,Typography, CircularProgress, Alert, Grid, Paper} from '@mui/material';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell} from 'recharts';
const StatsPage = () => {
  const { shortCode } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/stats/${shortCode}`);
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Ошибка при загрузке статистики');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortCode]);

 const renderBarChart = (data, title, dataKey) => (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );

  const renderPieChart = (data, title, dataKey) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6666'];
    
    return (
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    );
  };

  const renderLineChart = (data, title, dataKey) => (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );

  return (
    <Container maxWidth="lg">
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      ) : stats ? (
        <>
          <Typography variant="h4" gutterBottom>
            Статистика для ссылки
          </Typography>
          <Typography variant="h6" gutterBottom>
            Оригинальный URL: {stats.originalUrl}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Всего переходов: {stats.statsData?.totalClicks || 0}
          </Typography>
          
          <Grid container spacing={3}>
            {/* Визуализация по странам */}
            <Grid item xs={12} md={6}>
              {stats.statsData?.byCountry && renderPieChart(
                Object.entries(stats.statsData.byCountry).map(([name, value]) => ({ name, value })),
                'Распределение по странам',
                'value'
              )}
            </Grid>
            
            {/* Визуализация по браузерам */}
            <Grid item xs={12} md={6}>
              {stats.statsData?.byBrowser && renderBarChart(
                Object.entries(stats.statsData.byBrowser).map(([name, value]) => ({ name, value })),
                'Распределение по браузерам',
                'value'
              )}
            </Grid>
            
            {/* Визуализация по времени */}
            <Grid item xs={12}>
              {stats.statsData?.timeline && renderLineChart(
                Object.entries(stats.statsData.timeline)
                  .map(([hour, count]) => ({ 
                    name: `${hour}:00`, 
                    value: count 
                  }))
                  .sort((a, b) => parseInt(a.name) - parseInt(b.name)),
                'Активность по часам',
                'value'
              )}
            </Grid>
          </Grid>
          
          {/* Детальная таблица */}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Детальная информация о переходах
          </Typography>
          <StatsTable data={stats.clicks} />
        </>
      ) : null}
    </Container>
  );
};

export default StatsPage;