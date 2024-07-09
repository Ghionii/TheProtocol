import Transaction from './Transaction.mjs';
import { BlockModel, TransactionModel } from './BlockModel.mjs';

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, pubnubServer }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.pubnubServer = pubnubServer;
  }

  async mineTransaction() {
    const validTransactions = this.transactionPool.validateTransactions();

    validTransactions.push(
      Transaction.transactionReward({ miner: this.wallet })
    );

    const newBlock = this.blockchain.addBlock({ data: validTransactions });

    try {
      const blockDocument = new BlockModel({
        timestamp: newBlock.timestamp,
        lastHash: newBlock.lastHash,
        hash: newBlock.hash,
        data: validTransactions,
        nonce: newBlock.nonce,
        difficulty: newBlock.difficulty,
        blockIndex: newBlock.index,
      });

      await blockDocument.save();

      console.log('New block saved successfully.');
    } catch (error) {
      console.error('Error saving new block:', error);
    }

    this.pubnubServer.broadcast();

    this.transactionPool.clearTransactionPool();
  }
}
