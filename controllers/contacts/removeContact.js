import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndRemove(contactId); // .findByIdAndDelete(contactId)
    if (!result) throw HttpError(404, 'Not found');

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
}
