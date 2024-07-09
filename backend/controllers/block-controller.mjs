import { blockchain, pubnubServer } from '../server.mjs';
import { BlockModel } from '../models/BlockModel.mjs';

export const mineBlock = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      const err = new Error('Data is missing');
      err.statusCode = 400;
      throw err;
    }

    const block = blockchain.addBlock({ data: data });

    const blockDocument = await BlockModel.create(block);

    pubnubServer.broadcast();

    res.status(201).json({
      success: true,
      data: block,
    });
  } catch (error) {
    next(error);
  }
};
