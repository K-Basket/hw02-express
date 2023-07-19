import { HttpError } from '../../helpers/HttpError.js';
import { User, registerSchema } from '../../models/user.js';
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { email, password } = req.body;
    const user = await User.findOne({ email }); // .findeOne(email: email) ищет до первого совпадения, если нет - возвращает null

    if (user) throw HttpError(409, 'Email already in use'); // возврат ошибки на дублирование e-mail

    const hashPassword = await bcrypt.hash(password, 10); // хеширование пароля, 10-кол-во случайных символов при хешировании
    const avatarURL = gravatar.url(email); // присваивание user временной аватарки

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    }); // сохраняем в DB hashPassword

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};
