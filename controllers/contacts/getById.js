import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function getById(req, res, next) {
  try {
    const { contactId } = req.params; // забираем из объекта params значение contactId // все динамические части маршрута сохраняются в объекте req.params

    // const result = await Contact.findOne({ _id: contactId }); // метод 1
    const result = await Contact.findById(contactId, '-createdAt -updatedAt'); // метод 2 // ищет по id контакт MongoDB

    if (!result) throw HttpError(404, 'Not found'); // функция генерит ошибку, если таковая есть, то она улетает в catch

    res.json(result);
  } catch (error) {
    next(error);
  }
}
