import { HttpError } from '../../helpers/HttpError.js';
import { User } from '../../models/user.js';

export const verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.params;

    const user = await User.findOne({ verificationCode });
    if (!user) throw HttpError(401, 'Email not found');

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationCode: '',
    });

    res.json({
      message: 'Email verify success',
    });
  } catch (error) {
    next(error);
  }
};
