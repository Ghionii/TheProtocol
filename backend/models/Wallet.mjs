import { INITIAL_BALANCE } from '../config/settings.mjs';
import Transaction from './Transaction.mjs';
import { ellipticHash, createHash } from '../utilities/crypto-lib.mjs';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ellipticHash.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) throw new Error('Amount exceeds balance');

    return new Transaction({ sender: this, recipient, amount });
  }
}
