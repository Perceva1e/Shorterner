import { Request, Response, NextFunction } from 'express';
import { isValidUrl } from '../utils/validators'; 

export const validateShortCode = (req: Request, res: Response, next: NextFunction): void => {
  const { shortCode } = req.params;

  const shortCodeRegex = /^[A-Za-z0-9\-_]{7,}$/;
  if (!shortCode || !shortCodeRegex.test(shortCode)) {
    res.status(400).json({ error: 'Invalid shortCode. Must be at least 7 characters and contain only letters, numbers, hyphens, or underscores.' });
    return;
  }

  next();
};

export const validateOriginalUrl = (req: Request, res: Response, next: NextFunction): void => {
  const { originalUrl } = req.body;

  if (!originalUrl || typeof originalUrl !== 'string') {
    res.status(400).json({ error: 'Original URL is required and must be a string.' });
    return;
  }

  if (!isValidUrl(originalUrl)) {
    res.status(400).json({ error: 'Invalid URL format.' });
    return;
  }

  next();
};