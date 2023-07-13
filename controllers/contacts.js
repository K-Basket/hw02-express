import { HttpError } from '../helpers/HttpError.js';
import { Contact, addSchema, updateFavoriteSchema } from '../models/contact.js';
import { isValidId } from '../helpers/isValidId.js';
import { User } from '../models/user.js';
// import { authenticate } from '../middlewares/authenticate.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { SECRET_KEY } = process.env;

export async function listContacts(req, res, next) {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt'); // ищет все контакты в MongoDB

    res.json(result);
  } catch (error) {
    next(error); // если передаем next error, тогда express ищет функцию обработкии ошибок с 4-мя параметрами (см. app.js)
  }
}

export async function getById(req, res, next) {
  try {
    const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params

    isValidId(contactId, next); // проверяет валидность id внутри Mongoose

    // const result = await Contact.findOne({ _id: contactId }); // метод 1
    const result = await Contact.findById(contactId, '-createdAt -updatedAt'); // метод 2 // ищет по id контакт MongoDB

    if (!result) throw HttpError(404, 'Not found'); // функция генерит ошибку, если таковая есть, то она улетает в catch

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function addContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body); // валидация объекта запроса приходящего от backend (model/contact.js)

    if (error) throw HttpError(400, 'missing required name field');

    const result = await Contact.create(req.body); // добавляет контакт в MongoDB

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) throw HttpError(400, 'missing required name field');

    const { contactId } = req.params;

    isValidId(contactId, next);

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); // обновляет все поля контакта в MongoDB // метод возвращает старую версию контакта, чтобы возвращал новую добавить param-3: {new: true}, работает для PUT и PATCH

    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateStatusContact(req, res, next) {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);

    if (error) throw HttpError(400, 'missing required field Favorite');

    const { contactId } = req.params;

    isValidId(contactId, next);

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); // обновляет свойство favorite в MongoDB

    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;

    isValidId(contactId, next);
    // const result = await Contact.findByIdAndDelete(contactId); // Method-1
    const result = await Contact.findByIdAndRemove(contactId); // удаляет контакт по id из MongoDB // Method-2

    if (!result) throw HttpError(404, 'Not found');

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
}
