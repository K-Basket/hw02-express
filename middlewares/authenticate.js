// функция-middleware проверяет наличие токена и его валидность, т.е. залогинен ли user

import { HttpError } from '../helpers/HttpError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers; // берем из заголовка headers строку authorization
  const [bearer, token] = authorization.split(' '); // делим строку authorization на bearer и token меттодом split()

  if (bearer !== 'Bearer') next(HttpError(401)); // проверяет первое слово, является ли оно bearer

  try {
    const { id } = jwt.verify(token, SECRET_KEY); // проверка валидности токена // если не валидный - jwt.verify() выбросит ошибку
    const user = await User.findById(id); // повторно проверяем в DB наличие user по id

    if (!user) next(HttpError(401));

    next(); // если все оk, тогда пропукаем код далее, т.е. выходим из middleware
  } catch {
    next(HttpError(401));
  }
};
