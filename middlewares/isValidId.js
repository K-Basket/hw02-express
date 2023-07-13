import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/HttpError.js';

// функция-middleware проверяет валидность id внутри Mongoose, т.е. id может быть id или нет?
export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(HttpError(400, `${contactId} is not valid id`));

  next();
};
