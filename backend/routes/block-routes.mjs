import express from 'express';
import { mineBlock } from '../controllers/block-controller.mjs';

export const router = express.Router();

router.route('/mine').post(mineBlock);

export default router;
