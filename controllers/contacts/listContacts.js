import { Contact } from '../../models/contact.js';

export async function listContacts(req, res, next) {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;

    let data = { owner, favorite };

    if (favorite === undefined) {
      data = { owner };
    }

    const skip = (page - 1) * limit; // pagination
    const result = await Contact.find(data, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'name email');

    res.json(result);
  } catch (error) {
    next(error);
  }
}
