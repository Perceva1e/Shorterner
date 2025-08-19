import axios from 'axios';
import type { ShortUrlResponse, UrlStats } from '../types/types';

export const shortenUrl = async (originalUrl: string): Promise<ShortUrlResponse> => {
  const response = await axios.post<ShortUrlResponse>(
    '/api/shorten', 
    { originalUrl },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
};

export const getStats = async (shortCode: string): Promise<UrlStats> => {
  console.log(`Fetching stats for: /api/stats/${shortCode}`);
  const response = await axios.get<UrlStats>(`/api/stats/${shortCode}`);
  return response.data;
};