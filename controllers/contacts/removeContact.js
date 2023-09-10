import { HttpError } from '../../helpers/HttpError.js';
import { Contact } from '../../models/contact.js';

export async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndRemove(contactId); // .findByIdAndDelete(contactId)
    if (!result) throw HttpError(404, 'Not found');

    console.log('result :>> ', result);

    res.json({ message: 'contact deleted', id: contactId });
  } catch (error) {
    next(error);
  }
}
