import { HttpError } from '../../helpers/HttpError.js';
import { User, registerSchema } from '../../models/user.js';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { sendEmail } from '../../helpers/sendEmail.js';

const { BASE_URL } = process.env;
const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { email, password } = req.body;

    const user = await User.findOne({ email }); // gets email or null
    if (user) throw HttpError(409, 'Email already in use');

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationCode,
    });

    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(newUser._id, { token });

    const verifyEmail = {
      to: email,
      subject: 'Verify email',
      html: `<a target="_blanc" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify e-mail</a>`,
    };

    // await sendEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
