import User from '../models/UserModel.mjs';
import errorHandler from '../middleware/errorhandler.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';

// @desc Register a user.
// @route POST /api/v1/auth/register
// access PUBLIC

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  createAndSendToken(user, 201, res);
});

// @desc    Log in a user.
// @route   POST /api/v1/auth/login
// @access  PUBLIC

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error('Email or password missing', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new Error('Email or password missing', 401));
  }

  const isCorrect = await user.validatePassword(password);
  if (!isCorrect) {
    return next(new Error('Email or password missing', 401));
  }

  createAndSendToken(user, 201, res);
});

// // @desc    Returns information about a logged in user.
// // @route   GET /api/v1/auth/me
// // @access  PRIVATE

export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
  });
});

const createAndSendToken = (user, statusCode, res) => {
  const token = user.generateToken();
  console.log(token);
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_TTL * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, statusCode, token });
};
