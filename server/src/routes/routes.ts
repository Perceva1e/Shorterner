import express, { Router } from 'express';
import { shortenUrl, redirectUrl } from '../controllers/urlController';
import { getStats } from '../controllers/statsController';

const router: Router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/r/:shortCode', redirectUrl);
router.get('/stats/:shortCode', getStats);

export default router;