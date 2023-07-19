import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function updateContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); // обновляет все поля контакта в MongoDB // метод возвращает старую версию контакта, чтобы возвращал новую добавить param-3: {new: true}, работает для PUT и PATCH

    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}
