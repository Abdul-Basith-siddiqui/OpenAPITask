import express from 'express';

import { getLogs, parseOas } from '../controllers/parseOas.js';

const router = express.Router();

router.post('/parse-oas', parseOas);
router.get('/getLogs',getLogs)
export default router;
