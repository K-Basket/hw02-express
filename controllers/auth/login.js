import { User, loginSchema } from '../../models/user.js';
import { HttpError } from '../../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) throw HttpError(401, 'Email or password invalid');

    if (!user.verify) throw HttpError(401, 'Email not verify');

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, 'Email or password invalid');

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
