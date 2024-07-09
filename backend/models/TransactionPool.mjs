import Transaction from './Transaction.mjs';

export default class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  addTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  replaceTransactionsMap(transactionMap) {
    this.transactionMap = transactionMap;
  }

  transactionExists({ address }) {
    const transactions = Object.values(this.transactionMap);

    return transactions.find(
      (transaction) => transaction.input.address === address
    );
  }

  validateTransactions() {
    return Object.values(this.transactionMap).filter((transaction) =>
      Transaction.validate(transaction)
    );
  }

  clearTransactionPool() {
    this.transactionMap = {};
  }
}
