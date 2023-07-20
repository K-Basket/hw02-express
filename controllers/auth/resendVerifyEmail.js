import { HttpError } from '../../helpers/HttpError.js';
import { sendEmail } from '../../helpers/sendEmail.js';
import { User, emailSchema } from '../../models/user.js';

export const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const { error } = emailSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const user = await User.findOne({ email });
    if (!user) throw HttpError(401, 'Email not found');
    if (user.verify) throw HttpError(401, 'Email already verify');

    const verifyEmail = {
      to: email,
      subject: 'Verify email',
      html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify e-mail</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
      message: 'Verify email send success',
    });
  } catch (error) {
    next(error);
  }
};
