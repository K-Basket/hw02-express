import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function getById(req, res, next) {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId, '-createdAt -updatedAt');
    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}
