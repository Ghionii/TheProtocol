import express from 'express';
import {
  addTransaction,
  getTransactionPool,
  mineTransactions,
} from '../controllers/transaction-controller.mjs';
import { protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.route('/').post(protect, addTransaction);
router.route('/transactions').get(protect, getTransactionPool);
router.route('/mine').get(protect, mineTransactions);

export default router;
