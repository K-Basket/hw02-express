import { HttpError } from '../../helpers/HttpError.js';
import { Contact, updateFavoriteSchema } from '../../models/contact.js';

export async function updateStatusContact(req, res, next) {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required field Favorite');

    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) throw HttpError(404, 'Not found');

    res.json(result);
  } catch (error) {
    next(error);
  }
}
