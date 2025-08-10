import { Router } from 'express';
import { shortenUrl, redirectUrl} from '../controllers/urlController';
import { getStats } from '../controllers/statsController'
import { validateShortCode, validateOriginalUrl } from '../middlewares/urlMiddleware';

const router = Router();

router.post('/shorten', validateOriginalUrl, shortenUrl);
router.get('/r/:shortCode', validateShortCode, redirectUrl);
router.get('/stats/:shortCode', validateShortCode, getStats);

export default router;