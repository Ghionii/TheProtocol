import PubNub from 'pubnub';

const CHANNELS = {
  BLOCKCHAIN: 'BLOCKCHAIN',
  FRIENDNODES: 'FRIENDNODES',
  TRANSACTION: 'TRANSACTION',
};

export default class PubNubServer {
  constructor({ blockchain, transactionPool, wallet, credentials }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());

    this.requestChain();
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: 'Transaction has been broadcasted',
    });
  }

  requestChain() {
    this.publish({
      channel: CHANNELS.FRIENDNODES,
      message: JSON.stringify({ type: 'REQUEST_CHAIN' }),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);

        console.log(
          `Message has been received from: ${channel}, message: ${message}`
        );

        if (channel === CHANNELS.BLOCKCHAIN) {
          if (msg.length > this.blockchain.chain.length) {
            this.blockchain.replaceChain(msg);
          }
        } else if (channel === CHANNELS.FRIENDNODES) {
          this.handleFriendNodesMessage(msg);
        } else if (
          channel === CHANNELS.TRANSACTION &&
          !this.transactionPool.transactionExists({
            address: this.wallet.publicKey,
          })
        ) {
          this.transactionPool.addTransaction(msg); //<<<<<<<<<<<<<<<<<<<<<<<<####################<<<<<<<<<<<<<<<<<<<<<<<<<<
        }
      },
    };
  }

  handleFriendNodesMessage(msg) {
    if (msg.type === 'REQUEST_CHAIN') {
      this.publish({
        channel: CHANNELS.FRIENDNODES,
        message: JSON.stringify({
          type: 'CHAIN_RESPONSE',
          chain: this.blockchain.chain,
        }),
      });
    } else if (msg.type === 'CHAIN_RESPONSE') {
      this.blockchain.replaceChain(msg.chain);
    }
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
