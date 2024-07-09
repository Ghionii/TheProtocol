import express from 'express';
import { listBlocks } from '../controllers/blockchain-controller.mjs';
import { protect } from '../middleware/authorization.mjs';
const router = express.Router();

router.route('/').get(protect, listBlocks);

export default router;
