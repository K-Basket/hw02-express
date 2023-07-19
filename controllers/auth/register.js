import { HttpError } from '../../helpers/HttpError.js';
import { User, registerSchema } from '../../models/user.js';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { email, password } = req.body;

    const user = await User.findOne({ email }); // gets email or null
    if (user) throw HttpError(409, 'Email already in use');

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};
