import jwt from 'jsonwebtoken';
import User from '../models/UserModel.mjs';
import { asyncHandler } from './asyncHandler.mjs';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Behörighet saknas',
    });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedToken.id);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Behörighet saknas',
    });
  }

  next();
});
