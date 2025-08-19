import { Request, Response } from 'express';
import { getUrlStats } from '../services/statsService';

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortCode } = req.params;
    const stats = await getUrlStats(shortCode);
    res.json(stats);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in getStats:', errorMessage);
    
    const statusCode = errorMessage === 'URL not found' ? 404 : 500;
    res.status(statusCode).json({ error: errorMessage });
  }
};