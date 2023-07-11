// 💙💛 Здесь контроллеры для авторизации и регистрации

import { HttpError } from '../helpers/HttpError.js';
import { User, loginSchema, registerSchema } from '../models/user.js';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) throw HttpError(400, 'missing required name field');

    const { email, password } = req.body;
    const user = await User.findOne({ email }); // .findeOne(email: email) ищет до первого совпадения, если нет - возвращает null

    if (user) throw HttpError(409, 'Email already in use'); // возврат ошибки на дублирование e-mail

    const hashPassword = await bcrypt.hash(password, 10); // хеширование пароля, 10-кол-во случайных символов при хешировании
    const newUser = await User.create({ ...req.body, password: hashPassword }); // сохраняем в DB hashPassword

    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { email, password } = req.body;

    // проверяем наличие user в DB
    const user = await User.findOne({ email: email });
    if (!user) throw HttpError(401, 'Email or password invalid');

    // если user есть в DB тогда проверяяем пароль с помощью dcrypt
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, 'Email or password invalid'); // если не совпадает - выбрасываем ошибку

    // если пароль совпадает - создаем токен
    const token = '111111.2222222.333333';

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
