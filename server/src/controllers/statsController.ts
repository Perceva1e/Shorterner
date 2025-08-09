import { Request, Response } from 'express';
import { getUrlStats } from '../services/statsService';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortCode } = req.params;
    const stats = await getUrlStats(shortCode);
    res.json(stats);
  } catch (error: any) {
    console.error('Error in getStats:', error.message);
    res.status(error.message === 'URL not found' ? 404 : 500).json({ error: error.message || 'Server error' });
  }
};