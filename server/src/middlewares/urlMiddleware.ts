import { Request, Response, NextFunction } from 'express';
import { isValidUrl } from '../utils/validators'; 

export const validateShortCode = (req: Request, res: Response, next: NextFunction): void => {
  const { shortCode } = req.params;

  const shortCodeRegex = /^[a-zA-Z0-9]{7,10}$/;
  if (!shortCode || !shortCodeRegex.test(shortCode)) {
    res.status(400).json({ error: 'Invalid shortCode. Must be 7-10 alphanumeric characters.' });
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