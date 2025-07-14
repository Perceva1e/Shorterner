import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Typography 
} from '@mui/material';

const StatsTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>Нет данных о переходах</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Время</TableCell>
            <TableCell>IP-адрес</TableCell>
            <TableCell>Регион</TableCell>
            <TableCell>Браузер</TableCell>
            <TableCell>ОС</TableCell>
            <TableCell>Устройство</TableCell>
            <TableCell>Источник</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((click, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
              <TableCell>{click.ipAddress}</TableCell>
              <TableCell>{click.region}</TableCell>
              <TableCell>{click.browser} {click.browserVersion}</TableCell>
              <TableCell>{click.os}</TableCell>
              <TableCell>{click.deviceType}</TableCell>
              <TableCell>{click.referrer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;