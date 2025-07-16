import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../services/api';
import StatsTable from '../components/StatsTable';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  Link
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0', '#FF6666', '#66CCCC', '#CC66CC'];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderBarChart = (data, title, dataKey) => (
    <Paper elevation={3} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={60} />
          <YAxis />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e0e0e0' }} />
          <Legend />
          <Bar dataKey={dataKey} fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );

  const renderPieChart = (data, title, dataKey) => (
    <Paper elevation={3} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e0e0e0' }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );

  const renderLineChart = (data, title, dataKey) => (
    <Paper elevation={3} sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e0e0e0' }} />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        ) : stats ? (
          <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom color="primary" align="center">
              Статистика для ссылки
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Typography variant="h6">
                Оригинальный URL: 
                <Link href={stats.originalUrl} target="_blank" rel="noopener noreferrer" sx={{ ml: 1 }}>
                  {stats.originalUrl}
                </Link>
              </Typography>
              <IconButton onClick={() => copyToClipboard(stats.originalUrl)} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="subtitle1" gutterBottom align="center">
              Всего переходов: {stats.statsData?.totalClicks || 0}
            </Typography>

            <Grid container spacing={2}>
              {/* Распределение по странам */}
              <Grid item xs={12} md={6}>
                {stats.statsData?.byCountry && renderPieChart(
                  Object.entries(stats.statsData.byCountry).map(([name, value]) => ({ name, value })),
                  'Распределение по странам',
                  'value'
                )}
              </Grid>

              {/* Распределение по браузерам */}
              <Grid item xs={12} md={6}>
                {stats.statsData?.byBrowser && renderBarChart(
                  Object.entries(stats.statsData.byBrowser).map(([name, value]) => ({ name, value })),
                  'Распределение по браузерам',
                  'value'
                )}
              </Grid>

              {/* Распределение по ОС */}
              <Grid item xs={12} md={6}>
                {stats.statsData?.byOS && renderPieChart(
                  Object.entries(stats.statsData.byOS).map(([name, value]) => ({ name, value })),
                  'Распределение по операционным системам',
                  'value'
                )}
              </Grid>

              {/* Распределение по устройствам */}
              <Grid item xs={12} md={6}>
                {stats.statsData?.byDevice && renderBarChart(
                  Object.entries(stats.statsData.byDevice).map(([name, value]) => ({ name, value })),
                  'Распределение по устройствам',
                  'value'
                )}
              </Grid>

              {/* Распределение по источникам */}
              <Grid item xs={12} md={6}>
                {stats.statsData?.referrers && renderPieChart(
                  Object.entries(stats.statsData.referrers).map(([name, value]) => ({ name, value })),
                  'Распределение по источникам переходов',
                  'value'
                )}
              </Grid>

              {/* Активность по часам */}
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
            <Typography variant="h6" sx={{ mt: 4, mb: 2 }} color="primary">
              Детальная информация о переходах
            </Typography>
            <StatsTable data={stats.clicks} />

            {/* Кнопка возврата */}
            <Box mt={4} display="flex" justifyContent="center">
              <Button variant="outlined" color="primary" href="/">
                Вернуться на главную
              </Button>
            </Box>
          </Box>
        ) : null}
      </motion.div>
    </Container>
  );
};

export default StatsPage;