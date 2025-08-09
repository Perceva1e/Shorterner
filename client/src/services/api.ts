import axios from 'axios';
import type { ShortUrlResponse, UrlStats } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const shortenUrl = async (originalUrl: string): Promise<ShortUrlResponse> => {
  const response = await axios.post<ShortUrlResponse>(
    `${API_BASE_URL}/shorten`, 
    { originalUrl }
  );
  return response.data;
};

export const getStats = async (shortCode: string): Promise<UrlStats> => {
  const response = await axios.get<UrlStats>(
    `${API_BASE_URL}/stats/${shortCode}`
  );
  return response.data;
};