import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  timestamp: Date,
});

const blockSchema = new mongoose.Schema({
  timestamp: Date,
  lastHash: String,
  hash: String,
  data: {
    type: [mongoose.Schema.Types.Mixed], // Allow mixed types in the array
    required: true,
  },
  nonce: Number,
  difficulty: Number,
  blockIndex: Number,
});

export const TransactionModel = mongoose.model(
  'Transaction',
  transactionSchema
);
export const BlockModel = mongoose.model('Block', blockSchema);
