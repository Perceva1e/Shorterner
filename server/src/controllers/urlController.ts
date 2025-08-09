import { Request, Response } from 'express';
import { createShortUrl, redirectToUrl, getClickData } from '../services/urlService';

export const shortenUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { originalUrl } = req.body as { originalUrl: string };
    if (!originalUrl) {
      res.status(400).json({ error: 'Original URL is required' });
      return;
    }

    const result = await createShortUrl(originalUrl);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in shortenUrl:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const redirectUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortCode } = req.params;
    const clickData = await getClickData(
      req.get('User-Agent') || '',
      req.ip || '',
      req.get('Referrer') || ''
    );
    const originalUrl = await redirectToUrl(shortCode, clickData);
    res.redirect(301, originalUrl);
  } catch (error: any) {
    console.error('Error in redirectUrl:', error.message);
    res.status(error.message === 'URL not found' ? 404 : 500).json({ error: error.message || 'Server error' });
  }
};