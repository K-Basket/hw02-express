import { isValidObjectId } from 'mongoose';
import { HttpError } from './HttpError.js';

// функция проверяет валидность id внутри Mongoose, т.е. id может быть id или нет
export const isValidId = (id, next) => {
  if (!isValidObjectId(id)) next(HttpError(400, `${id} is not valid id`));
};
