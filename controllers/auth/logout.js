import { User } from '../../models/user.js';

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
      message: 'Logout success',
    });
  } catch (error) {
    next(error);
  }
};
