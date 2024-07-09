import express from 'express';
import dotenv from 'dotenv';
import Blockchain from './models/Blockchain.mjs';
import TransactionPool from './models/TransactionPool.mjs';
import Wallet from './models/Wallet.mjs';
import blockchainRouter from './routes/blockchain-routes.mjs';
import PubNubServer from './pubnubServer.mjs';
import blockRouter from './routes/block-routes.mjs';
import transactionRouter from './routes/transaction-routes.mjs';
import errorHandler from './middleware/errorhandler.mjs';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/mongo.mjs';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth-routes.mjs';

dotenv.config({ path: './config/config.env' });

connectDB();

const credentials = {
  publishKey: process.env.PUBLISHKEY,
  subscribeKey: process.env.SUBSCRIBEKEY,
  secretKey: process.env.SECRETKEY,
  userId: process.env.USERID,
};

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const pubnubServer = new PubNubServer({
  blockchain,
  transactionPool,
  wallet,
  credentials,
});

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);
global.__appdir = dirname;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/block', blockRouter);
app.use('/api/v1/transaction', transactionRouter);

app.all('*', (req, res, next) => {
  const error = new Error(
    `You probably used the wrong URL, doublecheck please - ${req.originalUrl}`
  );
  error.status = 404;
  next(error);
});

app.use(errorHandler);

const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  pubnubServer.broadcast();
}, 1000);

const synchronizeChains = async () => {
  let response = await fetch(`${ROOT_NODE}/api/v1/blockchain`);
  if (response.ok) {
    const result = await response.json();
    blockchain.replaceChain(result.data);
  }

  response = await fetch(`${ROOT_NODE}/api/v1/transactions`);
  if (response.ok) {
    const result = await response.json();
    transactionPool.replaceTransactionsMap(result.data);
  }
};

if (process.env.GENERATE_NODE_PORT === 'true') {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Root node is ${ROOT_NODE}`);

  if (PORT !== DEFAULT_PORT) {
    synchronizeChains();
  }
});
