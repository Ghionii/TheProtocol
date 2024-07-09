import { blockchain } from '../server.mjs';

export const listBlocks = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain.chain });
};
