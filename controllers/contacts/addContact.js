import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function addContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body); // валидация объекта запроса приходящего от backend (model/contact.js)
    if (error) throw HttpError(400, 'missing required name field');

    const { _id: owner } = req.user; // вытаскиваем _id одновременно переименовав его в owner из req
    const result = await Contact.create({ ...req.body, owner }); // добавляет контакт в MongoDB с учетом собственника контакта

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
