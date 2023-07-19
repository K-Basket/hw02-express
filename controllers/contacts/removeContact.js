import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;

    // const result = await Contact.findByIdAndDelete(contactId); // Method-1
    const result = await Contact.findByIdAndRemove(contactId); // удаляет контакт по id из MongoDB // Method-2

    if (!result) throw HttpError(404, 'Not found');

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
}
