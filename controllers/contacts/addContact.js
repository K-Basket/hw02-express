import { HttpError } from '../../helpers/HttpError.js';
import { Contact, addSchema } from '../../models/contact.js';

export async function addContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, 'missing required name field');

    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
