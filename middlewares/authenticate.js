// функция-middleware проверяет наличие токена и его валидность, т.е. залогинен ли user

import { HttpError } from '../helpers/HttpError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') next(HttpError(401));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) next(HttpError(401));

    req.user = user; // запись данных user'а из DB в req
    next();
  } catch {
    next(HttpError(401));
  }
};
