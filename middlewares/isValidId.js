import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/HttpError.js';

// проверка id-это-id внутри Mongoose
export const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId))
    next(HttpError(400, `${contactId} is not valid id`));

  next();
};
