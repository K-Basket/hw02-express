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

    // проверяем наличие user в DB
    const user = await User.findOne({ email: email });
    if (!user) throw HttpError(401, 'Email or password invalid');

    // если user есть в DB, тогда проверяем пароль с помощью dcrypt
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, 'Email or password invalid'); // если не совпадает - выбрасываем ошибку

    // если пароль совпадает - создаем токен
    const payload = {
      id: user._id,
    }; // создаем payload с id usera
    // создаем token - метод .sign()
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' }); // payload - info про User (id):\
    // записываем токен в DB, после чего можно будет разлогиниваться
    await User.findByIdAndUpdate(user._id, { token }); // запиисали токен в DB

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
