// 💙💛 Здесь контроллеры для авторизации и регистрации

import { HttpError } from '../helpers/HttpError.js';
import {
  User,
  loginSchema,
  registerSchema,
  subscriptionSchema,
} from '../models/user.js';
import bcrypt from 'bcrypt'; // для хеширования пароля userа
import jwt from 'jsonwebtoken'; // для создания JWT токена
import 'dotenv/config'; // передача данных из файла / .env / в глобальную Переменную окружения
import gravatar from 'gravatar'; // генерация временной аватарки
import path from 'path';
import fs from 'fs/promises';
import Jimp from 'jimp'; // resize pictures

const { SECRET_KEY } = process.env;
const avatarsDir = path.resolve('public', 'avatars');

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

// для проверки актуальности токена после перезагрузки страницы (не разлогиниваться)
export const getCurrent = async (req, res, next) => {
  try {
    const { email, name } = req.user;

    res.json({ email, name });
  } catch (error) {
    next(error);
  }
};

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

export const subscription = async (req, res, next) => {
  try {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required field "subscription"');

    const { subscription } = req.body;
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    const newImage = await Jimp.read(tempUpload);
    newImage.resize(250, 250).write(tempUpload);

    const filename = `${_id}_${originalname}`; // переименовываем и делаем название уникальным

    const resultUpload = path.resolve(avatarsDir, filename);

    await fs.rename(tempUpload, resultUpload);
    // await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.resolve('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL }); // перезаписываем аватар

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
